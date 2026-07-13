'use strict';
const PEXELS_KEY = '1OzprTAbWQCPVn9OoF02cSelNJetTLGwYjF6wR186DB4sDCgUZSJ2Qg3';

// Flat glyph icons for video controls — no circular button chrome, just the glyph with a
// drop-shadow for contrast against varying video content.
const ICON_PLAY  = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.55))"><path d="M6 4l14 8-14 8V4z"/></svg>';
const ICON_PAUSE = '<svg width="15" height="15" viewBox="0 0 24 24" fill="#fff" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.55))"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>';
const ICON_VOL   = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.55))"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16.5 8.5a5 5 0 010 7" stroke="#fff" stroke-width="1.8" fill="none" stroke-linecap="round"/></svg>';
const ICON_MUTE  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="#fff" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,.55))"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 9l5 6M21 9l-5 6" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/></svg>';
function vcOverlay() {
  return `<div class="vc-overlay"><button class="vc-btn pp">${ICON_PAUSE}</button><button class="vc-btn mu">${ICON_VOL}</button></div>`;
}

// ── DATA ──────────────────────────────────────────────────────────────────────
const UNITS = {
  '970x250':{
    label:'BILLBOARD', name:'970×250', breadcrumb:'970 × 250',
    desc:'Full-width in-content native, display and video formats.',
    dimensions:'970×250', placement:'In-content / top of page',
    videoQuery:'business finance',
    blurbs:[
      'Reaches highly engaged readers mid-content, where attention is highest and native formats perform best.',
      'Supports native, display, video and canvas - one placement, full format flexibility across any campaign type.',
      'Full-width visibility ensures maximum brand impact without disrupting the editorial flow of the page.'
    ],
    formats:{
      'Native':[
        {src:'assets/Screenshots/970x250/Native-1.png', caption:'Editorial card layout'},
        {src:'assets/Screenshots/970x250/Native-2.png', caption:'Image-led native'},
        {src:'assets/Screenshots/970x250/Native-3.png', caption:'Multi-slot display'},
        {src:'assets/Screenshots/970x250/Native-4.png', caption:'Content feed style'},
        {src:'assets/Screenshots/970x250/Native-5.png', caption:'Dark editorial format'},
      ],
      'Display': [{src:'assets/Screenshots/970x250/Display-1.png', caption:'Clean display banner'}],
      'Canvas':  [{src:'assets/Screenshots/970x250/canvas-1.png',  caption:'Branded canvas format'}],
      'Video':   [{type:'video', caption:'Autoplay video unit'}],
    }
  },
  '300x600':{
    label:'HALF PAGE', name:'300×600', breadcrumb:'300 × 600',
    desc:'Right rail premium content feed including native, video and display formats.',
    dimensions:'300×600', placement:'Right rail',
    videoQuery:'office team',
    blurbs:[
      'Premium right rail real estate that holds attention longer than standard display - readers scroll past, units stay in view.',
      'Accommodates native, video, display, canvas and gift guide formats - ideal for both brand awareness and direct response.',
      'Consistent right-side placement builds familiarity and trust, driving higher engagement over the course of a session.'
    ],
    formats:{
      'Native':[
        {src:'assets/Screenshots/300x600/Native-1.png', caption:'Editorial card layout'},
        {src:'assets/Screenshots/300x600/Native-2.png', caption:'Image-led native'},
        {src:'assets/Screenshots/300x600/Native-3.png', caption:'List feed style'},
        {src:'assets/Screenshots/300x600/Native-4.png', caption:'Multi-card feed'},
        {src:'assets/Screenshots/300x600/Native-5.png', caption:'Compact native list'},
        {src:'assets/Screenshots/300x600/Native-6.png', caption:'Dark native format'},
      ],
      'Display':[
        {src:'assets/Screenshots/300x600/Display-1.webp',          caption:'Clean display unit'},
        {src:'assets/Screenshots/300x600/Native with Display.png', caption:'Native with display'},
      ],
      'Canvas':     [{src:'assets/Screenshots/300x600/canvas-1.png',  caption:'Branded canvas format'}],
      'Gift Guide': [{src:'assets/Screenshots/300x600/Gift Guide.png',caption:'Seasonal gift guide'}],
      'Video':[
        {type:'video',        caption:'Autoplay video unit'},
        {type:'video-hybrid', caption:'Video plus editorial feed'},
      ],
    }
  },
  '300x250':{
    label:'MEDIUM RECTANGLE', name:'300×250', breadcrumb:'300 × 250',
    desc:'Versatile mid-content unit supporting native, display, video and canvas.',
    dimensions:'300×250', placement:'In-content / right rail',
    videoQuery:'finance city',
    blurbs:[
      'One of the most widely supported ad sizes across financial and business publishing - versatile and proven.',
      'Placed mid-content, it intercepts readers at moments of active engagement with article material.',
      'Supports the full format stack: native, display, video, canvas and gift guide across desktop and mobile.'
    ],
    formats:{
      'Native':[
        {src:'assets/Screenshots/300x250/Native-1.png', caption:'Editorial card layout'},
        {src:'assets/Screenshots/300x250/Native-2.png', caption:'Image-led native'},
        {src:'assets/Screenshots/300x250/Native-3.png', caption:'Compact native card'},
      ],
      'Display':    [{src:'assets/Screenshots/300x250/Display-1.png',  caption:'Clean display unit'}],
      'Canvas':     [{src:'assets/Screenshots/300x250/canvas-1.png',   caption:'Branded canvas format'}],
      'Gift Guide': [{src:'assets/Screenshots/300x250/Gift Guide.png', caption:'Seasonal gift guide'}],
      'Video':      [{type:'video', caption:'Autoplay video unit'}],
    }
  },
  '728x90':{
    label:'LEADERBOARD', name:'728×90', breadcrumb:'728 × 90',
    desc:'Slim top-of-page native and canvas placement.',
    dimensions:'728×90', placement:'Top of page',
    blurbs:[
      'Slim, unobtrusive, and seen first - the leaderboard sits at the top of the page where every reader starts.',
      'Native and canvas formats maintain editorial quality while delivering clear brand messaging at page entry.',
      'High viewability by default - above-the-fold placement on every article page, every session.'
    ],
    formats:{
      'Native':[
        {src:'assets/Screenshots/728x90/Native-1.png', caption:'Editorial leaderboard'},
        {src:'assets/Screenshots/728x90/Native-2.png', caption:'Image-led native'},
      ],
      'Canvas': [{src:'assets/Screenshots/728x90/canvas-1.png', caption:'Branded canvas format'}],
    }
  },
};

