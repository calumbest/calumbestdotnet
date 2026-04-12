/**
 * Sidenotes — converts standard Markdown footnotes into margin sidenotes.
 *
 * How it works:
 * 1. Hugo renders Markdown footnotes as:
 *    - Inline references: <sup><a href="#fn:1">1</a></sup>  (inside <a> with class "footnote-ref")
 *    - Footnote list: <section class="footnotes"> at the bottom
 * 2. On wide screens (>= 1040px), this script:
 *    - Finds each footnote reference in the post content
 *    - Grabs the corresponding footnote text
 *    - Creates a .sidenote element positioned in the right margin
 *    - Hides the original footnotes section
 * 3. On narrow screens, it does nothing (footnotes remain as-is).
 * 4. On resize, it recalculates or toggles between modes.
 */
(function () {
  'use strict';

  var BREAKPOINT = 1040;
  var postContent = document.querySelector('.post-content');
  if (!postContent) return;

  var footnotesSection = postContent.querySelector('.footnotes');
  if (!footnotesSection) return;

  var footnoteRefs = postContent.querySelectorAll('a.footnote-ref');
  if (footnoteRefs.length === 0) return;

  // Collect footnote data
  var footnotes = [];
  footnoteRefs.forEach(function (ref) {
    var sup = ref.parentElement; // <sup> wrapping the <a>
    var id = ref.getAttribute('href').replace('#', '');
    var footnoteItem = document.getElementById(id);
    if (!footnoteItem) return;

    // Clone the footnote content, removing the backref link
    var content = footnoteItem.cloneNode(true);
    var backrefs = content.querySelectorAll('.footnote-backref');
    backrefs.forEach(function (br) { br.remove(); });

    // Get the number from the link text
    var number = ref.textContent;

    footnotes.push({
      ref: sup,
      number: number,
      html: content.innerHTML
    });
  });

  var sidenoteEls = [];

  function createSidenotes() {
    // Clean up any existing sidenotes
    removeSidenotes();

    if (window.innerWidth < BREAKPOINT) return;

    postContent.classList.add('has-sidenotes');

    footnotes.forEach(function (fn, i) {
      var sidenote = document.createElement('span');
      sidenote.className = 'sidenote';
      sidenote.innerHTML =
        '<span class="sidenote-number">' + fn.number + '</span> ' +
        fn.html.trim();

      // Insert sidenote as a child of post-content, positioned next to the ref
      postContent.appendChild(sidenote);

      // Position vertically aligned with the reference
      var refRect = fn.ref.getBoundingClientRect();
      var contentRect = postContent.getBoundingClientRect();
      var top = refRect.top - contentRect.top;

      // Prevent overlap with previous sidenote
      if (i > 0 && sidenoteEls[i - 1]) {
        var prevBottom = parseFloat(sidenoteEls[i - 1].style.top) +
          sidenoteEls[i - 1].offsetHeight + 8;
        if (top < prevBottom) {
          top = prevBottom;
        }
      }

      sidenote.style.top = top + 'px';
      sidenoteEls.push(sidenote);
    });
  }

  function removeSidenotes() {
    sidenoteEls.forEach(function (el) { el.remove(); });
    sidenoteEls = [];
    postContent.classList.remove('has-sidenotes');
  }

  // Initialize
  createSidenotes();

  // Recalculate on resize (debounced)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(createSidenotes, 150);
  });
})();
