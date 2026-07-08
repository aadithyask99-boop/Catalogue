'use strict';

const PEXELS_KEY = '1OzprTAbWQCPVn9OoF02cSelNJetTLGwYjF6wR186DB4sDCgUZSJ2Qg3';

// ── DATA ─────────────────────────────────────────────────────────────────────
const UNITS = {
  '970x250': {
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
      'Display':    [{src:'assets/Screenshots/970x250/Display-1.png',  caption:'Clean display banner'}],
      'Canvas':     [{src:'assets/Screenshots/970x250/canvas-1.png',   caption:'Branded canvas format'}],
      'Video':      [{type:'video', caption:'Autoplay video unit'}],
    }
  },
  '300x600': {
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
        {src:'assets/Screenshots/300x600/Native with Display.png', caption:'Native with display'},
      ],
      'Display':    [{src:'assets/Screenshots/300x600/Display-1.webp', caption:'Clean display unit'}],
      'Canvas':     [{src:'assets/Screenshots/300x600/canvas-1.png',   caption:'Branded canvas format'}],
      'Gift Guide': [{src:'assets/Screenshots/300x600/Gift Guide.png', caption:'Seasonal gift guide'}],
      'Video':      [{type:'video', caption:'Autoplay video unit'}],
    }
  },
  '300x250': {
    label:'MEDIUM RECTANGLE', name:'300×250',
    desc:'Versatile mid-content unit supporting native, display, video and canvas formats.',
    dimensions:'300×250', placement:'In-content / right rail',
    videoQuery:'finance city',
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
  '728x90': {
    label:'LEADERBOARD', name:'728×90',
    desc:'Slim top-of-page native and canvas placement.',
    dimensions:'728×90', placement:'Top of page',
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
  {id:'mock1', name:'Publisher 1', format:'Native + List', placement:'Right rail',  size:'300×600', desktop:'assets/mocks/1.png',       mobile:null},
  {id:'mock2', name:'Publisher 2', format:'Native',        placement:'In-content',  size:'970×250', desktop:'assets/mocks/2.png',       mobile:null},
  {id:'mock3', name:'Publisher 3', format:'Native + Display', placement:'Right rail', size:'300×600', desktop:'assets/mocks/3.png',    mobile:null},
  {id:'mock4', name:'Publisher 4', format:'Native',        placement:'Right rail',  size:'300×600', desktop:'assets/mocks/Desktop.png', mobile:'assets/mocks/Mobile.png'},
];

// ── STATE ─────────────────────────────────────────────────────────────────────
const unitState = {}; // { key: { format, varIdx } }
let mockState = { idx:0, view:'desktop' };
let isAnimating = false;
const videoCache = {};

// ── NAVIGATION ────────────────────────────────────────────────────────────────
function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    if (!target.dataset.rendered && page !== 'hero' && page !== 'about') {
      renderPage(page, target);
    }
  }

  const navEl = document.querySelector(`[data-page="${page}"]`);
  if (navEl) navEl.classList.add('active');

  window.scrollTo(0, 0);
}

document.querySelectorAll('.nav-item[data-page]').forEach(el => {
  el.addEventListener('click', () => navigate(el.dataset.page));
});

// ── PAGE DISPATCHER ───────────────────────────────────────────────────────────
function renderPage(page, container) {
  container.dataset.rendered = '1';
  if (UNITS[page])    renderUnitPage(page, container);
  else if (page === 'bespoke') renderBespokePage(container);
  else if (page === 'mocks')   renderMocksPage(container);
}

