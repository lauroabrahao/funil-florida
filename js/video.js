(function () {
  var C = window.FUNIL || {};
  var box = document.getElementById('video');
  if (!box) return;
  var v = box.querySelector('video');
  var btn = box.querySelector('.play');
  if (C.VIDEO_SRC) { v.src = C.VIDEO_SRC; if (C.VIDEO_POSTER) v.poster = C.VIDEO_POSTER; }
  var fired25 = false, fired50 = false, revealed = false, timer = null;
  var DELAY = (C.CTA_DELAY_SEC || 45) * 1000;

  function reveal() {
    if (revealed) return; revealed = true;
    ['cta-lock', 'sticky'].forEach(function (id) { var el = document.getElementById(id); if (el) el.hidden = false; });
    var h = document.getElementById('cta-hint'); if (h) h.hidden = true;
  }
  // Sem vídeo configurado (teste/rascunho): libera o botão na hora
  if (!C.VIDEO_SRC) reveal();

  // Ajusta o formato da caixa ao vídeo (vertical ou horizontal)
  v.addEventListener('loadedmetadata', function () {
    if (v.videoWidth && v.videoHeight) {
      box.style.aspectRatio = v.videoWidth + ' / ' + v.videoHeight;
      box.style.maxWidth = v.videoWidth > v.videoHeight ? '1200px' : '380px';
    }
  });

  btn.addEventListener('click', function () {
    if (!v.src) { alert('Vídeo ainda não configurado (VIDEO_SRC em js/config.js).'); return; }
    box.classList.add('playing');
    v.controls = true;
    v.play();
    track('ViewContent', { content_name: 'video_processo_compra' });
    if (!timer) timer = setTimeout(reveal, DELAY);
  });

  v.addEventListener('timeupdate', function () {
    if (!v.duration) return;
    var p = v.currentTime / v.duration;
    if (!fired25 && p >= .25) { fired25 = true; track('Video25', { content_name: 'video_processo_compra' }, true); }
    if (!fired50 && p >= .5) { fired50 = true; track('Video50', { content_name: 'video_processo_compra' }, true); reveal(); }
  });
})();
