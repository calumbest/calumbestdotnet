/**
 * Copy as Markdown — fetches the raw .md version of the post and copies it to clipboard.
 */
(function () {
  'use strict';

  var btn = document.querySelector('.copy-markdown-btn');
  if (!btn) return;

  btn.addEventListener('click', function () {
    var mdUrl = btn.getAttribute('data-md-url');
    if (!mdUrl) return;

    fetch(mdUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('Could not fetch markdown');
        return res.text();
      })
      .then(function (text) {
        return navigator.clipboard.writeText(text.trim());
      })
      .then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy as Markdown';
          btn.classList.remove('copied');
        }, 2000);
      })
      .catch(function (err) {
        console.error('Copy failed:', err);
        btn.textContent = 'Copy failed';
        setTimeout(function () {
          btn.textContent = 'Copy as Markdown';
        }, 2000);
      });
  });
})();
