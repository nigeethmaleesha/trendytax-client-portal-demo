# Deployment – Version A

**Repository name to use:** `trendytax-client-portal-concept-a`

## 1. Try the design

Start a local server from this folder:

```sh
python -m http.server 8000
```

Open `http://localhost:8000/client-login.html`. Click **Enter Demo Portal**; the sign-in intentionally skips credentials. The public home page is `http://localhost:8000/index.html`.

## 2. Create a separate GitHub repository

This ZIP contains an initial Git repository and commit. Create an **empty**, preferably private repository with the exact name above on your own GitHub account. After extracting, open a terminal in this folder and run:

```sh
git remote add origin https://github.com/YOUR-USERNAME/trendytax-client-portal-concept-a.git
git push -u origin main
```

Replace `YOUR-USERNAME` with the correct GitHub username or organisation. Do not paste access tokens in messages or commit `.env` secrets.

## 3. Deploy on Vercel

1. From the Vercel Dashboard, select **Add New > Project**.
2. Import the new Git repository `trendytax-client-portal-concept-a`.
3. Framework Preset: **Other** (static site).
4. Build Command: **none**; Output Directory: **leave blank** (project root); Root Directory: `./` (default).
5. Deploy. Vercel will generate a URL for this new project. Do not alter the two existing public deployments until the client approves the design.

You can also use the Vercel CLI in the project directory: `vercel` to initialise a preview deployment. The official `vercel.json` is included.

## 4. Move to a PHP-based host later

Upload the same website contents into the PHP host's public directory (normally `public_html`). The client portal is built using ordinary HTML/CSS/JavaScript, so it does not require PHP or a database at this stage. Keep the `assets/` and `insights/` directories intact; links are relative. An optional `.htaccess` provides non-indexing headers on Apache.

## Read before a real customer launch

`PORTAL_REVIEW_NOTES.md` describes the demo-only behaviour, **lack of real security**, and the production integrations required before actual client data can be handled. No real documents should be uploaded or stored in this prototype.
