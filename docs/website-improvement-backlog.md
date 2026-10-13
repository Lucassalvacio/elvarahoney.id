# Elvara Honey website improvement backlog

## Completed

- Replaced unverified health and sourcing claims with information supported by the project brief.
- Removed unpublished certification claims, unverified customer-review excerpts, and visible template/coming-soon content.
- Added the provided product prices and package contents to the collection page; added Shopee and WhatsApp inquiry links.
- Displayed the provided NKV number, lab certificate number, moisture result and test method, and other reported microbiological results; linked to the supplied document images.
- Updated sourcing details from owner-provided information: local harvesters, eucalyptus forest, raw/wild honey, no heating, and no additives.
- Improved the Toko buying path with visible variant prices, hamper contents, category filter state and product count, prominent Shopee access, and prefilled WhatsApp product inquiries; hid the inactive test-mode cart/checkout entry point.

## Priorities

| Priority | Status | Improvement | Rationale / dependency |
| --- | --- | --- | --- |
| P1 | Needs owner confirmation | Add remaining laboratory-report metadata if desired. | Test date and laboratory identity were not provided; current site states the supplied result values, method, and certificate number only. |
| P1 | Follow-up | Review remaining development-tool dependency advisories. | `npm audit` reports 14 remaining development dependency advisories (10 high, 4 moderate); fixes for Vite and Tailwind require major upgrades. Production dependencies currently audit clean. |
| P1 | Needs owner assets | Replace generic placeholder illustrations with current product and packaging photographs. | Use approved, accurate images and confirm that packaging matches the listed sizes and hamper contents. |
| P1 | No stock disclosure | Keep stock quantities off the public product pages until approved for publication. | Owner confirmed no stock information should be added yet. |
| P2 | Confirmed | Prices and WhatsApp contact. | Owner confirmed current listed prices and WhatsApp number; configured link uses +62 851 2133 0313. |
| P2 | Needs technical review | Verify production indexability, canonical URL, sitemap, robots directives, and rendered metadata. | The repository has no sitemap or robots file; live-site access and deployment settings were unavailable during this audit. |
| P2 | Keep in test mode | Reassess the internal cart and direct checkout before activation. | Checkout is explicitly disabled by default and shipping rates are simulated. The cart remains available only outside test mode; do not enable until shipping, order handling, payment terms, and operational costs are confirmed. |
| P3 | Needs owner approval | Restore selected customer reviews only with provenance and permission. | The removed excerpts were not independently verifiable and included health-related claims. |

## Audit notes

- Stack: React 18, TypeScript, Vite, and React Router; `npm run build` is the only validation script in `package.json`.
- No test or lint script is configured.
- Live website and Instagram were not accessible from this environment; production behavior, analytics, and deployment configuration were not verified.
- No new paid service or dependency was introduced.
