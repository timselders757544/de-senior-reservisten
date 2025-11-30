import { Client } from '@notionhq/client'
import {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse
} from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const databaseId = process.env.NOTION_DATABASE_ID!

// Type voor een blogpost
export interface BlogPost {
  id: string
  slug: string
  title: string
  date: string
  author: string
  summary: string
  status: string
}

// Type voor blogpost met content
export interface BlogPostWithContent extends BlogPost {
  content: string
}

// Helper om rich text naar plain text te converteren
function richTextToPlainText(richText: RichTextItemResponse[]): string {
  return richText.map(item => item.plain_text).join('')
}

// Haal alle gepubliceerde blogposts op
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'Status',
      select: {
        equals: 'Gepubliceerd',
      },
    },
    sorts: [
      {
        property: 'Datum',
        direction: 'descending',
      },
    ],
  })

  return response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map((page) => {
      const props = page.properties

      // Haal properties veilig op
      const titleProp = props['Titel']
      const slugProp = props['Slug']
      const datumProp = props['Datum']
      const auteurProp = props['Auteur']
      const samenvattingProp = props['Samenvatting']
      const statusProp = props['Status']

      return {
        id: page.id,
        slug: slugProp?.type === 'rich_text'
          ? richTextToPlainText(slugProp.rich_text)
          : page.id,
        title: titleProp?.type === 'title'
          ? richTextToPlainText(titleProp.title)
          : 'Zonder titel',
        date: datumProp?.type === 'date' && datumProp.date
          ? datumProp.date.start
          : '',
        author: auteurProp?.type === 'select' && auteurProp.select
          ? auteurProp.select.name
          : '',
        summary: samenvattingProp?.type === 'rich_text'
          ? richTextToPlainText(samenvattingProp.rich_text)
          : '',
        status: statusProp?.type === 'select' && statusProp.select
          ? statusProp.select.name
          : '',
      }
    })
}

// Haal een enkele post op basis van slug
export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        {
          property: 'Status',
          select: {
            equals: 'Gepubliceerd',
          },
        },
      ],
    },
  })

  if (response.results.length === 0) {
    return null
  }

  const page = response.results[0] as PageObjectResponse
  const props = page.properties

  // Haal de page content (blocks) op
  const blocks = await notion.blocks.children.list({
    block_id: page.id,
  })

  // Convert blocks naar HTML
  const content = blocksToHtml(blocks.results as BlockObjectResponse[])

  const titleProp = props['Titel']
  const slugProp = props['Slug']
  const datumProp = props['Datum']
  const auteurProp = props['Auteur']
  const samenvattingProp = props['Samenvatting']
  const statusProp = props['Status']

  return {
    id: page.id,
    slug: slugProp?.type === 'rich_text'
      ? richTextToPlainText(slugProp.rich_text)
      : page.id,
    title: titleProp?.type === 'title'
      ? richTextToPlainText(titleProp.title)
      : 'Zonder titel',
    date: datumProp?.type === 'date' && datumProp.date
      ? datumProp.date.start
      : '',
    author: auteurProp?.type === 'select' && auteurProp.select
      ? auteurProp.select.name
      : '',
    summary: samenvattingProp?.type === 'rich_text'
      ? richTextToPlainText(samenvattingProp.rich_text)
      : '',
    status: statusProp?.type === 'select' && statusProp.select
      ? statusProp.select.name
      : '',
    content,
  }
}

// Haal alle slugs op voor static generation
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts()
  return posts.map(post => post.slug).filter(Boolean)
}

// Convert Notion blocks naar HTML
function blocksToHtml(blocks: BlockObjectResponse[]): string {
  return blocks.map(block => {
    if (!('type' in block)) return ''

    switch (block.type) {
      case 'paragraph':
        const text = richTextToHtml(block.paragraph.rich_text)
        return text ? `<p>${text}</p>` : ''

      case 'heading_1':
        return `<h1>${richTextToHtml(block.heading_1.rich_text)}</h1>`

      case 'heading_2':
        return `<h2>${richTextToHtml(block.heading_2.rich_text)}</h2>`

      case 'heading_3':
        return `<h3>${richTextToHtml(block.heading_3.rich_text)}</h3>`

      case 'bulleted_list_item':
        return `<li>${richTextToHtml(block.bulleted_list_item.rich_text)}</li>`

      case 'numbered_list_item':
        return `<li>${richTextToHtml(block.numbered_list_item.rich_text)}</li>`

      case 'quote':
        return `<blockquote>${richTextToHtml(block.quote.rich_text)}</blockquote>`

      case 'code':
        return `<pre><code>${richTextToPlainText(block.code.rich_text)}</code></pre>`

      case 'divider':
        return '<hr />'

      case 'image':
        const imageUrl = block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url
        const caption = block.image.caption.length > 0
          ? richTextToPlainText(block.image.caption)
          : ''
        return `<figure><img src="${imageUrl}" alt="${caption}" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`

      default:
        return ''
    }
  }).join('\n')
}

// Convert rich text naar HTML met formatting
function richTextToHtml(richText: RichTextItemResponse[]): string {
  return richText.map(item => {
    let text = item.plain_text

    // Escape HTML
    text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

    // Apply formatting
    if (item.annotations.bold) text = `<strong>${text}</strong>`
    if (item.annotations.italic) text = `<em>${text}</em>`
    if (item.annotations.strikethrough) text = `<del>${text}</del>`
    if (item.annotations.code) text = `<code>${text}</code>`

    // Links
    if (item.href) text = `<a href="${item.href}">${text}</a>`

    return text
  }).join('')
}
