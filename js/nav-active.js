
document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('nav a');
  const raw = (location.pathname || '').split('/').pop() || 'index.html';
  const currentFile = raw.split('?')[0].split('#')[0].toLowerCase();

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    
    if (href.startsWith('#')) {
      if (location.hash === href) link.classList.add('active');
      return;
    }

    const linkFile = href.split('/').pop().split('?')[0].split('#')[0].toLowerCase();
    if (linkFile === currentFile) {
      link.classList.add('active');
    }
  });
});