// ── UNIT PAGE ─────────────────────────────────────────────────────────────────
function renderUnitPage(key, container) {
  const u = UNITS[key];
  const formats = Object.keys(u.formats);
  if (!unitState[key]) unitState[key] = { format: formats[0], varIdx: 0 };

  container.innerHTML = `
    <div class="page-inner">
      <div class="page-category">${u.label}</div>
      <h1 class="page-title">${u.name}</h1>
      <p class="page-desc">${u.desc}</p>
      <div class="page-meta">
        <div class="meta-col"><div class="meta-label">Dimensions</div><div class="meta-value">${u.dimensions}</div></div>
        <div class="meta-col"><div class="meta-label">Placement</div><div class="meta-value">${u.placement}</div></div>
      </div>
      <hr class="page-divider">
      <div class="format-tabs" id="tabs-${key}">
        ${formats.map(f => `<button class="format-tab ${f===unitState[key].format?'active':''}" data-format="${f}">${f}</button>`).join('')}
      </div>
      <div class="unit-stage-wrap">
        <div id="stage-${key}" class="unit-stage"></div>
        <div class="variation-nav" id="varnav-${key}">
          <button class="var-arrow" id="prev-${key}">←</button>
          <div class="var-dots" id="dots-${key}"></div>
          <button class="var-arrow" id="next-${key}">→</button>
        </div>
        <div class="var-caption" id="caption-${key}"></div>
      </div>
    </div>`;

  container.querySelectorAll('.format-tab').forEach(tab => {
    tab.addEventListener('click', () => switchFormat(key, tab.dataset.format));
  });
  document.getElementById(`prev-${key}`).addEventListener('click', () => changeVar(key, -1));
  document.getElementById(`next-${key}`).addEventListener('click', () => changeVar(key,  1));

  renderStage(key);
}

function renderStage(key) {
  const u = UNITS[key];
  const s = unitState[key];
  const vars = u.formats[s.format];
  const stage = document.getElementById('stage-' + key);
  if (!stage) return;

  stage.innerHTML = '';
  stage.appendChild(buildCard(key, vars[s.varIdx]));

  renderDots(key, vars.length);
  setCaption(key, vars[s.varIdx].caption);
  updateArrows(key, vars.length);

  if (vars[s.varIdx].type === 'video') initVideo(key, u.videoQuery);
}

function buildCard(key, variation) {
  const card = document.createElement('div');
  card.className = 'unit-card';
  card.id = 'card-' + key;

  if (variation.type === 'video') {
    card.classList.add('video-unit');
    card.innerHTML = `
      <div class="video-shimmer"></div>
      <video muted loop playsinline style="width:100%;display:block;min-height:120px;"></video>
      <button class="lm-btn">Learn More</button>
      <div class="vc-overlay">
        <button class="vc-btn pp">⏸</button>
        <button class="vc-btn mu">🔊</button>
      </div>
      <img class="d-badge" src="assets/brand/d-icon.svg" alt="">`;
  } else {
    card.innerHTML = `
      <img class="main-img" src="${variation.src}" alt="" loading="lazy">
      <img class="d-badge" src="assets/brand/d-icon.svg" alt="">`;
  }
  return card;
}

// ── FORMAT SWITCH ─────────────────────────────────────────────────────────────
function switchFormat(key, format) {
  unitState[key].format = format;
  unitState[key].varIdx = 0;

  document.querySelectorAll(`#tabs-${key} .format-tab`).forEach(t => {
    t.classList.toggle('active', t.dataset.format === format);
  });

  const stage = document.getElementById('stage-' + key);
  if (!stage) return;
  stage.style.transition = 'opacity 150ms';
  stage.style.opacity = '0';
  setTimeout(() => {
    renderStage(key);
    stage.style.opacity = '1';
  }, 150);
}

// ── 3D VARIATION CHANGE ───────────────────────────────────────────────────────
function changeVar(key, dir) {
  const s = unitState[key];
  const vars = UNITS[key].formats[s.format];
  const newIdx = s.varIdx + dir;
  if (newIdx < 0 || newIdx >= vars.length || isAnimating) return;
  goToVar(key, newIdx, dir);
}

function goToVar(key, newIdx, dir) {
  if (isAnimating) return;
  isAnimating = true;

  const u = UNITS[key];
  const s = unitState[key];
  const vars = u.formats[s.format];
  const stage = document.getElementById('stage-' + key);
  const oldCard = stage ? stage.querySelector('.unit-card') : null;

  // Exit old card
  if (oldCard) {
    const exitX = dir > 0 ? '-50px' : '50px';
    const exitRot = dir > 0 ? '-10deg' : '10deg';
    oldCard.style.transition = 'transform 280ms ease, opacity 280ms ease';
    oldCard.style.transform = `perspective(1100px) rotateY(${exitRot}) translateX(${exitX})`;
    oldCard.style.opacity = '0';
  }

  setTimeout(() => {
    s.varIdx = newIdx;
    if (stage) {
      stage.innerHTML = '';
      const newCard = buildCard(key, vars[newIdx]);
      // Start from the opposite direction
      const enterX = dir > 0 ? '50px' : '-50px';
      const enterRot = dir > 0 ? '10deg' : '-10deg';
      newCard.style.transform = `perspective(1100px) rotateY(${enterRot}) translateX(${enterX})`;
      newCard.style.opacity = '0';
      newCard.style.transition = 'none';
      stage.appendChild(newCard);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newCard.style.transition = 'transform 300ms ease, opacity 300ms ease';
          newCard.style.transform = 'perspective(1100px) rotateY(0deg) translateX(0)';
          newCard.style.opacity = '1';
        });
      });

      if (vars[newIdx].type === 'video') setTimeout(() => initVideo(key, u.videoQuery), 50);
    }

    renderDots(key, vars.length);
    setCaption(key, vars[newIdx].caption);
    updateArrows(key, vars.length);

    setTimeout(() => { isAnimating = false; }, 320);
  }, 280);
}

