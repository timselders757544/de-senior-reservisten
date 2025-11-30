# De Senior Reservisten

**150.000 open vacatures, 2 mannen op leeftijd, 1 intentie, 0 pretenties.**

Live documentatie van twee professionals van 55+ die het wervingsproces van Defensie ingaan.

**Website:** [deseniorreservisten.nl](https://deseniorreservisten.nl)

## Tech Stack

- **Next.js 16** - React framework
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type-safe JavaScript
- **Notion** - CMS voor blogposts
- **Vercel** - Hosting & deployment

## Lokaal Draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

Maak `.env.local` aan:

```
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx
```

## Project Structuur

```
de-senior-reservisten/
├── app/
│   ├── components/       # React componenten (MobileNav)
│   ├── blog/            # Blog overzicht + detail pagina's
│   ├── over/            # Over ons pagina
│   ├── contact/         # Contact pagina
│   ├── layout.tsx       # Hoofd layout met navigatie
│   ├── globals.css      # Tailwind + custom styles
│   └── page.tsx         # Homepage
├── lib/
│   └── notion.ts        # Notion API integratie
├── public/
│   └── images/          # Hero afbeeldingen
└── tailwind.config.js   # Design system configuratie
```

## Design System

### Kleuren

- **Primary**: `#1a2744` (marineblauw)
- **Accent**: `#e07a2f` (oranje)
- **Neutral**: Grijs tinten

### Typografie

- **Headers**: Space Grotesk
- **Body**: Source Serif Pro

## Deployment

Automatisch via Vercel bij push naar `main` branch.

## Content Beheer

Blogposts worden beheerd in Notion. Elke post heeft:
- Titel
- Slug (URL)
- Datum
- Auteur
- Samenvatting
- Status (Published/Draft)

Alleen posts met status "Published" worden getoond.