const MOCKS = [
  {
    id:'m1', navName:'Publisher 1',
    category:'NATIVE CAPABILITY', title:'Dianomi in the wild.',
    desc:'A scrollable publisher page showing exactly how the Dianomi native widget integrates at the end of an article.',
    blurbs:[
      'Contextual placement at the article end captures readers who have completed content - the highest intent moment of any session.',
      'The 300×600 native list format adapts to the publisher\'s editorial style, appearing as a natural extension of the feed.',
      'Multiple ad slots within a single unit increase yield without adding page clutter or disrupting the reading experience.'
    ],
    dimensions:'300×600', placement:'Right rail',
    desktop:'assets/mocks/1.png', mobile:null
  },
  {
    id:'m2', navName:'Publisher 2',
    category:'BILLBOARD IN CONTEXT', title:'Full-width native placement.',
    desc:'The 970×250 billboard shown live within a publisher article page, demonstrating full-width native impact mid-content.',
    blurbs:[
      'Full-width in-content placement intercepts readers at peak engagement, mid-article, before they scroll past.',
      'Native card formatting keeps the unit editorially aligned with surrounding content, reducing banner blindness.',
      'A three-card grid drives multiple click opportunities per impression, increasing overall campaign performance.'
    ],
    dimensions:'970×250', placement:'In-content',
    desktop:'assets/mocks/2.png', mobile:null
  },
  {
    id:'m3', navName:'Publisher 3',
    category:'DISPLAY + NATIVE', title:'Hybrid format in the right rail.',
    desc:'A 300×600 right rail unit combining native editorial content with display advertising in a single placement.',
    blurbs:[
      'Right rail permanence keeps the unit visible throughout the full article reading session as the reader scrolls.',
      'Combining native and display in one slot maximises fill rate and revenue per page view for the publisher.',
      'Seamless editorial integration reduces banner blindness compared to traditional display formats.'
    ],
    dimensions:'300×600', placement:'Right rail',
    desktop:'assets/mocks/3.png', mobile:null
  },
  {
    id:'m4', navName:'Publisher 4',
    category:'DESKTOP + MOBILE', title:'Responsive across devices.',
    desc:'The same publisher integration demonstrated across desktop and mobile, showing how Dianomi adapts to any screen.',
    blurbs:[
      'A single Dianomi implementation delivers consistent native quality on both desktop and mobile without separate setups.',
      'The mobile-optimised layout maintains readability and click-through performance on smaller screens.',
      'Responsive delivery ensures publishers capture revenue regardless of how their audience accesses content.'
    ],
    dimensions:'300×600', placement:'Right rail',
    desktop:'assets/mocks/Desktop.png', mobile:'assets/mocks/Mobile.png'
  },
];

