import { getPublishedPosts } from '@/lib/notion'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'De verkenning',
  description: 'Twee professionals van 55+ gaan het wervingsproces van Defensie in. Live documentatie van wat we tegenkomen — ongefiltreerd en transparant.',
}

// Revalidate elke 60 seconden voor verse content
export const revalidate = 60

export default async function Blog() {
  const posts = await getPublishedPosts()

  return (
    <div className="container-content">
      <div className="prose prose-lg max-w-none">
        <h1 className="text-primary">De verkenning</h1>
        <p className="text-xl text-neutral-700">
          Twee professionals van 55+ gaan het wervingsproces van Defensie in.
          Dit is een live documentatie van wat we tegenkomen — ongefiltreerd en transparant.
        </p>
      </div>

      <div className="mt-12 space-y-8">
        {posts.length === 0 ? (
          <div className="bg-neutral-100 p-8 rounded text-center">
            <p className="text-neutral-600">
              Het eerste hoofdstuk wordt momenteel geschreven...
            </p>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="border-l-4 border-primary pl-6 py-2">
              <time className="text-sm text-neutral-600">
                {post.date ? new Date(post.date).toLocaleDateString('nl-NL', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : ''}
              </time>
              {post.author && (
                <span className="text-sm text-neutral-500 ml-2">• {post.author}</span>
              )}
              <h2 className="text-2xl font-heading font-bold text-primary mt-2 mb-3">
                <Link href={`/blog/${post.slug}`} className="hover:text-accent transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-neutral-700 text-lg mb-4">{post.summary}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-accent hover:text-primary font-semibold transition-colors"
              >
                Lees verder →
              </Link>
            </article>
          ))
        )}
      </div>
    </div>
  )
}
