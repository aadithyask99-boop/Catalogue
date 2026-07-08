// Pexels API key — client-side is acceptable for Pexels (rate-limited, low-risk),
// but for production consider proxying through a serverless function to hide it.
const PEXELS_API_KEY = '1OzprTAbWQCPVn9OoF02cSelNJetTLGwYjF6wR186DB4sDCgUZSJ2Qg3';

async function fetchStockClip(query) {
  const res = await fetch(
    `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
    { headers: { Authorization: PEXELS_API_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
  const data = await res.json();
  const files = data.videos?.[0]?.video_files || [];
  // Prefer sd quality for fast load; fall back to whatever's available
  const file = files.find(f => f.quality === 'sd') || files[0];
  return file?.link || null;
}

async function fetchStockPhoto(query) {
  const res = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`,
    { headers: { Authorization: PEXELS_API_KEY } }
  );
  if (!res.ok) throw new Error(`Pexels photo API error: ${res.status}`);
  const data = await res.json();
  return data.photos?.[0]?.src?.medium || null;
}

function initListThumbs(unit) {
  unit.querySelectorAll('.list-thumb').forEach(thumb => {
    const query = thumb.dataset.photoQuery || 'business';
    const img = thumb.querySelector('img');
    fetchStockPhoto(query)
      .then(url => { if (url) img.src = url; })
      .catch(err => console.error('Photo load failed for', query, err));
  });
}

function initUnit(unit) {
  const query = unit.dataset.query || 'business';
  const video = unit.querySelector('video');
  const shimmer = unit.querySelector('.loading-shimmer');
  const playPauseBtn = unit.querySelector('.play-pause');
  const muteBtn = unit.querySelector('.mute');

  fetchStockClip(query)
    .then(url => {
      if (!url) throw new Error('No video found');
      video.src = url;
      video.addEventListener('canplay', () => {
        shimmer.style.display = 'none';
        video.play().catch(() => {
          // autoplay may be blocked; show play icon so user can start manually
          playPauseBtn.textContent = '▶';
        });
      }, { once: true });
    })
    .catch(err => {
      console.error('Video load failed for', query, err);
      shimmer.style.display = 'none';
    });

  playPauseBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playPauseBtn.textContent = '⏸';
    } else {
      video.pause();
      playPauseBtn.textContent = '▶';
    }
  });

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });
}

document.querySelectorAll('.unit').forEach(unit => {
  initUnit(unit);
  initListThumbs(unit);
});
