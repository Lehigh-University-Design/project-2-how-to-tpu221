// floating-video.js
// Inserts a small looping muted video on the left side of the homepage that moves subtly with scroll.
(function () {
  if (!('querySelector' in document)) return;

  // Only run on the root index page
  const isRoot = !location.pathname.split('/').includes('html');
  if (!isRoot) return;

  const videoPath = 'css/assests/howtoplaygobetwixt.mp4';

  const wrapper = document.createElement('div');
  wrapper.className = 'floating-video';

  const video = document.createElement('video');
  video.src = videoPath;
  // set attributes for best autoplay compatibility and provide a graceful fallback
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  // start with controls hidden; we'll enable them if autoplay is blocked
  video.controls = false;
  // optional poster image (use an existing asset as a thumbnail)
  video.poster = 'css/assests/logo.png';
  video.setAttribute('aria-hidden', 'true');
  video.style.display = 'block';
  video.style.width = '100%';
  video.style.height = 'auto';

  wrapper.appendChild(video);
  document.body.appendChild(wrapper);

  // make the floating preview clickable to open the full video page
  wrapper.style.cursor = 'pointer';
  wrapper.tabIndex = 0; // focusable for keyboard users
  wrapper.setAttribute('role', 'link');
  wrapper.addEventListener('click', () => { location.href = 'html/video.html'; });
  wrapper.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') location.href = 'html/video.html'; });

  // subtle scroll movement
  let lastScroll = window.scrollY;
  function update() {
    const scroll = window.scrollY;
    const delta = (scroll - lastScroll) * 0.15;
    const current = parseFloat(wrapper.style.transform.replace('translateY(', '') || 0) || 0;
    const next = current + delta;
    wrapper.style.transform = `translateY(${next}px)`;
    lastScroll = scroll;
  }

  let raf = null;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { update(); raf = null; });
  });

  // start playback if allowed; if autoplay is blocked, enable controls so the user can play
  function tryPlay() {
    video.play().catch(() => {
      // autoplay failed (browser policy) — show controls so user can start playback
      try { video.controls = true; } catch (e) {}
    });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') tryPlay();
  else document.addEventListener('DOMContentLoaded', tryPlay);
})();
