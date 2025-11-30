# De Senior Reservisten

**150.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties.**

Een live experiment: wat gebeurt er als twee professionals van 55+ het wervingsproces van Defensie ingaan?

## Lokaal Draaien

```bash
cd /Volumes/DevSSD/Development/de-senior-reservisten
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Tech Stack

- **Next.js 14** - React framework met static export
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type-safe JavaScript
- **Google Fonts** - Space Grotesk (headers) + Source Serif Pro (body)

## Project Structuur

```
de-senior-reservisten/
├── app/
│   ├── layout.tsx          # Hoofd layout met navigatie
│   ├── globals.css         # Tailwind + custom styles
│   └── page.tsx            # Homepage
├── components/             # Herbruikbare componenten (TODO)
├── content/
│   └── blog/              # Markdown blogposts (TODO)
├── public/
│   └── images/            # Afbeeldingen
└── tailwind.config.js     # Design system configuratie
```

## Design System

### Kleuren

- **Primary**: `#1a2744` (marineblauw) - autoriteit, structuur
- **Accent**: `#e07a2f` (oranje) - energie, disruptie
- **Neutral**: Grijs tinten voor achtergrond en tekst

### Typografie

- **Headers**: Space Grotesk (scherp, modern)
- **Body**: Source Serif Pro (leesbaarheid)
- **Mono**: JetBrains Mono (code/tech)

## Volgende Stappen

- [ ] Blog overzichtspagina bouwen
- [ ] Markdown/MDX setup voor blogposts
- [ ] Individuele blogpost template
- [ ] Over-pagina met volledige tekst
- [ ] Contact-pagina
- [ ] 3-5 voorbeeld blogposts uit briefing
- [ ] SEO optimalisatie
- [ ] Deployment naar Vercel

## Development

```bash
# Ontwikkelen (met hot reload)
npm run dev

# Bouwen voor productie
npm run build

# Static export genereren
npm run export
```

## Deployment

Dit project is geconfigureerd voor static export, perfect voor Vercel:

1. Push naar GitHub repository
2. Koppel repository aan Vercel
3. Vercel detecteert automatisch Next.js
4. Done!

Of handmatig:

```bash
npm run build
# Upload 'out' folder naar hosting
```

## Domein

Domein wordt: **www.deseniorreservisten.nl** (nog niet geregistreerd)

## Notities

- Alle content in Nederlands
- Geen analytics (eerste versie)
- Geen reacties (eerste versie)
- Focus op verhaal vertellen, niet op features