// ── DOTS / CAPTION / ARROWS ───────────────────────────────────────────────────
function renderDots(key, total) {
  const el = document.getElementById('dots-' + key);
  if (!el) return;
  el.innerHTML = Array.from({length:total}, (_,i) =>
    `<span class="var-dot ${i===unitState[key].varIdx?'active':''}" data-i="${i}"></span>`
  ).join('');
  el.querySelectorAll('.var-dot').forEach(d => {
    d.addEventListener('click', () => {
      const i = parseInt(d.dataset.i);
      const dir = i > unitState[key].varIdx ? 1 : -1;
      if (i !== unitState[key].varIdx) goToVar(key, i, dir);
    });
  });
}

function setCaption(key, text) {
  const el = document.getElementById('caption-' + key);
  if (el) { el.style.opacity='0'; setTimeout(()=>{ el.textContent=text||''; el.style.opacity='1'; },160); }
}

function updateArrows(key, total) {
  const s = unitState[key];
  const prev = document.getElementById('prev-' + key);
  const next = document.getElementById('next-' + key);
  if (prev) prev.disabled = s.varIdx === 0;
  if (next) next.disabled = s.varIdx === total - 1;
  const nav = document.getElementById('varnav-' + key);
  if (nav) nav.style.display = total <= 1 ? 'none' : 'flex';
}

