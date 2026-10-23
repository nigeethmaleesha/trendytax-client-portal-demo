/* Trendy Tax Solutions · standalone frontend demo. No server connection or real authentication. */
(() => {
  'use strict';

  const DEMO_PROFILE = Object.freeze({ fullName: 'Alex Carter', email: 'alex.carter@example.com', phone: '+61 400 000 000', business: 'Carter & Co.' });
  const EMAIL = 'info@trendytaxsolutions.com.au';
  const SITE = 'https://trendytax-website.vercel.app/';
  const PROFILE_KEY = 'tts_demo_profile_v1';
  const SESSION_KEY = 'tts_demo_session_v1';
  const DB_NAME = 'tts_customer_portal_demo_v1';
  const MAX_FILE_BYTES = 10 * 1024 * 1024;
  const ALLOWED_EXT = new Set(['pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'txt']);

  const EXAMPLES = [
    { id: 'sample-4', name: 'Welcome_Pack.pdf', displayName: 'Welcome Pack', category: 'Other', uploaded: '2026-10-02T10:00:00', size: 2155, mime: 'application/pdf', url: 'assets/demo-documents/Welcome_Pack.pdf', source: 'sample' },
    { id: 'sample-3', name: 'Annual_Accounts_2025.pdf', displayName: 'Annual Accounts 2025', category: 'Statements', uploaded: '2026-09-18T10:00:00', size: 2180, mime: 'application/pdf', url: 'assets/demo-documents/Annual_Accounts_2025.pdf', source: 'sample' },
    { id: 'sample-2', name: 'Business_Activity_Statement.pdf', displayName: 'Business Activity Statement', category: 'Tax documents', uploaded: '2026-09-04T10:00:00', size: 2170, mime: 'application/pdf', url: 'assets/demo-documents/Business_Activity_Statement.pdf', source: 'sample' },
    { id: 'sample-1', name: '2025_Tax_Summary.pdf', displayName: '2025 Tax Summary', category: 'Tax documents', uploaded: '2026-08-12T10:00:00', size: 2165, mime: 'application/pdf', url: 'assets/demo-documents/2025_Tax_Summary.pdf', source: 'sample' }
  ];

  const iconPaths = {
    home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
    folder: '<path d="M3 7a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    logout: '<path d="M10 17l5-5-5-5M15 12H3"/><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
    arrowRight: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    download: '<path d="M12 3v12m-4-4 4 4 4-4M4 17v3h16v-3"/>',
    eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.5"/>',
    trash: '<path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M5 5l14 14M19 5 5 19"/>',
    shield: '<path d="m12 2 8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    file: '<path d="M5 3h9l5 5v13H5zM14 3v5h5M8 13h8M8 17h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 10h18"/>',
    upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 16v5h16v-5"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
    help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a3 3 0 1 1 4.7 2.5c-1.2.9-2.2 1.5-2.2 3M12 18h.01"/>',
    external: '<path d="M13 4h7v7M20 4l-9 9"/><path d="M20 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6"/>',
    sparkle: '<path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z"/>',
    building: '<rect x="4" y="5" width="16" height="16" rx="1"/><path d="M8 9h2m4 0h2M8 13h2m4 0h2M10 21v-4h4v4"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.01"/>',
    filePlus: '<path d="M5 3h9l5 5v13H5zM14 3v5h5M9 15h6m-3-3v6"/>',
    arrowUpRight: '<path d="M7 17 17 7M8 7h9v9"/>',
    layers: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 9h8M8 13h8M8 17h5"/>'
  };
  function icon(name, cls = '') {
    return `<svg class="icon ${cls}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.file}</svg>`;
  }
  function escapeHTML(v) {
    return String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  }
  function getStoredProfile() {
    try { return { ...DEMO_PROFILE, ...(JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}) }; }
    catch { return { ...DEMO_PROFILE }; }
  }
  const state = { profile: getStoredProfile(), docs: [], filter: 'All documents', query: '', sort: 'newest', uploadFile: null, deleteId: null, previewDoc: null, previewUrl: null, sidebarOpen: false, db: null, busy: false };
  const $ = selector => document.querySelector(selector);

  function openDB() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('Local document storage is not supported in this browser.'));
      const r = indexedDB.open(DB_NAME, 1);
      r.onupgradeneeded = () => { if (!r.result.objectStoreNames.contains('documents')) r.result.createObjectStore('documents', { keyPath: 'id' }); };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error || new Error('Unable to open local document storage.'));
    });
  }
  function dbRequest(mode, operation) {
    return new Promise((resolve, reject) => {
      if (!state.db) return reject(new Error('Local file storage unavailable. Try another browser or enable site data.'));
      const tx = state.db.transaction('documents', mode);
      let value;
      try { value = operation(tx.objectStore('documents')); } catch (e) { reject(e); return; }
      let result;
      if (value) { value.onsuccess = () => { result = value.result; }; value.onerror = () => reject(value.error); }
      tx.oncomplete = () => resolve(result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }
  async function loadDocs() { state.docs = (await dbRequest('readonly', store => store.getAll())) || []; }
  function allDocs() { return [...state.docs, ...EXAMPLES].sort((a, b) => new Date(b.uploaded) - new Date(a.uploaded)); }
  function getDoc(id) { return allDocs().find(d => d.id === id); }
  const dateFmt = d => new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(d));
  const sizeFmt = n => n < 1024 ? `${n} B` : n < 1048576 ? `${Math.max(1, Math.round(n / 1024))} KB` : `${(n / 1048576).toFixed(1)} MB`;
  const nameFirst = () => (state.profile.fullName || 'Alex').trim().split(/\s+/)[0];
  const initials = () => (state.profile.fullName || 'AC').trim().split(/\s+/).slice(0, 2).map(v => v[0] || '').join('').toUpperCase();
  const loggedIn = () => sessionStorage.getItem(SESSION_KEY) === 'demo' || localStorage.getItem(SESSION_KEY) === 'demo';
  const routeName = () => { const r = (location.hash.replace(/^#\/?/, '') || 'dashboard').split(/[?/]/)[0]; return ['dashboard', 'documents', 'profile', 'login'].includes(r) ? r : 'dashboard'; };
  const brand = (light = false) => `<div class="brand-mark ${light ? 'brand-light' : ''}"><img src="assets/img/brand-mark.png" alt="" width="42" height="35" /><div class="brand-wordmark"><strong>TrendyTax</strong><span>SOLUTIONS</span></div></div>`;

  function toast(message, kind = 'success') {
    const el = document.createElement('div');
    el.className = `toast ${kind}`;
    el.setAttribute('role', 'status');
    el.innerHTML = `${icon(kind === 'error' ? 'alert' : 'check')}<span>${escapeHTML(message)}</span>`;
    $('#toast-stack').append(el);
    setTimeout(() => { el.classList.add('leaving'); setTimeout(() => el.remove(), 240); }, 3800);
  }

  function loginView() {
    return `
      <div class="customer-signin" id="main">
        <section class="login-frame" aria-label="TrendyTax customer sign in">
          <div class="login-content-pane">
            <div class="login-top-mark">${brand()}</div>
            <div class="login-inner">
              <span class="login-kicker">Customer portal</span>
              <h1>Welcome back</h1>
              <p class="login-introduction">Sign in to access your documents and profile.</p>
              <form id="login-form" class="login-fields" novalidate>
                <div class="field-group">
                  <label for="login-email">Email address</label>
                  <input id="login-email" type="email" autocomplete="email" placeholder="name@example.com" />
                </div>
                <div class="field-group">
                  <label for="login-password">Password</label>
                  <div class="password-wrap">
                    <input id="login-password" type="password" autocomplete="current-password" placeholder="Enter your password" />
                    <button type="button" class="password-toggle" data-action="toggle-password" aria-label="Show password" aria-pressed="false">${icon('eye')}</button>
                  </div>
                </div>
                <div class="login-meta-row">
                  <label class="login-remember"><input type="checkbox" id="remember-me" /><span>Keep me signed in</span></label>
                  <span class="login-preview-note">Preview access</span>
                </div>
                <button class="button button-primary login-submit" type="submit">Sign in ${icon('arrowRight')}</button>
              </form>
            </div>
            <div class="login-copyright">© ${new Date().getFullYear()} TrendyTax Solutions</div>
          </div>
          <div class="login-art-pane" aria-hidden="true">
            <div class="login-art-card">
              <img src="assets/img/login-artwork.svg" alt="" />
            </div>
          </div>
        </section>
      </div>`;
  }


  const navItem = (key, label, ico, current) => `
    <a href="#/${key}" class="sidebar-link ${current === key ? 'active' : ''}" ${current === key ? 'aria-current="page"' : ''}>
      <span class="sidebar-link-icon">${icon(ico)}</span>
      <span>${label}</span>
    </a>`;

  function shell(current, content) {
    const title = { dashboard: 'Overview', documents: 'Documents', profile: 'My profile' }[current];
    return `
      <div class="portal-shell">
        <div class="mobile-scrim ${state.sidebarOpen ? 'visible' : ''}" data-action="close-sidebar"></div>

        <aside class="portal-sidebar ${state.sidebarOpen ? 'sidebar-open' : ''}" aria-label="Main navigation">
          <div class="sidebar-brand-block">${brand(true)}</div>
          <nav class="sidebar-nav">${navItem('dashboard', 'Overview', 'home', current)}${navItem('documents', 'Documents', 'folder', current)}${navItem('profile', 'My profile', 'user', current)}</nav>

          <div class="sidebar-support">
            <strong>Need help?</strong>
            <a href="mailto:${EMAIL}">Contact support ${icon('arrowUpRight')}</a>
            <a href="${SITE}" target="_blank" rel="noopener noreferrer">Open main site ${icon('arrowUpRight')}</a>
          </div>

          <button class="sidebar-logout" data-action="logout" type="button">${icon('logout')}<span>Sign out</span></button>
        </aside>

        <div class="portal-stage">
          <header class="portal-topbar">
            <div class="topbar-left">
              <button class="icon-button mobile-menu" aria-label="Open navigation" data-action="toggle-sidebar" aria-expanded="${state.sidebarOpen}" type="button">${icon('menu')}</button>
              <div class="topbar-breadcrumb"><span>Client portal</span>${icon('chevronRight')}<strong>${title}</strong></div>
            </div>
            <div class="topbar-actions">
              <a class="topbar-site-link" href="${SITE}" target="_blank" rel="noopener noreferrer">Main site ${icon('arrowUpRight')}</a>
              <a href="#/profile" class="topbar-user" title="View your profile">
                <span class="topbar-avatar">${escapeHTML(initials())}</span>
                <span class="topbar-user-meta"><strong>${escapeHTML(state.profile.fullName)}</strong><small>Client account</small></span>
              </a>
            </div>
          </header>

          <main id="main" class="portal-content">${content}</main>
        </div>
      </div>`;
  }

  function pageHead(kicker, title, desc, action = '') {
    return `
      <div class="page-head">
        <div>
          <span class="section-chip">${kicker}</span>
          <h1>${title}</h1>
          <p>${desc}</p>
        </div>
        ${action}
      </div>`;
  }

  const uploadButton = (label = 'Upload file') => `<button type="button" class="button button-primary" data-action="upload">${icon('plus')} ${label}</button>`;

  function docGlyph(doc, tiny = false) {
    const ext = (doc.name.split('.').pop() || '').toLowerCase();
    const type = ext === 'pdf' ? 'pdf' : ['jpg','jpeg','png'].includes(ext) ? 'img' : ['xls','xlsx'].includes(ext) ? 'sheet' : 'file';
    return `<span class="document-glyph ${type} ${tiny ? 'tiny' : ''}">${icon('file')}<small>${type === 'pdf' ? 'PDF' : type === 'img' ? 'IMG' : type === 'sheet' ? 'XLS' : ext.substring(0, 3).toUpperCase()}</small></span>`;
  }

  function docsRows(documents, compact = false) {
    if (!documents.length) {
      return `<div class="empty-state">${icon('folder')}<strong>No documents found</strong><p>${compact ? 'Your uploads will appear here.' : 'Try another search or filter.'}</p>${!compact ? '<button type="button" class="button button-muted" data-action="clear-filters">Clear filters</button>' : ''}</div>`;
    }
    return `
      <div class="document-list ${compact ? 'compact-list' : ''}">
        <div class="document-header"><span>Document</span><span>Category</span><span>Date</span><span>Actions</span></div>
        ${documents.map(doc => `
          <div class="document-row">
            <div class="doc-main">
              ${docGlyph(doc, compact)}
              <div class="doc-details">
                <strong title="${escapeHTML(doc.name)}">${escapeHTML(doc.displayName || doc.name)}</strong>
                <span>${doc.source === 'sample' ? 'Example file' : 'Your upload'} · ${sizeFmt(doc.size)}</span>
              </div>
            </div>
            <div class="doc-category"><span class="category-badge">${escapeHTML(doc.category)}</span></div>
            <div class="doc-date">${dateFmt(doc.uploaded)}</div>
            <div class="doc-actions">
              <button class="table-icon-button" type="button" aria-label="Preview ${escapeHTML(doc.name)}" title="Preview" data-action="preview" data-id="${escapeHTML(doc.id)}">${icon('eye')}</button>
              <button class="table-icon-button" type="button" aria-label="Download ${escapeHTML(doc.name)}" title="Download" data-action="download" data-id="${escapeHTML(doc.id)}">${icon('download')}</button>
              ${doc.source === 'local' ? `<button class="table-icon-button danger-on-hover" type="button" aria-label="Delete ${escapeHTML(doc.name)}" title="Delete" data-action="delete" data-id="${escapeHTML(doc.id)}">${icon('trash')}</button>` : ''}
            </div>
          </div>`).join('')}
      </div>`;
  }

  function dashboardView() {
    const docs = allDocs();
    const counts = {
      all: docs.length,
      uploaded: state.docs.length,
      category: new Set(docs.map(d => d.category)).size
    };
    const recent = docs.slice(0, 4);

    return `
      <div class="dashboard-page">
        <section class="hero-card">
          <div class="hero-copy">
            <span class="section-chip chip-ghost">Overview</span>
            <h1>Welcome back, ${escapeHTML(nameFirst())}</h1>
            <p>Everything important is organised here.</p>
          </div>
          <div class="hero-actions">
            <a href="#/documents" class="button button-light">View documents ${icon('arrowRight')}</a>
            <button type="button" data-action="upload" class="button button-ghost">${icon('plus')} Upload file</button>
          </div>
        </section>

        <div class="metric-row">
          <article class="metric-card">
            <span class="metric-icon">${icon('folder')}</span>
            <strong>${counts.all.toString().padStart(2,'0')}</strong>
            <small>Documents</small>
          </article>
          <article class="metric-card">
            <span class="metric-icon">${icon('upload')}</span>
            <strong>${counts.uploaded.toString().padStart(2,'0')}</strong>
            <small>Your uploads</small>
          </article>
          <article class="metric-card">
            <span class="metric-icon">${icon('layers')}</span>
            <strong>${counts.category.toString().padStart(2,'0')}</strong>
            <small>Categories</small>
          </article>
        </div>

        <div class="content-grid">
          <section class="surface-card recent-card">
            <div class="card-head">
              <div>
                <span class="section-chip">Recent files</span>
                <h2>Latest documents</h2>
              </div>
              <a href="#/documents" class="text-link">View all ${icon('arrowRight')}</a>
            </div>
            ${docsRows(recent, true)}
          </section>

          <aside class="side-stack">
            <section class="surface-card action-card">
              <div class="card-head compact-head">
                <div>
                  <span class="section-chip">Quick actions</span>
                  <h2>Shortcuts</h2>
                </div>
              </div>
              <button type="button" class="action-link" data-action="upload"><span>${icon('upload')}</span><div><strong>Upload file</strong><small>Add a document to this browser</small></div>${icon('arrowRight')}</button>
              <a href="#/profile" class="action-link"><span>${icon('user')}</span><div><strong>Update profile</strong><small>Review your contact details</small></div>${icon('arrowRight')}</a>
              <a href="${SITE}" target="_blank" rel="noopener noreferrer" class="action-link"><span>${icon('external')}</span><div><strong>Main website</strong><small>Open TrendyTax website</small></div>${icon('arrowRight')}</a>
            </section>

            <section class="surface-card note-card">
              <span class="section-chip">Portal note</span>
              <h2>Simple by design</h2>
              <p>This preview keeps the experience focused on documents and account details.</p>
            </section>
          </aside>
        </div>
      </div>`;
  }

  function filteredDocs() {
    let list = allDocs();
    if (state.filter !== 'All documents') list = list.filter(d => d.category === state.filter);
    const term = state.query.trim().toLowerCase();
    if (term) list = list.filter(d => `${d.displayName || ''} ${d.name} ${d.category}`.toLowerCase().includes(term));
    if (state.sort === 'oldest') list.sort((a, b) => new Date(a.uploaded) - new Date(b.uploaded));
    if (state.sort === 'name') list.sort((a, b) => (a.displayName || a.name).localeCompare(b.displayName || b.name));
    return list;
  }

  function documentsView() {
    const filters = ['All documents', 'Tax documents', 'Statements', 'Other'];
    const docs = filteredDocs();
    return `
      <div class="documents-page">
        ${pageHead('Document library', 'Your files', 'Search, preview and download documents.', uploadButton())}
        <section class="surface-card library-card">
          <div class="library-topbar">
            <div class="library-tabs" role="group" aria-label="Filter by category">
              ${filters.map(f => `<button type="button" class="tab-button ${state.filter === f ? 'selected' : ''}" data-action="filter" data-filter="${f}" aria-pressed="${state.filter === f}">${f}<span>${allDocs().filter(d => f === 'All documents' || d.category === f).length}</span></button>`).join('')}
            </div>
            <div class="library-mini-note">Example files are included for the preview.</div>
          </div>
          <div class="library-controls">
            <div class="search-field">${icon('search')}<input type="search" id="doc-search" placeholder="Search documents" value="${escapeHTML(state.query)}" aria-label="Search documents" autocomplete="off" /></div>
            <div class="sort-group"><label for="doc-sort">Sort by</label><select id="doc-sort"><option value="newest" ${state.sort === 'newest' ? 'selected' : ''}>Newest first</option><option value="oldest" ${state.sort === 'oldest' ? 'selected' : ''}>Oldest first</option><option value="name" ${state.sort === 'name' ? 'selected' : ''}>Name A–Z</option></select></div>
          </div>
          <div class="library-result-count">Showing ${docs.length} ${docs.length === 1 ? 'document' : 'documents'}</div>
          <div id="library-rows">${docsRows(docs)}</div>
        </section>
      </div>`;
  }

  function profileView() {
    const p = state.profile;
    return `
      <div class="profile-page">
        ${pageHead('Account', 'My profile', 'Keep your contact details current.')}
        <div class="profile-layout">
          <section class="surface-card profile-form-card">
            <div class="profile-card-head">
              <div class="profile-avatar-large">${escapeHTML(initials())}</div>
              <div>
                <h2>${escapeHTML(p.fullName)}</h2>
                <p>${escapeHTML(p.business || 'Client account')}</p>
              </div>
            </div>

            <form id="profile-form" class="profile-form">
              <div class="field-group">
                <label for="profile-name">Full name <span class="required">*</span></label>
                <input id="profile-name" name="fullName" type="text" maxlength="80" autocomplete="name" required value="${escapeHTML(p.fullName)}" />
              </div>
              <div class="field-group">
                <label for="profile-email">Email address <span class="required">*</span></label>
                <input id="profile-email" name="email" type="email" maxlength="150" autocomplete="email" required value="${escapeHTML(p.email)}" />
              </div>
              <div class="field-group">
                <label for="profile-phone">Phone number</label>
                <input id="profile-phone" name="phone" type="tel" maxlength="32" autocomplete="tel" value="${escapeHTML(p.phone)}" />
              </div>
              <div class="field-group">
                <label for="profile-business">Business / organisation</label>
                <input id="profile-business" name="business" type="text" maxlength="100" autocomplete="organization" value="${escapeHTML(p.business)}" />
              </div>
              <div class="profile-form-actions">
                <span class="save-note">${icon('shield')} Saved locally in this browser</span>
                <button type="submit" class="button button-primary">Save changes ${icon('arrowRight')}</button>
              </div>
            </form>
          </section>

          <aside class="profile-side-stack">
            <div class="surface-card mini-info-card">
              <span class="section-chip">Contact</span>
              <h3>Support</h3>
              <p>Need help with your account or documents?</p>
              <a href="mailto:${EMAIL}" class="text-link">Email support ${icon('arrowUpRight')}</a>
            </div>
            <div class="surface-card mini-info-card alt-card">
              <span class="section-chip">Website</span>
              <h3>View the main site</h3>
              <p>Open the public TrendyTax website in a new tab.</p>
              <a href="${SITE}" target="_blank" rel="noopener noreferrer" class="text-link">Open website ${icon('arrowUpRight')}</a>
            </div>
          </aside>
        </div>
      </div>`;
  }

  function render() {
    const app = $('#app');
    const route = routeName();
    if (!loggedIn()) {
      if (route !== 'login') { history.replaceState(null, '', '#/login'); }
      document.title = 'Sign in | TrendyTax Client Portal';
      app.innerHTML = loginView();
      state.sidebarOpen = false;
      return;
    }
    const active = route === 'login' ? 'dashboard' : route;
    const view = active === 'documents' ? documentsView() : active === 'profile' ? profileView() : dashboardView();
    document.title = ({ dashboard: 'Overview', documents: 'Documents', profile: 'My Profile' }[active]) + ' | TrendyTax Client Portal';
    app.innerHTML = shell(active, view);
  }
  function rerenderPreserveScroll() { const y = window.scrollY; render(); window.scrollTo(0, y); }
  function closeDialog(id) { const d = document.getElementById(id); if (d?.open) d.close(); if (id === 'preview-dialog') releasePreviewURL(); if (id === 'upload-dialog') resetUpload(); }
  function closeSidebar() { if (state.sidebarOpen) { state.sidebarOpen = false; rerenderPreserveScroll(); } }
  function openUpload() { resetUpload(); $('#upload-dialog').showModal(); }
  function resetUpload() {
    state.uploadFile = null;
    const el = $('#file-input');
    if (el) el.value = '';
    const title = $('#drop-title');
    if (title) title.textContent = 'Choose a file or drag it here';
    const help = $('#drop-help');
    if (help) help.textContent = 'PDF, Word, Excel, images or text · up to 10 MB';
    $('#drop-zone')?.classList.remove('chosen', 'is-dragging');
  }
  function selectFile(file) {
    if (!file) return;
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXT.has(ext)) { toast('File type not supported. Choose PDF, Office, image or text.', 'error'); return; }
    if (file.size > MAX_FILE_BYTES) { toast('This file is over the 10 MB limit.', 'error'); return; }
    if (file.size === 0) { toast('Choose a file that is not empty.', 'error'); return; }
    state.uploadFile = file;
    $('#drop-title').textContent = file.name;
    $('#drop-help').textContent = `${sizeFmt(file.size)} · Ready to add`;
    $('#drop-zone').classList.add('chosen');
  }
  function releasePreviewURL() { if (state.previewUrl) { URL.revokeObjectURL(state.previewUrl); state.previewUrl = null; } state.previewDoc = null; }
  async function fileURL(doc) {
    if (doc.source === 'sample') return doc.url;
    if (!doc.blob) throw new Error('Document content is unavailable.');
    return URL.createObjectURL(doc.blob);
  }
  async function previewDoc(doc) {
    releasePreviewURL();
    state.previewDoc = doc;
    const modal = $('#preview-dialog');
    $('#preview-dialog-title').textContent = doc.displayName || doc.name;
    const url = await fileURL(doc);
    if (doc.source === 'local') state.previewUrl = url;
    const ext = doc.name.split('.').pop().toLowerCase();
    const target = $('#preview-content');
    target.replaceChildren();
    if (ext === 'pdf') {
      const frame = document.createElement('iframe');
      frame.src = url;
      frame.title = `Preview of ${doc.name}`;
      frame.className = 'pdf-preview';
      target.append(frame);
    } else if (['jpg','jpeg','png'].includes(ext)) {
      const img = document.createElement('img');
      img.src = url;
      img.alt = `Preview of ${doc.name}`;
      img.className = 'image-preview';
      target.append(img);
    } else if (ext === 'txt' && doc.blob) {
      const text = await doc.blob.text();
      const pre = document.createElement('pre');
      pre.className = 'text-preview';
      pre.textContent = text.substring(0, 250000);
      target.append(pre);
    } else {
      const div = document.createElement('div');
      div.className = 'preview-unavailable';
      div.innerHTML = `${icon('file')}<strong>Preview not available for this file type</strong><p>You can download the document to open it on your device.</p>`;
      target.append(div);
    }
    modal.showModal();
  }
  function safeDownloadName(name) { return String(name).replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_') || 'document'; }
  async function downloadDoc(doc) {
    const url = await fileURL(doc);
    const a = document.createElement('a');
    a.href = url;
    a.download = safeDownloadName(doc.name);
    document.body.append(a);
    a.click();
    a.remove();
    if (doc.source === 'local') setTimeout(() => URL.revokeObjectURL(url), 30000);
    toast(`Downloading ${doc.displayName || doc.name}`);
  }
  async function handleAction(el) {
    const action = el.dataset.action;
    if (action === 'logout') { sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY); state.sidebarOpen = false; history.replaceState(null, '', '#/login'); render(); toast('Signed out of the preview.'); return; }
    if (action === 'toggle-sidebar') { state.sidebarOpen = !state.sidebarOpen; rerenderPreserveScroll(); return; }
    if (action === 'close-sidebar') { closeSidebar(); return; }
    if (action === 'toggle-password') {
      const input = $('#login-password');
      if (!input) return;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      el.setAttribute('aria-pressed', String(show));
      el.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      return;
    }
    if (action === 'upload') { openUpload(); return; }
    if (action === 'filter') { state.filter = el.dataset.filter; rerenderPreserveScroll(); return; }
    if (action === 'clear-filters') { state.filter = 'All documents'; state.query = ''; state.sort = 'newest'; rerenderPreserveScroll(); return; }
    const doc = el.dataset.id ? getDoc(el.dataset.id) : null;
    if (['preview','download','delete'].includes(action) && !doc) { toast('Document not found.', 'error'); return; }
    if (action === 'preview') { await previewDoc(doc); return; }
    if (action === 'download') { await downloadDoc(doc); return; }
    if (action === 'delete') {
      if (doc.source !== 'local') return;
      state.deleteId = doc.id;
      $('#delete-description').textContent = `“${doc.name}” will be removed from this browser. This cannot be undone.`;
      $('#delete-dialog').showModal();
    }
  }
  async function submitUpload() {
    if (state.busy) return;
    if (!state.uploadFile) { toast('Choose a file first.', 'error'); return; }
    if (!state.db) { toast('Local file storage is unavailable in this browser.', 'error'); return; }
    state.busy = true;
    const submit = $('#upload-submit');
    submit.disabled = true;
    submit.textContent = 'Adding…';
    try {
      const file = state.uploadFile;
      const doc = {
        id: (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random()),
        name: file.name,
        displayName: file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '),
        category: $('#document-category').value,
        uploaded: new Date().toISOString(),
        mime: file.type || 'application/octet-stream',
        size: file.size,
        source: 'local',
        blob: file
      };
      await dbRequest('readwrite', store => store.put(doc));
      await loadDocs();
      closeDialog('upload-dialog');
      render();
      toast('Document added to this browser.');
    } catch (e) {
      toast(e.message || 'Could not save this document. Browser storage may be full.', 'error');
    } finally {
      state.busy = false;
      submit.disabled = false;
      submit.textContent = 'Add document';
    }
  }
  async function confirmDelete() {
    if (!state.deleteId || state.busy) return;
    state.busy = true;
    try {
      await dbRequest('readwrite', store => store.delete(state.deleteId));
      await loadDocs();
      closeDialog('delete-dialog');
      state.deleteId = null;
      render();
      toast('Document removed.');
    } catch {
      toast('Unable to delete document.', 'error');
    } finally {
      state.busy = false;
    }
  }
  function submitProfile(form) {
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const next = {
      fullName: String(d.get('fullName') || '').trim(),
      email: String(d.get('email') || '').trim(),
      phone: String(d.get('phone') || '').trim(),
      business: String(d.get('business') || '').trim()
    };
    if (!next.fullName || !next.email) { toast('Name and email are required.', 'error'); return; }
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      state.profile = next;
      render();
      toast('Profile changes saved to this browser.');
    } catch {
      toast('Browser storage is unavailable. Changes could not be saved.', 'error');
    }
  }
  function globalEvents() {
    document.addEventListener('click', async e => {
      const close = e.target.closest('[data-close-dialog]');
      if (close) { closeDialog(close.dataset.closeDialog); return; }
      const el = e.target.closest('[data-action]');
      if (el) { e.preventDefault(); try { await handleAction(el); } catch (err) { console.error(err); toast('This action could not be completed.', 'error'); } }
      else if (state.sidebarOpen && e.target.closest('.sidebar-link')) { state.sidebarOpen = false; }
    });
    document.addEventListener('submit', e => {
      if (e.target.id === 'login-form') { e.preventDefault(); if ($('#remember-me')?.checked) { localStorage.setItem(SESSION_KEY, 'demo'); sessionStorage.removeItem(SESSION_KEY); } else { sessionStorage.setItem(SESSION_KEY, 'demo'); localStorage.removeItem(SESSION_KEY); } location.hash = '#/dashboard'; render(); toast('Welcome to your client portal.'); }
      if (e.target.id === 'profile-form') { e.preventDefault(); submitProfile(e.target); }
      if (e.target.id === 'upload-form') { e.preventDefault(); submitUpload(); }
    });
    document.addEventListener('input', e => {
      if (e.target.id === 'doc-search') {
        state.query = e.target.value;
        const listing = $('#library-rows');
        if (listing) {
          const docs = filteredDocs();
          listing.innerHTML = docsRows(docs);
          const count = $('.library-result-count');
          if (count) count.textContent = `Showing ${docs.length} ${docs.length === 1 ? 'document' : 'documents'}`;
        }
      }
    });
    document.addEventListener('change', e => {
      if (e.target.id === 'file-input') selectFile(e.target.files?.[0]);
      if (e.target.id === 'doc-sort') { state.sort = e.target.value; rerenderPreserveScroll(); }
    });
    $('#confirm-delete').addEventListener('click', confirmDelete);
    $('#preview-download').addEventListener('click', () => { if (state.previewDoc) downloadDoc(state.previewDoc).catch(() => toast('Unable to download file.', 'error')); });
    $('#drop-zone').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#file-input').click(); } });
    ['dragenter','dragover'].forEach(name => $('#drop-zone').addEventListener(name, e => { e.preventDefault(); $('#drop-zone').classList.add('is-dragging'); }));
    ['dragleave','drop'].forEach(name => $('#drop-zone').addEventListener(name, e => {
      e.preventDefault();
      $('#drop-zone').classList.remove('is-dragging');
      if (name === 'drop') selectFile(e.dataTransfer?.files?.[0]);
    }));
    for (const dialog of document.querySelectorAll('dialog')) {
      dialog.addEventListener('click', e => { if (e.target === dialog) closeDialog(dialog.id); });
      dialog.addEventListener('close', () => { if (dialog.id === 'preview-dialog') releasePreviewURL(); if (dialog.id === 'upload-dialog') resetUpload(); });
    }
    window.addEventListener('hashchange', () => { state.sidebarOpen = false; render(); window.scrollTo(0, 0); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape' && state.sidebarOpen) closeSidebar(); });
  }
  async function init() {
    globalEvents();
    try { state.db = await openDB(); await loadDocs(); }
    catch (e) { console.warn('Local document store is unavailable:', e); }
    render();
  }
  init();
})();
