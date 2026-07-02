# Elvara Honey — Landing Page

Brand site for **Elvara Honey**: mission, vision, sourcing story, trust
signals, and contact/social links so people can verify the brand before
buying on Shopee.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (brand tokens in `tailwind.config.js`)
- No backend yet — `src/lib/firebase.ts` and `src/services/contactService.ts`
  are scaffolded and ready, but inactive. See the comments in those files for
  how to turn on Firebase later (e.g. for a newsletter or hamper-inquiry
  form) without restructuring the app.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Project structure

```
src/
  App.tsx                    — composes the sections, no copy lives here
  components/
    Header.tsx
    Hero.tsx
    MissionVision.tsx
    Sourcing.tsx
    Trust.tsx
    Products.tsx
    Contact.tsx
    Shared.tsx                — Hexagon, Eyebrow, SectionDivider (reused across sections)
  constants/
    brand.ts                  — CONTACT details + nav links, single source of truth
  assets/
    placeholder-product.svg
  lib/firebase.ts             — inactive, ready to enable later
  services/contactService.ts  — inactive, ready to enable later
```

## What to edit first

1. **`src/assets/placeholder-product.svg`** — the single placeholder image
   used across the hero, sourcing, and product sections. Replace this one
   file with a real photo (same filename) and every section updates at once.
2. **Each file in `src/components/`** — copy for that section (mission,
   vision, sourcing story, product names) lives directly in its own
   component file.
3. **`src/constants/brand.ts`** — WhatsApp, Instagram, Shopee, and email
   links, plus the nav menu, all pull from here.

## Notes on content

- The "Halal Friendly" trust badge is intentionally worded to avoid implying
  official MUI certification — there's a small disclaimer under it. Update
  this once/if formal certification is obtained.
- NKV (Nomor Kontrol Veteriner) is presented as the current, real
  certification.
- Copy is written primarily in Bahasa Indonesia (Shopee Indonesia is the
  sales channel), with the "From Hive to Healing" tagline kept in English as
  a fixed brand asset from the logo.

## Deploying

Any static host works (Vercel, Netlify, Firebase Hosting). Build with:

```bash
npm run build
```

This outputs a static `dist/` folder.
