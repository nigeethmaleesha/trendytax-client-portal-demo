# Trendy Tax Solutions – Customer Portal (Version A)

## What is included
This is a standalone static design prototype integrated into **all existing public pages**. It matches the visual identity of website version A and runs on Vercel static hosting as well as a conventional Apache/PHP hosting account (no PHP runtime needed).

### Directly supported by the client proposal
- Customer login → `client-login.html`
- Customer profile → `client-portal.html#profile`
- Customer document portal → `client-portal.html#documents`

### Suggested design features, **not requirements stated in the proposal**
- Dashboard overview and example attention items
- Filterable, searchable sample document list and sample document preview
- Example upload file-name picker (files **never** leave the browser)
- Proposed request tracking + local-only request drafts
- Example activity timeline, notification preview, support and FAQ
- Temporary display-name editing (sessionStorage for this tab only)

## Demo credentials
Click **Enter Demo Portal**. Email and password are disabled; no credentials are checked.
- Opening a portal page without a demo session redirects to the sign-in page. This **is not authentication or access control**.
- Sign Out clears the browser tab's demo session.
- All list items, document dates, request statuses, notices and dashboard counts are **illustrative**, not firm or client records.
- No database, production login, real API, upload endpoint, email notification, file storage, or real document delivery is implemented.
- A selected file's **name** is shown only in the browser; contents are not read, uploaded or persisted.
- A draft request is saved in page memory for the current page session, not sent to Trendy Tax Solutions.
- Sample downloads contain generated nonsensitive text, not client files.
- Portal HTML includes noindex meta tags and Vercel/Apache headers; that does not make it secure or private.

## Launch after client approval (mandatory before real use)
1. Agree the precise user roles, request workflows, document categories and approval rules with the firm.
2. Implement server-side authentication, account recovery, MFA and rate limiting; no credential bypass.
3. Add authorisation on **every** data and file endpoint, with tenancy separation and audit logging.
4. Encrypt stored files, scan uploads, validate size/type, support signed protected downloads and retention/deletion policies.
5. Connect secure request/notification APIs, a database and appropriate backups.
6. Review Australian Privacy Act 1988 requirements, privacy documents, hosting/storage location, incident response and firm consent.
7. Remove demonstration wording/data, have the client sign off on content and test before real clients are invited.

## Open locally
`python -m http.server 8000` then open `http://localhost:8000/client-login.html`. Double-click HTML may work, but local HTTP provides more reliable testing.

## Deploy
**Vercel:** Import this folder as an independent project using the "Other" framework, no install command, no build command, output directory root (`.`); or deploy through the Vercel CLI. `vercel.json` is included.
**PHP hosting:** Upload all contents of this folder into the desired public document root (e.g. `public_html/`). Keep `assets/`, `insights/` and HTML files in the same relative structure. No Node or database services are required. `.htaccess` supplies optional Apache headers.

## Reference document
`Accounting Firm – Australia- dev (1)(3).pdf`, section 2, specifically Customer login, Customer profile and Customer document portal. The proposal does **not** define more detailed customer processes.