// ── STATE ─────────────────────────────────────────────────────────────────────
const uState = {};
let mState = {idx:0, view:'desktop'};
let busy = false;
const vcache = {};
const SIZE_CLASS = {'970x250':'size-970','300x600':'size-600','300x250':'size-250','728x90':'size-90'};

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigate(page, mockIdx) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Highlight correct nav item
  if (page === 'mocks' && mockIdx !== undefined) {
    const navEl = document.querySelector(`[data-page="mocks"][data-mock="${mockIdx}"]`);
    if (navEl) navEl.classList.add('active');
  } else {
    const navEl = document.querySelector(`[data-page="${page}"]:not([data-mock])`);
    if (navEl) navEl.classList.add('active');
  }

  const el = document.getElementById('page-' + page);
  if (!el) return;
  el.classList.add('active');

  if (page === 'mocks') {
    if (mockIdx !== undefined) { mState.idx = mockIdx; mState.view = 'desktop'; }
    if (!el.dataset.rendered) { renderPage(page, el); }
    else { loadMockLeft(); loadMockImg(); }
  } else if (!el.dataset.rendered && page !== 'hero' && page !== 'about') {
    renderPage(page, el);
  }

  scheduleAutoCollapse();
}

document.querySelectorAll('.nav-item[data-page]').forEach(n => {
  n.addEventListener('click', () => {
    const mi = n.dataset.mock !== undefined ? +n.dataset.mock : undefined;
    navigate(n.dataset.page, mi);
  });
});

// ── DISPATCHER ────────────────────────────────────────────────────────────────
function renderPage(page, el) {
  el.dataset.rendered = '1';
  if      (UNITS[page])    renderUnitPage(page, el);
  else if (page === 'mocks') renderMocks(el);
}

