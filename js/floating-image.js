// floating-image.js
// Inserts a floating image at the right side of the viewport and moves it slightly on scroll.
(function () {
  if (!('querySelector' in document)) return;

  // choose image path that works both from pages in /html/ and from root index.html
  const isInHtmlFolder = location.pathname.split('/').includes('html');
  const imagePath = isInHtmlFolder ? '../css/assests/progression.png' : 'css/assests/progression.png';

  // clickable wrapper that links to the progression page
  const linkHref = isInHtmlFolder ? 'progression.html' : 'html/progression.html';
  const wrapper = document.createElement('a');
  wrapper.href = linkHref;
  wrapper.className = 'floating-image';
  wrapper.setAttribute('aria-label', 'Open Progression page');

  const img = document.createElement('img');
  img.src = imagePath;
  img.alt = 'Progression';
  img.style.width = '100%';
  img.style.display = 'block';
  img.style.borderRadius = '8px';

  wrapper.appendChild(img);
  document.body.appendChild(wrapper);

  let lastScroll = window.scrollY;
  function update() {
    const scroll = window.scrollY;
    const delta = (scroll - lastScroll) * 0.2; // subtle movement
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

  // Keep it responsive on resize
  window.addEventListener('resize', () => { wrapper.style.maxWidth = '22vw'; });
})();
