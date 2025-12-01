'use client'

import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'De verkenning' },
  { href: '/over', label: 'Over mij' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Hamburger button - alleen zichtbaar op mobiel */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 -mr-2 text-accent"
        aria-label="Menu openen"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Desktop navigatie */}
      <div className="hidden md:flex gap-6 text-sm">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="hover:text-accent transition"
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Mobiel menu - dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-primary border-t border-primary-light z-50 shadow-lg">
          <div className="flex flex-col py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-6 py-3 hover:bg-primary-light transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
