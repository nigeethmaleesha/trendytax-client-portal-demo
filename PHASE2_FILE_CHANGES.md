# Phase 2 – Files Added or Updated (Version A)

## Added
- `client-login.html` – demo login (no credentials required)
- `client-portal.html` – responsive dashboard, documents, requests, activity, profile, help
- `assets/css/client-portal.css` – self-contained portal design (version-specific theme)
- `assets/js/client-portal.js` – local-only demo interactions and session gating
- `.htaccess` – Apache preview headers
- `PORTAL_REVIEW_NOTES.md` – client scope and security warnings
- `DEPLOYMENT_GUIDE.md` – independent Git/Vercel/PHP hosting instructions
- `PHASE2_FILE_CHANGES.md` – this change manifest

## Updated
- `index.html`, `about.html`, `services.html`, `insights.html`, `contact.html`, `privacy.html`
- `insights/cash-flow.html`, `insights/bookkeeping.html`, `insights/tax-readiness.html`
- `assets/css/style.css` (public site portal-link styling only)
- `build_pages.py` (retains portal navigation after static regeneration)
- `vercel.json` (noindex and no-store for preview pages)
- `README.md` (portal notes and corrected description)

## Unchanged
- Original public site scripts and underlying service content
- The supplied brand images, team photography and gallery components
- Original contact and newsletter behaviour

## Note
All new sample dashboard/activity/document records are illustrative. No real authentication, database, email sending or file submission is present.
