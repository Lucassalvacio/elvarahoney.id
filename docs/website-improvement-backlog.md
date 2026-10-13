# Elvara Honey website improvement backlog

## Completed

- Replaced unverified health and sourcing claims with information supported by the project brief.
- Removed unpublished certification claims, unverified customer-review excerpts, and visible template/coming-soon content.
- Added the provided product prices and package contents to the collection page; added Shopee and WhatsApp inquiry links.
- Displayed the available NKV and laboratory-test information without inventing document identifiers or dates.

## Priorities

| Priority | Status | Improvement | Rationale / dependency |
| --- | --- | --- | --- |
| P1 | Needs owner documents | Publish approved NKV certificate and laboratory-report details. | Confirm the certificate number and scope, plus test dates and laboratory identity; link or show documents only after approval. |
| P1 | Needs owner confirmation | Document sourcing and harvesting details. | Confirm collector relationships, locations, and harvest/processing practices before adding specific claims. |
| P1 | Needs owner assets | Replace generic placeholder illustrations with current product and packaging photographs. | Use approved, accurate images and confirm that packaging matches the listed sizes and hamper contents. |
| P1 | Needs owner confirmation | Verify live prices, stock, and active WhatsApp business number. | The site contains catalog stock values and a stored number; confirm these before relying on them for orders. |
| P2 | Needs technical review | Verify production indexability, canonical URL, sitemap, robots directives, and rendered metadata. | The repository has no sitemap or robots file; live-site access and deployment settings were unavailable during this audit. |
| P2 | Keep in test mode | Reassess the internal cart and direct checkout before activation. | Checkout is explicitly disabled by default and shipping rates are simulated. Do not enable until shipping, order handling, payment terms, and operational costs are confirmed. |
| P3 | Needs owner approval | Restore selected customer reviews only with provenance and permission. | The removed excerpts were not independently verifiable and included health-related claims. |

## Audit notes

- Stack: React 18, TypeScript, Vite, and React Router; `npm run build` is the only validation script in `package.json`.
- No test or lint script is configured.
- Live website and Instagram were not accessible from this environment; production behavior, analytics, and deployment configuration were not verified.
- No new paid service or dependency was introduced.
