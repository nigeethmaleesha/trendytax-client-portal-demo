# Trendy Tax Solutions — Reference-led rebuild

A complete rebuild of the Trendy Tax Solutions static website based on the **visual layout language** of the Accountaxpert Global Accounting Website Dribbble example (Flowmarc Creative): light sage canvas, dark navy services, green action elements, sharply structured small typography, dashboard-led hero and an editorial conversion funnel. All copy, photograph selections, contact information, and service information are tailored for Trendy Tax Solutions, not copied from Accountaxpert.

## Preview and deploy

Open `index.html`, or use `python -m http.server 8000` and visit `http://localhost:8000`. The entire folder can be deployed as a static Vercel project with output directory `.` or uploaded unchanged into a normal PHP web host's `public_html` directory; PHP is not required for these static pages.

## Client details retained

- Business: Trendy Tax Solutions, Hobart, Tasmania.
- Address: 162 Macquarie Street, Hobart TAS 7000.
- Phone: 1300 968 554.
- Email: info@trendytaxsolutions.com.au.
- Booking link: https://www.trendytaxsolutions.com.au/book-online.
- All 9 existing services and 3 editorial draft articles.
- All 5 supplied client photographs in an auto-advancing, pauseable About Us gallery, plus their existing supplied team portrait.
- 11 static HTML pages including client sign-in and portal: Home, About, Services, Insights, Contact, Privacy, 3 Insights article pages.

## Honest limitations

- The illustrative finance dashboard is design-only and **explicitly labelled as sample data**. The numbers are not claimed to be actual client metrics.
- Contact enquiries open an email draft; no backend/SMTP service is provided. A real email submission service must be configured prior to launch.
- The privacy policy is a review placeholder, not a final legal policy.
- The three Insights articles are marked as editorial previews awaiting approval, not published official tax advice.
- Editorial images are remotely loaded from Unsplash; supplied client gallery images are bundled and local.
- This design is an independent interpretation of reference composition, not a literal clone of the reference creator's proprietary artwork/code.

## File groups

- `build_pages.py`: editable content source and generator (run after editing).
- `assets/css/style.css`: fully replaced design system and page styles.
- `assets/css/gallery.css`: new gallery design.
- `assets/js/main.js`: nav, filters, accordion and contact form.
- `assets/js/gallery.js`: accessible gallery carousel.
- `assets/img/`: preserved local client-provided photographs and logo assets.


## Phase 2: Customer Portal Design Preview

Open **`client-login.html`**, then click **Enter Demo Portal** (no credentials). Explore Overview, My Documents, Requests, Activity, My Profile and Help & Support. Refer to **`PORTAL_REVIEW_NOTES.md`** for demonstration scope, caveats, production requirements and dual-host deployment instructions. Navigation links have been added throughout the existing public website, and the original site generation script preserves them.
