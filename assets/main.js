(function () {
  var c = window.SITE_CONFIG || {};
  var euro = function (n) { return String(n).replace('.', ',') + '\u00a0€'; };
  var ht = c.mentionTVA === 'HT';
  document.querySelectorAll('[data-prix]').forEach(function (el) { el.textContent = euro(c.prixMensuel) + (ht ? '\u00a0HT' : ''); });
  document.querySelectorAll('[data-prix-tva]').forEach(function (el) {
    el.textContent = ht ? 'par mois, hors taxes' : 'par mois, ' + c.mentionTVA;
  });
  document.querySelectorAll('[data-annuel]').forEach(function (el) {
    if (!c.prixAnnuel) { el.remove(); return; }
    var t = 'Ou ' + euro(c.prixAnnuel) + ' par an, payés d\u2019avance (' + Math.round(12 - c.prixAnnuel / c.prixMensuel) + '\u00a0mois offerts)';
    el.textContent = t + (c.prixAnnuelStatut ? ' \u2014 ' + c.prixAnnuelStatut : '') + '.';
  });
  document.querySelectorAll('[data-creation]').forEach(function (el) { el.textContent = euro(c.fraisCreation); });
  document.querySelectorAll('[data-prix-statut]').forEach(function (el) {
    if (c.prixStatut) { el.textContent = 'Aperçu : prix ' + c.prixStatut; el.hidden = false; }
    else { el.hidden = true; }
  });
  document.querySelectorAll('[data-email]').forEach(function (el) {
    if (!c.emailContact) return; // reste « [ADRESSE D'ENVOI] » tant que Joseph n'a pas choisi
    var a = document.createElement('a'); a.href = 'mailto:' + c.emailContact; a.textContent = c.emailContact;
    el.replaceWith(a);
  });
  var banner = document.querySelector('.apercu');
  if (banner && !c.apercu) banner.remove();

  // Menu mobile
  var t = document.querySelector('.menu-toggle'), nav = document.getElementById('nav');
  if (t && nav) {
    t.addEventListener('click', function () {
      var open = t.getAttribute('aria-expanded') === 'true';
      t.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('open', !open);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { t.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); });
    });
  }

  // Formulaire : aucun serveur. Il prépare un e-mail dans la messagerie du visiteur, qui choisit de l'envoyer ou non.
  var f = document.getElementById('contact-form');
  if (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!c.emailContact) {
        var n = document.getElementById('form-etat');
        if (n) n.textContent = 'Le formulaire n\u2019est pas encore actif. Rien n\u2019est envoyé.';
        return;
      }
      var d = new FormData(f);
      var body = 'Entreprise : ' + (d.get('entreprise') || '') + '\nSite actuel : ' + (d.get('site') || '') +
        '\nMétier et ville : ' + (d.get('metier') || '') + '\n\n' + (d.get('message') || '');
      window.location.href = 'mailto:' + c.emailContact + '?subject=' +
        encodeURIComponent('Mon site : ' + (d.get('site') || d.get('entreprise') || '')) + '&body=' + encodeURIComponent(body);
    });
  }
})();