// ── UNIT PAGE ─────────────────────────────────────────────────────────────────
function renderUnitPage(key, el) {
  const u = UNITS[key];
  const fmts = Object.keys(u.formats);
  if (!uState[key]) uState[key] = {format:fmts[0], varIdx:0};
  const s = uState[key];

  el.innerHTML = `
    <div class="unit-layout">
      <div class="unit-left">
        <div class="breadcrumb">Ad catalog · <span>${u.breadcrumb}</span></div>
        <div class="page-category">${u.label}</div>
        <h1 class="page-title">${u.name}</h1>
        <p class="page-desc">${u.desc}</p>
        <div class="page-meta">
          <div><div class="meta-label">Dimensions</div><div class="meta-value">${u.dimensions}</div></div>
          <div><div class="meta-label">Placement</div><div class="meta-value">${u.placement}</div></div>
        </div>
        <hr class="page-divider">
        ${u.blurbs.map(b=>`<p class="unit-blurb">${b}</p>`).join('')}
      </div>
      <div class="unit-right">
        <div class="format-tabs" id="tabs-${key}">
          ${fmts.map(f=>`<button class="format-tab${f===s.format?' active':''}" data-f="${f}">${f}</button>`).join('')}
        </div>
        <div class="unit-center-group">
          <div class="unit-stage-wrap ${SIZE_CLASS[key]||''}">
            <div class="unit-frame-scaler"><div class="unit-frame"><div id="stage-${key}" class="unit-stage"></div></div></div>
            <div class="variation-nav" id="vnav-${key}">
              <button class="var-arrow" id="prev-${key}">←</button>
              <div class="var-dots" id="dots-${key}"></div>
              <button class="var-arrow" id="next-${key}">→</button>
            </div>
            <div class="var-caption" id="cap-${key}"></div>
          </div>
        </div>
      </div>
    </div>`;

  el.querySelectorAll('.format-tab').forEach(t =>
    t.addEventListener('click', () => switchFmt(key, t.dataset.f))
  );
  $(`prev-${key}`).addEventListener('click', () => stepVar(key,-1));
  $(`next-${key}`).addEventListener('click', () => stepVar(key, 1));
  drawStage(key);
}

// ── STAGE ─────────────────────────────────────────────────────────────────────
function drawStage(key) {
  const s = uState[key];
  const vars = UNITS[key].formats[s.format];
  const stage = $(`stage-${key}`);
  if (!stage) return;
  stage.innerHTML = '';
  stage.appendChild(makeCard(key, vars[s.varIdx]));
  drawDots(key, vars.length);
  setCaption(key, vars[s.varIdx].caption);
  setArrows(key, vars.length);
  const t = vars[s.varIdx].type;
  if (t === 'video' || t === 'video-hybrid') initVideo(key);
  if (t === 'video-hybrid') initHybridThumbs(key);
  requestAnimationFrame(() => fitStage(key));
}

// Proportionally scale a frame down if it doesn't fit the available vertical space —
// keeps the whole unit visible without forcing scroll, instead of clipping or overflowing.
function fitToViewport(group, scaler, frame) {
  if (!group || !scaler || !frame) return;
  frame.style.transform = 'none';
  scaler.style.height = 'auto';
  const availH = group.clientHeight;
  const naturalH = group.scrollHeight;
  if (naturalH > availH && availH > 0) {
    const scale = Math.max(0.55, (availH / naturalH) * 0.97);
    frame.style.transform = `scale(${scale})`;
    frame.style.transformOrigin = 'top center';
    scaler.style.height = (frame.offsetHeight * scale) + 'px';
  }
}
function fitStage(key) {
  const el = document.getElementById('page-' + key);
  if (!el) return;
  fitToViewport(el.querySelector('.unit-center-group'), el.querySelector('.unit-frame-scaler'), el.querySelector('.unit-frame'));
}
function fitMockStage() {
  const el = document.getElementById('page-mocks');
  if (!el) return;
  fitToViewport(el.querySelector('.unit-center-group'), el.querySelector('.mock-frame-scaler'), el.querySelector('.mock-frame'));
}

window.addEventListener('resize', () => {
  clearTimeout(window._fitResizeT);
  window._fitResizeT = setTimeout(() => {
    Object.keys(UNITS).forEach(k => { if (uState[k]) fitStage(k); });
    fitMockStage();
  }, 120);
});

