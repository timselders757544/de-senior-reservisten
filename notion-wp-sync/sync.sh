#!/bin/bash
# Notion → WordPress Sync
# Draait elk uur op Mac Mini, publiceert goedgekeurde Notion posts naar WordPress

# Laad secrets uit centrale secrets store
SECRETS_FILE="/Volumes/DevSSD/Development/secrets/projects/de-senior-reservisten.env"
if [ -f "$SECRETS_FILE" ]; then
    source "$SECRETS_FILE"
else
    echo "ERROR: Secrets file niet gevonden: $SECRETS_FILE"
    exit 1
fi

# Gebruik variabelen uit secrets
NOTION_KEY="$NOTION_API_KEY"
NOTION_DB="$NOTION_DATABASE_ID"
SSH_HOST="$WP_SSH_HOST"

# Lokale config
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="$SCRIPT_DIR/sync.log"

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

log "=== Sync gestart ==="

# Haal goedgekeurde posts op
APPROVED=$(curl -s "https://api.notion.com/v1/databases/$NOTION_DB/query" \
    -H "Authorization: Bearer $NOTION_KEY" \
    -H "Notion-Version: 2022-06-28" \
    -H "Content-Type: application/json" \
    -d '{"filter":{"property":"Status","select":{"equals":"Goedgekeurd"}}}')

# Schrijf naar temp file om pipe issues te voorkomen
echo "$APPROVED" > /tmp/notion_approved.json

COUNT=$(jq '.results | length' /tmp/notion_approved.json)

if [ "$COUNT" -eq 0 ]; then
    log "Geen goedgekeurde posts gevonden."
    rm -f /tmp/notion_approved.json
    exit 0
fi

log "$COUNT goedgekeurde post(s) gevonden"

