(()=>{'use strict';
const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];
const key='tts_demo_portal_session', nameKey='tts_demo_portal_display_name';
const iconPaths={
'grid':'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
'file':'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
'user':'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
'help':'<circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><path d="M12 17h.01"/>',
'chevron':'<path d="m9 18 6-6-6-6"/>',
'arrow':'<path d="M5 12h14m-6-6 6 6-6 6"/>',
'arrow-up':'<path d="M7 17 17 7M7 7h10v10"/>',
'download':'<path d="M12 3v12m-4-4 4 4 4-4M4 17v4h16v-4"/>',
'upload':'<path d="M12 16V4m-4 4 4-4 4 4M4 17v4h16v-4"/>',
'search':'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
'check':'<path d="m4 12 5 5 11-11"/>',
'lock':'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
'logout':'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
'menu':'<path d="M3 6h18M3 12h18M3 18h18"/>',
'x':'<path d="M5 5l14 14M19 5 5 19"/>',
'bell':'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
'briefcase':'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 12h18"/>',
'mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18"/>',
'info':'<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
'plus':'<path d="M12 5v14M5 12h14"/>',
'shield':'<path d="M12 2 4 5v6c0 5 3.3 8.6 8 11 4.7-2.4 8-6 8-11V5z"/><path d="m9 12 2 2 4-4"/>',
'folder':'<path d="M3 6a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
'eye':'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
'filter':'<path d="M4 7h16M7 12h10M10 17h4"/>',
'paperclip':'<path d="m8 12 6-6a3 3 0 1 1 4 4l-8 8a5 5 0 0 1-7-7l9-9"/>',
'settings':'<circle cx="12" cy="12" r="3"/><path d="M4 12a8 8 0 0 1 16 0 8 8 0 0 1-16 0"/>'};
function icons(scope=document){$$('[data-icon]',scope).forEach(el=>{const n=el.dataset.icon;el.innerHTML=`<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[n]||iconPaths.file}</svg>`;el.removeAttribute('data-icon')})}
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const isAuth=()=>sessionStorage.getItem(key)==='1';
function goLogin(){window.location.replace('client-login.html')}
if(document.body.dataset.portalPage==='login'){
 if(isAuth()) {const a=$('[data-already-signed-in]'); if(a) a.hidden=false}
 const form=$('#demo-login-form');form?.addEventListener('submit',e=>{e.preventDefault();sessionStorage.setItem(key,'1');window.location.href='client-portal.html#dashboard'});
 icons();return;
}
if(document.body.dataset.portalPage!=='portal')return;
if(!isAuth()){goLogin();return}
const docs=[
 {id:'TX-01',name:'Individual tax return checklist',kind:'Tax',updated:'12 Oct 2026',status:'Ready to view',type:'Checklist',owner:'From Trendy Tax'},
 {id:'BS-02',name:'BAS preparation guide',kind:'Business',updated:'09 Oct 2026',status:'Ready to view',type:'Guide',owner:'From Trendy Tax'},
 {id:'ST-03',name:'Getting started with our portal',kind:'Shared',updated:'06 Oct 2026',status:'Ready to view',type:'Welcome guide',owner:'From Trendy Tax'},
 {id:'TX-04',name:'Tax document request',kind:'Tax',updated:'04 Oct 2026',status:'Awaiting action',type:'Request',owner:'Action for you'},
 {id:'BS-05',name:'Business records checklist',kind:'Business',updated:'01 Oct 2026',status:'Awaiting action',type:'Checklist',owner:'Action for you'},
 {id:'SH-06',name:'Our document handling process',kind:'Shared',updated:'28 Sep 2026',status:'Ready to view',type:'Guide',owner:'From Trendy Tax'}
];
let requests=[{id:'REQ-102',subject:'Tax documents checklist',type:'Tax & compliance',status:'In review',date:'12 Oct 2026'},{id:'REQ-101',subject:'Getting started',type:'General enquiry',status:'Completed',date:'09 Oct 2026'}];
let activity=[{icon:'file',title:'A sample checklist is ready to view',note:'12 Oct 2026 · Document portal'},{icon:'briefcase',title:'Example request marked in review',note:'12 Oct 2026 · Requests'},{icon:'check',title:'Welcome guide added',note:'06 Oct 2026 · Document portal'}];
const pageNames={dashboard:['Overview','A clearer view of your accounting'],documents:['Documents','Everything in one organised place'],requests:['Requests','Keep track of the conversations that matter'],activity:['Activity','Your example account timeline'],profile:['My profile','Your details and preferences'],help:['Help & support','We are here when you need us']};
const displayName=()=>sessionStorage.getItem(nameKey)||'Alex';
const greet=()=>{const n=displayName();$$('[data-person-name]').forEach(e=>e.textContent=n);$$('[data-avatar-letter]').forEach(e=>e.textContent=n.charAt(0).toUpperCase())};
const openModal=(id)=>{const e=document.getElementById(id);if(e){e.hidden=false;document.body.classList.add('portal-modal-open');e.querySelector('[data-modal-initial]')?.focus()}};
const closeModal=()=>{$$('.portal-modal').forEach(m=>m.hidden=true);document.body.classList.remove('portal-modal-open')};
function notice(msg){const n=$('#portal-toast');n.textContent=msg;n.hidden=false;window.clearTimeout(notice.timer);notice.timer=window.setTimeout(()=>n.hidden=true,3600)}
function renderDocs(){const q=($('#document-search')?.value||'').trim().toLowerCase(), filter=$('[data-filter].selected')?.dataset.filter||'All';const items=docs.filter(d=>(filter==='All'||d.kind===filter) && (d.name+' '+d.kind+' '+d.type).toLowerCase().includes(q));let body=$('#doc-rows');if(!body)return;body.innerHTML=items.map(d=>`<tr><td><div class="portal-doc-title"><span class="doc-file-mark"><span data-icon="file"></span></span><div><strong>${esc(d.name)}</strong><small>${esc(d.id)} · ${esc(d.type)}</small></div></div></td><td class="doc-category">${esc(d.kind)}</td><td class="doc-date">${esc(d.updated)}</td><td><span class="doc-status ${d.status==='Awaiting action'?'pending':'ready'}">${esc(d.status)}</span></td><td class="doc-actions"><button class="icon-action" type="button" data-preview="${esc(d.id)}" aria-label="View ${esc(d.name)}"><span data-icon="eye"></span></button></td></tr>`).join('')||'<tr><td colspan="5" class="empty-state">No matching sample documents. Try a different search.</td></tr>';icons(body);$('#doc-count').textContent=items.length+' sample items';}
function renderRequests(){const el=$('#request-items');if(!el)return;el.innerHTML=requests.map(r=>`<div class="request-entry"><div class="request-entry-icon"><span data-icon="mail"></span></div><div class="request-entry-copy"><strong>${esc(r.subject)}</strong><span>${esc(r.type)} · ${esc(r.date)}</span></div><span class="request-state">${esc(r.status)}</span><span data-icon="chevron" class="request-arrow"></span></div>`).join('');icons(el)}
function renderActivity(){const el=$('#full-activity');if(!el)return;el.innerHTML=activity.map(a=>`<div class="timeline-item"><span class="timeline-icon" data-icon="${a.icon}"></span><div><strong>${esc(a.title)}</strong><p>${esc(a.note)}</p></div></div>`).join('');icons(el)}
function setPage(page){if(!pageNames[page])page='dashboard';$$('.portal-panel').forEach(e=>e.hidden=e.dataset.page!==page);$$('[data-nav-page]').forEach(e=>{const selected=e.dataset.navPage===page;e.classList.toggle('active',selected);if(selected)e.setAttribute('aria-current','page');else e.removeAttribute('aria-current')});$('#page-title').textContent=pageNames[page][0];$('#page-description').textContent=pageNames[page][1];$('#portal-sidebar').classList.remove('open');$('#portal-backdrop').hidden=true;$('#menu-button').setAttribute('aria-expanded','false');document.title=pageNames[page][0]+' | Client Portal · Trendy Tax Solutions';if(page==='documents')renderDocs();if(page==='requests')renderRequests();if(page==='activity')renderActivity();window.scrollTo({top:0,behavior:'instant'});}
window.addEventListener('hashchange',()=>setPage(location.hash.substring(1)));
$('#menu-button')?.addEventListener('click',()=>{const open=$('#portal-sidebar').classList.toggle('open');$('#portal-backdrop').hidden=!open;$('#menu-button').setAttribute('aria-expanded',String(open))});
$('#portal-backdrop')?.addEventListener('click',()=>{$('#portal-sidebar').classList.remove('open');$('#portal-backdrop').hidden=true;$('#menu-button').setAttribute('aria-expanded','false')});
$$('[data-logout]').forEach(b=>b.addEventListener('click',()=>{sessionStorage.removeItem(key);sessionStorage.removeItem(nameKey);window.location.href='client-login.html'}));
$$('[data-open-modal]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.openModal)));
$$('[data-close-modal]').forEach(b=>b.addEventListener('click',closeModal));
$$('.portal-modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal()}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('#document-search')?.addEventListener('input',renderDocs);
$$('[data-filter]').forEach(b=>b.addEventListener('click',()=>{$$('[data-filter]').forEach(x=>{x.classList.remove('selected');x.setAttribute('aria-pressed','false')});b.classList.add('selected');b.setAttribute('aria-pressed','true');renderDocs()}));
document.addEventListener('click',e=>{const b=e.target.closest('[data-preview]');if(b){const d=docs.find(x=>x.id===b.dataset.preview);if(!d)return;$('#preview-title').textContent=d.name;$('#preview-meta').textContent=d.kind+' · '+d.type+' · '+d.updated;$('#preview-description').textContent=d.status==='Awaiting action'?'This sample item illustrates how a client would see a pending document request. No actual file or client data is present.':'This is a demonstration document entry. A live portal would provide an authenticated, authorised download or in-browser preview.';$('#sample-download').dataset.sampleName=d.name;openModal('preview-modal')}});
$('#sample-download')?.addEventListener('click',e=>{const label=e.currentTarget.dataset.sampleName||'Example document';const blob=new Blob(['Trendy Tax Solutions — SAMPLE ONLY\n\n'+label+'\n\nDemonstration content; not an actual client record, tax form, or professional advice.\n'],{type:'text/plain'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='trendy-tax-sample-document.txt';a.click();URL.revokeObjectURL(url);notice('Downloaded a non-sensitive sample text file.')});
const drop=$('#upload-dropzone'),file=$('#upload-file'),selected=$('#selected-file');function handleFile(f){if(!f)return;selected.textContent=f.name+' selected for preview only — not transmitted or saved.';selected.hidden=false;notice('File name shown locally. No upload has taken place.');}file?.addEventListener('change',()=>handleFile(file.files?.[0]));drop?.addEventListener('dragover',e=>{e.preventDefault();drop.classList.add('dragging')});drop?.addEventListener('dragleave',()=>drop.classList.remove('dragging'));drop?.addEventListener('drop',e=>{e.preventDefault();drop.classList.remove('dragging');handleFile(e.dataTransfer?.files?.[0])});
$('#demo-request-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget,fd=new FormData(form),subject=String(fd.get('subject')||'').trim().slice(0,75),type=String(fd.get('type')||'General enquiry');if(!subject){notice('Please add a brief subject.');return}requests.unshift({id:'REQ-DEMO',subject,type,status:'Draft · demo only',date:'This session'});activity.unshift({icon:'mail',title:'Demo request draft created: '+subject,note:'This session · Not sent to the firm'});form.reset();closeModal();renderRequests();notice('Demo request added locally. It was not sent.');location.hash='requests'});
$('#profile-form')?.addEventListener('submit',e=>{e.preventDefault();const value=$('#display-name').value.trim().replace(/\s+/g,' ').slice(0,40);if(!value)return;sessionStorage.setItem(nameKey,value);greet();notice('Demo display name updated for this browser tab.')});
$('#display-name').value=displayName();
$('#notifications-button')?.addEventListener('click',()=>openModal('notifications-modal'));
$$('[data-switch-page]').forEach(el=>el.addEventListener('click',()=>{location.hash=el.dataset.switchPage}));
renderDocs();renderRequests();renderActivity();greet();icons();setPage(location.hash.slice(1)||'dashboard');
})();
