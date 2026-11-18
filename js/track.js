(function () {
  var C = window.FUNIL || {};

  // Meta Pixel (só carrega se houver ID)
  if (C.PIXEL_ID) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', C.PIXEL_ID);
    fbq('track', 'PageView');
  }

  // Variante do teste A/B (definida em <body data-variant>)
  var variant = document.body.getAttribute('data-variant');
  if (variant) { try { localStorage.setItem('realize-variante', variant); } catch (e) {} }
  window.VARIANTE = variant || (function () { try { return localStorage.getItem('realize-variante'); } catch (e) { return null; } })() || 'a';
  if (variant && window.fbq) fbq('trackCustom', 'VarianteVista', { variante: variant });

  window.track = function (name, data, custom) {
    if (!window.fbq) return;
    fbq(custom ? 'trackCustom' : 'track', name, data || {});
  };

  window.waLink = function (text) {
    var n = (C.WHATSAPP || '').replace(/\D/g, '');
    return 'https://wa.me/' + n + (text ? '?text=' + encodeURIComponent(text) : '');
  };

  // Links de WhatsApp genéricos
  document.querySelectorAll('[data-wa]').forEach(function (a) {
    var motivo = a.getAttribute('data-motivo');
    a.href = waLink('Olá! Vi o vídeo da Mara e quero fazer a avaliação gratuita do meu caso com um profissional qualificado.' + (motivo ? ' Meu principal motivo: ' + motivo + '.' : ''));
    a.target = '_blank'; a.rel = 'noopener';
    a.addEventListener('click', function () { track('Contact', { content_name: 'whatsapp_direto', motivo: a.getAttribute('data-motivo') || '' }); });
  });
  document.querySelectorAll('[data-cta]').forEach(function (a) {
    a.addEventListener('click', function () { track('CliqueAgendar', { local: a.getAttribute('data-cta') }, true); });
  });
  document.querySelectorAll('[data-reviews]').forEach(function (a) { a.href = C.GOOGLE_REVIEWS_URL || '#'; });
})();