// ── CARD BUILDER ──────────────────────────────────────────────────────────────
function makeCard(key, v) {
  const c = document.createElement('div');
  c.className = 'unit-card';
  c.id = 'card-' + key;

  if (v.type === 'video') {
    if (key === '970x250') {
      c.innerHTML = `
        <div style="display:flex;width:100%;max-width:970px;height:250px;background:#fff;position:relative;">
          <div class="vu-text" style="flex:1;padding:24px 26px;display:flex;flex-direction:column;justify-content:center;min-width:0;">
            <span class="sp-label">Sponsored Content</span>
            <h3>We go deep on the details so you can scale AI across your business</h3>
            <span class="vu-provider">PWC</span>
            <button class="vu-cta">Learn More</button>
          </div>
          <div style="width:400px;flex-shrink:0;position:relative;height:100%;background:#e5e7eb;overflow:hidden;">
            <div class="video-shimmer"></div>
            <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
            <button class="lm-btn">Learn More</button>
            ${vcOverlay()}
          </div>
          <img class="d-badge" src="assets/brand/d-icon.svg" alt="">
        </div>`;
    } else if (key === '300x600') {
      c.innerHTML = `
        <div style="width:300px;height:600px;background:#fff;display:flex;flex-direction:column;position:relative;">
          <div style="height:316px;flex-shrink:0;position:relative;background:#e5e7eb;overflow:hidden;">
            <div class="video-shimmer"></div>
            <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
            <button class="lm-btn">Learn More</button>
            ${vcOverlay()}
          </div>
          <div class="vu-text" style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px 22px;">
            <span class="sp-label">Sponsored Content</span>
            <h3 style="font-size:20px;">We go deep on the details so you can scale AI across your business</h3>
            <span class="vu-provider">PWC</span>
            <button class="vu-cta">Learn More</button>
          </div>
          <div style="display:flex;justify-content:center;padding-bottom:14px;flex-shrink:0;">
            <img src="assets/brand/d-icon.svg" style="width:16px;height:16px;opacity:0.55;">
          </div>
        </div>`;
    } else if (key === '300x250') {
      c.innerHTML = `
        <div style="width:300px;height:250px;background:#fff;display:flex;flex-direction:column;position:relative;">
          <div style="flex:1;min-height:0;position:relative;background:#e5e7eb;overflow:hidden;">
            <div class="video-shimmer"></div>
            <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
            <button class="lm-btn">Learn More</button>
            ${vcOverlay()}
          </div>
          <div class="vu-text" style="flex-shrink:0;padding:10px 13px 8px;">
            <span class="sp-label">Sponsored Content</span>
            <h3 style="font-size:13px;">We go deep on the details so you can scale AI across your business</h3>
            <span class="vu-provider">PWC</span>
            <button class="vu-cta" style="font-size:11px;padding:6px 12px;">Learn More</button>
          </div>
          <img class="d-badge" style="left:auto;right:10px;" src="assets/brand/d-icon.svg" alt="">
        </div>`;
    }
  } else if (v.type === 'video-hybrid') {
    c.innerHTML = `
      <div style="width:300px;height:600px;background:#fff;display:flex;flex-direction:column;position:relative;">
        <div style="flex:1;min-height:0;position:relative;background:#e5e7eb;overflow:hidden;">
          <div class="video-shimmer"></div>
          <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
          <button class="lm-btn">Learn More</button>
          ${vcOverlay()}
        </div>
        <div class="vu-text" style="flex-shrink:0;padding:14px 16px 10px;">
          <span class="sp-label">Sponsored Content</span>
          <h3 style="font-size:14px;">We go deep on the details so you can scale AI across your business</h3>
          <span class="vu-provider">PWC</span>
          <button class="vu-cta" style="font-size:12px;padding:6px 12px;">Learn More</button>
        </div>
        <div style="flex-shrink:0;display:flex;flex-direction:column;border-top:1px solid #eceff2;">
          <div style="height:88px;flex-shrink:0;display:flex;align-items:center;gap:12px;padding:0 16px;border-bottom:1px solid #eceff2;">
            <div style="width:56px;height:56px;flex-shrink:0;border-radius:4px;overflow:hidden;background:#e5e7eb;"><img class="hy-thumb-1" style="width:100%;height:100%;object-fit:cover;display:block;" alt=""></div>
            <div style="font-size:12px;line-height:1.35;color:#1a2b4a;font-weight:600;">Get up to AED 14,000 cashback with HSBC Premier<span style="display:block;font-size:10px;color:#8a8f98;font-weight:400;margin-top:3px;">HSBC</span></div>
          </div>
          <div style="height:88px;flex-shrink:0;display:flex;align-items:center;gap:12px;padding:0 16px;">
            <div style="width:56px;height:56px;flex-shrink:0;border-radius:4px;overflow:hidden;background:#e5e7eb;"><img class="hy-thumb-2" style="width:100%;height:100%;object-fit:cover;display:block;" alt=""></div>
            <div style="font-size:12px;line-height:1.35;color:#1a2b4a;font-weight:600;">The Fragmentation Era<span style="display:block;font-size:10px;color:#8a8f98;font-weight:400;margin-top:3px;">PIMCO</span></div>
          </div>
        </div>
        <img class="d-badge" src="assets/brand/d-icon.svg" alt="">
      </div>`;
  } else {
    c.innerHTML = `<img class="main-img" src="${v.src}" alt="" loading="lazy">`;
  }
  return c;
}

