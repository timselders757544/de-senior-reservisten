import { getPostBySlug, getAllPostSlugs } from '@/lib/notion'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

// Revalidate elke 60 seconden voor verse content
export const revalidate = 60

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post niet gevonden',
    }
  }

  return {
    title: post.title,
    description: post.summary,
  }
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="container-content">
      <article>
        <header className="mb-8 pb-8 border-b border-neutral-300">
          <Link
            href="/blog"
            className="text-accent hover:text-primary transition-colors mb-4 inline-block"
          >
            ← Terug naar overzicht
          </Link>
          <time className="block text-sm text-neutral-600 mt-4">
            {post.date ? new Date(post.date).toLocaleDateString('nl-NL', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }) : ''}
          </time>
          {post.author && (
            <span className="text-sm text-neutral-500">Door {post.author}</span>
          )}
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2">
            {post.title}
          </h1>
          <div className={`mt-4 ${post.image ? 'flex flex-col md:flex-row gap-6' : ''}`}>
            {post.image && (
              <div className="w-full md:w-48 lg:w-56 flex-shrink-0">
                <div className="relative aspect-square w-full rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 224px"
                  />
                </div>
              </div>
            )}
            <p className="text-xl text-neutral-700 flex-1">{post.summary}</p>
          </div>
        </header>

        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="mt-12 pt-8 border-t border-neutral-300">
          <Link
            href="/blog"
            className="btn-primary inline-block"
          >
            ← Terug naar de verkenning
          </Link>
        </footer>
      </article>
    </div>
  )
}
