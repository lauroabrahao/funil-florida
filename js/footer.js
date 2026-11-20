(function () {
  var KEY = 'realize-cookies';
  function get() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      if (raw === 'aceito') return { analytics: true, marketing: true };
      if (raw === 'rejeitado') return { analytics: false, marketing: false };
      var v = JSON.parse(raw);
      return v && typeof v === 'object' ? v : null;
    } catch (e) { return null; }
  }
  function set(analytics, marketing) {
    try { localStorage.setItem(KEY, JSON.stringify({ analytics: !!analytics, marketing: !!marketing, t: new Date().toISOString() })); } catch (e) {}
  }
  // aplica a escolha: liga o Pixel se autorizou marketing; se tirou a autorização, avisa o Pixel e recarrega a página
  function aplicar(prev, analytics, marketing) {
    var bar = document.getElementById('cookie2');
    if (bar) bar.hidden = true;
    if (marketing) {
      if (window.startPixel) window.startPixel();
    } else if (prev && prev.marketing) {
      try { if (window.fbq) fbq('consent', 'revoke'); } catch (e) {}
      location.reload();
    }
  }

  // ---------- Janela das páginas legais e das preferências ----------
  var modal = document.getElementById('legal');
  var body = document.getElementById('legal-body');
  var closeBtn = document.getElementById('legal-close');
  var lastFocus = null;

  function bindPreferencias() {
    var cur = get() || { analytics: false, marketing: false };
    var a = document.getElementById('pref-analytics'), m = document.getElementById('pref-marketing');
    if (a) a.checked = !!cur.analytics;
    if (m) m.checked = !!cur.marketing;
    var save = document.getElementById('pref-save'), all = document.getElementById('pref-all');
    if (save) save.onclick = function () {
      var prev = get(); var an = a && a.checked, mk = m && m.checked;
      set(an, mk); closeLegal(); aplicar(prev, an, mk);
    };
    if (all) all.onclick = function () {
      var prev = get(); set(true, true); closeLegal(); aplicar(prev, true, true);
    };
  }

  function openLegal(name) {
    var tpl = document.getElementById('tpl-' + name);
    if (!tpl || !modal) return;
    lastFocus = document.activeElement;
    body.innerHTML = '';
    body.appendChild(tpl.content.cloneNode(true));
    if (name === 'preferencias') bindPreferencias();
    modal.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    modal.scrollTop = 0;
    var panel = modal.querySelector('.legal-panel');
    if (panel) panel.scrollTop = 0;
    if (closeBtn) closeBtn.focus();
  }
  function closeLegal() {
    if (!modal) return;
    modal.hidden = true;
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-legal]') : null;
    if (t) { e.preventDefault(); openLegal(t.getAttribute('data-legal')); return; }
    if (e.target === modal) closeLegal();
  });
  if (closeBtn) closeBtn.addEventListener('click', closeLegal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && !modal.hidden) closeLegal();
  });

  // ---------- Aviso de cookies: aceitar todos / rejeitar não essenciais / gerenciar preferências ----------
  var bar = document.getElementById('cookie2');
  if (bar && !get()) bar.hidden = false;

  var accept = document.getElementById('cookie-accept');
  var reject = document.getElementById('cookie-reject');
  if (accept) accept.addEventListener('click', function () { var prev = get(); set(true, true); aplicar(prev, true, true); });
  if (reject) reject.addEventListener('click', function () { var prev = get(); set(false, false); aplicar(prev, false, false); });
})();
