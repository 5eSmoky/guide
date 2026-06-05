(function () {
  var panels = document.querySelectorAll('details.accordion');

  // When a section opens, bring its heading to the top so guests start at the beginning.
  panels.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        requestAnimationFrame(function () {
          d.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    });
  });

  // Open the targeted section when a nav link (or any in-page #link) is used,
  // instead of scrolling guests to a collapsed header.
  function openTarget(hash) {
    if (!hash || hash.length < 2) return;
    var sec = document.querySelector(hash);
    if (!sec) return;
    var d = sec.querySelector('details.accordion');
    if (d && !d.open) {
      d.open = true; // exclusive accordion (name="guide") closes the others
    }
    requestAnimationFrame(function () {
      (d || sec).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var hash = a.getAttribute('href');
      if (hash && hash.length > 1) {
        e.preventDefault();
        openTarget(hash);
        if (history.replaceState) history.replaceState(null, '', hash);
      }
    });
  });

  // If someone arrives with a hash in the URL, open that section.
  if (location.hash) {
    setTimeout(function () { openTarget(location.hash); }, 60);
  }
})();
