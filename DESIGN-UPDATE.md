# Design update — October 2026

## Direction
The client-requested redesign uses the **Accountaxpert** Dribbble concept as a visual reference, not as a copied template. The revised design introduces a deep forest-green and sage palette, purposeful real photography, compact service pathways, calmer typography, quiet section rhythm, and clearer calls to action. No third-party website's branding, copy, or fabricated social proof has been reproduced.

Reference: https://dribbble.com/shots/27563533-Accountaxpert-Global-Accounting-Website

## Preserved from the supplied project
- All **nine service categories** and their descriptions.
- Hobart contact details: **162 Macquarie Street, Hobart TAS 7000**, **1300 968 554**, **info@trendytaxsolutions.com.au**.
- The existing consultation link (`https://www.trendytaxsolutions.com.au/book-online`).
- About Us story, values, vision, mission, and five client-supplied event/award photos with working slideshow and thumbnail controls.
- Insights pages and filters, article previews, contact form, FAQs, newsletter preview, and privacy information page.
- Mobile navigation, accessible interactive controls, and compatibility with static Vercel hosting or a PHP-capable web server.

## Design and code files changed
- `assets/css/style.css`: complete responsive visual redesign across all pages.
- `assets/css/about-gallery.css`: new gallery treatment compatible with the revised visual system.
- `build_pages.py`: redesigned homepage and call to action while retaining all nine services and firm details.
- `index.html`, `about.html`, `services.html`, `insights.html`, `contact.html`, `privacy.html`, and `insights/*.html`: regenerated to include shared design refinements.

## Important production notes
- The site is a **static HTML/CSS/JavaScript website**. No PHP runtime is needed to display it, so it can be uploaded to a PHP-based host as static files.
- Enquiry and newsletter forms **prepare an email in the visitor's email application**; they **do not automatically submit** to a server or database. Automated delivery must be integrated after client sign-off.
- The existing privacy page and Insights articles are design-stage materials awaiting client review.
- Some editorial/workspace photography remains hosted on Unsplash. Homepage hero, story, and practice portrait now use **actual photos provided with this project**, rather than remotely loaded illustrative images.
- Confirm event photo usage rights, team titles, and claims before production publication.