// ── FORMAT SWITCH ─────────────────────────────────────────────────────────────
function switchFmt(key, fmt) {
  uState[key].format = fmt;
  uState[key].varIdx = 0;
  document.querySelectorAll(`#tabs-${key} .format-tab`).forEach(t =>
    t.classList.toggle('active', t.dataset.f === fmt)
  );
  const stage = $(`stage-${key}`);
  if (!stage) return;
  stage.style.transition = 'opacity 140ms';
  stage.style.opacity = '0';
  setTimeout(()=>{ drawStage(key); stage.style.opacity='1'; }, 140);
}

// ── 3D VARIATION CHANGE ───────────────────────────────────────────────────────
function stepVar(key, dir) {
  if (busy) return;
  const s = uState[key];
  const total = UNITS[key].formats[s.format].length;
  const next = s.varIdx + dir;
  if (next < 0 || next >= total) return;
  animVar(key, next, dir);
}

function animVar(key, newIdx, dir) {
  if (busy) return;
  busy = true;
  const stage = $(`stage-${key}`);
  const old = stage ? stage.querySelector('.unit-card') : null;
  if (old) {
    old.style.transition = 'transform 240ms ease,opacity 240ms ease';
    old.style.transform = `rotateY(${dir>0?'-8':'8'}deg) translateX(${dir>0?'-36':'36'}px)`;
    old.style.opacity = '0';
  }
  setTimeout(()=>{
    uState[key].varIdx = newIdx;
    drawStage(key);
    const neo = stage ? stage.querySelector('.unit-card') : null;
    if (neo) {
      neo.style.transition = 'none';
      neo.style.transform = `rotateY(${dir>0?'8':'-8'}deg) translateX(${dir>0?'36':'-36'}px)`;
      neo.style.opacity = '0';
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        neo.style.transition = 'transform 280ms ease,opacity 280ms ease';
        neo.style.transform = 'rotateY(0deg) translateX(0)';
        neo.style.opacity = '1';
      }));
    }
    setTimeout(()=>{ busy=false; }, 300);
  }, 240);
}

// ── DOTS / CAPTION / ARROWS ───────────────────────────────────────────────────
function drawDots(key, total) {
  const el = $(`dots-${key}`);
  if (!el) return;
  el.innerHTML = Array.from({length:total},(_,i)=>
    `<span class="var-dot${i===uState[key].varIdx?' active':''}" data-i="${i}"></span>`
  ).join('');
  el.querySelectorAll('.var-dot').forEach(d =>
    d.addEventListener('click',()=>{
      const i=+d.dataset.i;
      if (i!==uState[key].varIdx) animVar(key,i,i>uState[key].varIdx?1:-1);
    })
  );
}
function setCaption(key, text) {
  const el=$(`cap-${key}`);
  if (!el) return;
  el.style.opacity='0';
  setTimeout(()=>{ el.textContent=text||''; el.style.opacity='1'; el.style.transition='opacity 180ms'; },140);
}
function setArrows(key, total) {
  const s=uState[key];
  const p=$(`prev-${key}`), n=$(`next-${key}`);
  if (p) p.disabled=s.varIdx===0;
  if (n) n.disabled=s.varIdx===total-1;
  const nav=$(`vnav-${key}`);
  if (nav) nav.style.display=total<=1?'none':'flex';
}

