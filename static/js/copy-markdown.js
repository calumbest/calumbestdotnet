/**
 * Copy as Markdown — fetches the raw .md version of the post and copies it to clipboard.
 * Pre-fetches the markdown so the copy happens synchronously on click,
 * preserving user activation for iOS Safari's clipboard API.
 */
(function () {
  'use strict';

  var btn = document.querySelector('.copy-markdown-btn');
  if (!btn) return;

  var mdUrl = btn.getAttribute('data-md-url');
  if (!mdUrl) return;

  var cachedText = null;

  // Pre-fetch the markdown content
  fetch(mdUrl)
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.text();
    })
    .then(function (text) {
      cachedText = text.trim();
    })
    .catch(function () {});

  function fallbackCopy(text) {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.setSelectionRange(0, text.length);
    try {
      document.execCommand('copy');
      return true;
    } catch (e) {
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function showResult(success) {
    btn.textContent = success ? 'Copied!' : 'Copy failed';
    if (success) btn.classList.add('copied');
    setTimeout(function () {
      btn.textContent = 'Copy as Markdown';
      btn.classList.remove('copied');
    }, 2000);
  }

  btn.addEventListener('click', function () {
    if (!cachedText) {
      showResult(false);
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(cachedText)
        .then(function () { showResult(true); })
        .catch(function () {
          showResult(fallbackCopy(cachedText));
        });
    } else {
      showResult(fallbackCopy(cachedText));
    }
  });
})();
