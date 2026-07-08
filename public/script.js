'use strict';

const PEXELS_KEY = '1OzprTAbWQCPVn9OoF02cSelNJetTLGwYjF6wR186DB4sDCgUZSJ2Qg3';

// ── DATA ──────────────────────────────────────────────────────────────────────
const UNITS = {
  '970x250':{
    label:'BILLBOARD', name:'970×250',
    desc:'Full-width in-content native, display and video formats.',
    dimensions:'970×250', placement:'In-content / top of page',
    videoQuery:'business finance',
    formats:{
      'Native':[
        {src:'assets/Screenshots/970x250/Native-1.png', caption:'Editorial card layout'},
        {src:'assets/Screenshots/970x250/Native-2.png', caption:'Image-led native'},
        {src:'assets/Screenshots/970x250/Native-3.png', caption:'Multi-slot display'},
        {src:'assets/Screenshots/970x250/Native-4.png', caption:'Content feed style'},
        {src:'assets/Screenshots/970x250/Native-5.png', caption:'Dark editorial format'},
      ],
      'Display':[
        {src:'assets/Screenshots/970x250/Display-1.png', caption:'Clean display banner'},
      ],
      'Canvas':[
        {src:'assets/Screenshots/970x250/canvas-1.png', caption:'Branded canvas format'},
      ],
      'Video':[{type:'video', caption:'Autoplay video unit'}],
    }
  },
  '300x600':{
    label:'HALF PAGE', name:'300×600',
    desc:'Right rail premium content feed including native, video and display formats.',
    dimensions:'300×600', placement:'Right rail',
    videoQuery:'office team',
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
      'Canvas':[
        {src:'assets/Screenshots/300x600/canvas-1.png', caption:'Branded canvas format'},
      ],
      'Gift Guide':[
        {src:'assets/Screenshots/300x600/Gift Guide.png', caption:'Seasonal gift guide'},
      ],
      'Video':[
        {type:'video', caption:'Autoplay video unit'},
        {type:'video-hybrid', caption:'Video plus editorial feed'},
      ],
    }
  },
  '300x250':{
    label:'MEDIUM RECTANGLE', name:'300×250',
    desc:'Versatile mid-content unit supporting native, display, video and canvas.',
    dimensions:'300×250', placement:'In-content / right rail',
    videoQuery:'finance city',
    formats:{
      'Native':[
        {src:'assets/Screenshots/300x250/Native-1.png', caption:'Editorial card layout'},
        {src:'assets/Screenshots/300x250/Native-2.png', caption:'Image-led native'},
        {src:'assets/Screenshots/300x250/Native-3.png', caption:'Compact native card'},
      ],
      'Display':[
        {src:'assets/Screenshots/300x250/Display-1.png', caption:'Clean display unit'},
      ],
      'Canvas':[
        {src:'assets/Screenshots/300x250/canvas-1.png', caption:'Branded canvas format'},
      ],
      'Gift Guide':[
        {src:'assets/Screenshots/300x250/Gift Guide.png', caption:'Seasonal gift guide'},
      ],
      'Video':[{type:'video', caption:'Autoplay video unit'}],
    }
  },
  '728x90':{
    label:'LEADERBOARD', name:'728×90',
    desc:'Slim top-of-page native and canvas placement.',
    dimensions:'728×90', placement:'Top of page',
    formats:{
      'Native':[
        {src:'assets/Screenshots/728x90/Native-1.png', caption:'Editorial leaderboard'},
        {src:'assets/Screenshots/728x90/Native-2.png', caption:'Image-led native'},
      ],
      'Canvas':[
        {src:'assets/Screenshots/728x90/canvas-1.png', caption:'Branded canvas format'},
      ],
    }
  },
  'bespoke':{
    label:'CUSTOM', name:'Bespoke Units',
    desc:"Fully custom native integrations built to match any publisher's editorial environment.",
    dimLabel:'Integration Type', dimensions:'Multi-format',
    placeLabel:'Style', placement:'Editorial match',
    formats:{
      'Grid Layout':[
        {src:'assets/Screenshots/Custom/Custom-1.png', caption:'Publisher grid style'},
      ],
      'Side-by-side':[
        {src:'assets/Screenshots/Custom/Custom-2.png', caption:'Side-by-side style'},
      ],
    }
  },
};