// ── PEXELS ────────────────────────────────────────────────────────────────────
async function fetchClip(q) {
  if (vcache[q]) return vcache[q];
  try {
    const r=await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape`,{headers:{Authorization:PEXELS_KEY}});
    const d=await r.json();
    const files=d.videos?.[0]?.video_files||[];
    const f=files.find(x=>x.quality==='sd')||files[0];
    if (f?.link) vcache[q]=f.link;
    return f?.link||null;
  } catch(e){ return null; }
}
async function fetchPhoto(q) {
  const k='p:'+q;
  if (vcache[k]) return vcache[k];
  try {
    const r=await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=1`,{headers:{Authorization:PEXELS_KEY}});
    const d=await r.json();
    const url=d.photos?.[0]?.src?.medium||null;
    if (url) vcache[k]=url;
    return url;
  } catch(e){ return null; }
}
function initVideo(key) {
  const card=$('card-'+key);
  if (!card) return;
  const video=card.querySelector('video');
  const shimmer=card.querySelector('.video-shimmer');
  const pp=card.querySelector('.pp');
  const mu=card.querySelector('.mu');
  if (!video) return;
  fetchClip(UNITS[key].videoQuery).then(url=>{
    if (!url){ shimmer&&shimmer.remove(); return; }
    video.src=url;
    video.addEventListener('canplay',()=>{
      shimmer&&(shimmer.style.display='none');
      video.play().catch(()=>{ if(pp) pp.innerHTML=ICON_PLAY; });
    },{once:true});
  });
  pp&&pp.addEventListener('click',()=>{
    if(video.paused){video.play();pp.innerHTML=ICON_PAUSE;}
    else{video.pause();pp.innerHTML=ICON_PLAY;}
  });
  mu&&mu.addEventListener('click',()=>{
    video.muted=!video.muted;
    mu.innerHTML=video.muted?ICON_MUTE:ICON_VOL;
  });
}
function initHybridThumbs(key) {
  const card=$('card-'+key);
  if (!card) return;
  const t1=card.querySelector('.hy-thumb-1');
  const t2=card.querySelector('.hy-thumb-2');
  if (t1) fetchPhoto('finance office').then(url=>{ if(url) t1.src=url; });
  if (t2) fetchPhoto('global economy').then(url=>{ if(url) t2.src=url; });
}

// ── MOCKS PAGE ────────────────────────────────────────────────────────────────
function renderMocks(el) {
  el.innerHTML = `
    <div class="unit-layout">
      <div class="unit-left" id="mock-left"></div>
      <div class="unit-right">
        <div class="device-toggle-row">
          <div class="device-toggle" id="dtoggle" style="display:none;">
            <button class="device-btn active" data-v="desktop">🖥 Desktop</button>
            <button class="device-btn" data-v="mobile">📱 Mobile</button>
          </div>
        </div>
        <div class="unit-center-group">
          <div class="mock-right-wrap">
            <div class="mock-frame-scaler">
              <div class="mock-frame" id="mframe">
                <div class="browser-chrome">
                  <div class="browser-dots">
                    <span style="background:#ff5f57;"></span>
                    <span style="background:#febc2e;"></span>
                    <span style="background:#28c840;"></span>
                  </div>
                  <div class="browser-url">publisher.com</div>
                </div>
                <div class="mock-scroll-body" id="mscroll">
                  <div class="mock-loading" id="mloading">Loading...</div>
                  <img id="mimg" src="" alt="" style="display:none;">
                </div>
              </div>
            </div>
            <div class="scroll-hint" id="mhint">↓ scroll to explore</div>
          </div>
        </div>
      </div>
    </div>`;

  el.querySelectorAll('.device-btn').forEach(b=>
    b.addEventListener('click',()=>{
      mState.view=b.dataset.v;
      el.querySelectorAll('.device-btn').forEach(x=>x.classList.toggle('active',x===b));
      applyMockView();
    })
  );
  const scrollBody=$('mscroll'), hint=$('mhint');
  if (scrollBody&&hint) scrollBody.addEventListener('scroll',()=>hint.classList.add('hidden'),{once:true});

  loadMockLeft();
  loadMockImg();
}

