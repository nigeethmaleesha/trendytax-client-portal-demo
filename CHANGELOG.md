# Changed / Updated / Added Files

This edition is a genuine page-layout rebuild following the reference site's design language, not a recolour of the earlier release.

## Updated / Rebuilt
- `index.html`: brand-new hero with illustrative finance dashboard, audience cards, dark navy nine-service block, problem/approach sections, local support, original visual article tiles, questions, conversion section.
- `about.html`: new story layout, mission/vision/values, redesigned five-photo client gallery.
- `services.html`: redesigned grid preserving all nine client services.
- `insights.html`: redesigned editorial list and working category filters.
- `contact.html`: redesigned contact and form layout preserving booking and contact details.
- `privacy.html`: preview-specific privacy notice (requires client approval).
- `insights/cash-flow.html`, `insights/bookkeeping.html`, `insights/tax-readiness.html`: upgraded to consistent editorial article templates.
- `assets/css/style.css`: full replacement of visual design, responsive layouts and locally rendered graphical elements.
- `assets/js/main.js`: retained/refined responsive navigation, FAQs, filtering, form handling.
- `build_pages.py`: rebuilt static site generator with all source content.
- `vercel.json`: static hosting and basic response headers.

## New
- `assets/css/gallery.css`: reference-style responsive image gallery.
- `assets/js/gallery.js`: autoplay gallery with pause, navigation, thumbnails and reduced-motion handling.
- `README.md`, `CHANGELOG.md`: deployment instructions, scope, limitations and file record.

## Unchanged / Preserved
- `assets/img/about-gallery/*.jpg`: all five supplied original photos.
- `assets/img/team-portrait.jpg`: the original professional portrait.
- `assets/img/brand-logo.png` and `assets/img/brand-mark.png`: source branding imagery (retained in assets; favicon uses the mark; typography-led navigation follows the visual reference).

## Important before production
- The dashboard shows **illustrative example amounts**, not real client business data.
- Contact form uses a mailto draft, not backend delivery.
- Privacy policy requires approved legal text; article drafts also need approval.
- The booking URL points at the original client's booking path.
- The website is static HTML/CSS/JavaScript and works from Vercel and PHP-based hosts.