const MOCKS = [
  {id:'m1', name:'Publisher 1', format:'Native + List',    placement:'Right rail',  size:'300×600', desktop:'assets/mocks/1.png',         mobile:null},
  {id:'m2', name:'Publisher 2', format:'Native',          placement:'In-content',  size:'970×250', desktop:'assets/mocks/2.png',         mobile:null},
  {id:'m3', name:'Publisher 3', format:'Native + Display',placement:'Right rail',  size:'300×600', desktop:'assets/mocks/3.png',         mobile:null},
  {id:'m4', name:'Publisher 4', format:'Native',          placement:'Right rail',  size:'300×600', desktop:'assets/mocks/Desktop.png',   mobile:'assets/mocks/Mobile.png'},
];

// ── STATE ─────────────────────────────────────────────────────────────────────
const uState  = {}; // per-unit { format, varIdx }
let   mState  = { idx:0, view:'desktop' };
let   busy    = false;
const vcache  = {};

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigate(page) {
  document.querySelectorAll('.page').forEach(p  => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const el = document.getElementById('page-' + page);
  if (el) {
    el.classList.add('active');
    if (!el.dataset.rendered && page !== 'hero' && page !== 'about') {
      renderPage(page, el);
    }
  }
  const nav = document.querySelector(`[data-page="${page}"]`);
  if (nav) nav.classList.add('active');
  window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-item[data-page]').forEach(n => {
  n.addEventListener('click', () => navigate(n.dataset.page));
});

// ── DISPATCHER ────────────────────────────────────────────────────────────────
function renderPage(page, el) {
  el.dataset.rendered = '1';
  if      (UNITS[page])    renderUnitPage(page, el);
  else if (page==='mocks') renderMocks(el);
}

const SIZE_CLASS = {'970x250':'size-970','300x600':'size-600','300x250':'size-250','728x90':'size-90'};

// ── UNIT PAGE ─────────────────────────────────────────────────────────────────
function renderUnitPage(key, el) {
  const u = UNITS[key];
  const fmts = Object.keys(u.formats);
  if (!uState[key]) uState[key] = { format:fmts[0], varIdx:0 };

  el.innerHTML = `
    <div class="page-inner">
      <div class="page-category">${u.label}</div>
      <h1 class="page-title">${u.name}</h1>
      <p class="page-desc">${u.desc}</p>
      <div class="page-meta">
        <div><div class="meta-label">${u.dimLabel||'Dimensions'}</div><div class="meta-value">${u.dimensions}</div></div>
        <div><div class="meta-label">${u.placeLabel||'Placement'}</div><div class="meta-value">${u.placement}</div></div>
      </div>
      <hr class="page-divider">
      <div class="format-tabs" id="tabs-${key}">
        ${fmts.map(f=>`<button class="format-tab${f===uState[key].format?' active':''}" data-f="${f}">${f}</button>`).join('')}
      </div>
      <div class="unit-stage-wrap ${SIZE_CLASS[key]||''}">
        <div class="unit-frame"><div id="stage-${key}" class="unit-stage"></div></div>
        <div class="variation-nav" id="vnav-${key}">
          <button class="var-arrow" id="prev-${key}">←</button>
          <div class="var-dots" id="dots-${key}"></div>
          <button class="var-arrow" id="next-${key}">→</button>
        </div>
        <div class="var-caption" id="cap-${key}"></div>
      </div>
    </div>`;

  el.querySelectorAll('.format-tab').forEach(t =>
    t.addEventListener('click', () => switchFmt(key, t.dataset.f))
  );
  el.querySelector(`#prev-${key}`).addEventListener('click', () => stepVar(key, -1));
  el.querySelector(`#next-${key}`).addEventListener('click', () => stepVar(key,  1));

  drawStage(key);
}

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
  if (vars[s.varIdx].type==='video' || vars[s.varIdx].type==='video-hybrid') initVideo(key);
  if (vars[s.varIdx].type==='video-hybrid') initHybridThumbs(key);
}

