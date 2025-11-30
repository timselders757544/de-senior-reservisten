import type { Metadata } from 'next'
import { Space_Grotesk, Source_Serif_4 } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'De Senior Reservisten - Het Experiment',
    template: '%s | De Senior Reservisten',
  },
  description: '150.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties. Live documentatie van twee 55+ professionals in het wervingsproces van Defensie.',
  keywords: ['Defensie', 'werving', 'leeftijdsdiscriminatie', '55 plus', 'reservisten', 'personeelstekort', 'experiment'],
  authors: [{ name: 'De Senior Reservisten' }],
  openGraph: {
    title: 'De Senior Reservisten - Het Experiment',
    description: '150.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties.',
    type: 'website',
    locale: 'nl_NL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="nl" className={`${spaceGrotesk.variable} ${sourceSerif.variable}`}>
      <body className="font-serif bg-neutral-100 text-neutral-900">
        <header className="bg-primary text-white py-4 px-6">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="font-sans text-xl font-bold">DE SENIOR RESERVISTEN</h1>
            <div className="flex gap-6 text-sm">
              <a href="/" className="hover:text-accent transition">Home</a>
              <a href="/blog" className="hover:text-accent transition">Het Verhaal</a>
              <a href="/over" className="hover:text-accent transition">Over</a>
              <a href="/contact" className="hover:text-accent transition">Contact</a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-primary-light text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="font-sans text-sm">DE SENIOR RESERVISTEN</p>
            <p className="text-neutral-300 text-sm mt-2">Een experiment in publiek leren.</p>
            <p className="text-neutral-300 text-xs mt-4">© 2024</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
