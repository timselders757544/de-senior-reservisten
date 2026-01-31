// Notion API configuratie - directe fetch calls (vermijdt SDK bundling issues)
const NOTION_API_URL = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

const notionHeaders = {
  'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
  'Notion-Version': NOTION_VERSION,
  'Content-Type': 'application/json',
}

const databaseId = process.env.NOTION_DATABASE_ID!

// Types
export interface BlogPost {
  id: string
  slug: string
  title: string
  date: string
  author: string
  summary: string
  status: string
  image?: string
}

export interface BlogPostWithContent extends BlogPost {
  content: string
}

interface NotionRichText {
  plain_text: string
  href?: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    code: boolean
  }
}

interface NotionFile {
  type: 'external' | 'file'
  external?: { url: string }
  file?: { url: string }
  name?: string
}

interface NotionPage {
  id: string
  properties: {
    [key: string]: {
      type: string
      title?: NotionRichText[]
      rich_text?: NotionRichText[]
      date?: { start: string } | null
      select?: { name: string } | null
      files?: NotionFile[]
    }
  }
}

interface NotionBlock {
  type: string
  paragraph?: { rich_text: NotionRichText[] }
  heading_1?: { rich_text: NotionRichText[] }
  heading_2?: { rich_text: NotionRichText[] }
  heading_3?: { rich_text: NotionRichText[] }
  bulleted_list_item?: { rich_text: NotionRichText[] }
  numbered_list_item?: { rich_text: NotionRichText[] }
  quote?: { rich_text: NotionRichText[] }
  code?: { rich_text: NotionRichText[] }
  image?: {
    type: 'external' | 'file'
    external?: { url: string }
    file?: { url: string }
    caption: NotionRichText[]
  }
}

// Helper functies
function richTextToPlainText(richText: NotionRichText[]): string {
  return richText.map(item => item.plain_text).join('')
}

function richTextToHtml(richText: NotionRichText[]): string {
  return richText.map(item => {
    let text = item.plain_text
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    if (item.annotations.bold) text = `<strong>${text}</strong>`
    if (item.annotations.italic) text = `<em>${text}</em>`
    if (item.annotations.strikethrough) text = `<del>${text}</del>`
    if (item.annotations.code) text = `<code>${text}</code>`
    if (item.href) text = `<a href="${item.href}">${text}</a>`
    return text
  }).join('')
}

function blocksToHtml(blocks: NotionBlock[]): string {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        const text = richTextToHtml(block.paragraph?.rich_text || [])
        return text ? `<p>${text}</p>` : ''
      case 'heading_1':
        return `<h1>${richTextToHtml(block.heading_1?.rich_text || [])}</h1>`
      case 'heading_2':
        return `<h2>${richTextToHtml(block.heading_2?.rich_text || [])}</h2>`
      case 'heading_3':
        return `<h3>${richTextToHtml(block.heading_3?.rich_text || [])}</h3>`
      case 'bulleted_list_item':
        return `<li>${richTextToHtml(block.bulleted_list_item?.rich_text || [])}</li>`
      case 'numbered_list_item':
        return `<li>${richTextToHtml(block.numbered_list_item?.rich_text || [])}</li>`
      case 'quote':
        return `<blockquote>${richTextToHtml(block.quote?.rich_text || [])}</blockquote>`
      case 'code':
        return `<pre><code>${richTextToPlainText(block.code?.rich_text || [])}</code></pre>`
      case 'divider':
        return '<hr />'
      case 'image':
        const imageUrl = block.image?.type === 'external'
          ? block.image.external?.url
          : block.image?.file?.url
        const caption = block.image?.caption?.length
          ? richTextToPlainText(block.image.caption)
          : ''
        return `<figure><img src="${imageUrl}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
      default:
        return ''
    }
  }).join('\n')
}

function getImageUrl(files?: NotionFile[]): string | undefined {
  if (!files || files.length === 0) return undefined
  const file = files[0]
  if (file.type === 'external' && file.external?.url) {
    return file.external.url
  }
  if (file.type === 'file' && file.file?.url) {
    return file.file.url
  }
  return undefined
}

function pageToPost(page: NotionPage): BlogPost {
  const props = page.properties
  return {
    id: page.id,
    slug: props['Slug']?.rich_text
      ? richTextToPlainText(props['Slug'].rich_text)
      : page.id,
    title: props['Titel']?.title
      ? richTextToPlainText(props['Titel'].title)
      : 'Zonder titel',
    date: props['Datum']?.date?.start || '',
    author: props['Auteur']?.select?.name || '',
    summary: props['Samenvatting']?.rich_text
      ? richTextToPlainText(props['Samenvatting'].rich_text)
      : '',
    status: props['Status']?.select?.name || '',
    image: getImageUrl(props['Afbeelding']?.files),
  }
}

// API functies
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const response = await fetch(`${NOTION_API_URL}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: notionHeaders,
    body: JSON.stringify({
      filter: {
        property: 'Status',
        select: { equals: 'Gepubliceerd' },
      },
      sorts: [{ property: 'Datum', direction: 'descending' }],
    }),
    next: { revalidate: 1800 }, // 30 minuten - sync met page revalidate
  })

  if (!response.ok) {
    console.error('Notion API error:', await response.text())
    return []
  }

  const data = await response.json()
  return data.results.map((page: NotionPage) => pageToPost(page))
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const response = await fetch(`${NOTION_API_URL}/databases/${databaseId}/query`, {
    method: 'POST',
    headers: notionHeaders,
    body: JSON.stringify({
      filter: {
        and: [
          { property: 'Slug', rich_text: { equals: slug } },
          { property: 'Status', select: { equals: 'Gepubliceerd' } },
        ],
      },
    }),
    next: { revalidate: 1800 }, // 30 minuten
  })

  if (!response.ok) {
    console.error('Notion API error:', await response.text())
    return null
  }

  const data = await response.json()
  if (data.results.length === 0) return null

  const page = data.results[0] as NotionPage
  const post = pageToPost(page)

  // Haal blocks op voor content
  const blocksResponse = await fetch(`${NOTION_API_URL}/blocks/${page.id}/children`, {
    headers: notionHeaders,
    next: { revalidate: 1800 }, // 30 minuten
  })

  if (!blocksResponse.ok) {
    return { ...post, content: '' }
  }

  const blocksData = await blocksResponse.json()
  const content = blocksToHtml(blocksData.results as NotionBlock[])

  return { ...post, content }
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts()
  return posts.map(post => post.slug).filter(Boolean)
}