// ── CARD BUILDER ──────────────────────────────────────────────────────────────
function makeCard(key, v) {
  const c = document.createElement('div');
  c.className = 'unit-card';
  c.id = 'card-' + key;

  if (v.type === 'video') {
    // Size-specific video unit layout — flex-fill guarantees exact real-world dimensions
    if (key === '970x250') {
      c.innerHTML = `
        <div style="display:flex;width:970px;max-width:100%;height:250px;background:#fff;">
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
            <div class="vc-overlay">
              <button class="vc-btn pp">⏸</button>
              <button class="vc-btn mu">🔊</button>
            </div>
            <img class="d-badge" style="left:10px;right:auto;bottom:10px;" src="assets/brand/d-icon.svg" alt="">
          </div>
        </div>`;
    } else if (key === '300x600') {
      c.innerHTML = `
        <div style="width:300px;height:600px;background:#fff;display:flex;flex-direction:column;">
          <div style="flex:1;min-height:0;position:relative;background:#e5e7eb;overflow:hidden;">
            <div class="video-shimmer"></div>
            <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
            <button class="lm-btn">Learn More</button>
            <div class="vc-overlay">
              <button class="vc-btn pp">⏸</button>
              <button class="vc-btn mu">🔊</button>
            </div>
          </div>
          <div class="vu-text" style="flex-shrink:0;padding:18px 18px 16px;">
            <span class="sp-label">Sponsored Content</span>
            <h3 style="font-size:16px;">We go deep on the details so you can scale AI across your business</h3>
            <span class="vu-provider">PWC</span>
            <button class="vu-cta">Learn More</button>
          </div>
          <img class="d-badge" src="assets/brand/d-icon.svg" alt="">
        </div>`;
    } else if (key === '300x250') {
      c.innerHTML = `
        <div style="width:300px;height:250px;background:#fff;display:flex;flex-direction:column;">
          <div style="flex:1;min-height:0;position:relative;background:#e5e7eb;overflow:hidden;">
            <div class="video-shimmer"></div>
            <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
            <button class="lm-btn">Learn More</button>
            <div class="vc-overlay">
              <button class="vc-btn pp">⏸</button>
              <button class="vc-btn mu">🔊</button>
            </div>
          </div>
          <div class="vu-text" style="flex-shrink:0;padding:12px 14px 10px;">
            <span class="sp-label">Sponsored Content</span>
            <h3 style="font-size:13px;">We go deep on the details so you can scale AI across your business</h3>
            <span class="vu-provider">PWC</span>
            <button class="vu-cta" style="font-size:11px;padding:6px 11px;">Learn More</button>
          </div>
          <img class="d-badge" src="assets/brand/d-icon.svg" alt="">
        </div>`;
    }
  } else if (v.type === 'video-hybrid') {
    c.innerHTML = `
      <div style="width:300px;height:600px;background:#fff;display:flex;flex-direction:column;">
        <div style="flex-shrink:0;position:relative;height:170px;background:#e5e7eb;overflow:hidden;">
          <div class="video-shimmer"></div>
          <video muted loop playsinline style="width:100%;height:100%;object-fit:cover;display:block;"></video>
          <button class="lm-btn">Learn More</button>
          <div class="vc-overlay">
            <button class="vc-btn pp">⏸</button>
            <button class="vc-btn mu">🔊</button>
          </div>
        </div>
        <div class="vu-text" style="flex-shrink:0;padding:14px 16px 12px;">
          <span class="sp-label">Sponsored Content</span>
          <h3 style="font-size:14px;">We go deep on the details so you can scale AI across your business</h3>
          <span class="vu-provider">PWC</span>
          <button class="vu-cta" style="padding:6px 12px;font-size:12px;">Learn More</button>
        </div>
        <div style="flex:1;min-height:0;display:flex;flex-direction:column;border-top:1px solid #eceff2;">
          <div style="flex:1;display:flex;align-items:center;gap:12px;padding:0 16px;border-bottom:1px solid #eceff2;text-align:left;">
            <div style="width:64px;height:64px;flex-shrink:0;border-radius:4px;overflow:hidden;background:#e5e7eb;"><img class="hy-thumb-1" style="width:100%;height:100%;object-fit:cover;display:block;" alt=""></div>
            <div style="font-size:12px;line-height:1.35;color:#1a2b4a;font-weight:600;text-align:left;">Get up to AED 14,000 cashback with HSBC Premier<span style="display:block;font-size:10px;color:#8a8f98;font-weight:400;margin-top:3px;">HSBC</span></div>
          </div>
          <div style="flex:1;display:flex;align-items:center;gap:12px;padding:0 16px;text-align:left;">
            <div style="width:64px;height:64px;flex-shrink:0;border-radius:4px;overflow:hidden;background:#e5e7eb;"><img class="hy-thumb-2" style="width:100%;height:100%;object-fit:cover;display:block;" alt=""></div>
            <div style="font-size:12px;line-height:1.35;color:#1a2b4a;font-weight:600;text-align:left;">The Fragmentation Era<span style="display:block;font-size:10px;color:#8a8f98;font-weight:400;margin-top:3px;">PIMCO</span></div>
          </div>
        </div>
        <img class="d-badge" src="assets/brand/d-icon.svg" alt="">
      </div>`;
  } else {
    // Screenshot card — no d-badge (screenshots already have it baked in)
    c.innerHTML = `<img class="main-img" src="${v.src}" alt="" loading="lazy">`;
  }
  return c;
}

