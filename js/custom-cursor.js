// custom-cursor.js
// Creates a DOM element that follows the user's pointer and uses the site logo as a cursor.
(function () {
  if (!('querySelector' in document)) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor cursor-hidden';
  document.documentElement.appendChild(cursor);

  let supportsPointer = true;
  // Early exit on touch-only devices
  if (('ontouchstart' in window) || navigator.maxTouchPoints > 0) {
    supportsPointer = false;
  }

  function init() {
    if (!supportsPointer) return;
    document.body.classList.add('has-custom-cursor');
    cursor.style.display = 'block';

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', () => cursor.classList.add('cursor-hover'));
    window.addEventListener('mouseup', () => cursor.classList.remove('cursor-hover'));
    window.addEventListener('mouseleave', () => cursor.classList.add('cursor-hidden'));
    window.addEventListener('mouseenter', () => cursor.classList.remove('cursor-hidden'));

    // add hover class when over interactive elements
    document.addEventListener('mouseover', (e) => {
      const el = e.target;
      if (el && (el.tagName === 'A' || el.tagName === 'BUTTON' || el.closest && el.closest('a,button'))) {
        cursor.classList.add('cursor-hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      const el = e.target;
      if (el && (el.tagName === 'A' || el.tagName === 'BUTTON' || (el.closest && el.closest('a,button')))) {
        cursor.classList.remove('cursor-hover');
      }
    });
  }

  let raf = null;
  let lastX = 0, lastY = 0;
  function onMove(e) {
    lastX = e.clientX;
    lastY = e.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      cursor.style.transform = `translate(${lastX}px, ${lastY}px)`;
      raf = null;
    });
  }

  // init after DOM ready
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
