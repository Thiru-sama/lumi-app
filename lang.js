// Shows the English or French text: ?lang= first, then the saved choice, then the browser language.
(function () {
  var root = document.documentElement;
  var param = new URLSearchParams(location.search).get('lang');
  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) {}
  var lang = param || saved || ((navigator.language || 'en').slice(0, 2) === 'fr' ? 'fr' : 'en');
  if (lang !== 'fr' && lang !== 'en') lang = 'en';

  function apply(l) {
    root.lang = l;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === l));
    });
    var t = root.dataset['title' + l.toUpperCase()];
    if (t) document.title = t;
  }

  apply(lang);
  document.addEventListener('DOMContentLoaded', function () {
    apply(root.lang);
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.dataset.set);
        try { localStorage.setItem('lang', b.dataset.set); } catch (e) {}
      });
    });
  });
})();
