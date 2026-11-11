/*
  RÉGLAGES DU SITE — à modifier ici, nulle part ailleurs.
  Prix recommandé par le mémo du 11/11/2026 (prix-et-conformite/00-memo-decision.md),
  PAS encore décidé par Joseph. Option annuelle : à confirmer.
*/
window.SITE_CONFIG = {
  prixMensuel: 99,                                      // euros par mois
  mentionTVA: "TVA non applicable (art. 293 B du CGI)", // franchise en base ; si TVA un jour : "HT"
  prixStatut: "",                                       // interne : "à valider par Joseph" ; "" = étiquette masquée
  prixAnnuel: 990,                                      // option annuelle (2 mois offerts) ; null pour la retirer
  prixAnnuelStatut: "",                                 // interne : option annuelle à confirmer ; "" = ne pas l'afficher
  fraisCreation: 0,
  emailContact: "",                                     // [ADRESSE D'ENVOI] à choisir par Joseph (pas la boîte de l'assistant) ; vide = formulaire inactif
  apercu: true                                          // true = bandeau « Aperçu non public »
};