// ── FORMAT SWITCH (crossfade) ─────────────────────────────────────────────────
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
  setTimeout(() => { drawStage(key); stage.style.opacity = '1'; }, 140);
}

// ── 3D VARIATION CHANGE ───────────────────────────────────────────────────────
function stepVar(key, dir) {
  if (busy) return;
  const s = uState[key];
  const total = UNITS[key].formats[s.format].length;
  const next = s.varIdx + dir;
  if (next < 0 || next >= total) return;
  animateVar(key, next, dir);
}

function animateVar(key, newIdx, dir) {
  if (busy) return;
  busy = true;

  const stage = $(`stage-${key}`);
  const old   = stage ? stage.querySelector('.unit-card') : null;

  // Exit: slide + rotate out
  if (old) {
    old.style.transition = 'transform 240ms ease, opacity 240ms ease';
    old.style.transform  = `rotateY(${dir>0?'-8':'8'}deg) translateX(${dir>0?'-36':'36'}px)`;
    old.style.opacity    = '0';
  }

  setTimeout(() => {
    uState[key].varIdx = newIdx;
    drawStage(key);

    // Enter: slide + rotate in (start position)
    const neo = stage ? stage.querySelector('.unit-card') : null;
    if (neo) {
      neo.style.transition = 'none';
      neo.style.transform  = `rotateY(${dir>0?'8':'-8'}deg) translateX(${dir>0?'36':'-36'}px)`;
      neo.style.opacity    = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        neo.style.transition = 'transform 280ms ease, opacity 280ms ease';
        neo.style.transform  = 'rotateY(0deg) translateX(0)';
        neo.style.opacity    = '1';
      }));
    }

    setTimeout(() => { busy = false; }, 300);
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
    d.addEventListener('click', () => {
      const i = +d.dataset.i;
      if (i !== uState[key].varIdx) animateVar(key, i, i > uState[key].varIdx ? 1 : -1);
    })
  );
}

function setCaption(key, text) {
  const el = $(`cap-${key}`);
  if (!el) return;
  el.style.opacity = '0';
  setTimeout(() => { el.textContent = text||''; el.style.opacity='1'; el.style.transition='opacity 180ms'; }, 140);
}

