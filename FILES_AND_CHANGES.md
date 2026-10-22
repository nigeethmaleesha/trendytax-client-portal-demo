> Current redesign: See `DESIGN-UPDATE.md` for the October 2026 update and retained client requirements.

# New Site File Structure — Phase 1

**This is a clean rebuild, not a patch of the earlier Vercel preview.** The previous source code was not supplied, so the new design is self-contained and does not alter that deployment.

```text
trendy_tax_clean_site/
├── index.html                 Home
├── about.html                 About + gallery preview
├── services.html              Nine accounting/tax services
├── insights.html              Category-filterable insights
├── contact.html               Inquiry form, FAQ, address and booking
├── privacy.html               Interim preview privacy notice
├── insights/
│   ├── cash-flow.html          Example editorial article
│   ├── bookkeeping.html        Example editorial article
│   └── tax-readiness.html      Example editorial article
├── assets/
│   ├── css/style.css           Responsive design and animations
│   ├── js/main.js              Navigation, filtering, FAQ and forms
│   └── img/
│       ├── brand-mark.png      Client-provided logo symbol
│       ├── brand-logo.png      Full client-provided logo
│       └── team-portrait.jpg   Client-provided photograph
├── build_pages.py             Generates the pre-rendered HTML
├── vercel.json                Static Vercel configuration
├── README.md                  Local, Vercel and PHP hosting instructions
├── IMAGE-SOURCES.md           Photography provenance
└── FILES_AND_CHANGES.md       This inventory
```

### Visual Changes Relative To The Supplied Existing Preview
- Removed customer portal/login navigation and all customer dashboard elements.
- Replaced star/asterisk graphics, oversized text and crowded slogans with restrained editorial layouts.
- Used a consistent deep-navy, warm-ivory and muted-teal palette, with small use of client's multicolour logo.
- Used balanced text sizes, generous whitespace and title-case headings.
- Added subtle entrance, hover and navigation effects, honouring reduced-motion preferences.
- Included real photography served from Unsplash and a local client-provided portrait. No AI-created images.
- Preserved existing nine advertised services, Hobart contact details and the consultation booking link.
- Included a reserved About-page gallery with temporary editorial photos (not incorrectly described as the firm's office).
- Kept Insights as static sample articles without a database.
- Contact/newsletter preview forms validate and open correctly addressed email drafts, with explicit no-send disclosures.

### Outstanding Before Live Production
Backend sending/storage, newsletter service, privacy policy, article review, team biography, awards/membership verification, final image choices.
