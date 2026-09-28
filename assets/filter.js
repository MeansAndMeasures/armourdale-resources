/* Optional filter for category pages and the all-records table.
   The site is fully readable without this file. */
(function () {
  var q = document.getElementById('q');
  if (!q) return;
  var controls = document.querySelector('.controls');
  var track = document.getElementById('track');
  var currency = document.getElementById('currency');
  var count = document.getElementById('count');
  var items = [].slice.call(document.querySelectorAll('[data-item]'));
  items.forEach(function (el) {
    el._text = el.textContent.toLowerCase().replace(/\s+/g, ' ');
  });

  function run() {
    var terms = q.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    var shown = 0;
    items.forEach(function (el) {
      var ok = (!track.value || el.dataset.track === track.value) &&
               (!currency.value || el.dataset.status === currency.value) &&
               terms.every(function (t) { return el._text.indexOf(t) !== -1; });
      el.classList.toggle('hidden', !ok);
      if (ok) shown++;
    });
    [].forEach.call(document.querySelectorAll('.track'), function (t) {
      var any = t.querySelector('[data-item]:not(.hidden)');
      t.classList.toggle('hidden', !any && !!(q.value || track.value || currency.value));
    });
    count.textContent = shown + ' of ' + items.length + ' records';
  }

  [q, track, currency].forEach(function (el) { el.addEventListener('input', run); });
  document.getElementById('reset').addEventListener('click', function () {
    q.value = ''; track.value = ''; currency.value = ''; run();
  });
  [].forEach.call(document.querySelectorAll('[data-print]'), function (b) {
    b.addEventListener('click', function () { window.print(); });
  });
  if (controls) controls.hidden = false;
  run();
})();