# Loop door posts via index (vermijdt pipe subshell issues)
for i in $(seq 0 $((COUNT - 1))); do
    PAGE_ID=$(jq -r ".results[$i].id" /tmp/notion_approved.json)
    WP_ID=$(jq -r ".results[$i].properties[\"WordPress ID\"].number" /tmp/notion_approved.json)
    TITLE=$(jq -r ".results[$i].properties[\"Titel NL\"].rich_text[0].plain_text // empty" /tmp/notion_approved.json)
    EXCERPT=$(jq -r ".results[$i].properties[\"Excerpt NL\"].rich_text[0].plain_text // empty" /tmp/notion_approved.json)

    if [ -z "$WP_ID" ] || [ "$WP_ID" = "null" ] || [ -z "$TITLE" ]; then
        log "⚠️  Skip: Geen WP ID of titel voor $PAGE_ID"
        continue
    fi

    log "📝 Verwerken: WP $WP_ID - $TITLE"

    # Haal alle blocks op (met paginering)
    ALL_BLOCKS="[]"
    CURSOR=""

    while true; do
        if [ -z "$CURSOR" ]; then
            BLOCKS_RESPONSE=$(curl -s "https://api.notion.com/v1/blocks/$PAGE_ID/children?page_size=100" \
                -H "Authorization: Bearer $NOTION_KEY" \
                -H "Notion-Version: 2022-06-28")
        else
            BLOCKS_RESPONSE=$(curl -s "https://api.notion.com/v1/blocks/$PAGE_ID/children?page_size=100&start_cursor=$CURSOR" \
                -H "Authorization: Bearer $NOTION_KEY" \
                -H "Notion-Version: 2022-06-28")
        fi

        NEW_BLOCKS=$(echo "$BLOCKS_RESPONSE" | jq '.results // []')
        ALL_BLOCKS=$(echo "$ALL_BLOCKS" "$NEW_BLOCKS" | jq -s 'add')

        HAS_MORE=$(echo "$BLOCKS_RESPONSE" | jq -r '.has_more // false')
        if [ "$HAS_MORE" = "true" ]; then
            CURSOR=$(echo "$BLOCKS_RESPONSE" | jq -r '.next_cursor')
        else
            break
        fi
    done

    # Extraheer Nederlandse content (na "Nederlands" header)
    CONTENT=$(echo "$ALL_BLOCKS" | jq -r '
        # Vind index van Nederlandse header
        (to_entries | map(select(.value.type == "heading_1" and (.value.heading_1.rich_text[0].plain_text // "" | contains("Nederlands")))) | .[0].key // -1) as $nl_idx |

        if $nl_idx == -1 then
            ""
        else
            .[$nl_idx + 2:] |  # Skip header en divider
            map(
                if .type == "paragraph" then
                    "<p>" + ([.paragraph.rich_text[]?.plain_text // ""] | join("")) + "</p>"
                elif .type == "heading_2" then
                    "<h2>" + ([.heading_2.rich_text[]?.plain_text // ""] | join("")) + "</h2>"
                elif .type == "heading_3" then
                    "<h3>" + ([.heading_3.rich_text[]?.plain_text // ""] | join("")) + "</h3>"
                elif .type == "quote" then
                    "<blockquote>" + ([.quote.rich_text[]?.plain_text // ""] | join("")) + "</blockquote>"
                elif .type == "image" then
                    "<img src=\"" + (.image.external.url // .image.file.url // "") + "\" />"
                elif .type == "bulleted_list_item" then
                    "<li>" + ([.bulleted_list_item.rich_text[]?.plain_text // ""] | join("")) + "</li>"
                else
                    ""
                end
            ) |
            map(select(. != "" and . != "<p></p>")) |
            join("\n")
        end
    ')

    if [ -z "$CONTENT" ] || [ "$CONTENT" = "" ]; then
        log "⚠️  Skip: Geen Nederlandse content voor WP $WP_ID"
        continue
    fi

    # Schrijf content naar tijdelijk bestand
    echo "$CONTENT" > "/tmp/wp_content_$WP_ID.html"

    # Escape single quotes in title en excerpt voor PHP
    TITLE_ESCAPED=$(echo "$TITLE" | sed "s/'/\\\\'/g")
    EXCERPT_ESCAPED=$(echo "$EXCERPT" | sed "s/'/\\\\'/g")

    # Maak PHP script
    cat > "/tmp/publish_wp_$WP_ID.php" << PHPEOF
<?php
require_once('/home/u457-gn6jha496kot/www/timselders.nl/public_html/wp-load.php');
\$post_id = $WP_ID;
\$title = '$TITLE_ESCAPED';
\$excerpt = '$EXCERPT_ESCAPED';
\$content = file_get_contents('/tmp/wp_content_$WP_ID.html');
wp_update_post(array('ID' => \$post_id, 'post_title' => \$title));
update_field('post_content', \$content, \$post_id);
update_field('post_excerpt', \$excerpt, \$post_id);
echo "OK";
PHPEOF

    # Upload en publiceer via SSH
    scp -q "/tmp/wp_content_$WP_ID.html" "/tmp/publish_wp_$WP_ID.php" "$SSH_HOST:/tmp/" 2>/dev/null

    RESULT=$(ssh "$SSH_HOST" "cd www/timselders.nl/public_html && php /tmp/publish_wp_$WP_ID.php && wp cache flush --quiet && rm -f /tmp/wp_content_$WP_ID.html /tmp/publish_wp_$WP_ID.php" 2>&1)

    if [[ "$RESULT" == *"OK"* ]]; then
        log "✅ Gepubliceerd: WP $WP_ID"

        # Update Notion status naar "Gepubliceerd"
        curl -s -X PATCH "https://api.notion.com/v1/pages/$PAGE_ID" \
            -H "Authorization: Bearer $NOTION_KEY" \
            -H "Notion-Version: 2022-06-28" \
            -H "Content-Type: application/json" \
            -d '{"properties":{"Status":{"select":{"name":"Gepubliceerd"}}}}' > /dev/null

        log "✅ Notion status → Gepubliceerd"
    else
        log "❌ Fout bij publiceren WP $WP_ID: $RESULT"
    fi

    # Cleanup lokaal
    rm -f "/tmp/wp_content_$WP_ID.html" "/tmp/publish_wp_$WP_ID.php"

    # Kleine pauze tussen posts
    sleep 1
done

# Cleanup
rm -f /tmp/notion_approved.json

log "=== Sync voltooid ==="
