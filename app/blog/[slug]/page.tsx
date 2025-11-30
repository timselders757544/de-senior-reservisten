import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post niet gevonden',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

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
          <time className="block text-sm text-neutral-600 mt-4">{post.date}</time>
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mt-2">
            {post.title}
          </h1>
          <p className="text-xl text-neutral-700 mt-4">{post.excerpt}</p>
        </header>

        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>

        <footer className="mt-12 pt-8 border-t border-neutral-300">
          <Link
            href="/blog"
            className="btn-primary inline-block"
          >
            ← Terug naar het verhaal
          </Link>
        </footer>
      </article>
    </div>
  )
}