function loadMockLeft() {
  const m=MOCKS[mState.idx];
  const left=$('mock-left');
  if (!left) return;
  left.innerHTML = `
    <div class="breadcrumb">Publisher Mocks · <span>${m.navName}</span></div>
    <div class="page-category">${m.category}</div>
    <h1 class="page-title">${m.title}</h1>
    <p class="page-desc">${m.desc}</p>
    <div class="page-meta">
      <div><div class="meta-label">Dimensions</div><div class="meta-value">${m.dimensions}</div></div>
      <div><div class="meta-label">Placement</div><div class="meta-value">${m.placement}</div></div>
    </div>
    <hr class="page-divider">
    ${m.blurbs.map(b=>`<p class="unit-blurb">${b}</p>`).join('')}`;
}

function loadMockImg() {
  const m=MOCKS[mState.idx];
  const toggle=$('dtoggle'), scrollBody=$('mscroll');
  const img=$('mimg'), loading=$('mloading'), hint=$('mhint');

  if (toggle) toggle.style.display=m.mobile?'flex':'none';
  if (hint) hint.classList.remove('hidden');
  if (scrollBody) { scrollBody.scrollTop=0; scrollBody.style.opacity='0'; scrollBody.style.transition='opacity 150ms'; }
  if (loading) { loading.textContent='Loading…'; loading.style.display='flex'; }
  if (img) img.style.display='none';

  const src=mState.view==='mobile'&&m.mobile?m.mobile:m.desktop;
  const loader=new Image();
  loader.onload=()=>{
    if (img){ img.src=src; img.style.display='block'; }
    if (loading) loading.style.display='none';
    if (scrollBody) scrollBody.style.opacity='1';
    fitMockStage();
  };
  loader.onerror=()=>{ if(loading) loading.textContent='Could not load'; };
  loader.src=src;

  applyMockView();
  fitMockStage();
}

function applyMockView() {
  const m=MOCKS[mState.idx];
  const frame=$('mframe'), img=$('mimg');
  if (frame) frame.classList.toggle('mobile-view',mState.view==='mobile'&&!!m.mobile);
  if (img&&img.style.display!=='none') {
    const src=mState.view==='mobile'&&m.mobile?m.mobile:m.desktop;
    if (!img.src.endsWith(src)){ img.style.opacity='0'; img.src=src; img.onload=()=>{ img.style.opacity='1'; img.style.transition='opacity 150ms'; }; }
  }
}

// ── SIDEBAR COLLAPSE ──────────────────────────────────────────────────────────
document.getElementById('collapseBtn').addEventListener('click',()=>{
  const sb=document.getElementById('sidebar');
  const icon=document.getElementById('collapseIcon');
  const collapsed=sb.classList.toggle('collapsed');
  if (icon) icon.textContent=collapsed?'›':'‹';
  if (!collapsed) scheduleAutoCollapse(); // just reopened — give them 5s before it auto-hides again
  else clearTimeout(exploreTimer);
});

// Auto-collapse the sidebar 5s after the viewer lands on a page, so they get the full-width
// view shortly after they start exploring. NOT tied to general activity — clicking around
// inside a page (format tabs, arrows, publisher tabs) does not reset or cancel this.
let exploreTimer;
function scheduleAutoCollapse() {
  clearTimeout(exploreTimer);
  const sb=document.getElementById('sidebar');
  if (!sb || sb.classList.contains('collapsed')) return;
  exploreTimer = setTimeout(()=>{
    sb.classList.add('collapsed');
    const icon=document.getElementById('collapseIcon');
    if (icon) icon.textContent='›';
  }, 5000);
}

// ── UTIL ──────────────────────────────────────────────────────────────────────
function $(id){ return document.getElementById(id); }

// ── BOOT ──────────────────────────────────────────────────────────────────────
navigate('hero');