function setArrows(key, total) {
  const s = uState[key];
  const p = $(`prev-${key}`), n = $(`next-${key}`);
  if (p) p.disabled = s.varIdx === 0;
  if (n) n.disabled = s.varIdx === total-1;
  const nav = $(`vnav-${key}`);
  if (nav) nav.style.display = total<=1 ? 'none' : 'flex';
}

// ── PEXELS PHOTOS (hybrid unit thumbnails) ────────────────────────────────────
async function fetchPhoto(q) {
  const cacheKey = 'photo:' + q;
  if (vcache[cacheKey]) return vcache[cacheKey];
  try {
    const r = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=1`,
      {headers:{Authorization:PEXELS_KEY}}
    );
    const d = await r.json();
    const url = d.photos?.[0]?.src?.medium || null;
    if (url) vcache[cacheKey] = url;
    return url;
  } catch(e){ return null; }
}

function initHybridThumbs(key) {
  const card = $('card-' + key);
  if (!card) return;
  const t1 = card.querySelector('.hy-thumb-1');
  const t2 = card.querySelector('.hy-thumb-2');
  if (t1) fetchPhoto('finance office').then(url => { if (url) t1.src = url; });
  if (t2) fetchPhoto('global economy').then(url => { if (url) t2.src = url; });
}

// ── PEXELS VIDEO ──────────────────────────────────────────────────────────────
async function fetchClip(q) {
  if (vcache[q]) return vcache[q];
  try {
    const r = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(q)}&per_page=1&orientation=landscape`,
      {headers:{Authorization:PEXELS_KEY}}
    );
    const d = await r.json();
    const files = d.videos?.[0]?.video_files||[];
    const f = files.find(x=>x.quality==='sd')||files[0];
    if (f?.link) vcache[q] = f.link;
    return f?.link||null;
  } catch(e){ return null; }
}

function initVideo(key) {
  const card    = $('card-' + key);
  if (!card) return;
  const video   = card.querySelector('video');
  const shimmer = card.querySelector('.video-shimmer');
  const pp      = card.querySelector('.pp');
  const mu      = card.querySelector('.mu');
  if (!video) return;

  fetchClip(UNITS[key].videoQuery).then(url => {
    if (!url) { shimmer&&shimmer.remove(); return; }
    video.src = url;
    video.addEventListener('canplay', () => {
      shimmer&&(shimmer.style.display='none');
      video.play().catch(()=>{ if(pp) pp.textContent='▶'; });
    },{once:true});
  });

  pp&&pp.addEventListener('click', ()=>{
    if(video.paused){video.play();pp.textContent='⏸';}
    else{video.pause();pp.textContent='▶';}
  });
  mu&&mu.addEventListener('click', ()=>{
    video.muted=!video.muted;
    mu.textContent=video.muted?'🔇':'🔊';
  });
}

// ── MOCKS ─────────────────────────────────────────────────────────────────────
function renderMocks(el) {
  mState = {idx:0, view:'desktop'};
  el.innerHTML = `
    <div class="page-inner">
      <div class="page-category">Real Work</div>
      <h1 class="page-title">Publisher Mocks</h1>
      <p class="page-desc">Real implementations across leading financial publishers.</p>
      <div class="page-meta" id="mmeta"></div>
      <hr class="page-divider">
      <div class="mock-tabs" id="mtabs">
        ${MOCKS.map((m,i)=>`<button class="mock-tab${i===0?' active':''}" data-i="${i}">${m.name}</button>`).join('')}
      </div>
      <div class="device-toggle" id="dtoggle" style="display:none;">
        <button class="device-btn active" data-v="desktop">🖥 Desktop</button>
        <button class="device-btn" data-v="mobile">📱 Mobile</button>
      </div>
      <div class="mock-frame" id="mframe">
        <div class="mock-loading" id="mloading">SELECT A PUBLISHER ABOVE</div>
        <img id="mimg" src="" alt="" style="display:none;">
        <div class="scroll-hint" id="mhint">↓ scroll to explore</div>
      </div>
    </div>`;

  el.querySelectorAll('.mock-tab').forEach(t =>
    t.addEventListener('click', ()=>{
      mState.idx=+t.dataset.i; mState.view='desktop';
      el.querySelectorAll('.mock-tab').forEach(x=>x.classList.toggle('active',x===t));
      el.querySelectorAll('.device-btn').forEach(b=>b.classList.toggle('active',b.dataset.v==='desktop'));
      loadMock();
    })
  );
  el.querySelectorAll('.device-btn').forEach(b=>
    b.addEventListener('click', ()=>{
      mState.view=b.dataset.v;
      el.querySelectorAll('.device-btn').forEach(x=>x.classList.toggle('active',x===b));
      applyView();
    })
  );
  const frame=$('mframe'), hint=$('mhint');
  if(frame&&hint) frame.addEventListener('scroll',()=>hint.classList.add('hidden'),{once:true});

  // Load first mock on click, not on render (performance)
  loadMock();
}

