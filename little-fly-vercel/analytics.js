(function () {
  'use strict';
  const id = window.LITTLE_FLY_CONFIG?.googleAnalyticsId?.trim();
  if (!/^G-[A-Z0-9]+$/.test(id || '')) return;
  // Keep local development and downloaded copies out of your visitor statistics.
  if (!/^https?:$/.test(location.protocol) || ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: location.origin + location.pathname
  });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
  document.head.appendChild(script);
})();
