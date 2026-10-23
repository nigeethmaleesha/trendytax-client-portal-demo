# Trendy Tax Solutions — Customer Portal (Frontend Preview)

Independent static frontend for the Australian accounting firm's customer portal, designed to match the existing Trendy Tax Solutions website.

## Getting started

Open with a static web server (recommended, rather than directly opening `index.html` as a file):

```sh
# From this folder
python -m http.server 8000
# Visit http://localhost:8000/
```

No Node.js build, npm install, PHP runtime, API keys or database connection are required for this preview.

## Using the portal

1. Select **Sign in**. No email/password is required for the demonstration. Tick **Keep me signed in** to retain your preview session across browser restarts until sign out.
2. View the dashboard, sample documents, and profile.
3. Upload a test file (max 10 MB; PDF, Word, Excel, PNG/JPG or TXT), choose a category and select **Add document**.
4. Use category filters, search, sorting, preview and download. Uploaded files can also be deleted.
5. Edit profile details and select **Save changes**. The profile is saved in this browser.
6. Select **Sign out** to return to the sign-in screen.

**Data behavior:** profile entries are kept in `localStorage`; uploaded files are kept locally in browser `IndexedDB`; the demonstration sign-in uses `sessionStorage` by default, or `localStorage` when **Keep me signed in** is selected. Browser privacy modes/storage restrictions may prevent saving uploads. Data is *not* synced across devices. If browser site data is cleared, uploaded files and profile edits are lost.

**Important security limitation:** There is no server-side authentication, permission system, backend, database or secure cloud document storage in this preview. The login UI is for demonstration only. **Do not use this build for real client accounts, financial documents or personal data.** Production must integrate a PHP backend with real authentication, access control, encrypted transport, secure file upload and appropriate Australian data protection practices.

## Deployment

### Vercel preview

- Create a new Vercel project from a **separate repository** containing the root files of this folder.
- Framework preset: **Other** (plain static site).
- Root directory: `./` (or this folder when uploading into a larger repository).
- Build command: **none**; output directory: **leave default**.
- The included `vercel.json` adds `X-Robots-Tag: noindex, nofollow, noarchive` to responses.

### PHP/Apache hosting (later)

- Upload the same root files into a dedicated public directory, such as `public_html/portal/`.
- No `.php` files, API, database, special rewrite rules or node runtime are required to display the preview.
- All CSS, JS, images and example files use relative URLs. Navigation uses URL hashes (`#/documents`, etc.) so it works on basic PHP hosting without server rewrites.
- Ensure HTTPS, prevent directory indexing and use a separate preview access restriction if demonstrating with nonpublic information. `robots.txt` and `noindex` are **not** access controls.
- The frontend can later be wired to a PHP API; replace the `sessionStorage` demo login, local profile persistence and IndexedDB document store with authenticated endpoints. Do not enable live customer use until then.

## Folder structure

```text
TrendyTax_Customer_Portal/
├── index.html                 # App entry, accessible dialogs and sign-in
├── robots.txt                 # Discourages indexing
├── vercel.json                # Preview deployment configuration
├── README.md
└── assets/
    ├── app.js                # Client-side routing and demo interactions
    ├── styles.css            # Responsive styling
    ├── img/brand-mark.png     # Brand mark from existing project
    ├── img/login-artwork.svg  # Original decorative login illustration
    └── demo-documents/       # Four completely fictional sample PDFs
```

## Scope

Included: redesigned image and form split login (no external links), persistent preview option, password visibility toggle, dashboard, profile editor, document browsing/filtering/searching/sorting, example file preview/download, local file upload/preview/download/delete, sign-out, mobile navigation and responsive layouts.

Not included: actual authentication, real user accounts, remote uploads, backend services, notifications, billing, admin console, approval processes or tasks. The proposal's core customer-facing portal requirements are represented without extending into unconfirmed modules.

## Contact details

The authenticated portal links to the existing main website at `https://trendytax-website.vercel.app/`. The sign-in screen deliberately contains no external website links. Contact email and website URLs can be updated in `assets/app.js` if needed.
