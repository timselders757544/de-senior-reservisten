# Design System Koppeling

Dit project is gekoppeld aan het **design-system** voor herbruikbare design tokens.

## Hoe het werkt

### 1. Centraal Design System
`/Volumes/DevSSD/Development/design-system/tokens.css` bevat alle design tokens:
- Big Arms: `--ba-*` prefix
- **De Senior Reservisten: `--dsr-*` prefix**
- Andere projecten: hun eigen prefix

### 2. Import in dit project
`app/globals.css` importeert de tokens:
```css
@import '../../generic-design-system/tokens.css';
```

### 3. Beschikbare Tokens

```css
/* Kleuren */
--dsr-color-primary: #1a2744;           /* Marineblauw */
--dsr-color-primary-light: #2a3a5a;     /* Licht marineblauw */
--dsr-color-primary-dark: #0f1a2e;      /* Donker marineblauw */
--dsr-color-accent: #e07a2f;            /* Oranje */
--dsr-color-accent-hover: #d16920;      /* Donker oranje */

/* Neutrals */
--dsr-color-neutral-50: #f9fafb;
--dsr-color-neutral-100: #f3f4f6;
--dsr-color-neutral-200: #e5e7eb;
--dsr-color-neutral-600: #4b5563;
--dsr-color-neutral-900: #111827;

/* Typography */
--dsr-font-heading: 'Space Grotesk', -apple-system, sans-serif;
--dsr-font-body: 'Source Serif 4', Georgia, serif;
--dsr-font-weight-normal: 400;
--dsr-font-weight-semibold: 600;
--dsr-font-weight-bold: 700;

/* Buttons */
--dsr-button-primary-bg: #e07a2f;
--dsr-button-primary-hover: #d16920;
--dsr-button-primary-text: #ffffff;
```

## Gebruik

### Optie A: Tailwind classes (zoals nu)
Tailwind config gebruikt hardcoded waarden die matchen met de design tokens.

```jsx
<button className="bg-accent text-white">Click me</button>
```

### Optie B: Direct CSS variables gebruiken
Voor custom styling buiten Tailwind:

```css
.my-custom-button {
  background: var(--dsr-color-accent);
  color: var(--dsr-color-text-white);
  font-family: var(--dsr-font-heading);
}
```

```jsx
<button className="my-custom-button">Click me</button>
```

## Kleuren Wijzigen

**Belangrijk:** Als je een kleur wilt wijzigen:

1. **Wijzig in:** `/Volumes/DevSSD/Development/design-system/tokens.css`
   - Update de `--dsr-*` variabelen
   - Commit naar design-system repo

2. **Optioneel wijzig ook:** `tailwind.config.js`
   - Als je Tailwind utility classes gebruikt
   - Houd de waardes synchroon met tokens.css

## Waarom deze opzet?

✅ **Single source of truth** - Design tokens in één centrale plek
✅ **Herbruikbaar** - Andere projecten kunnen dezelfde tokens gebruiken
✅ **Flexibel** - Mix van Tailwind en CSS variables mogelijk
✅ **Gedocumenteerd** - Alle tokens staan centraal in design-system

## Toekomstige Updates

Als design-system wordt geüpdatet, krijgt dit project automatisch de nieuwe waardes bij een refresh van de app.
