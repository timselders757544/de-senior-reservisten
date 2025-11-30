/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1a2744',
          light: '#2d3e5f',
        },
        accent: {
          DEFAULT: '#e07a2f',
          light: '#f4a261',
        },
        neutral: {
          100: '#f8f7f4',
          200: '#e8e6e1',
          300: '#d1cec7',
          700: '#4a4a48',
          900: '#1f1f1e',
        },
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', 'Arial Black', 'sans-serif'],
        serif: ['var(--font-source-serif)', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1.125rem',
        lg: '1.25rem',
        xl: '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
        '4xl': '3.5rem',
      },
    },
  },
  plugins: [],
}