// ── PEXELS VIDEO ──────────────────────────────────────────────────────────────
async function fetchClip(query) {
  if (videoCache[query]) return videoCache[query];
  try {
    const r = await fetch(
      `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      { headers:{ Authorization: PEXELS_KEY } }
    );
    const d = await r.json();
    const files = d.videos?.[0]?.video_files || [];
    const f = files.find(x => x.quality==='sd') || files[0];
    const url = f?.link || null;
    if (url) videoCache[query] = url;
    return url;
  } catch(e) { return null; }
}

function initVideo(key, query) {
  const card = document.getElementById('card-' + key);
  if (!card) return;
  const video = card.querySelector('video');
  const shimmer = card.querySelector('.video-shimmer');
  const pp = card.querySelector('.pp');
  const mu = card.querySelector('.mu');
  if (!video) return;

  fetchClip(query).then(url => {
    if (!url) { shimmer && shimmer.remove(); return; }
    video.src = url;
    video.addEventListener('canplay', () => {
      shimmer && (shimmer.style.display = 'none');
      video.play().catch(() => { if(pp) pp.textContent='▶'; });
    }, {once:true});
  });

  if (pp) pp.addEventListener('click', () => {
    if (video.paused) { video.play(); pp.textContent='⏸'; }
    else { video.pause(); pp.textContent='▶'; }
  });
  if (mu) mu.addEventListener('click', () => {
    video.muted = !video.muted;
    mu.textContent = video.muted ? '🔇' : '🔊';
  });
}

// ── BESPOKE PAGE ──────────────────────────────────────────────────────────────
function renderBespokePage(container) {
  container.innerHTML = `
    <div class="page-inner">
      <div class="page-category">Custom</div>
      <h1 class="page-title">Bespoke Units</h1>
      <p class="page-desc">Fully custom native integrations built to match any publisher's editorial environment.</p>
      <hr class="page-divider">
      <div class="bespoke-grid">
        <div class="bespoke-card" onclick="openLightbox('assets/Screenshots/Custom/Custom-1.png')">
          <img src="assets/Screenshots/Custom/Custom-1.png" alt="Custom unit 1" loading="lazy">
          <div class="bespoke-label">Custom integration 01</div>
        </div>
        <div class="bespoke-card" onclick="openLightbox('assets/Screenshots/Custom/Custom-2.png')">
          <img src="assets/Screenshots/Custom/Custom-2.png" alt="Custom unit 2" loading="lazy">
          <div class="bespoke-label">Custom integration 02</div>
        </div>
      </div>
    </div>`;
}

// ── MOCKS PAGE ────────────────────────────────────────────────────────────────
function renderMocksPage(container) {
  mockState = { idx:0, view:'desktop' };

  container.innerHTML = `
    <div class="page-inner">
      <div class="page-category">Real Work</div>
      <h1 class="page-title">Publisher Mocks</h1>
      <p class="page-desc">Real implementations across leading financial publishers.</p>
      <hr class="page-divider">
      <div class="mock-tabs" id="mock-tabs">
        ${MOCKS.map((m,i) => `<button class="mock-tab ${i===0?'active':''}" data-idx="${i}">${m.name}</button>`).join('')}
      </div>
      <div class="mock-layout">
        <div class="mock-meta" id="mock-meta"></div>
        <div class="mock-frame-area">
          <div class="device-toggle" id="device-toggle" style="display:none;">
            <button class="device-btn active" data-view="desktop">🖥 Desktop</button>
            <button class="device-btn" data-view="mobile">📱 Mobile</button>
          </div>
          <div class="mock-frame" id="mock-frame">
            <img id="mock-img" src="" alt="" loading="lazy">
            <div class="scroll-hint" id="scroll-hint">↓ scroll to explore</div>
          </div>
        </div>
      </div>
    </div>`;

  container.querySelectorAll('.mock-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      mockState.idx = parseInt(tab.dataset.idx);
      mockState.view = 'desktop';
      container.querySelectorAll('.mock-tab').forEach(t => t.classList.toggle('active', t===tab));
      container.querySelectorAll('.device-btn').forEach(b => b.classList.toggle('active', b.dataset.view==='desktop'));
      loadMock();
    });
  });

  container.querySelectorAll('.device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      mockState.view = btn.dataset.view;
      container.querySelectorAll('.device-btn').forEach(b => b.classList.toggle('active', b===btn));
      applyMockView();
    });
  });

  const frame = document.getElementById('mock-frame');
  const hint  = document.getElementById('scroll-hint');
  if (frame && hint) frame.addEventListener('scroll', () => hint.classList.add('hidden'), {once:true});

  loadMock();
}

function loadMock() {
  const mock = MOCKS[mockState.idx];
  const metaEl  = document.getElementById('mock-meta');
  const toggle  = document.getElementById('device-toggle');
  const frame   = document.getElementById('mock-frame');
  const img     = document.getElementById('mock-img');
  const hint    = document.getElementById('scroll-hint');

  if (metaEl) metaEl.innerHTML = `
    <div class="mock-meta-item"><div class="meta-label">Publisher</div><div class="meta-value">${mock.name}</div></div>
    <div class="mock-meta-item"><div class="meta-label">Format</div><div class="meta-value">${mock.format}</div></div>
    <div class="mock-meta-item"><div class="meta-label">Placement</div><div class="meta-value">${mock.placement}</div></div>
    <div class="mock-meta-item"><div class="meta-label">Unit Size</div><div class="meta-value">${mock.size}</div></div>`;

  if (toggle) toggle.style.display = mock.mobile ? 'flex' : 'none';

  if (frame && img) {
    frame.style.opacity = '0';
    frame.style.transition = 'opacity 150ms';
    frame.scrollTop = 0;
    if (hint) hint.classList.remove('hidden');
    img.src = mock.desktop;
    img.onload = () => { frame.style.opacity = '1'; };
  }

  applyMockView();
}

function applyMockView() {
  const mock  = MOCKS[mockState.idx];
  const frame = document.getElementById('mock-frame');
  const img   = document.getElementById('mock-img');
  if (!frame) return;

  frame.classList.toggle('mobile-view', mockState.view==='mobile' && !!mock.mobile);

  if (img) {
    const src = mockState.view==='mobile' && mock.mobile ? mock.mobile : mock.desktop;
    if (!img.src.endsWith(src)) img.src = src;
  }
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function openLightbox(src) {
  document.getElementById('lightbox-img').src = src;
  document.getElementById('lightbox').classList.add('open');
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
}
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});

// ── BOOT ──────────────────────────────────────────────────────────────────────
navigate('hero');
