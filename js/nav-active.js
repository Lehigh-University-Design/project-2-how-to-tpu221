// nav-active.js
// Adds the "active" class to the current page's navigation link.
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('nav a');
  const raw = (location.pathname || '').split('/').pop() || 'index.html';
  const currentFile = raw.split('?')[0].split('#')[0].toLowerCase();

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Fragment links (single page anchors)
    if (href.startsWith('#')) {
      if (location.hash === href) link.classList.add('active');
      return;
    }

    // Get filename portion of the link (handles ../html/video.html, html/video.html, video.html)
    const linkFile = href.split('/').pop().split('?')[0].split('#')[0].toLowerCase();
    if (linkFile === currentFile) {
      link.classList.add('active');
    }
  });
});
