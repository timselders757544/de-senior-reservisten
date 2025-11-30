/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' - nu server-side rendering voor Notion integratie
  images: { unoptimized: true },
}

module.exports = nextConfig