function loadMock() {
  const m = MOCKS[mState.idx];
  const meta=$('mmeta'), toggle=$('dtoggle'), frame=$('mframe');
  const img=$('mimg'), loading=$('mloading');

  if(meta) meta.innerHTML=`
    <div><div class="meta-label">Publisher</div><div class="meta-value">${m.name}</div></div>
    <div><div class="meta-label">Format</div><div class="meta-value">${m.format}</div></div>
    <div><div class="meta-label">Placement</div><div class="meta-value">${m.placement}</div></div>
    <div><div class="meta-label">Unit Size</div><div class="meta-value">${m.size}</div></div>`;

  if(toggle) toggle.style.display = m.mobile ? 'flex' : 'none';

  if(frame) { frame.scrollTop=0; frame.style.opacity='0'; frame.style.transition='opacity 150ms'; }
  const hint=$('mhint');
  if(hint) hint.classList.remove('hidden');

  if(loading) { loading.textContent='LOADING…'; loading.style.display='flex'; }
  if(img) img.style.display='none';

  const src = mState.view==='mobile'&&m.mobile ? m.mobile : m.desktop;
  const loader = new Image();
  loader.onload = ()=>{
    if(img) { img.src=src; img.style.display='block'; }
    if(loading) loading.style.display='none';
    if(frame) frame.style.opacity='1';
  };
  loader.onerror = ()=>{ if(loading) loading.textContent='COULD NOT LOAD'; };
  loader.src = src;

  applyView();
}

function applyView() {
  const m=$('mframe'), img=$('mimg');
  const mock=MOCKS[mState.idx];
  if(m) m.classList.toggle('mobile-view', mState.view==='mobile'&&!!mock.mobile);
  if(img&&img.style.display!=='none') {
    const src=mState.view==='mobile'&&mock.mobile ? mock.mobile : mock.desktop;
    if(!img.src.endsWith(src)) { img.style.opacity='0'; img.src=src; img.onload=()=>{ img.style.opacity='1'; img.style.transition='opacity 150ms'; }; }
  }
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function openLB(src) {
  $('lightbox-img').src = src;
  $('lightbox').classList.add('open');
}
function closeLightbox() { $('lightbox').classList.remove('open'); }
document.getElementById('lightbox').addEventListener('click', e=>{
  if(e.target===e.currentTarget) closeLightbox();
});

// ── SIDEBAR COLLAPSE ──────────────────────────────────────────────────────────
const collapseBtn = document.getElementById('collapseBtn');
if (collapseBtn) {
  collapseBtn.addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const icon = document.getElementById('collapseIcon');
    const collapsed = sb.classList.toggle('collapsed');
    if (icon) icon.textContent = collapsed ? '›' : '‹';
  });
}

// ── UTIL ──────────────────────────────────────────────────────────────────────
function $(id){ return document.getElementById(id); }

// ── BOOT ──────────────────────────────────────────────────────────────────────
navigate('hero');
