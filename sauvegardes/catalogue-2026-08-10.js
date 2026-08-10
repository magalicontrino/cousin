/* Sauvegarde du catalogue COUSIN — 2026-08-10
   Copie du bloc de données de index.html, telle quelle.
   Repères ce jour-là : {"fiches":271,"formations":16,"mails":12,"centre":6}
   Pour restaurer : recoller ce bloc dans index.html à la place de l'ancien. */

<script>
/* ================= DONNÉES — reprises telles quelles de l'app actuelle ================= */
const GUIDES = {
  /* ARBRE D'ORIENTATION — pas un conseil juridique. Chaque réponse ne dit QUE ce que
     la formation CIRÉ de l'app dit déjà : rien n'est ajouté ici. Toute réponse renvoie
     vers une permanence spécialisée, parce que le droit des étrangers change souvent. */
  cartes: {
    start: "q1",
    nodes: {
      q1: {q:"Qu'est-ce que la personne a comme document de séjour ?", opts:[
        {t:"Une carte de séjour", go:"q2"},
        {t:"Une carte orange (en attente d'une décision)", go:"qo"},
        {t:"Rien — séjour irrégulier", go:"sp"},
        {t:"Je ne sais pas encore", go:"flou"}
      ]},

      q2: {q:"Quelle carte ?", opts:[
        {t:"A — séjour temporaire", go:"a"},
        {t:"B — séjour illimité", go:"illim"},
        {t:"K ou L — établissement, résident longue durée", go:"illim"},
        {t:"EU ou EU+ — citoyen de l'Union", go:"ue"},
        {t:"F ou F+ — famille d'un·e Belge ou d'un·e Européen·ne", go:"f"}
      ]},

      qo: {q:"La carte orange, c'est en attente de quoi ?", opts:[
        {t:"Une demande d'asile", go:"o_asile"},
        {t:"Un regroupement familial avec un·e Belge", go:"o_rf"},
        {t:"Une régularisation médicale (9 ter)", go:"o_9ter"},
        {t:"On ne sait pas", go:"o_flou"}
      ]},

      sp: {q:"Séjour irrégulier. Y a-t-il une piste de régularisation ?", opts:[
        {t:"Une maladie grave, et les soins n'existent pas au pays", go:"r9ter"},
        {t:"Une longue présence en Belgique et des attaches ici", go:"r9bis"},
        {t:"Aucune pour l'instant — juste les droits de base", go:"sp_base"}
      ]},

      a:     {r:"Carte A — séjour temporaire (1 à 5 ans) : réfugié, protection, regroupement familial, régularisé, étudiant, permis unique.\n\nTRAVAIL : oui. CPAS : oui.\n\nLes droits exacts dépendent du statut qui a donné la carte — c'est écrit sur la carte ou dans la décision."},
      illim: {r:"Carte B (illimité, après 5 ans de séjour ou régularisation illimitée), K (établissement) ou L (résident longue durée UE).\n\nTRAVAIL : oui. CPAS : oui.\n\nC'est le séjour le plus stable : les droits sont les plus larges."},
      ue:    {r:"Carte EU / EU+ — citoyen·ne de l'Union, séjour de plus de 3 mois ou permanent après 5 ans.\n\nTRAVAIL : oui. CPAS : sous conditions (ressources, durée du séjour).\n\nÀ vérifier avant de demander l'aide sociale."},
      f:     {r:"Carte F / F+ — membre de la famille d'un·e Belge ou d'un·e Européen·ne (regroupement familial).\n\nTRAVAIL : oui. CPAS : ATTENTION, demander l'aide sociale peut mettre le séjour en danger en regroupement familial.\n\nÀ ne jamais faire sans avis spécialisé."},

      o_asile:{r:"Demande d'asile en cours.\n\nTRAVAIL : possible après 4 mois. AIDE : Fedasil (accueil), pas le CPAS.\n\nLa carte orange dit que la procédure est en cours, pas qu'elle est gagnée."},
      o_rf:   {r:"Regroupement familial avec un·e Belge, en cours.\n\nTRAVAIL : immédiat.\n\nAttention : l'aide sociale peut peser sur la décision de séjour."},
      o_9ter: {r:"Régularisation médicale (9 ter) en cours.\n\nAIDE SOCIALE : oui pendant la procédure.\n\nLa procédure peut être longue : garder toutes les preuves médicales."},
      o_flou: {r:"Carte orange, motif inconnu : les droits dépendent entièrement de la procédure qui est derrière.\n\nÀ faire : regarder la décision ou l'annexe remise avec la carte, ou appeler la permanence. Sans ça, on ne peut rien affirmer."},

      r9ter:  {r:"Piste 9 TER — régularisation médicale : maladie grave ET soins inaccessibles dans le pays d'origine.\n\nÇa se prépare avec un médecin et une permanence juridique — jamais seul·e."},
      r9bis:  {r:"Piste 9 BIS — humanitaire : séjour irrégulier avec circonstances exceptionnelles et ancrage en Belgique.\n\nDécision discrétionnaire de l'Office des étrangers : rien n'est automatique. À monter avec une permanence."},
      sp_base:{r:"Séjour irrégulier — les droits qui restent, quoi qu'il arrive :\n\n• l'aide médicale urgente (AMU)\n• l'école, de 6 à 18 ans\n• aller en justice\n• se marier\n\nPas de travail, pas de CPAS."},

      flou:   {r:"Sans savoir quel document la personne a, on ne peut rien dire de ses droits — et se tromper ici peut lui coûter cher.\n\nÀ faire : lui demander de montrer sa carte ou son annexe, puis revenir ici."}
    }
  }
};

const DEMARCHES = [
  "Réquisitoire","Aide Médicale Urgente (AMU)","Carte médicale",
  "RIS (revenu d'intégration)","Adresse de référence","Domiciliation","Mutuelle",
  /* Ajoutés le 31/07/2026 : ces trois-là ne passent PAS par le CPAS mais par le fédéral
     (DGPH). On les met quand même ici, parce que c'est là qu'on vient chercher « où
     s'adresser » — et parce que le CPAS ou la mutuelle peuvent aider à les introduire. */
  "Reconnaissance du handicap (DGPH)","Carte de stationnement","Allocations handicap (ARR/AI)",
  "Autre"
];

/* Jeu d'icônes maison, style « bold » plein (currentColor). Le globe reste au trait. */
const ICONS = {
  demarche: '<path d="M12 1.8 22.6 6.9 12 12 1.4 6.9z"/><path d="M4.7 10.4 12 13.9l7.3-3.5 3.3 1.6L12 17.2 1.4 12.1z"/><path d="M4.7 15.2 12 18.7l7.3-3.5 3.3 1.6L12 22 1.4 16.8z"/>',
  medical:  '<rect x="9.3" y="4" width="5.4" height="16" rx="2.4"/><rect x="4" y="9.3" width="16" height="5.4" rx="2.4"/>',
  social:   '<circle cx="8" cy="8" r="3.1"/><circle cx="16.4" cy="8.6" r="2.6"/><path d="M2.6 19.6c0-3 2.4-5.2 5.4-5.2s5.4 2.2 5.4 5.2v.4H2.6z"/><path d="M14.8 14.5c2.6.1 4.6 2.3 4.6 5.1v.4h-3.1z"/>',
  educatif: '<path d="M12 3.6L1.4 8.3 12 13l10.6-4.7z"/><path d="M6 10.6V15c0 .9 2.7 2.5 6 2.5s6-1.6 6-2.5v-4.4l-6 2.7z"/><path d="M21.4 9v5.4"/>',
  juridique:'<circle cx="12" cy="4" r="1.4"/><rect x="11.1" y="4.8" width="1.8" height="15.4" rx=".9"/><rect x="5" y="19.2" width="14" height="2" rx="1"/><rect x="4.2" y="6.7" width="15.6" height="1.9" rx=".95"/><path d="M7.6 7.6l-3.2 5.9h6.4z"/><path d="M16.4 7.6l-3.2 5.9h6.4z"/>',
  globe:    '<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="2.1"/><path d="M3.4 12h17.2M12 3.4c3.1 3 3.1 14.2 0 17.2M12 3.4c-3.1 3-3.1 14.2 0 17.2" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>',
  mind:     '<path fill-rule="evenodd" d="M13.6 1.8a8.4 8.4 0 0 1 6.8 13.3c-.6.9-.9 1.5-.9 2.4v2.3a2.2 2.2 0 0 1-2.2 2.2h-5.9v-3.4H8.2a1.6 1.6 0 0 1-1.5-2.1l1-3.2H4.4a1.2 1.2 0 0 1-1-1.9l2.6-3.6a8.4 8.4 0 0 1 7.6-6zm.5 5.4a3.4 3.4 0 0 0-3.4 3.4h2.2a1.2 1.2 0 1 1 1.2 1.2 1.2 1.2 0 0 0-1.2 1.2v1.4h2.4v-.7a3.4 3.4 0 0 0-1.2-6.5z"/>',
  home:     '<path d="M12 3L2.4 11.2l1.5 1.8L5 12v8.5h5.2V15h3.6v5.5H19V12l1.1 1 1.5-1.8z"/>',
  alert:    '<path fill-rule="evenodd" d="M12 3.4L21.7 20.4H2.3zM11 8.8h2v5.4h-2zM11 15.6h2v2h-2z"/>',
  clipboard:'<rect x="2" y="2" width="9" height="9" rx="1.4"/><rect x="13" y="2" width="9" height="9" rx="1.4"/><rect x="2" y="13" width="9" height="9" rx="1.4"/><rect x="13" y="13" width="9" height="9" rx="1.4"/>',
  building: '<path d="M12 3 21.4 11.6v9.4H2.6v-9.4z"/>',
  bed:      '<path d="M3 10.6V7.2a1.1 1.1 0 0 1 2.2 0v3.4h4.6V9.2a1.5 1.5 0 0 1 1.5-1.5h6.1A3.6 3.6 0 0 1 21 11.3v6a1.1 1.1 0 0 1-2.2 0V16H5.2v1.3a1.1 1.1 0 0 1-2.2 0z"/>',
  compass:  '<circle cx="6.6" cy="6.6" r="5.2"/><circle cx="17.4" cy="6.6" r="5.2"/><circle cx="6.6" cy="17.4" r="5.2"/><circle cx="17.4" cy="17.4" r="5.2"/>',
  user:     '<circle cx="12" cy="7.4" r="4.8"/><path d="M12 13.6c4.6 0 8.4 3 8.4 6.8v1.2H3.6v-1.2c0-3.8 3.8-6.8 8.4-6.8z"/>',
  phone:    '<path d="M5.6 2.6h3.6l2 4.9-2.7 1.7a9.6 9.6 0 0 0 4.3 4.3l1.7-2.7 4.9 2v3.6a2.7 2.7 0 0 1-2.7 2.7C8.9 19.1 4.9 15.1 2.9 5.3a2.7 2.7 0 0 1 2.7-2.7z"/>',
  clock:    '<path fill-rule="evenodd" d="M12 2.2a9.8 9.8 0 1 0 0 19.6 9.8 9.8 0 0 0 0-19.6zM10.9 6.9h2.2v5l3.6 2.2-1.1 1.9-4.7-2.8z"/>',
  mail:     '<path d="M6.2 3.4h12.1a1.9 1.9 0 0 1 1.9 1.9v12.1h-4V10.6L6.9 20.4 4 17.5l9.8-9.8H6.2z"/>',
  pin:      '<path fill-rule="evenodd" d="M12 2.2a7.2 7.2 0 0 0-7.2 7.2c0 5.4 7.2 12.4 7.2 12.4s7.2-7 7.2-12.4A7.2 7.2 0 0 0 12 2.2zm0 4.6a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z"/>',
  note:     '<path fill-rule="evenodd" d="M6 2.8h7.2L18 7.6V21.2H6zM13 3.6V8h4.4zM8.6 11.6h6.8v1.5H8.6zM8.6 14.8h6.8v1.5H8.6z"/>',
  trash:    '<path d="M9.4 3h5.2l.8 1.6H19V6.7H5V4.6h3.6z"/><path fill-rule="evenodd" d="M6.3 8h11.4l-.8 12.3a1.6 1.6 0 0 1-1.6 1.5H8.7a1.6 1.6 0 0 1-1.6-1.5zm3.1 2.4v8h1.5v-8zm4.2 0v8h1.5v-8z"/>',
  bulb:     '<path d="M12 2.8A6 6 0 0 0 8.4 13.6c.7.6 1 1.1 1.1 1.9h5c.1-.8.4-1.3 1.1-1.9A6 6 0 0 0 12 2.8z"/><path d="M9.5 17h5v1.5h-5zM10 19.6h4V21h-4z"/>',
  chat:     '<path d="M12 2.4c5.7 0 10.2 3.5 10.2 8.1 0 4.5-4.5 8.1-10.2 8.1-.9 0-1.7-.1-2.5-.2-.9 1.4-2.4 2.6-4.4 3.2.8-1.6 1.1-3 1-4.1-2.6-1.5-4.1-3.9-4.1-6.9 0-4.6 4.5-8.2 10-8.2z"/>',
  book:     '<path d="M12 2 23.4 8.2 12 14.4.6 8.2z"/><path d="M4.6 11.4v5.2c0 2.9 14.8 2.9 14.8 0v-5.2L12 15.5z"/>',
  chevron:  '<path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
  star:     '<path d="M12 2.4l3 6.1 6.7.9-4.9 4.7 1.2 6.7-6-3.3-6 3.3 1.2-6.7L2.3 9.4l6.7-.9z"/>',
  rainbow:  '<g fill="none" stroke-width="1.5" stroke-linecap="round"><path d="M2.6 20a9.4 9.4 0 0 1 18.8 0" stroke="#e5372f"/><path d="M4.1 20a7.9 7.9 0 0 1 15.8 0" stroke="#f5871f"/><path d="M5.6 20a6.4 6.4 0 0 1 12.8 0" stroke="#f3c53f"/><path d="M7.1 20a4.9 4.9 0 0 1 9.8 0" stroke="#2fae5f"/><path d="M8.6 20a3.4 3.4 0 0 1 6.8 0" stroke="#2f6fd0"/><path d="M10.1 20a1.9 1.9 0 0 1 3.8 0" stroke="#8b4bd6"/></g>',
  croix:    '<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/>',
  check:    '<path d="M4.5 12.6l4.6 4.6L19.6 6.6" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>',
  plus:     '<path d="M12 4.6v14.8M4.6 12h14.8" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
  oeil:     '<path d="M12 5.2c-4.6 0-8 4-9 6.8 1 2.8 4.4 6.8 9 6.8s8-4 9-6.8c-1-2.8-4.4-6.8-9-6.8z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.9" fill="currentColor"/>',
  logout:   '<path d="M14.5 4h3.5A1.5 1.5 0 0 1 19.5 5.5v13A1.5 1.5 0 0 1 18 20h-3.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 8.5L6 12l3.5 3.5M6 12h9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
  list:     '<circle cx="4.6" cy="6" r="2.4"/><circle cx="4.6" cy="12" r="2.4"/><circle cx="4.6" cy="18" r="2.4"/><rect x="9.4" y="4.4" width="12.2" height="3.2" rx="1.6"/><rect x="9.4" y="10.4" width="12.2" height="3.2" rx="1.6"/><rect x="9.4" y="16.4" width="12.2" height="3.2" rx="1.6"/>',
  accomp:   '<circle cx="8.2" cy="5.4" r="3"/><path d="M3.4 20.8v-4.6a4.8 4.8 0 0 1 4.8-4.8 4.8 4.8 0 0 1 4.8 4.8v4.6z"/><circle cx="17" cy="7.8" r="2.4"/><path d="M13.2 20.8v-5.2a3.8 3.8 0 0 1 3.8-3.8 3.8 3.8 0 0 1 3.8 3.8v5.2z" opacity=".55"/>',
  ticket:   '<path fill-rule="evenodd" d="M3 5.4h18a1.4 1.4 0 0 1 1.4 1.4v3.1a2.5 2.5 0 0 0 0 5v3.1a1.4 1.4 0 0 1-1.4 1.4H3a1.4 1.4 0 0 1-1.4-1.4v-3.1a2.5 2.5 0 0 0 0-5V6.8A1.4 1.4 0 0 1 3 5.4zm12.4 2.4v1.8h1.9V7.8zm0 3.3v1.8h1.9v-1.8zm0 3.3v1.8h1.9v-1.8z"/>',
  cle:      '<path fill-rule="evenodd" d="M15.4 2.4a6.6 6.6 0 0 0-6.3 8.6L2.4 17.7v3.9h3.9v-2.3h2.3v-2.3h2.3l2.1-2.1a6.6 6.6 0 1 0 2.4-12.5zm1.5 3.1a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>',
  lienfin:  '<g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.4 15.6 15.6 8.4"/><path d="M9.6 8.4h6v6"/></g>',
  linge:    '<path fill-rule="evenodd" d="M8.8 2.8h6.4l5.1 2.6a1.2 1.2 0 0 1 .6 1.5l-1.4 3.8-2.5-1V20a1.2 1.2 0 0 1-1.2 1.2H8.2A1.2 1.2 0 0 1 7 20V9.7l-2.5 1-1.4-3.8a1.2 1.2 0 0 1 .6-1.5zM12 6.6c1.4 0 2.3-.7 2.6-1.9H9.4c.3 1.2 1.2 1.9 2.6 1.9z"/>',
  bell:     '<path d="M12 1.8a6.6 6.6 0 0 0-6.6 6.6c0 4.4-1.2 6-2.2 7.1-.5.6-.1 1.5.7 1.5h16.2c.8 0 1.2-.9.7-1.5-1-1.1-2.2-2.7-2.2-7.1A6.6 6.6 0 0 0 12 1.8z"/><path d="M8.8 19.4a3.3 3.3 0 0 0 6.4 0z"/>',
  siren:    '<path d="M12 6.4a5.6 5.6 0 0 1 5.6 5.6v3.2H6.4V12A5.6 5.6 0 0 1 12 6.4z"/><rect x="4.2" y="17" width="15.6" height="3.4" rx="1.2"/><rect x="10.9" y="1" width="2.2" height="3.6" rx="1.1"/><rect x="2.6" y="4.1" width="2.2" height="3.6" rx="1.1" transform="rotate(-38 3.7 5.9)"/><rect x="19.2" y="4.1" width="2.2" height="3.6" rx="1.1" transform="rotate(38 20.3 5.9)"/>',
  feed:     '<path d="M3.4 9.5 17.4 4.1a1.1 1.1 0 0 1 1.5 1v13.8a1.1 1.1 0 0 1-1.5 1L3.4 14.5a1.1 1.1 0 0 1-.7-1v-3a1.1 1.1 0 0 1 .7-1z"/><path d="M6.6 15.5h3.7l.9 4.3a1.4 1.4 0 0 1-1.4 1.7H8.4a1.4 1.4 0 0 1-1.4-1.1z"/><path d="M20.8 8.9a4.6 4.6 0 0 1 0 6.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>',
  send:     '<path d="M3.4 11.2 20 4.2a.6.6 0 0 1 .8.8l-7 16.6a.6.6 0 0 1-1.1 0l-2.3-6.2a1 1 0 0 0-.6-.6L3.4 12.3a.6.6 0 0 1 0-1.1z"/>',
  cog:      '<path fill-rule="evenodd" d="M10.6 2.6h2.8l.5 2.3a6.8 6.8 0 0 1 1.7 1l2.2-.8 1.4 2.4-1.7 1.6c.1.6.1 1.2 0 1.8l1.7 1.6-1.4 2.4-2.2-.8a6.8 6.8 0 0 1-1.7 1l-.5 2.3h-2.8l-.5-2.3a6.8 6.8 0 0 1-1.7-1l-2.2.8-1.4-2.4 1.7-1.6a6.8 6.8 0 0 1 0-1.8L4.3 7.5l1.4-2.4 2.2.8a6.8 6.8 0 0 1 1.7-1zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>',
  search:   '<path d="M10.4 2a8.4 8.4 0 1 0 4.9 15.2l4.4 4.4 2.2-2.2-4.4-4.4A8.4 8.4 0 0 0 10.4 2zm0 3.2a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4z"/>',
  lien:     '<path d="M6.2 3.4h12.1a1.9 1.9 0 0 1 1.9 1.9v12.1h-4V10.6L6.9 20.4 4 17.5l9.8-9.8H6.2z"/>',
  copy:     '<rect x="3" y="2.6" width="11.4" height="14.4" rx="2.4"/><rect x="9.6" y="7" width="11.4" height="14.4" rx="2.4"/>',
  /* Le picto de partage envoyé par Mag (07/08/2026) : trois ronds pleins reliés par
     deux traits. Redessiné à notre trait — les traits passent SOUS les ronds, sinon
     ils dépassent et le dessin se salit aux petites tailles. */
  partage:  '<path d="M7.3 10.4 15.6 6.1M7.3 13.6l8.3 4.3" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/><circle cx="18.1" cy="4.8" r="3.8"/><circle cx="5.4" cy="12" r="3.8"/><circle cx="18.1" cy="19.2" r="3.8"/>',
  qr:       '<path fill-rule="evenodd" d="M3 3h7.2v7.2H3zm2.4 2.4v2.4h2.4V5.4zM13.8 3H21v7.2h-7.2zm2.4 2.4v2.4h2.4V5.4zM3 13.8h7.2V21H3zm2.4 2.4v2.4h2.4v-2.4zM13.8 13.8h2.7v2.7h-2.7zm4.5 0H21v2.7h-2.7zm-4.5 4.5h2.7V21h-2.7zm4.5 0H21V21h-2.7z"/>',
  ecran:    '<rect x="2.4" y="4" width="19.2" height="12.6" rx="2"/><rect x="8.4" y="18.2" width="7.2" height="1.8" rx=".9"/>',
  mobile:   '<rect x="6.6" y="2.4" width="10.8" height="19.2" rx="2.6"/><rect x="10.4" y="18.4" width="3.2" height="1.4" rx=".7" fill="#f4f3f1"/>',
  /* Chaise roulante — dessin PROVISOIRE, en attendant le tien (comme les jeux et les dés).
     Le handicap ne se réduit pas à la chaise, mais c'est le seul signe que tout le monde lit. */
  handicap: '<circle cx="10.6" cy="3.6" r="2.4"/><path d="M8.6 7.4a1.8 1.8 0 0 1 3.6 0v3.2h4.2a1.5 1.5 0 0 1 0 3h-4.9l4 5.2a1.6 1.6 0 1 1-2.5 2l-4.4-5.8a2.6 2.6 0 0 1-.5-1.6z"/><path d="M8.3 10.8a1.3 1.3 0 0 1 .4 2.6 4 4 0 1 0 5 5.2 1.3 1.3 0 1 1 2.4.9 6.6 6.6 0 1 1-8.4-8.6 1.3 1.3 0 0 1 .6-.1z"/>'
};
/* Pictos dessinés par Magali : ils remplacent le tracé SVG quand ils existent. */
const PICTOS={compass:'ico-reseau.svg', demarche:'ico-demarches.svg',
              mail:'ico-guillemets.svg', star:'ico-etoile.svg',
              lien:'site.svg', bulb:'astuce.svg',
              book:'formations.svg', chat:'avis.svg', siren:'urgences.svg',
              petition:'petition.svg', cog:'roue.svg', cle:'cle.svg',
              /* Son picto à elle, déposé le 08/08/2026 pour le bouton de la barre du
                 haut — il remplace l'icône de lien que j'avais prise en attendant. */
              partage:'partager.svg',
              juridique:'juridique.svg', addictions:'addictions.svg',
              planning:'planning.svg', accomp:'accompagnement.svg',
              social:'social.svg',
              /* Ton dessin du handicap, déposé le 01/08/2026 (renommé sans accent : une adresse
                 d'image doit rester simple). Il remplace le dessin provisoire. */
              handicap:'handicap.svg',
              /* Dessins plats ajoutés le 30/07/2026 pour remplacer les emojis (images en couleur
                 avec du relief : ça n'a rien à faire ici). Versions PROVISOIRES, elles attendent
                 les tiennes — elles sont toutes sur la planche, en « à redessiner ». */
              jroue:'jeu-roue.svg', jcartes:'jeu-cartes.svg', jserie:'jeu-serie.svg',
              jchrono:'jeu-chrono.svg', jenquete:'jeu-enquete.svg', jcible:'jeu-cible.svg',
              jjour:'jeu-jour.svg', jduel:'jeu-duel.svg', de:'de.svg', palette:'palette.svg',
              /* Remplacent les derniers emojis (fiches, formations, fil). On réutilise TES dessins
                 quand ils existent : cadenas = ta confidentialité, balance = ton juridique. */
              cadenas:'confidentialite.svg', camera:'camera.svg', stats:'stats.svg', colis:'colis.svg',
              question:'question.svg', pouce:'pouce.svg', coeur:'coeur.svg', applaudir:'applaudir.svg',
              fete:'fete.svg',
              /* Les activités des asbl (03/08/2026). Dessins PROVISOIRES, faits pour qu'une
                 activité cesse d'emprunter le picto d'une autre — la boxe portait celui du
                 duel, le tricot celui du linge. Les siens prennent la place au même nom de
                 fichier : LA PELOTE EST DÉJÀ LA SIENNE (déposée le 04/08). Planche, section 10. */
              boxe:'gand.svg', pelote:'pelote.svg', plume:'plume.svg', escalade:'escalade.svg',
              assise:'assise.svg', musique:'musique.svg', poterie:'poterie.svg', muscle:'muscle.svg'};
/* Pictos MULTICOLORES : le masque CSS ne sait porter qu'une seule couleur, donc ceux-là
   sont posés en image et gardent leurs vraies teintes (l'arc-en-ciel a 7 couleurs). */
/* La POUBELLE est dans le même cas : le symbole de recyclage est dessiné EN BLANC à
   l'intérieur du bac. En masque, le blanc compte comme du plein — le recyclage
   disparaissait et il ne restait qu'une tache (Mag, 06/08/2026 : « ce n'est pas le
   logo qu'on avait prévu »). En image, son dessin est intact. */
const PICTOS_COUL={rainbow:'lgbtqi.svg', poubelle:'notif-poubelle.svg'};
function icon(name,extra){
  const t=/width="(\d+)"/.exec(extra||''), h=/height="(\d+)"/.exec(extra||'');
  const taille = t ? `width:${t[1]}px;height:${(h?h[1]:t[1])}px;` : '';
  // On garde la classe demandée (ex. .pf-out-lien) : c'est elle qui règle la taille au cas par cas.
  const cl=/class="([^"]*)"/.exec(extra||'');
  const c=PICTOS_COUL[name];
  if(c) return `<img class="pico picoc${cl?' '+cl[1]:''}" src="picto/${c}" alt="" style="${taille}">`;
  const f=PICTOS[name];
  if(f){
    return `<span class="pico${cl?' '+cl[1]:''}" style="${taille}-webkit-mask-image:url('picto/${f}');mask-image:url('picto/${f}')"></span>`;
  }
  return `<svg viewBox="0 0 24 24" fill="currentColor"${extra?' '+extra:''}>${ICONS[name]||''}</svg>`;
}

/* ⚠ L'ORDRE N'EST PLUS ALPHABÉTIQUE, IL EST GÉOGRAPHIQUE (Mag, 08/08/2026 : « mets
   les communes les plus proches en premier »). On part d'Anderlecht, où est le
   centre, et on s'éloigne : les cinq communes qui la touchent, puis la première
   couronne, puis l'est et le sud-est, qui sont les plus loin. Ranger par ordre
   alphabétique n'a de sens que pour un annuaire ; ici, ce qui compte, c'est le
   temps de trajet de quelqu'un qui n'a pas d'argent pour le transport. */
const COMMUNES = [
  "Régional / Toutes communes",
  /* chez nous, et ce qui touche Anderlecht */
  "Anderlecht","Molenbeek-Saint-Jean","Bruxelles-Ville","Saint-Gilles","Forest","Berchem-Sainte-Agathe",
  /* la première couronne, à un ou deux transports */
  "Koekelberg","Jette","Ganshoren","Ixelles","Saint-Josse-ten-Noode","Schaerbeek","Uccle","Etterbeek",
  /* l'est et le sud-est : les plus loin quand on part d'Anderlecht */
  "Evere","Woluwe-Saint-Lambert","Woluwe-Saint-Pierre","Auderghem","Watermael-Boitsfort",
  /* EN DERNIER, ET C'EST VOULU (07/08/2026) : deux fiches sont à Liège et à
     Louvain-la-Neuve. Elles n'ont aucune commune bruxelloise, et les ranger dans une
     commune de Bruxelles serait un mensonge — on enverrait quelqu'un à l'autre bout du
     pays sans qu'il le sache. Elles ont donc leur propre bouton, tout à la fin. */
  "Hors Bruxelles"
];

/* ---------- Données de départ (Belgique / Bruxelles) ---------- */
const SAMPLE = [
  // URGENCES
  d("urgences","112 – Secours (ambulance, pompiers)","Régional / Toutes communes","Urgence vitale, ambulance et pompiers.","Tout public","112","","","","24h/24 – 7j/7","Numéro gratuit."),
  d("urgences","101 – Police","Régional / Toutes communes","Police secours.","Tout public","101","","","","24h/24 – 7j/7",""),
  d("urgences","Télé-Accueil Bruxelles – 107","Régional / Toutes communes","Écoute et soutien par téléphone, anonyme.","Tout public","107","","","","24h/24 – 7j/7","Anonyme et gratuit."),
  d("urgences","Écoute Violences Conjugales (violences conjugales / VC)","Régional / Toutes communes","Ligne d'écoute, information et orientation pour les violences entre partenaires.","Tout public","0800 30 030","","ecouteviolencesconjugales.be","","Lun–Ven 9h–19h (nuit/week-end via le 107)","Gratuit."),
  d("urgences","Violences sexuelles – ligne d'écoute","Régional / Toutes communes","Écoute et orientation des victimes de violences sexuelles (chat possible si l'appel est impossible).","Tout public","0800 98 100","","","","","Gratuit."),
  /* ═══ EVA — LA CELLULE POLICE DES VIOLENCES (ajoutée le 08/08/2026) ═══
     Demandée par Mag : « on a beaucoup de cas de VVC en ce moment, essaye que ce soit
     hyper facilement trouvable ». Elle est donc rangée dans les URGENCES, pas dans un
     domaine du réseau : c'est là qu'on va quand ça presse, à un doigt du dock.
     La catégorie « Violences · femmes » des urgences l'attrape par son nom. */
  d("urgences","EVA – cellule police violences intrafamiliales et sexuelles","Anderlecht",
    "Des policiers formés pour recevoir les victimes de violences conjugales, intrafamiliales et sexuelles — dans un local à part, avec une salle d'attente.",
    "Victimes de violences conjugales, intrafamiliales ou sexuelles",
    "02 559 81 36","zpz.midi-zuid.EVA@police.belgium.eu","","Commissariat central d'Anderlecht","Heures de bureau — avec ou sans rendez-vous",
    "C'EST NOTRE ZONE : la cellule EVA de la zone MIDI (Anderlecht, Forest, Saint-Gilles) est installée au commissariat central d'ANDERLECHT, avec sa propre salle d'audition et une salle d'attente qui a un coin jeux pour les enfants.\n\nHuit policiers spécialement formés. La cellule existe pour qu'une victime ne le devienne pas une deuxième fois au guichet.\n\n⚠ CE N'EST PAS UN SERVICE D'URGENCE 24 H/24 : elle fonctionne aux heures de bureau. Dans l'urgence, c'est le 101.\n\nLes autres commissariats de la zone, service d'assistance aux victimes :\n• Anderlecht — 02 559 80 85\n• Forest — 02 559 89 08\n• Saint-Gilles — 02 559 85 74\n\nÉcoute Violences Conjugales, gratuit et anonyme : 0800 30 030.\n\nSource : police.be zone 5341 Midi · stop-violence.brussels · presse de l'inauguration (janvier 2024), relevés le 08/08/2026."),

  d("social","CPVCF – Centre de Prévention des Violences Conjugales et Familiales","Régional / Toutes communes","Écoute, accueil, aide administrative et sociale ; information sur l'accueil et l'hébergement (violences conjugales / VC).","Femmes victimes de violences, tout public","02 539 27 44","","cpvcf.org","","","Adresse d'hébergement confidentielle (sécurité) — contact par téléphone."),
  d("urgences","Écoute-Enfants – 103","Régional / Toutes communes","Ligne d'écoute pour enfants et jeunes.","Enfants et jeunes","103","","","","10h–24h","Gratuit et anonyme."),
  d("urgences","Samusocial – sans-abri","Régional / Toutes communes","Maraudes, mise à l'abri et hébergement d'urgence.","Personnes sans-abri","0800 99 340","","samusocial.be","","24h/24","Numéro central sans-abri."),
  d("urgences","Garde médicale (nuit / week-end) – 1710","Régional / Toutes communes","Médecin de garde à Bruxelles hors heures d'ouverture.","Tout public","1710","","","","Soirs, week-ends et jours fériés",""),
  d("urgences","Centre Antipoisons","Régional / Toutes communes","Conseils en cas d'intoxication.","Tout public","070 245 245","","","","24h/24 – 7j/7",""),

  // HÔPITAUX BXL — urgences (pour faire le tour quand on cherche une personne)
  d("urgences","Chercher quelqu'un aux urgences — par où commencer","Régional / Toutes communes","Sept hôpitaux, mais trois réseaux : dans quel ordre appeler pour ne pas tout refaire.","Professionnels","","","","","","MAG, 08/08/2026 : « si on en a appelé un pour savoir si quelqu'un est aux urgences, on doit plus appeler les autres ». Voilà la carte des réseaux, pour savoir qui va avec qui.\n\nRÉSEAU IRIS — les hôpitaux publics. TROIS des numéros qu'on appelle en font partie :\n• Saint-Pierre — 02 535 40 55\n• Brugmann — 02 477 20 01\n• Bracops, Anderlecht — 02 556 12 90 (Iris Sud, avec Molière-Longchamp, Etterbeek-Ixelles et Paul Brien)\n\nRÉSEAU HUB — l'universitaire de l'ULB :\n• Erasme, Anderlecht — 02 555 34 05 (avec Bordet et l'hôpital des enfants)\n\nRÉSEAU CHIREC — le privé :\n• Sainte-Anne Saint-Remi, Anderlecht — 02 434 31 11 (avec Delta à Auderghem, qui a le SMUR)\n\nHORS RÉSEAU, à appeler à part :\n• AZ VUB, Jette — 02 477 51 00 (néerlandophone)\n• Saint-Jean, Bruxelles — 02 221 91 00\n\n⚠ CE QUI RESTE À VÉRIFIER, ET SEULE L'ÉQUIPE PEUT LE FAIRE : est-ce qu'un site renseigne sur les ADMISSIONS DES AUTRES SITES de son réseau ? Si oui, un appel à Saint-Pierre couvrirait aussi Brugmann et Bracops, et on diviserait le nombre d'appels par deux. Poser la question la prochaine fois qu'on les a au bout du fil, et me le dire : je l'écris ici.\n\nÀ SAVOIR AUSSI : le secret médical fait qu'un hôpital ne confirme pas toujours qu'une personne est admise. Se présenter comme professionnel du centre change souvent la réponse.\n\nSi la personne est en danger et introuvable, c'est le 101."),
  d("urgences","Erasme – Urgences","Anderlecht","Urgences de l'hôpital Erasme (Anderlecht). Réseau HUB.","Tout public","02 555 34 05","","erasme.ulb.ac.be","","","RÉSEAU HUB, avec l'Institut Bordet et l'hôpital des enfants (HUDERF). Universitaire, ULB.\n\nÀ Anderlecht, notre commune.\n\nVoir la fiche « Chercher quelqu'un aux urgences » pour l'ordre d'appel."),
  d("urgences","Brugmann – Urgences","Bruxelles-Ville","Urgences de l'hôpital Brugmann (Laeken). Réseau IRIS.","Tout public","02 477 20 01","","chu-brugmann.be","","","RÉSEAU IRIS (public), avec Saint-Pierre, Bracops, Molière-Longchamp, Etterbeek-Ixelles et Paul Brien.\n\nVoir la fiche « Chercher quelqu'un aux urgences » pour l'ordre d'appel."),
  d("urgences","Saint-Pierre – Urgences","Bruxelles-Ville","Urgences de l'hôpital Saint-Pierre. Réseau IRIS.","Tout public","02 535 40 55","","stpierre-bru.be","","","RÉSEAU IRIS (public), avec Brugmann, Bracops, Molière-Longchamp, Etterbeek-Ixelles et Paul Brien.\n\nC'est aussi l'hôpital d'Aquarelle et d'Interstices, et celui qui accueille le plus de personnes sans papiers.\n\nVoir la fiche « Chercher quelqu'un aux urgences »."),
  d("urgences","AZ VUB – Urgences","Régional / Toutes communes","Urgences de l'hôpital AZ VUB (Jette).","Tout public","02 477 51 00","","","","",""),
  d("urgences","Saint-Jean – Urgences","Régional / Toutes communes","Urgences de l'hôpital Saint-Jean (Bruxelles).","Tout public","02 221 91 00","","","","",""),
  d("urgences","Bracops – Urgences","Anderlecht","Urgences de l'hôpital Bracops (Anderlecht). Réseau IRIS Sud.","Tout public","02 556 12 90","","his-izz.be","","","RÉSEAU IRIS SUD, avec Molière-Longchamp et Etterbeek-Ixelles — et donc dans le grand réseau IRIS avec Saint-Pierre et Brugmann.\n\nÀ Anderlecht, notre commune.\n\nVoir la fiche « Chercher quelqu'un aux urgences »."),
  d("urgences","Anne & St Remi – Urgences","Anderlecht","Urgences de Sainte-Anne Saint-Remi (Anderlecht). Réseau CHIREC.","Tout public","02 434 31 11","","chirec.be","","","RÉSEAU CHIREC (privé), avec Delta à Auderghem — c'est Delta qui a le SMUR — et Braine-l'Alleud.\n\nÀ Anderlecht, notre commune. Hôpital généraliste de proximité, 300 lits.\n\nVoir la fiche « Chercher quelqu'un aux urgences »."),
  /* LES URGENCES QUI MANQUAIENT (Mag, 08/08/2026 : « tu es sûre qu'il y a tous les
     hôpitaux de Bruxelles ? »). Non : il en manquait la moitié, dont Saint-Luc et
     le Delta, qui sont parmi les plus gros services de la ville. */
  d("urgences","Saint-Luc – Urgences","Woluwe-Saint-Lambert","Urgences des Cliniques universitaires Saint-Luc (UCLouvain).","Tout public","02 764 16 02","","saintluc.be","Avenue Hippocrate 10, 1200 Woluwe-Saint-Lambert","24h/24","Un des plus gros services d'urgences de Bruxelles. Universitaire, UCLouvain — hors des trois réseaux publics.\n\nUrgences PSYCHIATRIQUES sur place : c'est un des services habilités à évaluer une mise en observation.\n\nStandard : 02 764 11 11.\n\nSource : saintluc.be, relevé le 08/08/2026."),
  d("urgences","Delta – Urgences","Auderghem","Urgences de l'hôpital Delta (CHIREC) — c'est lui qui a le SMUR.","Tout public","02 434 88 00","","chirec.be","Boulevard du Triomphe 201, 1160 Auderghem","24h/24","RÉSEAU CHIREC, avec Sainte-Anne Saint-Remi à Anderlecht et Braine-l'Alleud.\n\nC'EST DELTA QUI A LE SMUR du réseau — le service mobile d'urgence et de réanimation. Le plus gros et le plus récent des trois sites.\n\nSource : chirec.be, relevé le 08/08/2026."),
  d("urgences","Sainte-Élisabeth – Urgences","Uccle","Urgences de la clinique Sainte-Élisabeth (CHIREC).","Tout public","02 614 29 00","","chirec.be","Avenue De Fré 206, 1180 Uccle","24h/24","Réseau CHIREC.\n\nSource : chirec.be, relevé le 08/08/2026."),
  d("urgences","Etterbeek-Ixelles – Urgences","Etterbeek","Urgences de l'hôpital Etterbeek-Ixelles (Iris Sud).","Tout public","02 739 84 11","","his-izz.be","Rue Jean Paquot 63, 1050 Ixelles","24h/24","RÉSEAU IRIS SUD, avec Bracops (Anderlecht) et Molière (Forest).\n\nURGENCES PÉDIATRIQUES sur place : 02 641 41 12. Peu de sites en ont.\n\nAutre numéro du site d'Ixelles : 02 641 41 11.\n\nSource : his-izz.be, relevé le 08/08/2026."),
  d("urgences","Molière – Urgences","Forest","Urgences de l'hôpital Molière-Longchamp (Iris Sud).","Tout public","02 348 51 11","","his-izz.be","Rue Marconi 142, 1190 Forest","24h/24","Réseau IRIS SUD, avec Bracops et Etterbeek-Ixelles.\n\nSource : his-izz.be, relevé le 08/08/2026."),
  d("urgences","Hôpital des Enfants (HUDERF) – Urgences","Bruxelles-Ville","Urgences PÉDIATRIQUES — l'hôpital universitaire des enfants Reine Fabiola.","Enfants","02 477 31 01","","huderf.be","Avenue Crocq 15, 1020 Laeken","24h/24","POUR LES ENFANTS, et rien que pour eux. Réseau HUB, avec Erasme et Bordet.\n\n⚠ POUR UN ENFANT, ce sont ces services-là qu'il faut, pas des urgences adultes : Saint-Pierre (02 535 43 60), Etterbeek-Ixelles (02 641 41 12), Delta (02 434 88 00), Sainte-Élisabeth (02 614 29 00), Erasme (02 555 34 02) et Saint-Luc (02 764 16 23) ont aussi une pédiatrie d'urgence.\n\nSource : huderf.be, relevé le 08/08/2026."),

  // SOCIAL
  d("social","Bruxelles Social (social.brussels)","Régional / Toutes communes","Annuaire de référence de tous les services sociaux et de santé bruxellois.","Professionnels et particuliers","","","social.brussels","","","Base incontournable pour compléter cet annuaire."),

  // SOCIAL — les 19 CPAS (un par commune)
  cpas("CPAS d'Anderlecht","Anderlecht","02 529 41 20","cpas-ocmw.anderlecht.be","Avenue R. Vander Bruggen 62-64, 1070 Bruxelles"),
  cpas("CPAS d'Auderghem","Auderghem","02 679 94 10","cpasauderghem.be","Avenue du Paepedelle 87, 1160 Bruxelles"),
  cpas("CPAS de Berchem-Sainte-Agathe","Berchem-Sainte-Agathe","02 482 13 55","cpasberchem.brussels","Avenue de Selliers de Moranville 91, 1082 Bruxelles"),
  cpas("CPAS de la Ville de Bruxelles","Bruxelles-Ville","02 543 63 39","cpasbxl.brussels","Rue Haute 296, 1000 Bruxelles"),
  cpas("CPAS d'Etterbeek","Etterbeek","02 627 22 57","cpas-etterbeek.brussels","Rue Beckers 4, 1040 Bruxelles"),
  cpas("CPAS d'Evere","Evere","02 247 65 65","cpasevere.brussels","Square Servaes Hoedemaekers 11, 1140 Bruxelles"),
  cpas("CPAS de Forest","Forest","02 349 63 00","cpasforest.irisnet.be","Rue du Curé 35, 1190 Bruxelles"),
  cpas("CPAS de Ganshoren","Ganshoren","02 436 63 63","cpasganshoren.be","Avenue Charles-Quint 30-32, 1083 Bruxelles"),
  cpas("CPAS d'Ixelles","Ixelles","02 641 54 59","cpasixelles.brussels","Rue Jean Paquot 63B, 1050 Bruxelles"),
  cpas("CPAS de Jette","Jette","02 422 46 11","jette.irisnet.be","Rue de l'Église Saint-Pierre 47-49, 1090 Bruxelles"),
  cpas("CPAS de Koekelberg","Koekelberg","02 412 16 52","koekelberg.be","Rue François Delcoigne 39, 1081 Bruxelles"),
  cpas("CPAS de Molenbeek-Saint-Jean","Molenbeek-Saint-Jean","02 412 47 70","cpas-molenbeek.be","Rue Alphonse Vandenpeereboom 14, 1080 Bruxelles"),
  cpas("CPAS de Saint-Gilles","Saint-Gilles","02 600 54 11","cpas1060.be","Rue Fernand Bernier 40, 1060 Bruxelles"),
  cpas("CPAS de Saint-Josse-ten-Noode","Saint-Josse-ten-Noode","0800 35 254","sjtn.brussels","Rue Verbist 88, 1210 Bruxelles"),
  cpas("CPAS de Schaerbeek","Schaerbeek","02 435 50 90","cpas-schaerbeek.brussels","Boulevard Reyers 70, 1030 Bruxelles"),
  cpas("CPAS d'Uccle","Uccle","02 370 75 11","cpasuccle.be","Chaussée d'Alsemberg 860, 1180 Bruxelles"),
  cpas("CPAS de Watermael-Boitsfort","Watermael-Boitsfort","02 663 08 68","cpas1170.brussels","Boulevard du Souverain 24, 1170 Bruxelles"),
  cpas("CPAS de Woluwe-Saint-Lambert","Woluwe-Saint-Lambert","02 777 75 31","cpas1200.be","Rue de la Charrette 27, 1200 Bruxelles"),
  cpas("CPAS de Woluwe-Saint-Pierre","Woluwe-Saint-Pierre","02 773 59 00","cpas-ocmw1150.be","Drève des Shetlands 15, 1150 Bruxelles"),
  d("social","Croix-Rouge de Belgique","Régional / Toutes communes",
    "Aide alimentaire (colis et épiceries sociales), vestiboutiques, accueil des demandeurs de protection internationale, recherche de proches perdus de vue, transport non urgent de patients et prêt de matériel paramédical.",
    "Tout public — sans condition de statut","105","","croix-rouge.be","","",
    "Le 105 est gratuit et oriente vers la maison Croix-Rouge la plus proche.\nVESTIBOUTIQUES : vêtements de seconde main à petit prix, GRATUITS pour les personnes en difficulté.\nÀ CONNAÎTRE : le service Rétablissement des liens familiaux (RLF) retrouve un proche perdu de vue — voir sa fiche dans Enfants & familles.\nÀ Bruxelles, la Croix-Rouge tient aussi une permanence au Hub humanitaire (accueil de jour inconditionnel).\nSources relevées le 30/07/2026 : croix-rouge.be, liens-familiaux.croix-rouge.be."),
  d("social","Fédération des Services Sociaux","Anderlecht","Coordination de l'aide alimentaire et des services sociaux — et une ligne gratuite qui oriente, ouverte aussi aux professionnels.","Professionnels","02 223 37 74","info@fdss.be","fdss.be","Rue Gheude 49, 1070 Anderlecht","Lun–Ven 9h–12h30 et 13h–17h","LE NUMÉRO À RETENIR N'EST PAS LE LEUR : c'est ALLO ? AIDE SOCIALE, 0800 35 243, GRATUIT, du lundi au vendredi de 9 h à 17 h. Des travailleurs sociaux répondent et cherchent avec la personne : logement, aide alimentaire, argent, démarches, isolement.\n\n⚠ CE QUI NOUS CONCERNE DIRECTEMENT : cette ligne est explicitement ouverte AUX PROFESSIONNELS qui ne connaissent pas encore le réseau bruxellois et qui cherchent où orienter quelqu'un. C'est une porte d'entrée quand on sèche.\n\nLe 02 223 37 74 ci-dessus, c'est le secrétariat de la fédération — utile pour une question de coordination, pas pour une situation.\n\nSource : fdss.be, relevé le 08/08/2026."),
  /* Complétée le 01/08/2026 : la fiche disait « site à vérifier » et rangeait le lieu à
     Bruxelles-Ville — il est à ANDERLECHT, comme nous. Les horaires gardés sont ceux que
     l'équipe connaît (repris de « Autour d'ici ») ; ce que j'ai relevé en ligne diffère,
     et c'est écrit tel quel plutôt que remplacé. */
  /* Le NOM ne change pas : il porte l'identifiant de la fiche (sid), donc le renommer
     ferait perdre l'étoile à celles qui l'avaient mise en favori. Tout le reste s'enrichit. */
  d("social","DoucheFLUX","Anderlecht",
    "Centre de jour : 20 douches, une buanderie et 450 casiers, près de la gare du Midi. Autour : accueil, accompagnement social, activités et permanences. Avec ou sans logement, avec ou sans papiers.",
    "Personnes sans chez-soi ou mal logées, avec ou sans papiers","02 319 58 27","info@doucheflux.be","doucheflux.be",
    "Rue des Vétérinaires 84, 1070 Anderlecht",
    "CE QUE L'ÉQUIPE SAIT : carte de membre nécessaire. Mardi→vendredi 8h30–16h, samedi 8h30–14h ; douches jusqu'à 14h30. MERCREDI RÉSERVÉ AUX FEMMES. Linge : dépôt 8h30–11h, repris le jour même entre 15h et 16h",
    "TARIFS relevés en ligne : douche 1 € · lessive 1 € les 3 kg (3 kg max par personne) · casier 1 €, 1,50 € ou 2 € la semaine selon la taille.\n⚠️ DEUX VERSIONS DES HORAIRES. Celle de l'équipe est dans le champ Horaires ci-dessus. Le site annonçait au relevé : douches mar/jeu/ven 8h30–16h, mer 8h30–12h et 13h–17h femmes, sam et dim 10h30–16h. On appelle avant d'envoyer quelqu'un — surtout pour le mercredi.\nDoucheFLUX porte aussi un projet de logement (Housing First, lancé en 2023) : leur position est que le sans-chez-soirisme est un problème de LOGEMENT, pas un problème social ou sanitaire.\nC'est là que se réunit le Syndicat des immenses, tous les lundis de 11h à 13h30.\nSources : doucheflux.be · anderlecht.be · ama.be · brusshelp.org · RTBF (25/08/2022) ; horaires équipe repris de « Autour d'ici ». Relevé le 01/08/2026."),
  d("lgbt","RainbowHouse Brussels","Bruxelles-Ville","Maison des associations LGBTQI+ : info, orientation et service social. Porte d'entrée vers ~60 associations LGBTQI+ bruxelloises.","Personnes LGBTQI+, proches, professionnel·les","02 503 59 90","info@rainbowhouse.be","rainbowhouse.be","Rue du Marché au Charbon 42, 1000 Bruxelles","Service social : lundi 14h–17h · bureaux sur RDV (après-midi)","Liste des associations membres : rainbowhouse.be/fr/associations/"),
  d("lgbt","Genres Pluriels","Bruxelles-Ville","Association trans, intersexe et genre fluide : info, consultations psycho-sociales, sensibilisation et formations.","Personnes trans, intersexes, non-binaires ; proches ; professionnel·les","0487 63 23 43","contact@genrespluriels.be","genrespluriels.be","Rue des Grands Carmes 20-22, 1000 Bruxelles","Permanence « drop-in » : 1er jeudi du mois 18h30–22h30","Rendez-vous : rendez-vous@genrespluriels.be"),
  d("lgbt","Tels Quels","Bruxelles-Ville","Association LGBTQIA+ : service social, écoute, accompagnement et activités.","Personnes LGBTQIA+, proches","02 502 00 70","","telsquels.be","Place de la Liberté 4, 1000 Bruxelles","Service social : 02 502 00 70 · secrétariat : 02 512 45 87",""),
  d("lgbt","Merhaba","Bruxelles-Ville","Personnes LGBTQI+ à passé migratoire : accueil, écoute, orientation.","Personnes LGBTQI+ issues de l'immigration","0483 09 10 07","info@merhaba.be","merhaba.be","Baksteenkaai 76/2, 1000 Bruxelles","Lun–Ven 9h30–17h","Ligne d'écoute confidentielle (aussi WhatsApp) : 0487 55 69 38."),
  d("lgbt","UTSOPI","Schaerbeek","Union des travailleur·euses du sexe : soutien médical, juridique et en cas de violence, écoute confidentielle et anonyme.","Travailleur·euses du sexe","","info@utsopi.be","utsopi.be","Rue d'Aerschot 208, 1030 Schaerbeek","Lun–Ven 10h–18h","PAS DE TÉLÉPHONE PUBLIÉ, et ce n'est pas un oubli de notre part : leur site n'en donne aucun. Un numéro circule sur des annuaires ; il n'est confirmé nulle part, donc on ne le colle pas. On écrit à info@utsopi.be, ou on passe.\n\nON PEUT LES CONTACTER ANONYMEMENT — c'est écrit sur leur site, et toute l'équipe est tenue au secret professionnel. À dire à la personne : elle n'a pas à se nommer pour poser une question.\n\nPERMANENCE OUVERTE le mardi après-midi, avec des rencontres entre pairs. Attention, ça s'interrompt l'été.\n\nIls couvrent Bruxelles, Liège, Gand et Anvers.\n\nSource : utsopi.be, relevé le 08/08/2026."),
  d("lgbt","Ex Aequo","Bruxelles-Ville","Promotion de la santé auprès des gays, bisexuels et HSH : dépistage VIH/IST, info PrEP et TPE.","Gays, bisexuels et HSH (hommes ayant des relations avec des hommes)","02 736 28 61","info@exaequo.be","exaequo.be","","","Adresse et permanences : voir exaequo.be (à confirmer)."),
  d("lgbt","Alias","Bruxelles-Ville","Soutien psycho-médico-social et santé pour les travailleur·euses du sexe masculins et trans*.","Travailleur·euses du sexe (hommes et trans*)","0484 60 80 47","contact@alias.brussels","alias.brussels","Rue du Marché au Charbon 33, 1000 Bruxelles","Consultations médicales : mardi 17h30–21h, jeudi 14h–17h · accueil : mercredi 14h–17h","Maraude : vendredi & samedi 20h–2h · suivi individuel sur RDV (lun–ven)."),
  d("lgbt","Rainbow Refugee Committee","Bruxelles-Ville","Soutien aux personnes LGBTQIA+ en demande d'asile : accompagnement individuel, réorientation psycho-médico-sociale, soutien socio-juridique et mentorat.","Personnes LGBTQIA+ demandeuses d'asile","","info@rainbowrefugee.be","refugee-committee.org","Rue du Marché au Charbon 42, 1000 Bruxelles (à la RainbowHouse)","","ON NE LES APPELLE PAS, on leur écrit : info@rainbowrefugee.be, ou WhatsApp au +32 491 76 99 26 — MESSAGES UNIQUEMENT, ça ne sonne pas. Prévenir la personne, sinon elle croit que le numéro est mort.\n\n⚠ Un annuaire affiche « 0 » comme numéro pour eux. Ce n'est pas un téléphone, c'est un champ vide mal rempli.\n\nILS TRAVAILLENT DEPUIS LA RAINBOWHOUSE, rue du Marché au Charbon 42. Si on a besoin de joindre quelqu'un de vive voix, c'est l'accueil de la maison qu'on appelle : 02 503 59 90, le bureau répond l'après-midi de 14 h à 18 h. Ce n'est pas leur ligne à eux, c'est la maison qui les héberge — le dire quand on transmet.\n\nÀ LA MÊME ADRESSE, et qui peut servir le jour même : le service social de la RainbowHouse, lundi après-midi 14 h → 17 h. Et une ligne pour les agressions, 0492 40 84 84.\n\nPublic : toute personne LGBTQIA+ qui a vécu un parcours de migration forcée.\n\nSources : rainbowhouse.be et annuaire.guidesocial.be, relevés le 08/08/2026."),

  // MÉDICAL (par commune)
  /* ── CULTURE & ACTIVITÉS ──────────────────────────────────────────────
     Rangées par étiquettes (type, dedans/dehors, prix, public) : c'est ce tri
     qui sert quand quelqu'un s'ennuie, pas le nom de l'organisme.
     Sources relevées le 30/07/2026 : brusselsmuseums.be, bruxelles.article27.be,
     cultureghem.be. À revérifier une fois par an — les gratuités bougent. */
  /* WAKA UP, ajoutée le 01/08/2026 : elle sort un programme CHAQUE MOIS, d'où le rappel
     automatique déposé dans le chantier au début de chaque mois (voir rappelCalendriers).
     Infos relevées sur waka-up.be et sur leur calendrier d'août 2026. */
  tags(d("culture","WAKA UP","Jette","RÉSERVÉ AUX FEMMES. Sport, art et culture : boxe, renforcement musculaire, tricot, écriture, escalade, céramique, chants. Gratuit, et une garde d'enfants est assurée pendant les activités. Programme différent chaque mois.","Femmes — en particulier femmes victimes de violences, sans abri, migrantes, en famille monoparentale","+32 474 85 78 25","info@waka-up.be","waka-up.be","Avenue de Jette 225, 1090 Jette (portail vert)","Téléphone entre 9h30 et 18h","⚠️ RÉSERVÉ AUX FEMMES (Mag, 08/08/2026 : « il faut absolument notifier que c'est réservé aux femmes »). Ne pas y envoyer un homme, même accompagné : il sera refusé à la porte, et c'est un déplacement pour rien — souvent à pied, souvent sans argent. La mention est aussi en tête de la description et dans le public, pour qu'on ne puisse pas la manquer.\n\nActivités GRATUITES, sur inscription auprès de l'association — leur demander le calendrier du mois. ⚠️ LE LIEU CHANGE SELON L'ACTIVITÉ (parc, salle de sport, atelier…) : l'itinéraire ci-dessous part de leur bureau à Jette, il faut vérifier l'adresse du jour sur waka-up.be ou par téléphone avant d'y envoyer quelqu'un. Siège social : rue du Korenbeek 133, 1080 Molenbeek-Saint-Jean."),
    ["Gratuit","Femmes"]),
  tags(d("culture","Musées gratuits — le 1er dimanche du mois","Régional / Toutes communes",
    "Une vingtaine de musées bruxellois ouvrent gratuitement, sans ticket ni réservation, le premier dimanche de chaque mois.",
    "Tout public, sans condition","","","brusselsmuseums.be","","Le 1er dimanche du mois, aux heures d'ouverture de chaque musée",
    "À BRUXELLES-VILLE : Art & marges, BELEXPO, Cinematek, Design Museum Brussels, GardeRobe MannekenPis, Maison du Roi (Musée de la Ville), Musée belge de la Franc-Maçonnerie, Musée BELvue, Musée des Égouts, Musée juif de Belgique, Musée Mode & Dentelle.\nAILLEURS : Maison d'Érasme et Béguinage (ANDERLECHT — le plus proche du centre), Musée Horta (Saint-Gilles), Musée d'Art spontané (Schaerbeek), La Fonderie · Momuse · Musée de la médecine ULB (Molenbeek), Wittockiana (Woluwe-Saint-Pierre).\n\nLa liste bouge d'une année à l'autre : vérifier avant de partir.\nDEUX SOURCES : brusselsmuseums.be, et le guide Arts&Publics (artsetpublics.be/programmes/musees-gratuits) qui couvre près de 190 musées en Belgique francophone et republie son guide chaque saison.\nDernière vérification : 30/07/2026 — à revoir chaque mois."),
    ["Gratuit"]),

  tags(d("culture","Musées gratuits — le 1er mercredi après-midi","Régional / Toutes communes",
    "Les grands musées fédéraux deviennent gratuits le premier mercredi du mois, à partir de 13 h (14 h pour le BELvue).",
    "Tout public, sans condition","","","brusselsmuseums.be","","Le 1er mercredi du mois, dès 13 h",
    "Institut des Sciences naturelles (dès 13 h — les dinosaures, ça marche à tous les âges) · Musée Magritte (13 h) · Old Masters (13 h) · Musées royaux d'Art et Histoire, au Cinquantenaire (13 h) · Musée royal de l'Armée et d'Histoire militaire · Musée BELvue (14 h).\n\nÀ savoir : le BELvue est aussi gratuit TOUS les mercredis dès 14 h."),
    ["Gratuit"]),

  /* Les deux listes de référence, en fiches à elles : c'est là qu'on va vérifier
     avant d'emmener quelqu'un, parce que les gratuités changent d'une année à l'autre. */
  tags(d("culture","Où vérifier les musées gratuits — Brussels Museums","Régional / Toutes communes",
    "La page qui tient à jour tous les moments où les musées bruxellois sont gratuits : le 1er dimanche, le 1er mercredi, et ceux qui le sont toute l'année.",
    "Pour l'équipe — à consulter avant de proposer une sortie","","","brusselsmuseums.be/fr/actu-conseils/les-musees-gratuits-a-bruxelles","","",
    "C'est la source officielle du réseau des musées bruxellois. À rouvrir avant chaque sortie : un musée peut sortir de la liste sans prévenir.\nDernière vérification : 30/07/2026."),
    ["Gratuit"]),

  tags(d("culture","Où vérifier les musées gratuits — le guide Arts&Publics","Régional / Toutes communes",
    "Le guide qui recense près de 190 musées gratuits en Belgique francophone, republié chaque saison. Plus large que Bruxelles.",
    "Pour l'équipe — à consulter avant de proposer une sortie","","","artsetpublics.be/programmes/musees-gratuits/","","",
    "Utile quand on cherche au-delà de Bruxelles, ou quand la page de Brussels Museums ne mentionne pas un musée.\nDernière vérification : 30/07/2026."),
    ["Gratuit"]),

  tags(d("culture","Cultureghem — KETMET, jeux libres aux Abattoirs","Anderlecht",
    "Le plus grand terrain de jeu couvert de Bruxelles : caisses de jeux, constructions, ballon, sport, cuisine. Tout est gratuit, de l'entrée aux jouets.",
    "Tous les âges — des tout-petits aux ados, avec leurs parents","02 556 11 79","info@cultureghem.be","cultureghem.be",
    "Rue Ropsy Chaudron 24, 1070 Anderlecht (métro Clemenceau)","Tous les mercredis de 12 h à 16 h",
    "À dix minutes du centre. Pas de réservation obligatoire ; ils apprécient un mot si on vient en groupe. Sous la halle couverte : ça marche aussi quand il pleut."),
    ["Gratuit","Famille"]),

  tags(d("culture","Ludobox — ludothèque de la Ville de Bruxelles","Bruxelles-Ville",
    "On y joue sur place gratuitement, et on emprunte des jeux pour 1 € (3 semaines). Inscription gratuite pour tout le monde, sur simple présentation d'une pièce d'identité.",
    "Tout public — familles, enfants, ados","02 279 20 39","ludobox@brucity.education","bibliotheques.bruxelles.be/ludobox",
    "Boulevard Émile Bockstael 122, 1020 Bruxelles (Laeken)",
    "Mardi, mercredi, vendredi et samedi — mercredi 12 h→18 h · samedi 9 h→16 h · mardi et vendredi 14 h→18 h. Fermé dimanche, lundi et jeudi.",
    "JOUER SUR PLACE : gratuit, sans rien emprunter — utile quand il pleut et qu'on ne sait pas quoi proposer.\nEMPRUNTER : 1 € le jeu pour trois semaines, 3 € les jeux vidéo, 5 € les jeux géants et les costumes. Caution de 15 € pour les jeux de plus de 100 €.\nACCESSIBLE : le lieu est accessible en chaise roulante.\nSource relevée le 30/07/2026 : biblio.brussels."),
    ["Gratuit","Famille"]),

  tags(d("culture","Article 27 Bruxelles","Bruxelles-Ville","Le ticket qui ouvre la culture : spectacles, cinéma, musées, concerts à 1,25 € pour les personnes en difficulté économique. Fonctionne via l'association qui accompagne la personne, pas en direct.","Personnes en situation précaire, via une association partenaire","02 646 30 28","bruxelles@article27.be","bruxelles.article27.be","Rue de la Senne 81, 1000 Bruxelles","","LE CPAS AUSSI EN DONNE. Une personne suivie par un CPAS y a droit et peut demander ses tickets là-bas — mais elle doit le DEMANDER : on ne les lui propose pas spontanément au guichet. À dire à chaque fois, sinon personne ne le sait.\nLe site donne la liste des lieux qui acceptent le ticket et un agenda des sorties. À vérifier : est-ce que le centre est déjà partenaire social, et qui détient les tickets ?"),
    ["Article 27"]),
  d("accompagnement","Les Amis d'Accompagner (ASBL)","Koekelberg","Service social de première ligne avec des bénévoles formés : accueil et orientation socio-juridique, accompagnement ambulatoire sur le terrain, service de volontariat.","Personnes en difficulté ; travaille aussi avec les institutions publiques et privées","02 580 20 30","","accompagner.be","Rue Émile Sergijsels 23, 1081 Koekelberg","","Autres numéros : 02 580 20 33 (accompagnement) · 02 580 20 32 (volontariat). Horaires de permanence et rendez-vous à confirmer au premier appel."),
  d("medical","Croix Jaune et Blanche — soins infirmiers à domicile","Régional / Toutes communes","Soins infirmiers à domicile : plaies, diabète, médicaments, hygiène, soins palliatifs, démence, santé mentale. On peut demander, modifier ou annuler des soins à tout moment.","Tout public","02 739 35 11","wgk@vlaanderen.wgk.be","witgelekruis.be/croix-jaune-et-blanche","Frontispiesstraat 8 bus 1.2, 1000 Bruxelles","Joignable 24h/24, 7j/7","Organisation néerlandophone (Wit-Gele Kruis) ; site et documents disponibles en français. L'adresse est celle du siège — les soins se demandent par téléphone."),
  d("medical","Fédération des Maisons Médicales (FMM)","Bruxelles-Ville","Répertoire des maisons médicales et infos sur l'accès aux soins — et le piège du forfait, à expliquer AVANT d'inscrire quelqu'un.","Tout public","02 514 40 14","fmm@fmm.be","maisonmedicale.org","Rue du Poinçon 53 boîte 17, 1000 Bruxelles","Lun–Ven 8h–12h30 et 13h–16h30","⚠ L'ADRESSE A CHANGÉ LE 6 JUILLET 2026. Ce n'est plus le boulevard du Midi 25 — celui-là traîne encore partout sur internet. C'est rue du Poinçon 53, boîte 17.\n\n⚠ LE PIÈGE DU FORFAIT, à dire AVANT d'inscrire quelqu'un : s'inscrire au forfait dans une maison médicale, c'est s'engager à ne consulter QUE ses prestataires. Si la personne va voir un autre médecin de sa propre initiative, ELLE N'EST PAS REMBOURSÉE. Les exceptions sont très limitées. Pour quelqu'un déjà suivi ailleurs — un psychiatre, un spécialiste — ça se réfléchit avant de signer.\n\nCe qu'on y gagne : plus rien à payer à la consultation, et médecin, infirmier et kiné sous le même toit.\n\nLa fédération regroupe plus de 140 maisons médicales à Bruxelles et en Wallonie. La liste par commune est sur leur site.\n\nSource : maisonmedicale.org, relevé le 08/08/2026."),
  /* La Ligue Alzheimer a son antenne bruxelloise DANS NOTRE COMMUNE (08/08/2026). */
  d("santementale","Ligue Alzheimer — Centre Info-DEMences","Anderlecht",
    "Information, écoute et orientation sur la maladie d\'Alzheimer et les autres démences — pour la personne comme pour l\'entourage.",
    "Personnes atteintes, proches, professionnels",
    "02 510 61 88","centre-idem@hotmail.com","alzheimer.be","Rue Brogniez 46, 1070 Anderlecht","",
    "C\'EST DANS NOTRE COMMUNE, à quelques rues du centre.\\n\\nLIGNE GRATUITE : 0800 15 225, tous les jours ouvrables de 8 h à 18 h. En dehors, c\'est Télé-Accueil qui prend le relais au 107.\\n\\nLE GROUPE DES BATTANTS : un espace de rencontre pour les personnes touchées AVANT 60-65 ANS et leur proche principal. La démence précoce existe, et elle est régulièrement prise pour autre chose.\\n\\nSource : alzheimer.be, relevé le 08/08/2026."),

  /* Deux fiches ajoutées le 08/08/2026 sur des liens envoyés par Mag. */
  d("social","Les Petits Riens — donner des objets","Anderlecht","Où déposer vêtements, meubles, électroménager et jouets. Ce qui est accepté, ce qui ne l'est pas, et où.","Toute personne qui veut donner","02 541 13 86","","petitsriens.be/dons-en-nature","Centre de tri : Anderlecht","Centre de tri : du lundi au vendredi, 8 h → 16 h","⚠ ILS NE FONT PLUS D'ENLÈVEMENT À DOMICILE. C'est le changement qui surprend le plus — il faut apporter.\n\nCE QUI EST ACCEPTÉ, à condition que ce soit propre, complet et en état de servir : vêtements, chaussures, accessoires, linge de maison, livres, vélos, jouets, articles de cuisine, meubles jusqu'à 2 m, petit et gros électroménager, décoration, instruments de musique.\n\nCE QUI EST REFUSÉ : ce qui est abîmé, incomplet ou ne fonctionne plus. Près d'un textile sur cinq récolté finit à la poubelle AUX FRAIS DE L'ASSOCIATION — donner du cassé, c'est leur faire payer notre déchet.\n\nOÙ DÉPOSER :\n• Textiles — 800 bulles à vêtements, 24 h/24, la carte est sur leur site.\n• Textiles aussi — conteneurs en boutique, du lundi au samedi 10 h 30 → 18 h (sauf Saint-Gilles et La Bourse).\n• Meubles, électro, objets — CENTRE DE TRI À ANDERLECHT, du lundi au vendredi 8 h → 16 h. C'est le plus proche de nous.\n• Ou le dépôt Prévôt à Ixelles, du lundi au vendredi 9 h → 17 h 45, samedi 10 h → 17 h 45.\n\nSource : petitsriens.be/dons-en-nature, relevé le 08/08/2026."),

  d("social","SASB – Siréas · service social pour personnes étrangères","Bruxelles-Ville","Droits sociaux, démarches administratives, logement, santé, scolarité, CPAS — avec ou sans titre de séjour.","Toute personne d'origine étrangère, avec ou sans titre de séjour","02 274 15 51","sasb@sireas.be","sireas.be","Rue du Boulet 26, 1000 Bruxelles","Du lundi au vendredi, 8 h 30 → 13 h et 14 h → 17 h","⚠ LE TICKET SE PREND À 8 H 30. Qui arrive plus tard passe après — c'est l'information qui fait gagner une matinée.\n\nLes urgences sont reçues jusqu'à 16 h 30.\n\nTROIS SERVICES SOUS LE MÊME TOIT :\n• Le service social — droits sociaux, permis de travail, asile, visas, logement, santé, école, démarches CPAS.\n• L'aide aux justiciables — accompagnement des détenus, ex-détenus et de leurs familles d'origine étrangère.\n• Le Service Social International — un réseau présent dans 140 pays, pour les problèmes familiaux qui traversent les frontières.\n\nMême rue que l'ADDE, au numéro 22.\n\nSource : fdss.be — fiche membre SASB/Siréas, relevé le 08/08/2026."),

  /* Deux fiches sorties du brouillon le 08/08/2026. Les faits sont sourcés ;
     ce qui relève de NOTRE pratique est écrit dedans, en clair, comme questions
     à trancher en équipe. Une fiche utile avec des trous nommés vaut mieux qu'un
     brouillon que personne n'ouvre. */
  d("demarches","Carte d'identité perdue ou volée","Anderlecht","Ce qu'on fait avec la personne, dans l'ordre. Les trois premières étapes sont gratuites et se font le jour même.","Toute personne inscrite en Belgique","00800 2123 2123","","ibz.be","Service population : rue de France 99 ou place de la Vaillance 28A, Anderlecht","Sans rendez-vous : lundi, mardi, jeudi, vendredi 8 h 30 → 12 h","DANS L'ORDRE, ET LES TROIS PREMIÈRES SONT GRATUITES.\n\n1. BLOQUER LA CARTE — DOC STOP, 00800 2123 2123. Gratuit, 24 h/24, de n'importe où. Plus personne ne peut ouvrir un crédit ni signer à son nom. Si le 00800 ne passe pas : +32 2 518 2123.\n⚠ À VÉRIFIER : les sources officielles ne donnent pas le même numéro de secours (+32 2 488 2123 ailleurs). Essayer les deux.\n\n2. SI LA CARTE EST RETROUVÉE APRÈS L'APPEL — il y aurait 7 jours pour la débloquer, ensuite elle est annulée. ⚠ À CONFIRMER : trouvé sur un site de police locale, pas sur le texte officiel.\n\n3. EN CAS DE VOL, PLAINTE À LA POLICE — obligatoire pour les personnes de nationalité étrangère, vivement conseillée pour tout le monde : c'est la preuve écrite. Anderlecht : commissariat rue de Démosthène 36.\n\n4. LE SERVICE POPULATION DE SA COMMUNE — la personne doit y aller ELLE-MÊME.\n• Belge : à Anderlecht, sans rendez-vous, lundi, mardi, jeudi et vendredi de 8 h 30 à 12 h (rue de France 99 ou place de la Vaillance 28A).\n• Nationalité étrangère : d'abord la police, puis le service population avec la déclaration. DEUX photos au lieu d'une.\n• À emporter : une photo de moins de 6 mois et la déclaration.\n• Elle ressort avec une annexe 12 : ça vaut pièce d'identité EN BELGIQUE SEULEMENT, pas pour voyager.\n\nCOMBIEN, ET COMBIEN DE TEMPS\n• Normal, environ 3 semaines : 30,10 €\n• Urgence en 1 jour à la commune : 184,60 €\n• Urgence en 1 jour au fédéral : 223,40 €\n• Kids-ID (moins de 12 ans) : 18,10 €\n\n⚠ PAIEMENT PAR CARTE BANCAIRE UNIQUEMENT, pas d'espèces. C'est là que ça bloque le plus souvent pour nos hébergés — à préparer AVANT d'y aller.\n\nLES CODES PIN ET PUK ARRIVENT PAR COURRIER, environ 3 semaines après. Sans adresse pour recevoir ce courrier, la carte ne sert à rien.\nRetrait au même endroit, sans rendez-vous. Une carte non retirée dans les 6 mois est DÉTRUITE et tout est à repayer.\n\nPAS D'ADRESSE ? ÇA COMMENCE PAR LÀ. Sans inscription au registre, pas de carte possible. Il faut une adresse de référence — gratuite, au CPAS (Anderlecht : avenue Raymond Vander Bruggen 62) ou chez un particulier qui accepte. Réservé aux Belges et aux personnes en séjour légal ; sans titre de séjour, cette porte est fermée.\n\nCE QUI RESTE À TRANCHER EN ÉQUIPE — ces cinq points ne sont pas des faits mais NOTRE pratique :\n1. Le centre peut-il servir d'adresse de référence, ou passe-t-on toujours par le CPAS ?\n2. Qui paie les 30,10 €, et comment, puisqu'il faut une carte bancaire ?\n3. Une personne inscrite dans une autre commune : on l'accompagne ou on l'oriente ?\n4. Garde-t-on une copie de la déclaration au dossier ? C'est une donnée personnelle.\n5. Les deux points marqués ⚠ ci-dessus, à vérifier auprès de DOC STOP.\n\nLes documents de travail officiels priment sur cette fiche.\n\nSources vérifiées le 29/07/2026 : ibz.rrn.fgov.be (DOC STOP) · ibz.be (procédure, annexe 12, plainte) · anderlecht.be (horaires, photos, prix, retrait, PIN, adresse de référence). Les prix et horaires sont ceux d'Anderlecht et changent d'une commune à l'autre : à revérifier une fois par an."),

  d("demarches","Téléphone perdu ou volé","Régional / Toutes communes","Bloquer, déclarer, retrouver — et pourquoi l'IMEI se note AVANT.","Toute personne","","","police.be","","","DANS L'ORDRE.\n\n1. AVANT DE BLOQUER, APPELER LE TÉLÉPHONE plusieurs fois. Noter les heures des appels : la police les demande, et un téléphone simplement oublié se retrouve souvent comme ça.\n\n2. TROUVER LE NUMÉRO IMEI — c'est lui qui identifie l'appareil, pas la carte SIM.\n• Sur la boîte du téléphone, s'il l'a gardée.\n• Ou en composant *#06# sur n'importe quel téléphone du même appareil.\n• Sans IMEI, l'opérateur peut bloquer la carte SIM mais PAS l'appareil.\n⚠ À NOTER À L'AVANCE, tant que le téléphone est encore là. Après, c'est trop tard.\n\n3. APPELER SON OPÉRATEUR — il bloque la carte SIM ET l'appareil, sans passer d'abord par la police. Il demandera l'IMEI pour bloquer l'appareil.\n\n4. DÉCLARER À LA POLICE, surtout en cas de vol. Emporter l'IMEI, le numéro de la carte SIM et le numéro de téléphone. On reçoit une attestation, utile pour une assurance. Anderlecht : commissariat rue de Démosthène 36.\n\n5. RETROUVER L'APPAREIL À DISTANCE, si le compte était configuré :\n• Android — « Localiser mon appareil », depuis un navigateur avec le compte Google.\n• iPhone — « Localiser », depuis iCloud avec l'identifiant Apple.\nCes outils permettent aussi de faire sonner, verrouiller ou effacer à distance.\n⚠ Ils ne marchent QUE si la fonction était activée avant. Ça vaut la peine de le vérifier avec les gens AVANT qu'ils perdent quelque chose.\n\nCE QUE ÇA VEUT DIRE POUR NOS HÉBERGÉS : perdre son téléphone, c'est souvent perdre ses codes, ses contacts, son accès à itsme et donc à ses démarches en ligne. Ce n'est pas qu'un objet.\n\n⚠ RESTE À TRANCHER EN ÉQUIPE : téléphones de service ou personnels — la procédure n'est pas la même si l'appareil appartient au centre.\n\nSources : police.be — perte ou vol de GSM/smartphone · polbru.be, relevés le 08/08/2026."),

  /* ═══ LE DOUBLE DIAGNOSTIC (ajouté le 08/08/2026, demande de Mag) ═══
     Handicap mental ET troubles psychiques : deux secteurs qui se renvoient la balle,
     et des personnes qui tombent entre les deux. ANAÏS est l'une des rares structures
     bruxelloises qui prend les deux ensemble. */
  d("handicap","ANAÏS asbl – double diagnostic (handicap mental et troubles psychiques)","Schaerbeek",
    "Une des rares structures qui prend le handicap mental AVEC les troubles psychiques ou du comportement — au lieu de renvoyer d'un secteur à l'autre.",
    "Personnes en situation de handicap mental avec troubles psychiques",
    "02 242 11 36","csm@anaisasbl.be","anaisasbl.be","Av. Maréchal Foch 35, 1030 Schaerbeek (santé mentale)",
    "Secrétariat : Lun–Ven 10h–17h · mardi jusqu'à 18h · mercredi jusqu'à 19h",
    "⚠ QUATRE NUMÉROS SELON QUI ON ACCOMPAGNE — le 02 242 11 36 ci-dessus est celui de la SANTÉ MENTALE, av. Maréchal Foch 35. Les autres sont au 11 :\n• Service de santé mentale (consultations) — 02 242 11 36\n• Centre de jour ADULTES — 02 215 55 45\n• Grandir, centre de jour ENFANTS — 02 218 55 80\n• Foyer Aurore, hébergement — 02 241 49 77\n\nCOMMENT ÇA SE PASSE, pour ne pas promettre un rendez-vous qui n'existe pas : on appelle le secrétariat pendant ses permanences. La demande est ensuite discutée en réunion d'équipe LE MARDI MATIN, et c'est eux qui rappellent. On ne repart donc pas avec une date le jour même — le dire à la personne, sinon elle croit qu'on l'a oubliée.\n\nPOURQUOI C'EST RARE : le « double diagnostic » est le point aveugle du réseau. Le secteur du handicap renvoie vers la psychiatrie, la psychiatrie renvoie vers le handicap, et la personne reste dehors. ANAÏS est une des adresses qui ne renvoie pas.\n\nSource : anaisasbl.be, relevé le 08/08/2026."),

  d("maisons","Foyer Aurore – logement collectif adapté (ANAÏS)","Régional / Toutes communes",
    "Vingt-trois adultes inscrits au service PHARE. Un lieu de vie communautaire, entre le logement autonome et l'hospitalisation.",
    "Adultes inscrits au service PHARE, avec besoin d'accompagnement",
    "02 241 49 77","","anaisasbl.be/foyer-aurore","",
    "",
    "C'est une alternative : ni la famille, ni un logement seul, ni l'hôpital. Un accompagnement sur le quotidien et la vie pratique, ET sur la vie relationnelle et sociale.\n\n⚠ IL FAUT ÊTRE INSCRIT AU SERVICE PHARE : sans reconnaissance, la porte ne s'ouvre pas. Si la personne ne l'est pas encore, commencer par là — voir la fiche PHARE et la formation Handicap.\n\nGéré par ANAÏS asbl, qui prend aussi le double diagnostic.\n\nSource : anaisasbl.be/foyer-aurore · autisme.brussels, relevés le 08/08/2026."),

  /* ═══ LA CAAMI ET LES MUTUELLES (ajoutée le 08/08/2026, demande de Mag) ═══
     Rangée dans DÉMARCHES : s'affilier est une démarche, pas un soin. */
  d("demarches","CAAMI – la mutuelle publique, gratuite à l'inscription","Bruxelles-Ville",
    "L'organisme PUBLIC d'assurance maladie. Mêmes remboursements qu'une mutuelle, sans cotisation supplémentaire ni service annexe à payer.",
    "Toute personne à affilier, en particulier sans ressources",
    "02 229 34 80","bruxelles@caami.be","caami-hziv.fgov.be","Rue du Trône 30 bte B, 1050 Bruxelles","",
    "POURQUOI ELLE COMPTE POUR NOUS : en Belgique, l'assurance maladie est OBLIGATOIRE mais on choisit son organisme. Les mutuelles privées réclament une cotisation pour leurs services complémentaires ; la CAAMI, non — l'inscription est gratuite. Pour quelqu'un sans revenus, c'est souvent la porte la plus simple.\n\nCe qu'elle donne : exactement les mêmes remboursements légaux et les mêmes indemnités que n'importe quelle mutuelle. Ce qu'elle ne donne pas : les avantages « en plus » (dentiste, lunettes, vacances…) que les mutuelles privées financent par leur cotisation.\n\nEntrée par la porte automatique, au coin de la rue du Trône et de la rue de Paris.\n\n⚠ Vérifier les horaires de guichet avant d'y envoyer quelqu'un.\n\nSource : caami-hziv.fgov.be · inami.fgov.be, relevés le 08/08/2026."),

  d("demarches","Les mutuelles — laquelle choisir","Régional / Toutes communes",
    "Toutes remboursent la même chose. Ce qui change, c'est la cotisation et les services en plus.",
    "Toute personne à affilier","","","inami.fgov.be","","",
    "LA RÈGLE : l'assurance maladie est obligatoire, le choix de l'organisme est LIBRE, et le remboursement légal est IDENTIQUE partout. Personne ne rembourse mieux qu'un autre sur les soins de base.\n\nCE QUI CHANGE VRAIMENT :\n• LA CAAMI — publique, inscription gratuite, aucun service complémentaire. La plus simple pour quelqu'un sans revenus.\n• LES MUTUELLES PRIVÉES (Solidaris, Mutualité chrétienne, Mutualités Libres, Mutualité Neutre, Mutualité libérale) — une cotisation mensuelle, en échange d'avantages : soins dentaires, lunettes, kiné, séjours, aide à domicile.\n\nCE QU'IL FAUT VÉRIFIER AVANT DE CONSEILLER :\n• la personne est-elle déjà affiliée quelque part ? On ne peut pas être à deux endroits.\n• est-elle EN ORDRE de cotisations ? Une mutuelle impayée bloque les remboursements — c'est le motif numéro un des refus au guichet.\n• si elle est en séjour irrégulier, aucune mutuelle n'est possible : c'est l'AIDE MÉDICALE URGENTE par le CPAS.\n\n⚠ On oriente, on ne choisit pas à sa place : le bon organisme dépend de sa situation et de ce qu'elle utilise vraiment.\n\nSource : inami.fgov.be — liste officielle des organismes assureurs, relevée le 08/08/2026."),

  /* ═══ LES MAISONS MÉDICALES CONSEILLÉES PAR L'ÉQUIPE (08/08/2026) ═══
     Mag : « super maison médicale conseillée par les travailleurs du centre ». Ces
     trois-là remontent EN TÊTE du Médical, avec la mention de qui les conseille —
     une recommandation de collègue vaut mieux qu'un annuaire. */
  reco(d("medical","Goujonissimo — maison médicale","Anderlecht","Médecine générale, infirmières, psychologues et assistants sociaux dans la même équipe. Dans notre commune.","Habitants du quartier, tout public","02 880 95 60","info@goujonissimo.be","goujonissimo.be","Rue des Goujons 85, 1070 Anderlecht","Du lundi au vendredi, 8 h → 12 h et 14 h → 19 h","CONSEILLÉE PAR LES TRAVAILLEURS DU CENTRE.\n\nC'est la plus proche de nous, à Anderlecht. Équipe pluridisciplinaire : médecins, infirmières, psychologues, assistants sociaux — on ne renvoie pas la personne ailleurs pour chaque question.\n\nILS PARLENT PLUSIEURS LANGUES et travaillent avec des services d'interprétation. Pour quelqu'un qui ne parle pas français, ça change tout.\n\nSource : goujonissimo.be, relevé le 08/08/2026."), "L’équipe la conseille : ils parlent beaucoup de langues."),

  reco(d("medical","Centre de Santé du Miroir — maison médicale","Bruxelles-Ville","Maison médicale au forfait, dans les Marolles.","Tout public","02 511 34 74","equipe@centresantemiroir.be","centresantemiroir.be","Rue du Miroir 67, 1000 Bruxelles","Lundi au vendredi 8 h → 19 h (jeudi 13 h → 15 h) · samedi 9 h → 12 h, urgences","CONSEILLÉ PAR LES TRAVAILLEURS DU CENTRE.\n\nMaison médicale AU FORFAIT : une fois inscrit, les consultations ne se paient plus à chaque fois. C'est le système le plus simple pour quelqu'un sans revenus réguliers.\n\n⚠ IL FAUT S'INSCRIRE D'ABORD, et l'inscription lie la personne à cette maison-là.\n\nLe samedi matin, c'est urgences uniquement.\n\nSource : centresantemiroir.be, relevé le 08/08/2026.")),

  reco(d("medical","Médecine pour le Peuple — Molenbeek","Molenbeek-Saint-Jean","Maison médicale au forfait. Accueil social et administratif en plus des soins.","Tout public","02 411 11 03","molenbeek@mplp.be","medecine-pour-le-peuple.be","Rue Comte de Flandre 25, 1080 Molenbeek-Saint-Jean","Lun–Mer 8 h 30 → 13 h et 14 h → 19 h · Jeu 8 h 30 → 11 h et 14 h → 19 h · Ven 8 h 30 → 13 h et 14 h → 19 h","CONSEILLÉE PAR LES TRAVAILLEURS DU CENTRE.\n\nMaison médicale AU FORFAIT : une fois inscrit, les consultations ne se paient plus à chaque fois. C'est le système le plus simple pour quelqu'un sans revenus réguliers.\n\n⚠ IL FAUT S'INSCRIRE D'ABORD, et l'inscription lie la personne à cette maison-là.\n\n⚠ SANS MUTUELLE : appeler avant de s'y présenter. Les conditions d'inscription se vérifient au cas par cas.\n\nEn plus des soins : accueil avec aide sociale et administrative, consultations infirmières, consultations familiales ou conjugales. Kiné selon les centres.\n\nLeur principe : la santé est un droit, la première ligne doit être accessible à tous.\n\n⚠ LES HORAIRES NE SONT PAS LES MÊMES TOUS LES JOURS — le jeudi matin s'arrête à 11 h. La fiche annonçait « tous les jours 8 h 30 → 19 h », ce qui était faux.\n\nSources : maisonmedicale.org et medecine-pour-le-peuple.be, relevés le 08/08/2026. Fiche fusionnée le 07/08/2026 : elle existait en double, une fois sous « Molenbeek » et une fois sous « Molenbeek-Saint-Jean ».")),

  d("medical","Médecins du Monde – CASO Bruxelles","Bruxelles-Ville","Consultations pour personnes sans couverture santé.","Personnes sans mutuelle / sans-papiers","02 225 43 00","info@medecinsdumonde.be","medecinsdumonde.be","Rue Botanique 75, 1210 Bruxelles","","⚠ Les consultations du CASO se prennent SUR RENDEZ-VOUS, et sont ouvertes aux personnes orientées par leurs projets Outreach — on ne s'y présente pas au hasard. Appeler d'abord.\n\nIl existe aussi une permanence sociale par téléphone pour les questions sociales liées à la santé.\n\nSource : medecinsdumonde.be, relevé le 08/08/2026."),
  d("medical","Centres de Planning Familial","Régional / Toutes communes","Contraception, IVG, dépistage, écoute, consultations.","Tout public","","","loveattitude.be","","","Site à vérifier."),
  d("medical","Infirmiers de rue","Régional / Toutes communes","Soins infirmiers en rue, accompagnement vers un logement durable et maintien dans le logement, équipe santé mentale, formation et sensibilisation.","Personnes sans-abri et très précarisées","02 265 33 00","info@idr-sv.org","infirmiersderue.be","Rue Gheude 21-25/4, 1070 Bruxelles","Lun–Jeu 9h–13h / 14h–17h","Travaille en rue dans tout Bruxelles (également à Liège).\n\nPAS LE MÊME MÉTIER que les services d'infirmiers à domicile (Soins Chez Soi, CSD, ASD) : on ne les appelle pas pour commander un pansement. C'est l'équipe à appeler quand quelqu'un REFUSE les soins, ne va à aucun rendez-vous, ou repart en rue avec une plaie.\nLeurs bureaux sont à ANDERLECHT, rue Gheude — dans notre commune. Ils portent aussi du Housing First avec le SMES.\n⚠️ Deux versions des horaires : la fiche dit lun–jeu, les annuaires relevés le 01/08/2026 disent lun–ven 9h–13h et 14h–17h. Appeler avant de se déplacer.\nSources : infirmiersderue.be · social.brussels (fiche 14747) · annuaire.guidesocial.be · bornin.brussels."),
  d("medical","WOPS – Woluwe-Saint-Lambert (voir aussi Santé mentale)","Woluwe-Saint-Lambert","Soins psychiatriques et médico-psycho-sociaux pluridisciplinaires.","Adultes","02 762 97 20","info@wops-asbl.be","wops-asbl.be","Chaussée de Roodebeek 471, 1200 Woluwe-Saint-Lambert","Lun–Ven 9h–17h","Un seul numéro pour toute la maison : 02 762 97 20. Ils reçoivent enfants, adolescents, adultes ET personnes âgées — c'est rare, la plupart des services coupent à 18 ou à 65 ans.\n\nILS SE DÉPLACENT À DOMICILE quand la personne ne peut pas venir. À demander, ce n'est pas proposé d'office.\n\nVoir aussi la fiche Santé mentale, c'est la même maison : elle détaille le centre de jour, le centre de nuit et le lieu de liens.\n\nSource : platformbxl.brussels (Plateforme bruxelloise pour la santé mentale) et wops-asbl.be, relevés le 08/08/2026."),

  // ÉDUCATIF
  /* Ajoutée le 30/07/2026 : Mag ne connaissait pas ce service, et c'est probablement
     celui qui manque le plus — retrouver une famille perdue sur la route. */
  tags(d("educatif","Retrouver un proche — Croix-Rouge (RLF)","Régional / Toutes communes",
    "Retrouve un proche dont on a perdu la trace à cause d'une guerre, d'une catastrophe ou d'un parcours migratoire. Recherche menée dans le monde entier par le réseau Croix-Rouge / Croissant-Rouge. Service GRATUIT.",
    "Toute personne vivant en Belgique qui cherche un proche","105","service.rlf@croix-rouge.be","liens-familiaux.croix-rouge.be",
    "Espace Henry Dunant, Boulevard Ernest Mélot 42, 5000 Namur","Service RLF : lundi à jeudi, 9h30–12h30 (081 77 16 48)",
    "COMMENT ÇA MARCHE : le service organise un entretien — par téléphone, sur place ou en visio, avec un interprète si besoin — pour rassembler les éléments de la recherche (noms, dates, derniers contacts, photos).\nCE QU'IL FAIT AUSSI : faire passer un message à un proche (message Croix-Rouge) et accompagner un regroupement familial.\nCOMBIEN : 598 recherches actives en 2022, 102 personnes retrouvées.\nÀ Bruxelles, une permanence se tient au Hub humanitaire.\nSources relevées le 30/07/2026 : liens-familiaux.croix-rouge.be, accueil-migration.croix-rouge.be."),
    ["Migration","Familles séparées","Gratuit"]),
  d("educatif","ONE – Office de la Naissance et de l'Enfance","Régional / Toutes communes","Suivi de la grossesse et de la petite enfance — mais ce qu'on cherche, c'est la consultation du quartier, pas le siège.","Familles, 0–6 ans","02 511 47 51","info@one.be","one.be","Administration de Bruxelles : rue Saint-Bernard 28-32, 1060 Saint-Gilles","","⚠ NE PAS ENVOYER QUELQU'UN AU SIÈGE : on n'y suit pas d'enfant, c'est une administration. Ce qu'il faut à la famille, c'est LA CONSULTATION ONE DE SON QUARTIER — gratuite, sans rendez-vous pour la plupart, et sans condition de séjour ni de mutuelle.\n\nOÙ LA TROUVER : la carte des consultations par commune est sur my.one.be. C'est ce lien qu'on donne, pas un numéro.\n\nLES NUMÉROS, du plus utile au moins utile :\n• Administration de Bruxelles — 02 511 47 51, pour une question de professionnel sur une situation bruxelloise.\n• Siège central — 02 542 12 11, chaussée de Charleroi 95 à Saint-Gilles.\n\nCE QUE ÇA COUVRE : suivi de grossesse, consultations pour les 0-6 ans, vaccins, et l'agrément des milieux d'accueil.\n\nSources : one.be et platformbxl.brussels, relevés le 08/08/2026."),
  d("educatif","AMO – Aide en Milieu Ouvert","Régional / Toutes communes","Aide sociale et éducative aux jeunes et familles, dans leur milieu de vie.","Jeunes (0–18/22) et familles","","","","","","Une AMO par zone : ajouter celle(s) de votre secteur."),
  d("educatif","SAJ – Service de l'Aide à la Jeunesse","Régional / Toutes communes","Aide volontaire aux jeunes en difficulté ou en danger.","Jeunes et familles","","","","","","Aide négociée / non contrainte."),
  d("educatif","Infor Jeunes Bruxelles","Bruxelles-Ville","Information des jeunes : études, job, logement, droits.","Jeunes","02 514 41 11","bruxelles@ijbxl.be","ijbxl.be","Rue Van Artevelde 155, 1000 Bruxelles","Lundi et mercredi 10 h → 17 h · mardi, jeudi et vendredi 13 h → 17 h","Sans rendez-vous. Le site ijbxl.be liste aussi leurs autres points info dans Bruxelles.\n\nSource : ijbxl.be, relevé le 08/08/2026."),

  // JURIDIQUE
  d("juridique","Bureau d'Aide Juridique (BAJ) – Bruxelles","Régional / Toutes communes","Avocat pro deo (gratuit ou peu coûteux selon revenus).","Selon conditions de revenus","","","","","","Aide juridique de 2e ligne."),
  d("juridique","Services d'Aide aux Justiciables","Régional / Toutes communes","Aide sociale, psychologique et juridique aux victimes et aux justiciables.","Victimes, inculpés, détenus, proches","","","","","",""),
  d("juridique","SDJ – Service Droit des Jeunes","Bruxelles-Ville","Aide juridique et sociale spécialisée pour les mineurs et les jeunes.","Jeunes","02 209 61 61","bruxelles@sdj.be","sdj.be","Rue Van Artevelde 155, 1000 Bruxelles","","DEUX FAÇONS DE LES JOINDRE, et les horaires ne sont pas les mêmes :\n• AU TÉLÉPHONE — lundi, mercredi et vendredi de 9 h à 17 h.\n• SUR PLACE, sans rendez-vous — lundi et mercredi de 14 h à 18 h, vendredi de 13 h à 17 h.\n\nMême adresse qu'Infor Jeunes Bruxelles : Rue Van Artevelde 155.\n\nSource : sdj.be/contact, relevé le 08/08/2026."),
  d("juridique","Maisons de Justice","Régional / Toutes communes","Accès à la justice, guidance, mesures judiciaires.","Tout public","","","","","",""),

  // DROIT DES ÉTRANGERS
  d("etrangers","CIRÉ asbl","Ixelles","Coordination et permanences sur le droit des étrangers, l'asile et le séjour.","Personnes étrangères, professionnels","02 629 77 10","cire@cire.be","cire.be","Rue du Vivier 80-82, 1050 Ixelles","",""),
  d("etrangers","ADDE – Association pour le Droit Des Étrangers","Bruxelles-Ville","Permanence et information juridiques en droit des étrangers.","Personnes étrangères, professionnels","02 227 42 42","","adde.be","Rue du Boulet 22, 1000 Bruxelles","Accueil : 9 h → 12 h et 13 h → 17 h","LES PERMANENCES, chacune son créneau :\n• Séjour — lundi 9 h → 11 h par téléphone au 02 227 42 41, ou jeudi 9 h sur place.\n• Nationalité et droit international privé — mardi 13 h → 15 h au 02 227 42 41, ou mercredi 13 h sur place.\n• Service social — mardi et vendredi 9 h sur place.\n• AVEVI, victimes de violences intrafamiliales — jeudi 9 h → 12 h et vendredi 14 h → 17 h sur place.\n\n⚠ Les places sur place sont limitées à SIX personnes : arriver tôt, ou passer par le téléphone.\n\nSource : adde.be/contact, relevé le 08/08/2026."),
  d("etrangers","Myria – Centre fédéral Migration","Bruxelles-Ville","Information sur les droits fondamentaux des étrangers, regroupement familial.","Tout public","0800 14 912","myria@myria.be","myria.be","Rue Royale 138, 1000 Bruxelles","","PERMANENCE TÉLÉPHONIQUE JURIDIQUE : lundi et jeudi de 9 h 30 à 12 h 30, en français et en néerlandais. Numéro gratuit 0800 14 912 (ou 02 212 30 00).\n\n⚠ SUR PLACE, UNIQUEMENT SUR RENDEZ-VOUS — ne pas y envoyer quelqu'un à l'improviste.\n\nMyria est une institution publique indépendante : elle analyse la migration, défend les droits des étrangers et lutte contre la traite des êtres humains.\n\nSource : myria.be, relevé le 08/08/2026."),
  d("etrangers","Office des Étrangers","Bruxelles-Ville","Administration compétente pour le séjour et l'asile.","Tout public","02 488 80 00","","dofi.ibz.be","Boulevard Pachéco 44, 1000 Bruxelles","Téléphone : lundi au vendredi 8 h → 17 h · guichet : lundi au jeudi 8 h 30 → 15 h, vendredi 8 h 30 → 12 h","⚠ NE PAS Y ENVOYER QUELQU'UN POUR SA DEMANDE. Le guichet de l'Office ne répond PAS aux questions sur un dossier. On ne peut ni y déposer une demande, ni y prendre rendez-vous, ni y retirer un document, ni y ajouter une pièce.\n\nUNE DEMANDE DE SÉJOUR SE DÉPOSE À LA COMMUNE de résidence — ou au poste diplomatique belge si la personne est à l'étranger. C'est l'erreur qui fait perdre le plus de temps aux gens.\n\nL'adresse avait changé dans la fiche : c'est le boulevard Pachéco 44.\n\nSource : dofi.ibz.be, relevé le 08/08/2026."),
  d("etrangers","Fedasil","Bruxelles-Ville","Accueil des demandeurs de protection internationale.","Demandeurs d'asile","02 213 44 11","info@fedasil.be","fedasil.be","Rue des Chartreux 21, 1000 Bruxelles","","⚠ NE PAS ENVOYER QUELQU'UN AU SIÈGE : il ne reçoit pas les personnes. Pour une demande de protection internationale, c'est le CENTRE D'ARRIVÉE — Boulevard du 9e de Ligne 27, 1000 Bruxelles · 02 227 41 51.\n\nLe Dispatching (place d'accueil) : Rue de Passchendaele 2 · 02 227 41 51 · dispatching.infopunt@fedasil.be.\n\nSource : fedasil.be, relevé le 08/08/2026."),
  d("etrangers","Caritas International","Bruxelles-Ville","Aide et accompagnement des migrants et réfugiés.","Migrants, réfugiés","02 229 36 11","servicesocial@caritasint.be","caritasinternational.be","Rue de la Charité 43, 1210 Bruxelles","Rendez-vous à prendre entre 8 h 30 et 15 h 30","Le service social est de PREMIÈRE LIGNE : demandeurs d'asile, réfugiés reconnus, personnes migrantes. Accompagnement social ET juridique.\n\n⚠ Ça marche sur RENDEZ-VOUS : on appelle entre 8 h 30 et 15 h 30, ou on écrit à servicesocial@caritasint.be.\n\nSource : caritasinternational.be, relevé le 08/08/2026."),
  /* ─── APPRENDRE LE FRANÇAIS (ajouté le 06/08/2026 à la demande de Mag) ───
     Des cours gratuits ou presque, pour les primo-arrivants ET pour tout le monde :
     lire, écrire, parler. Rangés ici parce que c'est le premier réflexe quand on
     accompagne quelqu'un qui vient d'arriver — dis-moi si tu préfères un domaine
     à part, c'est une ligne à changer. */
  tags(d("etrangers","Lire et Écrire — Centre Alpha d'Anderlecht","Anderlecht",
    "Apprendre à LIRE, ÉCRIRE et PARLER le français, en groupe, le jour ou le soir. Pour les adultes peu ou pas scolarisés, quelle que soit leur langue maternelle — y compris des francophones qui n'ont jamais appris à écrire.\nC'est de l'alphabétisation, pas un cours de langue classique : on part de zéro, sans honte, au rythme de chacun.",
    "Adultes peu ou pas scolarisés ; primo-arrivants comme personnes installées depuis longtemps",
    "02 521 30 02","bxl.anderlecht@lire-et-ecrire.be","lire-et-ecrire.be","Rue Gheude 21-25, 1070 Anderlecht","",
    "DANS NOTRE COMMUNE — même rue que les Infirmiers de rue (Gheude). Métro Clémenceau (2-6), tram 81, bus 46.\nL'inscription passe par le service d'accueil et d'orientation de Lire et Écrire Bruxelles : on téléphone d'abord, il y a un entretien pour situer le niveau. Les places partent vite à la rentrée de septembre.\nSources : lire-et-ecrire.be. Relevé le 06/08/2026."),
    ["Apprendre le français","Alphabétisation","Anderlecht"]),
  tags(d("etrangers","Lire et Écrire — Centre Alpha de Molenbeek","Molenbeek-Saint-Jean",
    "Le même travail qu'à Anderlecht : lire, écrire et parler le français, en groupe, jour ou soir, pour des adultes peu ou pas scolarisés.",
    "Adultes peu ou pas scolarisés","02 420 71 82","bxl.molenbeek@lire-et-ecrire.be","lire-et-ecrire.be",
    "Rue de la Borne 14 bte 9, 1080 Molenbeek-Saint-Jean","",
    "Utile quand quelqu'un habite ou travaille du côté de Molenbeek : c'est le même mouvement, la même approche.\nLire et Écrire a aussi des centres à Ixelles (02 646 20 96), Forest (02 534 49 55) et Schaerbeek (02 245 19 41).\nSources : lire-et-ecrire.be. Relevé le 06/08/2026."),
    ["Apprendre le français","Alphabétisation"]),
  tags(d("etrangers","BAPA BXL — parcours d'accueil et cours de français gratuits","Bruxelles-Ville",
    "Le bureau d'accueil des primo-arrivants de la Ville de Bruxelles. Il ouvre le PARCOURS D'ACCUEIL : un bilan social, une information sur les droits et les devoirs, et des COURS DE FRANÇAIS GRATUITS chez leurs partenaires.\nC'est la porte d'entrée officielle : de là, la personne est orientée vers le cours qui correspond à son niveau et à son quartier.",
    "Primo-arrivants en Région bruxelloise","02 279 49 70","info.bapabxl@brucity.be","bapabxl.be",
    "Boulevard Pacheco 34 (5e étage), 1000 Bruxelles","",
    "À PROPOSER D'ABORD quand la personne vient d'arriver : le parcours d'accueil est parfois obligatoire, et il ouvre l'accès aux cours gratuits.\nIl existe un second bureau côté néerlandophone (BON / in-gent) et un autre pour les communes du sud (BAPA Via).\nSources : bapabxl.be. Relevé le 06/08/2026."),
    ["Apprendre le français","Primo-arrivants","Gratuit"]),
  tags(d("etrangers","Proforal — français et insertion professionnelle","Molenbeek-Saint-Jean",
    "Cours de français pour adultes, avec une entrée par le travail : du français « en situation » (à l'école, chez le médecin, au guichet) et des pré-formations gratuites orientées métier, avec un accompagnement individuel.",
    "Demandeurs d'emploi, primo-arrivants, adultes qui veulent progresser en français",
    "02 642 93 84","info@proforal.be","proforal.be","Chaussée de Jette 229, 1080 Molenbeek-Saint-Jean","",
    "Le bon plan quand la personne cherche du travail : le français y est appris POUR le métier, pas dans l'abstrait. Les formations pour demandeurs d'emploi sont gratuites (Bruxelles Formation, Actiris).\nProforal anime aussi « Bruxelles FLE », l'annuaire des cours de français à Bruxelles — utile pour trouver un cours près de chez quelqu'un.\nSources : proforal.be. Relevé le 06/08/2026."),
    ["Apprendre le français","Emploi"]),
  /* SASB (Siréas), ajoutée le 05/08/2026 à sa demande. ⚠️ DEUX numéros circulent :
     la FDSS donne le 02 274 15 51, le site de Siréas le 02 649 99 58 — les deux sont ici,
     à trancher au premier appel. */
  d("etrangers","SASB – Service d'Action Sociale Bruxellois (Siréas)","Bruxelles-Ville",
    "Service social pour les personnes d'origine étrangère, avec ou sans titre de séjour : information sur les droits et les devoirs en Belgique, aide dans les démarches administratives, et un service juridique qui travaille avec le service social.\nDeux autres missions : l'AIDE AUX JUSTICIABLES (soutien moral, social, psychologique et matériel aux personnes détenues, sortant de détention, et à leurs familles) et le SERVICE SOCIAL INTERNATIONAL (branche belge du Social International Service — pour les situations qui demandent une intervention entre deux pays : famille restée au pays, documents, protection d'enfants).",
    "Personnes d'origine étrangère, avec ou sans titre de séjour ; personnes détenues ou sortant de détention et leurs proches",
    "02 274 15 51","sasb@sireas.be","sireas.be","Rue du Boulet 26, 1000 Bruxelles",
    "Lun–Ven 8h30–13h et 14h–17h",
    "AVANT D'ENVOYER QUELQU'UN : les permanences sociales et juridiques sont parfois suspendues (fermetures de bureau) — la permanence TÉLÉPHONIQUE, elle, tient mardi, jeudi et vendredi de 14h à 16h30. Les rendez-vous déjà pris sont maintenus.\n⚠️ Deux numéros relevés : 02 274 15 51 (fiche FDSS) et 02 649 99 58 (site de Siréas). Appeler le premier, noter lequel répond.\nLe service social international est la porte à pousser quand le dossier touche un autre pays — c'est rare et peu de monde y pense.\nSources : fdss.be (fiche membre SASB-Siréas) · sireas.be. Relevé le 05/08/2026."),
  d("etrangers","CRIPA – Accueil des primo-arrivants (Anderlecht)","Anderlecht","Accueil et accompagnement des primo-arrivants, médiation interculturelle entre les citoyens et les institutions, projets d'inclusion sociale.","Primo-arrivants et professionnels en contact avec ce public","02 526 11 70","cripa@anderlecht.brussels","anderlecht.be/fr/accueil-primo-arrivants","Clos de l'Equerre 9, 1070 Anderlecht","","Cellule Relations Interculturelles et Primo-Arrivants de la commune. Autre contact : inclusion@anderlecht.brussels"),
  /* Le ticket Article 27, expliqué une fois pour toutes. Source : le dépliant officiel
     2025-2026 d'Article 27 Bruxelles + leur fiche du Réseau. Relevé le 30/07/2026. */
  /* Le dénombrement : Mag n'en avait jamais entendu parler et voulait comprendre
     à quoi ça sert. Source : denombrement.org, relevé le 30/07/2026. */
  formation("Le dénombrement — compter les personnes sans-abri à Bruxelles",
    "Ce que c'est, qui l'organise, comment ça se passe, et pourquoi ça vaut la peine d'y aller.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('compass')} <b>Une nuit par an, on compte.</b> Le dénombrement fait la photographie du sans-abrisme à Bruxelles : les personnes qui dorment en rue, et celles qui sont mal logées. C'est la 9e édition.</div>

  <div class="f-h">Ce que c'est</div>
  <div class="f-card"><div class="fn">Une photographie, pas une estimation</div><div class="fw">Un comptage réel, la même nuit, dans toute la Région bruxelloise. On compte les personnes en rue <b>et</b> celles en situation de mal-logement — squats, hébergements, solutions provisoires.</div></div>

  <div class="f-h">Qui l'organise</div>
  <div class="f-card"><div class="fn">Bruss'help, avec tout le secteur</div><div class="fw">Bruss'help pilote l'opération avec le secteur bruxellois de l'aide aux sans-abri et les services voisins. Ce sont des <b>volontaires et des travailleurs sociaux</b> qui comptent — pas des enquêteurs extérieurs. C'est le réseau qui se regarde lui-même.</div></div>

  <div class="f-h">Comment ça se passe</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Le repérage, avant</b><span>On identifie à l'avance les endroits où les personnes trouvent refuge. Sans ça, on compte mal.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>La nuit du comptage</b><span>Rendez-vous à 20 h 30 pour les consignes, puis le comptage <b>entre 23 h et minuit</b>. Au moins 200 volontaires sont attendus, répartis en équipes.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Le lendemain, les questionnaires</b><span>Les services d'hébergement transmettent leurs chiffres, et des questionnaires recueillent les conditions de vie. C'est là qu'on apprend le plus.</span></div></div>
  </div>
  <div class="f-note">${icon('clock')} <b>Prochaine édition : la nuit du 15 au 16 octobre 2026.</b> Rendez-vous à 20 h 30, Odisee Campus Brussels.</div>

  <div class="f-h">À quoi servent les résultats</div>
  <div class="f-card"><div class="fn">À rendre visible ce qui ne l'est pas</div><div class="fw">Le dénombrement donne un état des lieux régulier du sans-abrisme et des outils d'analyse aux acteurs de terrain. Sans chiffre, un besoin n'existe pas dans une décision politique — c'est ce comptage qui fait exister le nôtre.</div></div>

  <div class="f-h">Pourquoi y aller</div>
  <div class="f-do yes"><b>${icon('check')} Trois bonnes raisons</b><ul>
    <li><b>On connaît le terrain.</b> Nous savons où les gens dorment ; un volontaire qui découvre le quartier, non.</li>
    <li><b>Ça compte pour l'année entière.</b> Les chiffres d'une nuit servent d'argument pendant douze mois, pour des places et des budgets.</li>
    <li><b>Ça se fait à plusieurs, en une nuit.</b> Une soirée, en équipe, avec des consignes claires. Pas un engagement long.</li>
  </ul></div>

  <div class="f-h">S'inscrire</div>
  <div class="f-card"><div class="fn">Trois formulaires, au choix</div><div class="fw">Le comptage de nuit · le repérage préalable · la formation au questionnaire. L'inscription est <b>obligatoire</b> — on ne débarque pas le soir même.<br><br><a href="https://denombrement.org/index.php/fr" target="_blank" rel="noopener">denombrement.org</a></div></div>

  <p class="vm-src">Source : denombrement.org, relevé le 30/07/2026. À revérifier avant chaque édition : la date et le lieu de rendez-vous changent.</p>
  ${ficheLiens("Où l’envoyer",[
    ["Bruss'help","Bruss’help — une place d’urgence"],
    ["DoucheFLUX","DoucheFLUX"],
    ["Infirmiers de rue","Infirmiers de rue"]
  ])}

</div>`, "Sans-abrisme"),

  formation("Article 27 — le ticket culture à 1,25 €",
    "Ce que c'est, qui y a droit, comment on obtient les tickets et comment on s'en sert. Et les 141 lieux qui les acceptent.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('ticket')} <b>Un ticket qui ouvre la culture à 1,25 €.</b> Théâtre, cinéma, musées, concerts : la personne paie 1,25 € au lieu du prix plein. Le reste est pris en charge.</div>

  <div class="f-h">Qui y a droit</div>
  <div class="f-card"><div class="fn">Les personnes en difficulté économique</div><div class="fw">Il n'y a pas de formulaire à remplir ni de revenu à prouver au guichet : c'est <b>l'association qui accompagne la personne</b> qui apprécie la situation et lui remet le ticket. Nous sommes cette association.</div></div>
  <div class="f-note">${icon('chevron')} <b>Ça ne se demande jamais en direct.</b> Une personne ne peut pas s'adresser seule à Article 27 : elle passe par une association partenaire.</div>

  <div class="f-h">Obtenir les tickets</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Le centre doit être partenaire</b><span>C'est la convention avec Article 27 Bruxelles qui donne accès aux carnets de tickets. À vérifier chez nous : sommes-nous déjà partenaires, et qui détient les tickets ?</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Le CPAS aussi en donne</b><span>Une personne suivie par un CPAS <b>y a droit</b> et peut demander ses tickets là-bas. Mais elle doit le <b>demander</b> : on ne les lui propose pas au guichet. À lui dire à chaque fois — c'est la raison n°1 pour laquelle des gens n'en ont jamais eu.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Article 27 Bruxelles</b><span>Rue de la Senne 81, 1000 Bruxelles · 02 646 30 28 · bruxelles@article27.be</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Le ticket porte un cachet et une validité</b><span>Le cachet de l'association et la validité du mois : les deux se vérifient avant de le donner.</span></div></div>
  </div>

  <div class="f-h">S'en servir — les quatre règles</div>
  <div class="f-do yes"><b>${icon('check')} À faire</b><ul>
    <li><b>Réserver à l'avance</b> — sauf pour les cinémas.</li>
    <li><b>Vérifier sur le ticket</b> la validité du mois et le cachet de l'association.</li>
    <li><b>Échanger le ticket à l'accueil ou à la billetterie</b>, accompagné de 1,25 €.</li>
    <li><b>Repérer le lieu avant</b> : la liste est dans « Ce qui arrive », bouton <b>Art 27</b> — 141 lieux, commune par commune, Anderlecht en tête.</li>
  </ul></div>
  <div class="f-note">${icon('alert')} <b>Revendre un ticket Article 27 n'est pas permis.</b></div>

  <div class="f-h">Ce que ça change pour nous</div>
  <div class="f-card"><div class="fn">Une sortie devient possible sans argent</div><div class="fw">C'est l'un des rares leviers qui rend la culture accessible tout de suite, sans dossier ni délai. Utile pour un premier lien, pour occuper un après-midi, pour sortir quelqu'un du centre.</div></div>
  <div class="f-card"><div class="fn">Et ça ne remplace pas le gratuit</div><div class="fw">Beaucoup de choses sont déjà gratuites : musées le 1er dimanche et le 1er mercredi, BELvue chaque mercredi, Cultureghem, la Ludobox. Le ticket sert pour ce qui reste payant.</div></div>

  <p class="vm-src">Source : dépliant officiel « Où utiliser votre ticket Article 27 » 2025-2026 (bruxelles.article27.be) — relevé le 30/07/2026.</p>
  ${ficheLiens("Où l’envoyer",[
    ["Article 27 Bruxelles","Article 27 Bruxelles"],
    ["WAKA UP","WAKA UP"],
    ["Musées gratuits — le 1er dimanche du mois","Les musées gratuits"]
  ])}

</div>`, "Article 27"),

  formation("Cartes de séjour & droits","Quelle carte = quels droits (travail, CPAS). D'après une formation CIRÉ.",[],
`<div class="f-page">
  <div class="f-lead">${icon('cle')} <b>La carte de séjour détermine les droits</b> (travail, CPAS, nationalité). Plus le séjour est stable, plus les droits sont larges. <b>Provisoire → 1 an → illimité (5 ans).</b></div>
  <div class="f-h">Les cartes & les droits</div>
  <div class="f-grid">
    <div class="f-card"><div class="fn">Carte orange</div><div class="fw">Provisoire, en attente d'une décision (asile, régul. médicale, RF en cours).</div><div class="f-chips"><span class="f-chip mid">Travail : selon</span><span class="f-chip mid">CPAS : selon</span></div></div>
    <div class="f-card"><div class="fn">A — Temporaire</div><div class="fw">Réfugié, protection, RF, régularisé, étudiant, permis unique (1 à 5 ans).</div><div class="f-chips"><span class="f-chip ok">Travail ✓</span><span class="f-chip ok">CPAS ✓</span></div></div>
    <div class="f-card"><div class="fn">B — Illimité</div><div class="fw">Après 5 ans de séjour, ou régularisé illimité.</div><div class="f-chips"><span class="f-chip ok">Travail ✓</span><span class="f-chip ok">CPAS ✓</span></div></div>
    <div class="f-card"><div class="fn">K / L</div><div class="fw">K (ex-C) : établissement · L (ex-D) : résident longue durée UE.</div><div class="f-chips"><span class="f-chip ok">Travail ✓</span><span class="f-chip ok">CPAS ✓</span></div></div>
    <div class="f-card"><div class="fn">EU / EU+</div><div class="fw">Citoyens UE : séjour +3 mois / permanent (après 5 ans).</div><div class="f-chips"><span class="f-chip ok">Travail ✓</span><span class="f-chip mid">CPAS : conditions</span></div></div>
    <div class="f-card"><div class="fn">F / F+</div><div class="fw">Membre de famille d'un·e Belge/UE (regroupement familial).</div><div class="f-chips"><span class="f-chip ok">Travail ✓</span><span class="f-chip mid">CPAS : risque séjour</span></div></div>
  </div>
  <div class="f-h">Sans-papiers (séjour irrégulier)</div>
  <div class="f-card"><div class="fw">Droits très limités : aide médicale urgente, école (6–18 ans), ester en justice, se marier.</div><div class="f-chips"><span class="f-chip no">Travail ✗</span><span class="f-chip no">CPAS ✗</span><span class="f-chip">AMU seulement</span></div></div>
  <div class="f-h">Régularisation</div>
  <div class="f-grid">
    <div class="f-card"><div class="fn">9 bis — humanitaire</div><div class="fw">Séjour irrégulier + circonstances exceptionnelles et ancrage. Décision discrétionnaire de l'Office des étrangers.</div></div>
    <div class="f-card"><div class="fn">9 ter — médicale</div><div class="fw">Maladie grave + soins inaccessibles dans le pays d'origine.</div></div>
  </div>
  <div class="f-note">${icon('alert')} <b>Orientation, pas un conseil juridique.</b> Le droit des étrangers change souvent — pour une situation précise, orienter vers une permanence spécialisée (<b>CIRÉ, ADDE</b>). Source : formation CIRÉ « Cartes de séjour : quelle carte, quels droits ? » (2025).</div>
  ${ficheLiens("Où l’envoyer",[
    ["CIRÉ","CIRÉ"],
    ["ADDE","ADDE — le droit des étrangers"],
    ["Myria","Myria"],
    ["Office des Étrangers","Office des Étrangers"]
  ])}

</div>`, "Droit des étrangers"),

  formation("Apprendre le français à Bruxelles — et le parcours qui est OBLIGATOIRE",
    "Où envoyer quelqu'un pour des cours gratuits, la question qui décide de tout, et l'obligation à 2 500 € d'amende que personne ne connaît.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('alert')} <b>Deux choses à savoir avant d'orienter quelqu'un.</b> D'abord, le parcours d'accueil est <b>obligatoire</b> à Bruxelles depuis 2022 — ne pas le faire coûte une amende. Ensuite, « cours de français » recouvre deux métiers différents, et se tromper de porte fait perdre des mois.</div>

  <div class="f-h">1. L'obligation que personne ne connaît</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Qui est concerné</b><span>Toute personne de <b>18 à 65 ans</b> qui s'inscrit pour la <b>première fois</b> au registre des étrangers d'une commune bruxelloise et séjourne légalement en Belgique depuis <b>moins de trois ans</b>.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Les délais</b><span>S'inscrire dans un bureau d'accueil (BAPA) dans les <b>6 mois</b> après la notification par la commune, puis <b>18 mois</b> pour terminer.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Ce que ça contient</b><span>Un bilan social individuel, une formation citoyenne de 60 heures, et des cours de français — le tout gratuit.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Le prix du silence</b><span>Amende administrative de <b>100 à 2 500 €</b>. Quelqu'un qu'on n'a pas orienté peut le payer très cher — c'est pour ça que la question se pose à l'accueil, pas six mois plus tard.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Des dispenses existent</b><span>Raisons médicales, travail, formation déjà en cours. Elles se demandent, elles ne s'obtiennent pas toutes seules.</span></div></div>
  </div>

  <div class="f-h">2. La question qui décide de tout</div>
  <div class="f-lead"><b>« Savez-vous lire et écrire dans VOTRE langue ? »</b> C'est elle qui oriente, pas le niveau de français.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Si la réponse est non → ALPHABÉTISATION</b><span>La personne apprend à lire et écrire en même temps que le français. C'est un autre métier, un autre rythme, d'autres formateurs. La mettre dans un cours de FLE, c'est la mettre en échec.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Si la réponse est oui → FLE</b><span>Français langue étrangère : elle sait déjà lire et écrire, elle apprend une nouvelle langue. Ça va beaucoup plus vite.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Et si on ne sait pas ?</b><span>On n'a pas à trancher soi-même. <b>Lire et Écrire fait ce tri</b> dans ses points d'accueil : ils évaluent et ils orientent vers le bon opérateur, y compris chez quelqu'un d'autre qu'eux.</span></div></div>
  </div>
  <div class="f-note">${icon('bulb')} <b>Comment poser la question sans humilier.</b> Pas « vous êtes analphabète ? » mais « à l'école, vous êtes allé jusqu'où ? » ou « vous préférez que je vous l'écrive ou que je vous l'explique ? ». La réponse vient toute seule, et la personne garde sa dignité.</div>

  <div class="f-h">3. Qui fait quoi</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>BAPA BXL</b><span>Le bureau d'accueil : c'est LUI qu'il faut pour le parcours obligatoire. Bilan social, formation citoyenne, cours de français. Gratuit.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Lire et Écrire</b><span>L'alphabétisation, et le point d'accueil qui oriente quand on ne sait pas. Deux centres près de nous : Anderlecht (rue Gheude) et Molenbeek.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Proforal</b><span>Le français tourné vers le travail, pour quelqu'un qui vise un emploi.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>CRIPA</b><span>L'accueil des primo-arrivants à Anderlecht — dans notre commune.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>La Ligue des Familles</b><span>Des cours de français pour adultes aussi, moins connus.</span></div></div>
  </div>

  ${ficheLiens("Où l’envoyer",[
    ["BAPA BXL","BAPA — le parcours obligatoire"],
    ["Lire et Écrire — Centre Alpha d'Anderlecht","Lire et Écrire — Anderlecht"],
    ["Lire et Écrire — Centre Alpha de Molenbeek","Lire et Écrire — Molenbeek"],
    ["Proforal","Proforal — français et travail"],
    ["CRIPA","CRIPA — Anderlecht"],
    ["La Ligue des Familles","La Ligue des Familles"]
  ])}

  <div class="f-note">${icon('note')} <b>Sources.</b> bruxelles.be — parcours d'accueil obligatoire et BAPA BXL. vivalis.brussels — l'intégration des primo-arrivants. lire-et-ecrire.be — accueil et orientation du public à Bruxelles, et les balises alpha/FLE. cbai.be. Relevés le 08/08/2026. ⚠ Les conditions du parcours obligatoire ont déjà changé une fois : vérifier auprès du BAPA avant d'annoncer une obligation ou une dispense à quelqu'un.</div>
</div>`, "Apprendre le français"),

  guide("Guide — Quels droits selon la carte ?","Réponds à quelques questions → la piste de droits (travail, CPAS).",[],"cartes", "Droit des étrangers"),

  // SANTÉ MENTALE
  d("santementale","WOPS – Woluwe-Psycho-Social","Woluwe-Saint-Lambert","Service de Santé Mentale : consultations, centre de jour et de nuit, lieu de liens.","Enfants, ados, adultes et personnes âgées","02 762 97 20","info@wops-asbl.be","wops-asbl.be","Chaussée de Roodebeek 471, 1200 Woluwe-Saint-Lambert","Lun–Ven 9h–17h","QUATRE UNITÉS SOUS LE MÊME TOIT, un seul numéro pour toutes : le service de santé mentale (consultations psychiatriques, psychologiques, logopédie, psychomotricité), un CENTRE DE JOUR psychothérapeutique, un CENTRE DE NUIT, et un lieu de liens.\n\nLE CENTRE DE NUIT est ce qui se trouve le moins ailleurs : quand les nuits sont le vrai problème et qu'une hospitalisation complète serait de trop.\n\nILS PRENNENT TOUS LES ÂGES, enfants comme personnes âgées, et ils se déplacent à domicile si la personne ne peut pas venir.\n\nAffilié Iriscare / Cocof.\n\nSource : platformbxl.brussels et wops-asbl.be, relevés le 08/08/2026."),
  d("santementale","Services de Santé Mentale (SSM)","Régional / Toutes communes","Consultations psychologiques et psychiatriques ambulatoires.","Tout public","","","","","","Un SSM par zone : ajouter celui de votre secteur."),
  urgent(d("santementale","Centre de Prévention du Suicide","Régional / Toutes communes","Écoute pour personnes en détresse et leur entourage.","Tout public","0800 32 123","","preventionsuicide.be","","24h/24","Gratuit. Site à vérifier.")),

  // LOGEMENT
  d("logement","Agences Immobilières Sociales (AIS)","Régional / Toutes communes","Location de logements à loyer modéré, accompagnement.","Ménages à revenus modestes","","","","","","Ajouter l'AIS de votre commune."),
  d("logement","Maisons d'accueil (AMA)","Régional / Toutes communes","Hébergement et accompagnement des personnes sans logement.","Personnes sans-abri, en rupture","","","ama.be","","","Site à vérifier."),
  d("logement","Logement social bruxellois (SLRB)","Régional / Toutes communes","Attribution de logements sociaux.","Ménages à faibles revenus","","","slrb.brussels","","","Site à vérifier."),

  // SOCIAL — compléments
  d("social","Les Petits Riens","Saint-Gilles","Aide matérielle, seconde main, hébergement et réinsertion socioprofessionnelle.","Personnes précarisées","02 541 13 86","","petitsriens.be","Rue Américaine 101, 1050 Bruxelles","",""),
  d("social","Restos du Cœur — le resto mobile à Anderlecht","Anderlecht","Colis alimentaires distribués dans les quartiers, trois jours par semaine.","Personnes en précarité","0496 20 30 37","federation@restosducoeur.be","restosducoeur.be","Mardi Goujons · mercredi Peterbos · jeudi Scheut","Fédération : du lundi au vendredi, 8 h → 12 h","LE RESTO MOBILE PASSE DANS NOTRE COMMUNE, trois fois par semaine :\n• Mardi — rue des Goujons, à Cureghem.\n• Mercredi — parc du Peterbos.\n• Jeudi — avenue de Scheut.\n\nCe sont des COLIS alimentaires, distribués dans le quartier.\n\n⚠ POUR LES HORAIRES ET L'ACCÈS AUX COLIS, c'est le CPAS d'Anderlecht qui renseigne — pas la fédération. Les jours et les emplacements bougent : vérifier avant d'y envoyer quelqu'un.\n\nLa fédération, pour les questions générales : 0496 20 30 37, du lundi au vendredi de 8 h à 12 h, rue de Vrière 67, 1020 Bruxelles.\n\nSource : restosducoeur.be, relevé le 08/08/2026."),

  // MÉDICAL — compléments
  d("medical","Free Clinic","Ixelles","Santé accessible : médecine générale, planning familial, assuétudes, social.","Tout public, sans condition","02 512 13 14","","freeclinic.be","Chaussée de Wavre 154a, 1050 Bruxelles","",""),
  d("medical","Aquarelle – CHU Saint-Pierre","Bruxelles-Ville","Suivi de grossesse et périnatalité pour femmes en situation précaire ou sans papiers — l'orientation passe par la consultation prénatale de Saint-Pierre.","Femmes enceintes précarisées","02 411 23 80","aquarelle@stpierre-bru.be","aquarelle-bru.be","Rue Haute 322, 1000 Bruxelles","","⚠ ON N'ENVOIE PAS DIRECTEMENT À AQUARELLE : l'entrée se fait par la CONSULTATION PRÉNATALE du CHU Saint-Pierre, 02 535 47 13 — bâtiment 200, 5e étage, rue aux Laines 105. C'est de là que la femme est orientée vers Aquarelle. Le 02 411 23 80 ci-dessus reste utile pour une question d'équipe.\n\nPOUR QUI, précisément : femme enceinte ou jeune maman SUIVIE AU CHU SAINT-PIERRE, sans titre de séjour, sans mutuelle, en grande précarité. Si la personne n'est pas suivie là-bas, c'est la consultation prénatale qu'on appelle d'abord.\n\nCE QU'ELLES ONT ET QU'ON NE TROUVE PAS AILLEURS : sages-femmes, assistante sociale, kiné périnatale, préparation à la naissance, rebozo, ateliers sociolinguistiques, rencontres parents-bébés — et une VESTIAIRE de vêtements et de matériel de puériculture, réservée à leurs patientes.\n\nMétro Porte de Hal ou Hôtel des Monnaies · bus 27 et 48, arrêt Hôpital Saint-Pierre.\n\nSource : aquarelle-bru.be, relevé le 08/08/2026."),
  d("medical","Modus Vivendi","Régional / Toutes communes","Réduction des risques liés à l'usage de drogues, matériel stérile, information.","Usagers de drogues, pros","02 644 22 00","modus@modusvivendi-be.org","modusvivendi-be.org","Rue Jourdan 151, 1060 Bruxelles","Du lundi au vendredi, 9 h → 17 h",
    "Le siège, où l'on joint l'équipe et où se prennent les formations et le testing.\n\nDeux autres portes, plus proches des personnes :\n• Le Pilier — Rue Van Artevelde 83, 1000 Bruxelles · 02 315 78 80 · permanences lundi, mercredi et vendredi de 14 h à 18 h.\n• Modus Fiesta — Rue Van Artevelde 130, 1000 Bruxelles (accueil et information).\n\nSource : modusvivendi-be.org/contact et social.brussels, relevés le 08/08/2026."),
  d("medical","SAMPAS – Réseau Hépatite C Bruxelles","Régional / Toutes communes","Service d'Accompagnement Mobile pour l'Accès aux Soins : équipe pluridisciplinaire (médecin, travailleurs sociaux, infirmiers) qui va vers les personnes, coordonne l'accès aux soins et accompagne vers le dépistage et le traitement de l'hépatite C.","Usagers de drogues et publics précarisés, professionnels","02 506 70 92","sampas@stpierre-bru.be","reseauhepatitec.be","CHU Saint-Pierre, Rue Haute 322, 1000 Bruxelles","","Service mobile : se déplace dans Bruxelles. Coordonné par l'asbl Réseau Hépatite C – Bruxelles (info@reseauhepatitec.be)."),

  // SANTÉ MENTALE — compléments
  d("santementale","SSM Ulysse — santé mentale des personnes exilées","Ixelles","Santé mentale pour personnes exilées, demandeurs d'asile et sans-papiers.","Migrants, exilés","02 533 06 70","accueil@ulysse-ssm.be","ulysse-ssm.be","Rue de l'Ermitage 52, 1050 Ixelles","Tous les jours 9 h 30 → 17 h · mardi, mercredi, jeudi jusqu'à 18 h","POUR QUI : les personnes exilées en précarité de séjour et en souffrance psychologique. Créé en 2003 exprès pour ça — c'est la porte quand un demandeur d'asile ou une personne sans papiers va mal.\n\nConsultations psychologiques ET psychiatriques, en individuel, notamment après des traumatismes.\n\nHORAIRES : permanences ou rendez-vous tous les jours de 9 h 30 à 17 h ; mardi, mercredi et jeudi jusqu'à 18 h.\n\nSource : ulysse-ssm.be, relevé le 08/08/2026."),
  d("santementale","Le Méridien – SSM","Saint-Josse-ten-Noode","Service de Santé Mentale : consultations psychologiques et psychiatriques.","Tout public","02 218 56 08","secretariat@ssmlemeridien.be","ssmlemeridien.be","Rue du Méridien 68, 1210 Saint-Josse-ten-Noode","","Service de Santé Mentale agréé COCOF, pour Saint-Josse et Schaerbeek.\n\nAccessible à toute personne en difficultés psychiatriques, psychologiques OU sociales — quels que soient l'âge, le statut social et l'origine.\n\nSource : ssmlemeridien.be, relevé le 08/08/2026."),
  d("santementale","Similes Bruxelles — pour les proches","Ixelles","Soutien aux familles et aux proches de personnes en souffrance psychique.","Proches et aidants","02 511 06 19","info@similes.brussels","similes.brussels","Rue Maria Malibran 49, 1050 Ixelles","Lun–Ven 9h–17h","POUR LES PROCHES, PAS POUR LA PERSONNE MALADE. C'est ce qui la distingue : elle aide les familles et l'entourage de quelqu'un qui souffre de troubles psychiques. Quand on ne sait plus quoi faire d'un fils, d'une sœur, d'un conjoint — c'est ici.\n\n⚠ NE PAS COMPOSER LE 0408.951.208 qui circule sur internet : c'est leur NUMÉRO D'ENTREPRISE, pas un téléphone. Le vrai est le 02 511 06 19, sur leur propre site.\n\nGroupes de parole, formations, entretiens psychosociaux. Ils informent aussi sur les droits, les aides et la gestion des biens — la question qui revient toujours dans les familles.\n\nPionnière en Belgique, créée en 1968 par des familles.\n\nSource : similes.brussels, relevé le 08/08/2026."),

  // ÉDUCATIF — compléments
  d("educatif","La Ligue des Familles","Ixelles","Information et soutien à la parentalité, défense des droits des familles — et du conseil juridique gratuit.","Familles, parents","02 507 72 11","info@liguedesfamilles.be","liguedesfamilles.be","Avenue Émile de Beco 109, 1050 Ixelles","Lun–Ven 9h–17h","CE QUI SERT LE PLUS SUR LE TERRAIN, et qu'on oublie de citer : leurs CONSEILS JURIDIQUES SONT GRATUITS. Séparation, garde des enfants, pensions alimentaires — quand la question est familiale et qu'on n'a pas de quoi payer un avocat, c'est une porte.\n\nAussi : baby-sitting, bourses de vêtements, carte famille nombreuse, vacances, cours de français pour adultes (FLE).\n\n⚠ Le site laligue.be renvoie maintenant vers liguedesfamilles.be — l'ancienne adresse traîne encore dans de vieux documents.\n\nSource : liguedesfamilles.be et bornin.brussels, relevés le 08/08/2026."),
  d("educatif","Coordination des Écoles de Devoirs de Bruxelles","Molenbeek-Saint-Jean","Répertoire des écoles de devoirs : soutien scolaire et accompagnement.","Enfants, jeunes, parents","02 411 43 30","info@ceddbxl.be","ecolesdedevoirs.be","Rue de la Colonne 54, 1080 Molenbeek-Saint-Jean","","POUR TROUVER L'ÉCOLE DE DEVOIRS D'UN QUARTIER, on ne les appelle pas forcément : leur site a un moteur « Trouver une EDD » qui cherche par commune. C'est ce lien qu'on donne à la famille.\n\nLe 02 411 43 30 sert quand on veut leur parler entre professionnels — une place qui se libère, une situation particulière, une formation d'animateur.\n\n⚠ Leur adresse internet a changé : ce n'est plus cedb.be ni ceddbxl.be mais ecolesdedevoirs.be.\n\nSiège social rue de la Borne 14, activités rue de la Colonne 54, les deux à Molenbeek.\n\nSource : ecolesdedevoirs.be, relevé le 08/08/2026."),

  // LOGEMENT — compléments
  d("logement","DIOGENES","Régional / Toutes communes","Travail de rue auprès des personnes sans-abri, accompagnement vers le logement.","Personnes sans-abri","02 502 19 35","info@diogenes.brussels","diogenes.brussels","Place de Ninove 10, 1000 Bruxelles","","⚠ L'adresse est administrative : IL N'Y A PAS DE PERMANENCE sur place. On les joint par téléphone ou par mail — leur travail se fait dans la rue, pas au bureau.\n\nSource : diogenes.brussels, relevé le 08/08/2026."),
  d("logement","L'Ilot","Régional / Toutes communes","Maisons d'accueil et accompagnement vers le logement et la réinsertion.","Personnes sans logement","02 537 20 41","info@ilot.be","ilot.be","Rue de l'Église 73, 1060 Bruxelles","","LE BON NUMÉRO DÉPEND DE QUI ON ACCOMPAGNE — c'est ce qui fait gagner le plus de temps :\n• Une femme ou une famille — 02 538 59 09\n• Un homme — 02 217 68 44\n• Le centre de jour — 02 537 33 33\n\nLe 02 537 20 41 est le siège : il oriente, mais il ne prend pas les demandes.\n\nSource : ilot.be/contact, relevé le 08/08/2026."),

  // HÉBERGEMENT D'URGENCE (hors Samusocial) — coordonnées publiques vérifiées (Vivalis, social.brussels, ilot.be)
  d("maisons","Centre d'accueil d'urgence Ariane","Forest","Premier hébergement d'urgence de courte durée (3 × 7 jours ouvrables) avant réorientation. Accueil 24h/24.","Mixte · adultes","02 346 66 60","","","Avenue du Pont de Luttre 132, 1190 Forest","24h/24 – 7j/7","Contacter la permanence téléphonique avant de se déplacer."),
  d("maisons","Pierre d'Angle","Bruxelles-Ville","Asile de nuit, accueil inconditionnel, anonyme et gratuit. 48 lits.","Mixte · adultes","02 513 38 01","","","Rue Terre-Neuve 153, 1000 Bruxelles","Tous les jours 20h – 8h","Priorité aux nouvelles personnes. Appeler avant pour la disponibilité (et la faisabilité pour une personne âgée)."),
  d("maisons","Armée du Salut – Le Foyer","Bruxelles-Ville","Centre d'hébergement temporaire et soutien social.","Mixte · adultes","02 217 61 36","","","Boulevard d'Ypres 24, 1000 Bruxelles","","Signaler l'âge de la personne dès le premier contact téléphonique."),
  urgent(d("maisons","CAW Archipel","Bruxelles-Ville","Accueil, orientation et assistance sociale d'urgence pour adultes vulnérables.","Adultes vulnérables","0800 13 500","","","Rue du Nouveau Marché aux Grains 28, 1000 Bruxelles","","Numéro gratuit (CAW).")),
  d("maisons","Albatros","Régional / Toutes communes","Hébergement d'urgence : personnes seules (18+), couples, familles monoparentales (max. 2 enfants de moins de 8 ans).","Hommes · Femmes · Familles","02 511 53 30","","","","","Vérifier la disponibilité par téléphone."),
  d("maisons","Bruss'help – Cellule d'orientation","Régional / Toutes communes","Point d'entrée régional : trouve une place d'hébergement d'urgence et coordonne l'aide quand les centres sont pleins.","Tout public","02 880 86 89","","brusshelp.org","","","À appeler pour être orienté vers une place disponible."),

  // DROIT DES ÉTRANGERS — compléments
  d("etrangers","Point d'Appui (Liège) — sans-papiers et centres fermés","Hors Bruxelles","Accompagnement juridique spécialisé pour les personnes sans papiers. Basé à LIÈGE, avec une permanence au centre fermé de Vottem.","Personnes sans séjour légal, personnes en centre fermé","04 227 69 51","","pointdappui.be","Rue des Steppes 22A, 4000 Liège","","⚠ CE N'EST PAS UN SERVICE BRUXELLOIS. La fiche laissait croire qu'il couvrait « toutes communes » : c'est faux, il est à Liège. Corrigé le 08/08/2026.\n\nCE QUI LE REND UTILE DEPUIS ICI : il assure une permanence juridique hebdomadaire au CENTRE FERMÉ DE VOTTEM. Si quelqu'un qu'on suit y est enfermé, c'est une porte.\n\nÀ BRUXELLES, pour la même chose : CIRÉ (02 629 77 10) ou ADDE (02 227 42 42).\n\nUniquement sur rendez-vous.\n\nSource : pointdappui.be, relevé le 08/08/2026."),
  d("etrangers","Convivial","Forest","Accueil et insertion des réfugiés et demandeurs d'asile nouvellement arrivés.","Réfugiés reconnus, demandeurs d'asile","02 503 43 46","info@convivial.be","convivial.be","Rue du Charroi 33-35, 1190 Forest","","CE QU'ILS FONT, ET QUI EST PEU CONNU :\n• Une ANTENNE LOGEMENT dans l'accompagnement individuel.\n• De l'AIDE MATÉRIELLE — meubles et vêtements, distribués GRATUITEMENT.\n• Des formations en langue et des groupes de parole.\n• Un projet Jeunes.\n\nL'aide matérielle est ce qui sert le plus vite quand quelqu'un entre dans un logement vide.\n\nSource : convivial.be et fdss.be, relevés le 08/08/2026."),

  /* ── RETROUVER SA FAMILLE (07/08/2026) ────────────────────────────────────────
     ⚠ CE QUI EST ÉCRIT ICI EST CE QUE J'AI PU SOURCER, ET RIEN DE PLUS. Pas de
     téléphone ni d'horaire de permanence : je ne les ai pas vérifiés, et un numéro
     inventé dans un outil de travail est pire que pas de numéro. À compléter après
     un appel au service — c'est dit en toutes lettres dans les notes des fiches. */
  d("famille","Croix-Rouge — Rétablissement des Liens Familiaux (RLF)","Régional / Toutes communes",
    "Recherche un proche perdu à cause d'une guerre, d'une catastrophe ou du parcours migratoire, et aide à garder le contact (appels, wifi, recharge de téléphone).",
    "Personnes séparées de leur famille, quel que soit le statut de séjour","105","service.rlf@croix-rouge.be","liens-familiaux.croix-rouge.be","Hub Humanitaire, avenue du Port 100, 1000 Bruxelles","Hub Humanitaire : lundi et jeudi après-midi",
    "LE 105 EST GRATUIT — c'est le numéro de la Croix-Rouge de Belgique, celui qu'ils affichent eux-mêmes sur le site du service. On demande le rétablissement des liens familiaux.\n\nOÙ ON VA PHYSIQUEMENT À BRUXELLES : au HUB HUMANITAIRE, avenue du Port 100, le lundi et le jeudi après-midi. Le service lui-même est basé à Namur (Espace Henry Dunant, bd Ernest Mélot 42) — donc pour un rendez-vous en présentiel à Bruxelles, c'est le Hub.\n\nUne permanence directe circule au 081 77 16 48, du lundi au jeudi de 9 h 30 à 12 h 30. Je ne l'ai pas vue sur une page officielle : essayer le 105 d'abord, et ne donner l'autre que si le 105 ne répond pas.\n\nCe qui rend ce service unique : il est branché sur le réseau mondial Croix-Rouge et Croissant-Rouge, ce qui lui permet de chercher dans les autres pays. Aucune autre association bruxelloise n'a ce bras-là.\n\nDeux choses différentes, à ne pas confondre :\n• MAINTENIR le lien — appeler, se connecter, recharger son téléphone. Permanences dans une dizaine de lieux en Wallonie et à Bruxelles, dont le Hub.\n• RECHERCHER un proche — c'est une démarche à part : elle commence par un ENTRETIEN, par téléphone, sur place ou en visio. Prévoir du temps, ce n'est pas un formulaire.\n\nAucune condition de séjour.\n\nSources : liens-familiaux.croix-rouge.be et croix-rouge.be, relevés le 08/08/2026."),

  d("famille","Disparition d'une personne qui perd la mémoire","Régional / Toutes communes",
    "Ce n'est pas une recherche de famille mais une disparition inquiétante : on appelle le 101. L'essentiel se prépare AVANT.",
    "Personnes désorientées, démence, maladie d'Alzheimer","101","","alzheimer.be","","",
    "L'errance fait partie de la maladie. Il existe un protocole entre la Ligue Alzheimer, la Cellule Personnes Disparues de la police fédérale, la police locale et le parquet.\n\nSA PIÈCE MAÎTRESSE EST UNE FICHE REMPLIE À L'AVANCE : photo récente, habitudes, lieux familiers, ce que la personne porte d'habitude. Elle fait gagner 30 à 45 minutes au moment de la recherche — et dans ces situations, les minutes comptent.\n\nAutrement dit : l'action utile se fait avant la disparition, pas après.\n\n⚠ À CONFIRMER : si ce protocole est en place sur Anderlecht, et auprès de quelle zone de police remplir la fiche.\n\nSource : Ligue Alzheimer (alzheimer.be) · wallonie.be — signaler une disparition inquiétante (consultés le 07/08/2026)."),

  /* La même fiche RLF est REDONNÉE dans « Droit des étrangers » : c'est là qu'on la
     cherchera aussi (Mag : « tu en doubles, même s'il faut la sauce »). */
  d("etrangers","Croix-Rouge — Rétablissement des Liens Familiaux (RLF)","Régional / Toutes communes",
    "Recherche un proche perdu à cause d'une guerre, d'une catastrophe ou du parcours migratoire, et aide à garder le contact (appels, wifi, recharge de téléphone).",
    "Personnes séparées de leur famille, quel que soit le statut de séjour","105","service.rlf@croix-rouge.be","liens-familiaux.croix-rouge.be","Hub Humanitaire, avenue du Port 100, 1000 Bruxelles","Hub Humanitaire : lundi et jeudi après-midi",
    "Le 105 est GRATUIT : c'est le numéro de la Croix-Rouge de Belgique, on demande le rétablissement des liens familiaux. À Bruxelles, on se présente au HUB HUMANITAIRE, avenue du Port 100, le lundi et le jeudi après-midi.\n\nAucune condition de séjour. La recherche commence par un ENTRETIEN, pas par un formulaire.\n\nVoir la fiche complète dans le domaine « Retrouver sa famille ».\n\nSources : liens-familiaux.croix-rouge.be et croix-rouge.be, relevés le 08/08/2026."),

  // URGENCES — compléments
  d("urgences","SOS Viol","Régional / Toutes communes","Écoute et accompagnement des victimes de violences sexuelles, anonyme.","Victimes et proches","0800 98 100","","sosviol.be","","","Gratuit et anonyme. À vérifier."),
  d("urgences","Infor-Drogues","Régional / Toutes communes","Écoute et information sur les drogues et les dépendances — anonyme, et ils donnent des adresses près de chez soi.","Tout public","02 227 52 52","","infordrogues.be","","Lun–Ven 8h–22h · samedi 10h–14h","ANONYME : la personne n'a pas à se nommer. Elle peut poser n'importe quelle question sur sa consommation ou celle d'un proche, et ils orientent vers des adresses de sa région.\n\nLA PERMANENCE VA JUSQU'À 22 H EN SEMAINE — c'est un des rares numéros encore ouverts le soir, quand la plupart des services sont fermés. Samedi 10 h → 14 h.\n\nLa nuit et le dimanche, c'est Télé-Accueil au 107, 24 h/24.\n\nSource : aide-alcool.be et infordrogues.be, relevés le 08/08/2026."),

  // DÉMARCHES CPAS — trames à compléter par l'équipe.
  // ⚠️ Ne jamais écrire ici le nom d'un hébergé : ce sont des procédures, pas des dossiers.
  dem("Réquisitoire","CPAS d'Anderlecht","Anderlecht",
    "On contacte l'assistant·e social·e de la personne au CPAS — pas une adresse générale.",
    "À compléter : formulaire utilisé, pièces à joindre, qui signe.",
    "⚠️ Plus de réquisitoire pour la kiné à Anderlecht. Anderlecht fonctionne par antennes sociales : un envoi à une adresse unique ne passe pas — il faut passer par l'assistant·e social·e qui suit la personne.",
    "À compléter",""),
  dem("Réquisitoire","CPAS de la Ville de Bruxelles","Bruxelles-Ville",
    "Une seule adresse centralisée pour toute la Ville de Bruxelles : celluleaidemedicale@cpasbxl.brussels",
    "À compléter : formulaire utilisé, pièces à joindre.",
    "Contrairement à Anderlecht, pas d'envoi par antenne : réquisitoires ET AMU passent par cette seule adresse.",
    "À compléter","celluleaidemedicale@cpasbxl.brussels"),
  dem("Réquisitoire","CPAS de Molenbeek-Saint-Jean","Molenbeek-Saint-Jean",
    "À compléter.",
    "À compléter : formulaire utilisé, pièces à joindre.",
    "Molenbeek a sa propre procédure, différente d'Anderlecht et de la Ville de Bruxelles — à documenter précisément.",
    "À compléter",""),
  dem("Aide Médicale Urgente (AMU)","CPAS d'Anderlecht","Anderlecht",
    "On contacte l'assistant·e social·e de la personne au CPAS — comme pour le réquisitoire.",
    "À compléter : attestation du médecin, pièces, circuit interne.",
    "Anderlecht fonctionne par antennes sociales : c'est l'assistant·e social·e qui suit la personne qu'on contacte, pas une adresse unique.",
    "À compléter",""),
  dem("Aide Médicale Urgente (AMU)","CPAS de la Ville de Bruxelles","Bruxelles-Ville",
    "Une seule adresse centralisée pour toute la Ville de Bruxelles : celluleaidemedicale@cpasbxl.brussels",
    "À compléter : attestation du médecin, pièces, circuit interne.",
    "Même adresse que pour les réquisitoires : la cellule aide médicale traite les deux.",
    "À compléter","celluleaidemedicale@cpasbxl.brussels"),

  /* Forest, ajouté le 31/07/2026 : ses assistantes sociales, et la kiné sans réquisitoire. */
  dem("Réquisitoire","CPAS de Forest","Forest",
    "On contacte l'assistante sociale de la personne au CPAS de Forest.",
    "À compléter : formulaire utilisé, pièces à joindre, qui signe.",
    "⚠️ Pour la kiné, il ne faut plus de réquisitoire à Forest.",
    "À compléter",""),
  dem("Aide Médicale Urgente (AMU)","CPAS de Forest","Forest",
    "On contacte l'assistante sociale de la personne au CPAS de Forest.",
    "À compléter : attestation du médecin, pièces, circuit interne.",
    "⚠️ Pour la kiné, il ne faut plus de réquisitoire à Forest.",
    "À compléter",""),
  dem("Aide Médicale Urgente (AMU)","CPAS de Molenbeek-Saint-Jean","Molenbeek-Saint-Jean",
    "À compléter.","À compléter : attestation du médecin, pièces, circuit interne.",
    "À compléter : ce qui diffère des autres CPAS.","À compléter",""),
  /* ADRESSE DE RÉFÉRENCE — écrit le 31/07/2026 d'après les textes, pas de mémoire.
     Sources vérifiées : loi du 2 avril 1965 (art. 2 §1er et §7) sur ejustice.just.fgov.be ;
     guide de compétence territoriale du SPP Intégration sociale (primabook.mi-is.be) ;
     adresse de référence : loi du 19 juillet 1991 sur les registres de la population et
     AR du 16 juillet 1992. Ce qui reste à confirmer est écrit comme tel dans la fiche. */
  src(dem("Adresse de référence","Tous CPAS — la règle","Régional / Toutes communes",
    "Au CPAS de la commune où la personne est habituellement présente.",
    "Trois conditions : ne pas avoir les ressources pour se loger, ne plus être inscrit·e aux registres de la population, et avoir introduit une demande d'aide auprès de ce CPAS.",
    "Sans adresse, les droits tombent. L'adresse de référence sert à les garder : mutuelle, chômage, allocations familiales, et le courrier officiel qui arrive quelque part. Ce n'est pas un logement, c'est une adresse administrative.",
    "À compléter : délai de décision du CPAS.",""),
      "Sources : loi du 19 juillet 1991 sur les registres de la population et AR du 16 juillet 1992 ; guide du SPP Intégration sociale (primabook.mi-is.be)."),
  src(dem("Adresse de référence","Changer de centre ne change pas forcément de CPAS","Régional / Toutes communes",
    "Le CPAS compétent est en principe celui de la commune où la personne se trouve (loi du 2 avril 1965, art. 1er, 1°).",
    "MAIS quand la personne est admise dans un établissement agréé pour accueillir des personnes en détresse et les loger temporairement, c'est le CPAS de la commune où elle était inscrite AU MOMENT DE SON ADMISSION qui reste compétent — pendant tout le séjour, même si son inscription change ou disparaît (art. 2 §1er).",
    "C'est ce qui fait qu'une personne hébergée à Anderlecht peut continuer à dépendre du CPAS de Bruxelles-Ville : on ne la renvoie pas d'un CPAS à l'autre à chaque changement de centre. Et si elle passe d'un établissement à l'autre sans interruption, c'est le CPAS du PREMIER qui reste compétent. ⚠️ CE QUI N'EST PAS TRANCHÉ : la règle vise un établissement « agréé par l'autorité compétente pour accueillir des personnes en détresse et leur assurer temporairement le logement » (art. 2 §1er, 7°). À Bruxelles, les maisons d'accueil et les centres d'hébergement d'urgence DOIVENT être agréés par la COCOM (ordonnance du 14 juin 2018, art. 28 à 31) — mais le New Samusocial, lui, n'est pas agréé par cette voie : il est créé directement par l'ordonnance comme personne morale de droit public (art. 52). Savoir si ça vaut agrément au sens de la loi de 1965, c'est une question de droit : à faire confirmer par le CPAS ou par le service juridique. Pour un sans-abri qui n'est PAS dans un établissement de ce type, c'est l'inverse : le CPAS de sa résidence de fait (art. 2 §7).",
    "—",""),
      "Sources : loi du 2 avril 1965, art. 1er 1°, art. 2 §1er 7° et art. 2 §7 (ejustice.just.fgov.be) ; guide de compétence territoriale du SPP Intégration sociale (primabook.mi-is.be) ; ordonnance COCOM du 14 juin 2018, art. 28 à 31 (agrément) et art. 52 (création du New Samusocial)."),
  dem("Carte médicale","Tous CPAS — trame générale","Régional / Toutes communes",
    "À compléter par CPAS.","À compléter : conditions, durée de validité, renouvellement.",
    "Les conditions et la durée varient d'un CPAS à l'autre : dupliquer cette fiche par commune.",
    "À compléter",""),
  dem("RIS (revenu d'intégration)","Tous CPAS — trame générale","Régional / Toutes communes",
    "CPAS de la commune de résidence.","À compléter : pièces, prise de rendez-vous, enquête sociale.",
    "Délais et modalités de rendez-vous très variables selon les communes.",
    "À compléter",""),

  /* ── HANDICAP : les trois guichets fédéraux ────────────────────────────────
     Écrites le 31/07/2026. Tout part de la même porte — la DGPH — et rien ne
     s'ouvre tant que la reconnaissance n'est pas faite. Ce qu'on n'a pas pu
     vérifier est écrit comme tel. */
  src(dem("Reconnaissance du handicap (DGPH)","DG Personnes handicapées — SPF Sécurité sociale","Régional / Toutes communes",
    "En ligne sur My Handicap (myhandicap.belgium.be), avec l'eID ou itsme. Sans ordinateur ni carte d'identité électronique : la COMMUNE, le CPAS ou la MUTUELLE ont accès aux dossiers My Handicap et introduisent la demande avec la personne. Une visite à domicile d'un assistant social de la DGPH peut être demandée.",
    "1. Introduire la demande (gratuit). 2. Un médecin de la DGPH étudie le dossier et convoque la personne à un examen si nécessaire. 3. Une décision fixe le degré d'autonomie en POINTS — c'est ce chiffre qui commande presque tout le reste.",
    "C'est la première marche, et rien ne s'ouvre sans elle : allocations, carte de stationnement, European Disability Card, tarifs sociaux, TaxiBus. Donc on la lance TÔT. Le dossier suppose une adresse où recevoir le courrier : si la personne n'en a pas, l'adresse de référence passe d'abord.",
    "Environ 4 mois en moyenne selon les sources ouvertes — à confirmer au cas par cas.",""),
      "Sources : handicap.belgium.be (procédure de reconnaissance, My Handicap, « aider quelqu'un à introduire une demande ») · socialsecurity.be/citizen (My Handicap) · CPAS de Bruxelles, cellule My Handicap. Relevé le 31/07/2026."),
  src(dem("Carte de stationnement","DG Personnes handicapées — formulaire à la commune","Régional / Toutes communes",
    "Formulaire spécial à demander à l'administration communale, ou demande via My Handicap. C'est la DGPH qui délivre la carte.",
    "Si le handicap n'est pas encore reconnu, l'évaluation médicale de la DGPH se fait d'abord. La carte est ensuite envoyée par la poste. La demande est gratuite.",
    "Conditions (au moins l'une) : incapacité permanente d'au moins 80 % · incapacité permanente des membres inférieurs d'au moins 50 % · perte d'autonomie d'au moins 12 points · paralysie ou amputation des membres supérieurs. La carte est liée à la PERSONNE, pas à la voiture : elle vaut dans le véhicule qui la transporte. Elle donne le stationnement illimité en zone bleue et l'accès aux places réservées ; la gratuité aux horodateurs dépend de la commune.",
    "Annoncé à 4 semaines après la notification de l'évaluation, mais jusqu'à 6 mois au total selon les sources ouvertes — à confirmer.",""),
      "Sources : handicap.belgium.be (carte de stationnement) · brochure « Carte de stationnement pour personnes handicapées », police.be · wikiwiph.aviq.be. Relevé le 31/07/2026."),
  src(dem("Allocations handicap (ARR/AI)","DG Personnes handicapées — via My Handicap","Régional / Toutes communes",
    "Même porte que la reconnaissance : My Handicap, ou la commune / le CPAS / la mutuelle qui introduit la demande.",
    "Deux allocations différentes, demandées ensemble. ARR — allocation de remplacement de revenus : pour qui, du fait de son état, ne peut gagner qu'un tiers au plus de ce que gagne une personne valide. AI — allocation d'intégration : compense les frais liés au manque d'autonomie ; il faut au moins 7 points sur l'échelle d'autonomie.",
    "Les REVENUS DU MÉNAGE comptent, et ce sont ceux d'il y a deux ans (une demande introduite en 2026 regarde 2025) : une personne sans revenus aujourd'hui mais qui en avait avant peut être refusée — ça se conteste. À 65 ans et plus, ce n'est plus la DGPH mais IRISCARE à Bruxelles (allocation pour l'aide aux personnes âgées, APA). Les montants sont indexés : ne jamais annoncer un chiffre de mémoire, le vérifier sur handicap.belgium.be le jour même.",
    "À vérifier au cas par cas.",""),
      "Sources : handicap.belgium.be (ARR, AI, paiement) · socialsecurity.be/citizen/fr/handicap · brochure ARR-AI du SPF Sécurité sociale · droitsquotidiens.be (ressources prises en compte pour l'AI) · iriscare.brussels (APA). Relevé le 31/07/2026."),

  // ===== HANDICAP — les guichets, relevés le 31/07/2026 ==========================
  /* Trois administrations différentes, et c'est là que tout le monde se perd :
     le FÉDÉRAL (DGPH) reconnaît le handicap et paie les allocations jusqu'à 65 ans ;
     la COCOF (PHARE) paie le matériel, l'aménagement et l'accompagnement à Bruxelles ;
     IRISCARE paie les aides à la mobilité et l'allocation des 65 ans et plus.
     On commence TOUJOURS par la reconnaissance : sans elle, les deux autres portes
     restent fermées. */
  d("handicap","DGPH — DG Personnes handicapées (SPF Sécurité sociale)","Bruxelles-Ville",
    "LA PREMIÈRE PORTE. Reconnaît le handicap (évaluation médicale en points), paie l'allocation de remplacement de revenus et l'allocation d'intégration, délivre la carte de stationnement et l'European Disability Card.",
    "Personnes de 18 à 65 ans, en situation de handicap","02 202 02 02","","handicap.belgium.be",
    "Boulevard du Jardin Botanique 50 bte 150, 1000 Bruxelles",
    "Téléphone : lun, mer, jeu, ven 8h30–12h30 · mar 13h–16h",
    "⚠️ NUMÉRO CHANGÉ LE 15 AVRIL 2026 : l'ancien 0800 98 799 ne fonctionne plus, c'est le 02 202 02 02 (tarif d'un appel fixe normal). Beaucoup de brochures et de sites tiers affichent encore l'ancien.\nLes demandes passent par MY HANDICAP (myhandicap.belgium.be), avec eID ou itsme. Sans ordinateur : la commune, le CPAS et la mutuelle ont accès aux dossiers et introduisent la demande avec la personne ; une visite à domicile d'un assistant social peut être demandée.\nSources : handicap.belgium.be (contact, news du 15/04/2026, procédure de reconnaissance) · socialsecurity.be/citizen. Relevé le 31/07/2026."),
  d("handicap","Service PHARE (COCOF)","Schaerbeek",
    "Le service bruxellois francophone du handicap : interventions financières pour le MATÉRIEL et l'AMÉNAGEMENT (aides individuelles), services d'accompagnement, centres de jour, logements adaptés, emploi et formation.",
    "Personnes en situation de handicap domiciliées en Région bruxelloise","02 800 82 03","info.phare@spfb.brussels","phare.irisnet.be",
    "Rue des Palais 42, 1030 Bruxelles","Lun–Ven 9h–12h et 14h–16h · accueil sur rendez-vous",
    "PHARE ne reconnaît pas le handicap : il faut d'abord un dossier admis chez lui (demande d'admission), et l'admission demande un rapport médical.\nLes documents peuvent être déposés à l'accueil de la COCOF sans rendez-vous, tous les jours de 9h à 16h.\nÀ NE PAS CONFONDRE avec Iriscare (aides à la mobilité, 65 ans et plus) ni avec la DGPH (reconnaissance et allocations).\nSources : ccf.brussels — Service PHARE (contacter le service PHARE, aides individuelles matérielles) · phare.irisnet.be. Relevé le 31/07/2026."),
  d("handicap","Iriscare — autonomie et handicap","Bruxelles-Ville",
    "Les AIDES À LA MOBILITÉ à Bruxelles (voiturette, rollator, canne à roues, coussin anti-escarres, réparations et entretien depuis 2024) et l'allocation pour l'aide aux personnes âgées (APA) à partir de 65 ans.",
    "Bruxellois·es en perte d'autonomie ; APA à partir de 65 ans","0800 35 499","autonomie-handicap@iriscare.brussels","iriscare.brussels",
    "Rue de Trèves 70 bte 2, 1000 Bruxelles","",
    "Pour l'aide à la mobilité, le circuit passe par une PRESCRIPTION MÉDICALE puis par un bandagiste ; c'est la mutuelle (l'organisme assureur bruxellois) qui intervient, Iriscare fixe les règles et paie.\nL'APA a remplacé, pour les 65 ans et plus, ce que la DGPH faisait avant : ne pas envoyer une personne de 70 ans à la Vierge Noire.\nSources : iriscare.brussels (aides à la mobilité, service APA) · handicap.brussels (guichet unique des aides à la mobilité). Relevé le 31/07/2026."),
  d("handicap","STIB — TaxiBus (transport porte-à-porte)","Bruxelles-Ville",
    "Transport de porte à porte en minibus STIB ou en taxi conventionné, réservé aux personnes dont le handicap est reconnu par le SPF Sécurité sociale.",
    "Personnes handicapées reconnues par le SPF Sécurité sociale","02 515 23 65","","stib-mivb.be/travel/prm",
    "Service TaxiBus, Rue Royale 76, 1000 Bruxelles","Téléphone : Lun–Ven 7h–19h · Sam 8h–16h",
    "INSCRIPTION D'ABORD : dossier papier + attestation de reconnaissance du handicap, à renvoyer au service TaxiBus. Ce n'est pas un service qu'on appelle le jour même sans être inscrit.\nCE N'EST PAS GRATUIT et l'abonnement STIB ne le couvre pas : chaque trajet se paie (1,70 € par trajet selon les infos relevées), sur un compte à alimenter d'avance par virement.\n⚠️ Le tarif et le règlement changent chaque année — vérifier le règlement d'utilisation en cours sur stib-mivb.be.\nSources : stib-mivb.be (règlement d'utilisation TaxiBus, dossier d'inscription) · handicap.brussels — la STIB. Relevé le 31/07/2026."),
  d("handicap","SNCB — assistance en gare (PMR)","Régional / Toutes communes",
    "Aide gratuite pour se déplacer dans la gare, monter dans le train et en descendre, dans plus de 150 gares.",
    "Voyageurs à mobilité réduite","02 607 30 00","","belgiantrain.be/fr/travel-info/prepare-for-your-journey/assistance-reduced-mobility",
    "","Téléphone : tous les jours 7h–21h30",
    "IL FAUT RÉSERVER : 24 h à l'avance en général, 3 h seulement dans les gares les plus fréquentées (une quarantaine). Réservation aussi via l'application « SNCB Assist ».\nL'assistance et le matériel sont gratuits.\nSources : belgiantrain.be (assistance PMR, FAQ PMR, brochure « Facilités et service d'assistance PMR »). Relevé le 31/07/2026."),
  d("handicap","Solival — conseils en aides techniques et aménagement","Berchem-Sainte-Agathe",
    "Des ergothérapeutes conseillent GRATUITEMENT sur le matériel et l'aménagement du lieu de vie : lit, transfert, salle de bain, chaise, aides numériques (service CyberVal à Bruxelles). Salle d'essai où voir et tester le matériel.",
    "Toute personne, quel que soit l'âge ou le handicap ; professionnels","070 22 12 20","info@solival.be","solival.be",
    "Salle d'essai à Berchem-Sainte-Agathe","",
    "Ils se déplacent dans les 19 communes. C'est le bon réflexe AVANT d'acheter ou de demander un remboursement : ils disent ce qui convient vraiment et ce qui est remboursable.\n⚠️ Le 070 est un numéro payant.\nSources : solival.be · autonomia.org (fiche Solival) · reseau-sam.be. Relevé le 31/07/2026."),
  d("handicap","Info-Sourds de Bruxelles (SISB) — interprètes en langue des signes","Forest",
    "Interprétation en langue des signes, translittération (LPC, lecture labiale, français signé), transcription et sous-titrage en direct — sur place ou à distance (Relais-Signes).",
    "Personnes sourdes et malentendantes, services qui les reçoivent","02 644 68 90","","infosourds.be",
    "Avenue Brugmann 76, 1190 Forest","",
    "À DEMANDER À L'AVANCE : il y a peu d'interprètes (un temps plein et un mi-temps salariés, puis des indépendants sur liste). Pour un rendez-vous important — médecin, CPAS, avocat, audience — on réserve dès qu'on connaît la date.\nUn membre de la famille n'est PAS un interprète : dans un entretien social ou médical, ça fausse tout.\nSources : infosourds.be (service d'interprétation, interprétation en langue des signes) · ffsb.be · handicap.brussels — l'interprétariat. Relevé le 31/07/2026."),
  d("handicap","Ligue Braille","Saint-Gilles",
    "Accompagnement social, apprentissage de la canne blanche et des déplacements, braille, adaptation du logement, bibliothèque adaptée, aide à l'emploi.",
    "Personnes aveugles et malvoyantes","02 533 32 11","info@braille.be","braille.be",
    "Rue d'Angleterre 57, 1060 Bruxelles","Lun–Ven 8h–17h · permanence sociale bruxelloise le lundi 9h–13h SANS rendez-vous · permanence téléphonique mer et ven 8h30–11h30",
    "La permanence du lundi sans rendez-vous est précieuse pour quelqu'un qui n'a ni téléphone ni agenda.\n⚠️ Les horaires de permanence changent : vérifier sur braille.be avant d'envoyer quelqu'un.\nSources : braille.be (Bruxelles, votre personne de contact, permanences du service social bruxellois). Relevé le 31/07/2026."),
  d("handicap","Unia — discrimination et aménagements raisonnables","Régional / Toutes communes",
    "Traite gratuitement et confidentiellement les signalements de discrimination, y compris le REFUS D'AMÉNAGEMENT RAISONNABLE — qui est en soi une discrimination.",
    "Toute personne discriminée, et les services qui l'accompagnent","0800 12 800","","unia.be",
    "","Téléphone : jours ouvrables 9h30–13h · signalement en ligne 24h/24 sur melding.unia.be",
    "L'aménagement raisonnable, c'est adapter une situation concrète pour qu'une personne handicapée puisse y accéder : un rendez-vous au rez-de-chaussée, un document lisible, un délai, un accompagnement. Depuis la révision de l'article 22ter de la Constitution, le droit à l'inclusion et aux aménagements raisonnables y est inscrit.\nÀ utiliser quand un service, un logement, une formation ou un employeur ferme la porte à cause du handicap.\nSources : unia.be (discrimination handicap, aménagement raisonnable, contact, signaler une discrimination) · handicap.brussels — le droit à des aménagements raisonnables. Relevé le 31/07/2026."),
  /* ── LES INFIRMIER·ÈRES À DOMICILE ────────────────────────────────────────
     Les quatre sont rangés dans MÉDICAL (01/08/2026), pour qu'on les trouve au
     même endroit avec le bouton d'appel — et pas éparpillés. ASD était dans
     Handicap depuis hier : déplacé ici, c'est sa place.
     Le champ Horaires dit la vraie question du soir : qui décroche à 22 h. */
  d("medical","ASD Bruxelles — infirmiers à domicile (Croix Jaune et Blanche)","Régional / Toutes communes",
    "Infirmier·ères à domicile dans les 19 communes : pansements et soins de plaies, injections, toilette, préparation et suivi du traitement. Aussi de l'aide à la vie journalière et un service de coordination des aides.",
    "Toute personne ayant besoin de soins chez elle","02 647 03 66","","bruxelles.aideetsoinsadomicile.be",
    "","Une permanence téléphonique en dehors des heures de bureau est annoncée — à vérifier à l'appel",
    "L'historique de la Croix Jaune et Blanche à Bruxelles (soins infirmiers à domicile depuis 1937), avec près de 300 travailleurs.\nCÔTÉ ARGENT : avec une mutuelle en ordre, remboursement INAMI. Sans mutuelle ou en séjour irrégulier : AMU / réquisitoire du CPAS, À OBTENIR AVANT le passage.\nSources : bruxelles.aideetsoinsadomicile.be · pro.guidesocial.be · mc.be. Relevé le 31/07/2026."),
  d("medical","Soins Chez Soi asbl — infirmiers à domicile 24h/24","Uccle",
    "Soins infirmiers à domicile : tous les actes de la nomenclature INAMI — injections, toilettes simples et complexes, SOINS DE PLAIES. Plus kiné, ergo, pédicure, psy, logo, repas, soins palliatifs et PRÊT DE MATÉRIEL.",
    "Toute personne ayant besoin de soins chez elle","02 420 54 57","info@soinschezsoi.be","soinschezsoi.be",
    "Rue de Stalle 162a bte 8, 1180 Uccle",
    "Bureaux : Lun–Ven 8h30–16h45 · demandes URGENTES de soins infirmiers : 24h/24",
    "⭐ LE PLUS UTILE POUR NOUS, pour deux raisons : le 24h/24 pour une demande urgente, et surtout ils travaillent AVEC TOUTES LES MUTUELLES ET SANS MUTUELLE — ce qui règle le cas le plus fréquent au centre.\nÇa ne dispense PAS du réquisitoire : « sans mutuelle » veut dire qu'ils acceptent le dossier, pas que c'est gratuit.\nSources : soinschezsoi.be · pro.guidesocial.be · social.brussels (fiche 11787). Relevé le 01/08/2026."),
  d("medical","CSD Bruxelles — Centrale de Soins & Services à Domicile","Saint-Gilles",
    "Soins infirmiers, kiné, sage-femme, aide familiale, aide-soignante, repas livrés, télévigilance et service de nuit. Plus de 400 professionnels sur les 19 communes.",
    "Toute personne ayant besoin de soins ou d'aide chez elle","02 537 98 66","info@csdbxl.be","csdbxl.be",
    "Rue Saint-Bernard 43, 1060 Saint-Gilles","Services assurés 24h/24, 7j/7",
    "TOUTE NOUVELLE DEMANDE SE FAIT PAR TÉLÉPHONE au 02 537 98 66, et les soins sont annoncés comme mis en place dans les 24 h maximum. C'est le délai le plus court trouvé — utile quand une plaie ne peut pas attendre lundi.\nRéseau Solidaris.\nSources : csdbxl.be (soins infirmiers, contact) · social.brussels (fiche 372) · reseau-sam.be. Relevé le 01/08/2026."),
  d("handicap","handicap.brussels — toute l'info handicap à Bruxelles","Régional / Toutes communes",
    "Le site public qui explique, thème par thème, les droits et les services bruxellois : reconnaissance, aides financières, déplacements, logement, école, aides à l'autonomie, justice.",
    "Personnes en situation de handicap, proches, professionnels","","","handicap.brussels",
    "","",
    "À ouvrir quand on ne sait pas par où commencer : c'est écrit en langage clair et ça dit QUELLE administration fait quoi.\nSource : handicap.brussels. Relevé le 31/07/2026."),
  d("handicap","Handy.brussels (AMT Concept) — accessibilité des lieux","Régional / Toutes communes",
    "Répertorie l'accessibilité réelle des lieux bruxellois : musées, restaurants, hôtels, salles, parkings, toilettes publiques, transports.",
    "Personnes à mobilité réduite, accompagnants","","","handy.brussels",
    "","",
    "Utile AVANT de proposer une sortie ou un rendez-vous à quelqu'un en chaise : on vérifie que le lieu est praticable au lieu de le découvrir sur place.\nSource : handy.brussels (AMT Concept asbl). Relevé le 31/07/2026."),
  d("handicap","La Braise — service d'accompagnement (lésion cérébrale)","Anderlecht",
    "Service d'accompagnement agréé PHARE : suivi à domicile et dans les lieux de vie pour des personnes ayant une lésion cérébrale acquise après 12 ans (accident, AVC, traumatisme).",
    "Jeunes dès 12 ans et adultes avec lésion cérébrale acquise","02 522 20 03","","labraise.org",
    "Rue de la Vigne 56, 1070 Anderlecht","",
    "Dans notre commune. Les services d'accompagnement PHARE travaillent LÀ OÙ LA PERSONNE VIT — donc ils peuvent venir au centre.\n⚠️ Chaque service a son public : celui-ci ne prend que les lésions cérébrales acquises. La liste complète des services d'accompagnement agréés est sur phare.irisnet.be.\nSources : phare.irisnet.be (liste des services d'accompagnement) · handicap.brussels — les services d'accompagnement. Relevé le 31/07/2026."),
  d("handicap","Bataclan — service d'accompagnement (tout type de handicap)","Etterbeek",
    "Service d'accompagnement agréé PHARE, ouvert à tout type de déficience, pour enfants scolarisés et adultes.",
    "Enfants en âge scolaire et adultes, tout type de déficience","02 646 30 13","","",
    "Avenue Général Bernheim 31, 1040 Bruxelles","",
    "Le plus généraliste des services d'accompagnement relevés : à appeler quand on ne sait pas vers quel service spécialisé se tourner.\nSources : phare.irisnet.be (liste des services d'accompagnement, version « facile à lire »). Relevé le 31/07/2026."),

  // MÉTHODES DE TRAVAIL / PRATIQUES
  m("Premier accueil d'un bénéficiaire","Trame d'entretien d'accueil — à adapter par l'équipe.",
    "1. Identité et situation familiale\n2. Besoins prioritaires : logement, santé, revenus, séjour, sécurité\n3. Droits déjà ouverts : mutuelle, CPAS, allocations\n4. LE HANDICAP : « Avez-vous une carte ou une reconnaissance de handicap ? » — question posée À TOUT LE MONDE, à l'entrée (voir la fiche « Handicap : la question à poser à l'entrée »)\n5. Information sur la confidentialité (RGPD) et recueil du consentement\n6. LE TÉLÉPHONE : proposer d'activer la localisation MAINTENANT (voir la fiche « Retrouver un téléphone »)\n7. Première orientation et prochain rendez-vous\n\n👉 À compléter avec vos propres points de vigilance."),

  /* Décision de Mag (31/07/2026) : « dès qu'il y a quelqu'un qui a des droits, on doit
     faire en sorte qu'il les ait ». Même logique que le téléphone : ça se demande À
     L'ENTRÉE. Un dossier de reconnaissance prend des mois — lancé au départ, la personne
     est encore là quand la réponse arrive ; lancé à la fin, il ne sert plus à rien. */
  m("Handicap : la question à poser à l'entrée","On la pose à TOUT LE MONDE, pas seulement à qui « a l'air » handicapé.",
    "POURQUOI À L'ENTRÉE\nLa reconnaissance du handicap prend des MOIS (environ 4 en moyenne, la carte de stationnement jusqu'à 6). Lancée le jour de l'accueil, la réponse arrive pendant le séjour. Lancée le jour du départ, elle ne sert à personne. Et tant qu'il n'y a pas de reconnaissance, il n'y a ni allocation, ni carte, ni TaxiBus, ni tarifs sociaux : tout part de là.\n\nLA QUESTION\n« Avez-vous une carte ou une reconnaissance de handicap ? Une allocation ? Un dossier en cours quelque part ? »\nOn la pose à tout le monde, dans la même liste que la mutuelle et le CPAS. Beaucoup de gens ont une reconnaissance et ne savent plus ce qu'elle ouvre ; d'autres y ont droit depuis des années sans que personne ne le leur ait jamais dit.\n\nCE QU'ON REGARDE, SI LA PERSONNE A DES PAPIERS\n• Une carte de stationnement (bleue, format carte de crédit).\n• Une European Disability Card.\n• Une décision de la DGPH — c'est elle qui porte le fameux NOMBRE DE POINTS.\n• Un extrait de compte avec une allocation (ARR / AI / APA).\n• Une attestation de la mutuelle : invalidité, incapacité de travail, statut BIM.\nUne photo du document dans le dossier, avec l'accord de la personne, évite de tout redemander dans trois mois.\n\nCE QU'ON DÉCLENCHE, SELON LA RÉPONSE\n• Elle a une reconnaissance → on vérifie ce qui n'est PAS encore activé : carte de stationnement, European Disability Card, tarif social énergie et internet, abonnement STIB, TaxiBus, aides matérielles via PHARE.\n• Elle n'a rien mais la situation le justifie (maladie chronique, séquelles, amputation, troubles psychiques lourds, déficience) → on lance My Handicap. La commune, le CPAS et la mutuelle ont accès aux dossiers et peuvent l'introduire avec elle.\n• Elle a 65 ans ou plus → ce n'est plus la DGPH mais IRISCARE (APA).\n• Il faut du matériel ou un aménagement → PHARE, et Solival pour le conseil (gratuit).\n\n⚠️ AVANT TOUT : UNE ADRESSE\nUn dossier handicap suppose une adresse où recevoir le courrier et une décision qui arrive quelque part. Si la personne n'a pas d'adresse de référence, on commence par là (voir Formations — « Adresse de référence, CPAS compétent et agrément »).\n\nCE QU'ON NOTE, ET OÙ\nLe handicap est une DONNÉE DE SANTÉ : elle se note dans le dossier social de la personne, avec son accord, et pas ailleurs. Rien de tout ça ne s'écrit dans COUSIN : l'app ne contient aucune donnée d'hébergé, et ce n'est pas le moment de commencer.\nCE QUE L'ÉQUIPE DOIT SAVOIR, c'est le BESOIN, pas le diagnostic : « chambre au rez ou près de l'ascenseur », « ne peut pas porter », « a besoin d'un accompagnement pour ses rendez-vous », « interprète en langue des signes à prévoir ». On transmet ça, et rien de plus.\n\nCE QU'ON NE FAIT PAS\n• On ne pose pas de diagnostic et on ne juge pas si « ça vaut le coup » : c'est le médecin de la DGPH qui évalue, pas nous.\n• On n'insiste pas si la personne ne veut pas en parler — on lui dit ce que ça ouvre, on laisse la porte ouverte, on repose la question plus tard.\n• On ne remplit rien à sa place sans son accord, et on ne saisit jamais son itsme ni son code.\n\nRepère de travail, pas un avis juridique. Les montants et les conditions sont indexés et changent : vérifier sur handicap.belgium.be le jour où on en parle."),

  /* Décision de Mag (30/07/2026) : ça se règle À L'ENTRÉE, pas après la perte —
     après, il n'y a plus rien à activer. On propose, on ne fait pas à la place,
     et on ne note jamais le mot de passe de la personne. */
  m("Retrouver un téléphone perdu ou volé","À activer À L'ENTRÉE, pas le jour où le téléphone disparaît.",
    "POURQUOI À L'ENTRÉE\nUne fois le téléphone perdu ou volé, on ne peut plus rien activer à distance : la localisation doit avoir été mise en route AVANT, sur l'appareil, quand on l'avait encore en main. C'est cinq minutes pendant l'entretien d'accueil, et ça peut éviter de tout perdre — contacts, papiers photographiés, rendez-vous.\n\nSUR UN ANDROID\nL'application « Localiser mon appareil » de Google. Il faut un compte Google connecté sur le téléphone et la localisation activée. On retrouve ensuite l'appareil depuis n'importe quel navigateur, sur android.com/find.\n\nSUR UN IPHONE\nL'application « Localiser » d'Apple. Il faut un identifiant Apple connecté. On retrouve l'appareil sur iCloud.com/find.\n\nCE QU'ON PEUT FAIRE ENSUITE\nVoir où est l'appareil, le faire sonner, l'afficher comme perdu avec un message et un numéro de contact, ou effacer son contenu à distance si tout est perdu.\n\nCOMMENT ON S'Y PREND\nOn explique et on reste à côté : c'est SON téléphone et SON compte. On ne saisit jamais son mot de passe à sa place et on ne le note nulle part. Si la personne n'a pas de compte, on lui propose d'en créer un — c'est elle qui choisit son mot de passe.\n\nTÉLÉPHONE DE SERVICE\nMême logique, mais la démarche passe par la personne responsable du matériel : ne pas lier un téléphone de service à un compte personnel.\n\nEN CAS DE VOL\nLa localisation ne remplace pas la déclaration : vol = plainte à la police. Et bloquer la carte SIM auprès de l'opérateur."),
  m("Sanction","Conduite à tenir face aux infractions (résumé).",
    "Avertir → recadrer → sanctionner, par paliers.\nDécidé à deux (travailleur social + infirmier) ou par la coordination.\n\n1. Vie commune (bruit, hygiène, horaires…) → rappel, puis sanction courte.\n2. Alcool / drogue → recadrage puis sanction ; refus de confier son traitement = fin d'hébergement.\n3. Agression / vol → verbale : avertissement ; physique, sexuelle ou vol : exclusion immédiate.\n4. Refus de soin → à voir en réunion."),

  /* Les trois marches à suivre qui vivaient dans Démarches sont réunies ici (30/07/2026) :
     on les lit une fois, en arrivant. Démarches ne garde plus que les guichets. */
  /* Formation écrite le 31/07/2026 à sa demande, d'après les textes (sources en bas de page).
     Ce qui n'est pas tranché est écrit comme tel : on ne comble pas un trou par une phrase
     qui sonne bien. */
  formation("Troubles neurocognitifs — repérer, ne pas diagnostiquer",
    "Ce qu'on voit au quotidien, ce qui est une urgence, et pourquoi le Korsakoff se joue tôt.",
    [],
    `<div class="f-page"><div class="f-lead">${icon('mind')} <b>On repère, on n'étiquette pas.</b> Un trouble neurocognitif, ce n'est pas « il perd la tête » : c'est une atteinte du cerveau qui s'installe, avec des mécanismes différents selon la cause. Notre travail est de le VOIR et de le DIRE au bon endroit.</div><div class="f-h">1. Ce qu'on voit au centre</div><div class="f-card"><div class="fn">Les signes qui doivent nous parler</div><div class="fw">Il redemande la même chose dix fois dans la journée · il ne retrouve plus sa chambre alors qu'il est là depuis des semaines · il ne sait plus se servir de quelque chose qu'il utilisait très bien · il raconte une histoire cohérente mais fausse, sans mentir · il s'habille pour l'hiver en juillet · il ne prend plus ses médicaments alors qu'il y arrivait.</div></div><div class="f-card"><div class="fn">Ce qui compte, c'est le CHANGEMENT</div><div class="fw">Quelqu'un qui a toujours été désorganisé, ce n'est pas un signe. Quelqu'un qui n'y arrive plus alors qu'il y arrivait, si. C'est nous qui voyons ça, parce que nous le côtoyons tous les jours — le médecin en consultation, non.</div></div><div class="f-h">2. Trois choses à ne pas confondre</div><div class="f-card"><div class="fn">La confusion AIGUË — c'est une urgence</div><div class="fw">Elle s'installe en quelques heures ou quelques jours. La personne est perdue, agitée ou au contraire éteinte, elle ne reconnaît plus les lieux. Causes fréquentes : une infection (urinaire, pulmonaire), un sevrage d'alcool, une déshydratation, une hypoglycémie, un médicament. <b>Ça se soigne, et ça peut tuer si on attend.</b> On appelle.</div></div><div class="f-card"><div class="fn">Le trouble neurocognitif — ça s'installe</div><div class="fw">Sur des mois, des années. La mémoire récente flanche avant la mémoire ancienne : il vous raconte 1985 dans le détail et ne sait plus ce qu'il a mangé ce midi. Ce n'est pas une urgence, c'est un dossier à ouvrir.</div></div><div class="f-card"><div class="fn">Le trouble psychiatrique — ce n'est pas la même chose</div><div class="fw">Un délire, des voix, une dépression profonde peuvent ressembler à un trouble de la mémoire sans en être un. Et les deux peuvent coexister — voir la fiche du double diagnostic.</div></div><div class="f-h">3. Korsakoff — pourquoi c'est fréquent chez nous</div><div class="f-card"><div class="fn">Une carence, pas une punition</div><div class="fw">Le syndrome de Korsakoff est un trouble neurocognitif sévère provoqué par une <b>carence chronique en vitamine B1 (thiamine)</b>, le plus souvent liée à une consommation d'alcool importante chez quelqu'un de dénutri. C'est exactement le profil qu'on croise en maison d'accueil : l'alcool et le manque de nourriture vont ensemble.</div></div><div class="f-card"><div class="fn">Ce qui le fait reconnaître</div><div class="fw">Des trous de mémoire massifs sur le présent, et surtout la <b>fabulation</b> : la personne comble les trous par un récit cohérent auquel elle croit. Elle ne ment pas. La contredire ne sert à rien et l'humilie.</div></div><div class="f-card"><div class="fn">Ce qui change tout</div><div class="fw">Pris tôt, une supplémentation en thiamine peut éviter que ça s'installe. Une fois installé, c'est irréversible. <b>D'où l'intérêt de le signaler vite au médecin</b> — c'est une des rares situations où notre coup de fil change vraiment le pronostic.</div></div><div class="f-h">4. Ce qu'on peut faire, ce qu'on ne peut pas</div><div class="f-card"><div class="fn">${icon('check')} À faire</div><div class="fw">Noter ce qu'on observe, avec des faits et des dates — « le 3, il n'a pas retrouvé sa chambre » vaut mieux que « il est confus ». Transmettre au médecin traitant. Garder les mêmes repères : même chambre, mêmes horaires, mêmes visages. Écrire les choses plutôt que les répéter. Laisser le temps de répondre.</div></div><div class="f-card"><div class="fn">${icon('alert')} À ne pas faire</div><div class="fw">Ne pas poser de diagnostic ni employer le mot « démence » devant la personne ou l'équipe. Ne pas corriger une fabulation en public. Ne pas tout changer d'un coup — un déménagement de chambre peut faire décrocher quelqu'un. Ne rien écrire de médical dans COUSIN : l'app ne contient aucune donnée d'hébergé.</div></div><div class="f-h">5. Où orienter</div><div class="f-card"><div class="fn">D'abord le médecin traitant</div><div class="fw">C'est lui qui voit l'évolution et qui demande un bilan. Sans médecin traitant, rien ne se met en route — c'est là que la question « qui est votre médecin ? » prend tout son sens.</div></div><div class="f-card"><div class="fn">La Ligue Alzheimer — dans notre commune</div><div class="fw">Centre Info-DEMences, Rue Brogniez 46 à Anderlecht — 02 510 61 88. Ligne gratuite : <b>0800 15 225</b>, jours ouvrables 8 h → 18 h. Ils informent aussi les professionnels, pas seulement les familles.</div></div><div class="f-card"><div class="fn">Avant 65 ans, ça existe</div><div class="fw">La démence précoce est régulièrement prise pour de l'alcool, de la fatigue ou du caractère. La Ligue Alzheimer a un groupe dédié, « Les Battants ».</div></div><div class="f-h">6. Quand quelqu'un se perd</div><div class="f-card"><div class="fn">Ça se prépare AVANT</div><div class="fw">Une disparition inquiétante s'appelle au <b>101</b>. Mais l'essentiel se joue avant : une fiche avec une photo récente, les habitudes et les lieux familiers fait gagner 30 à 45 minutes aux recherches. Voir la fiche « Disparition d'une personne qui perd la mémoire ».</div></div><div class="f-note">${icon('note')} <b>Sources</b>, relevées le 08/08/2026 : alzheimer.be (Centre Info-DEMences, ligne 0800 15 225, Groupe des Battants) · Société française d'alcoologie — numéro spécial Korsakoff (janvier 2025) · addictaide.fr. <b>Repère de terrain, pas un avis médical.</b> Le diagnostic appartient au médecin ; notre rôle est de voir et de transmettre.</div>${ficheLiens("Où l’envoyer",[
    ["Ligue Alzheimer","Ligue Alzheimer — Info-DEMences"],
    ["Services de Santé Mentale","Les services de santé mentale"],
    ["Similes Bruxelles","Similes — pour les proches"],
    ["Disparition d'une personne qui perd la mémoire","Si la personne se perd"]
  ])}
</div>`, "Santé mentale"),
  /* ═══ LE TRIANGLE DE KARPMAN (demandé par Mag le 09/08/2026) ═══
     Sa consigne, mot pour mot : « en expliquant que c'est informatif, que c'est à
     prendre avec des pincettes et que c'est juste pour avoir un autre angle de
     vue ». Les pincettes ne sont donc pas une note de bas de page : elles ouvrent
     la fiche ET la ferment. Et la théorie n'est pas « validée équipe » : Mag doit
     voir avec la psy ce qu'elle conseille comme théories — c'est au chantier. */
  formation("Le triangle de Karpman — un angle de vue, pas une vérité",
    "Victime, persécuteur, sauveur : une grille de lecture des situations qui tournent en rond. Informatif — à prendre avec des pincettes.",
    [],
    `<div class="f-page"><div class="f-lead">${icon('mind')} <b>Une paire de lunettes, pas un diagnostic.</b> Ce modèle date de 1968 et il est discuté. On le lit pour avoir UN AUTRE ANGLE sur une situation qui tourne en rond — jamais pour coller une étiquette sur un hébergé ou sur un collègue.</div><div class="f-h">1. D'où ça vient</div><div class="f-card"><div class="fn">Stephen Karpman, 1968</div><div class="fw">Un psychiatre américain, élève de l'analyse transactionnelle. Son idée : dans certaines relations qui coincent, les personnes glissent malgré elles dans un jeu à trois rôles — et le jeu s'auto-entretient. Il appelle ça le <b>triangle dramatique</b>.</div></div><div class="f-h">2. Les trois rôles</div><div class="f-card"><div class="fn">La victime</div><div class="fw">« C'est plus fort que moi, on ne peut rien pour moi. » La personne se vit comme impuissante et cherche quelqu'un qui porte à sa place. Le rôle n'est pas la réalité : quelqu'un peut VIVRE des choses très dures sans être « en rôle de victime » — et c'est exactement là que le modèle devient dangereux si on le lit trop vite.</div></div><div class="f-card"><div class="fn">Le persécuteur</div><div class="fw">« C'est de ta faute, tu ne fais aucun effort. » Il critique, contrôle, impose. Parfois c'est une personne, parfois c'est une règle brandie comme une arme.</div></div><div class="f-card"><div class="fn">Le sauveur</div><div class="fw">« Laisse, je vais le faire pour toi. » Il aide plus qu'on ne lui demande, et son aide maintient l'autre en position d'impuissance. C'est LE rôle à connaître dans nos métiers : on l'endosse avec les meilleures intentions du monde.</div></div><div class="f-card"><div class="fn">Et ça tourne</div><div class="fw">La pointe du triangle bouge : le sauveur épuisé devient persécuteur (« après tout ce que j'ai fait pour toi ! »), la victime devient persécutrice de son sauveur (« tu ne m'aides jamais vraiment »), et le jeu recommence. Personne ne le choisit consciemment — c'est ça, l'idée du modèle.</div></div><div class="f-h">3. Ce que ça peut éclairer chez nous</div><div class="f-card"><div class="fn">Faire À LA PLACE ou faire AVEC</div><div class="fw">La sortie du rôle de sauveur, dans notre travail, a un nom simple : l'accompagnement. On fait AVEC la personne (elle appelle, on est à côté) plutôt qu'À SA PLACE. Si une situation nous épuise ou nous met en colère, le triangle peut aider à se demander : quel rôle suis-je en train de jouer ?</div></div><div class="f-card"><div class="fn">Sortir du jeu, pas gagner le jeu</div><div class="fw">On ne sort pas du triangle en prouvant qu'on a raison. On en sort en revenant aux faits, au cadre et à la demande réelle : « qu'est-ce que tu veux, toi, et qu'est-ce que je peux faire dans mon rôle ? » Des variantes plus récentes appellent ça le « triangle gagnant » : vulnérable sans être victime, assertif sans persécuter, attentionné sans sauver.</div></div><div class="f-h">4. Les pincettes — à lire vraiment</div><div class="f-card"><div class="fn">${icon('alert')} Ce que cette grille n'est PAS</div><div class="fw">Ce n'est <b>pas une théorie validée scientifiquement</b> comme un outil de diagnostic : c'est un modèle d'observation, utile pour se poser des questions sur soi, dangereux pour juger les autres. Dire d'un hébergé « il se pose en victime » n'est pas une analyse, c'est une étiquette — et elle abîme la relation. On l'utilise sur NOS propres réactions d'abord.</div></div><div class="f-card"><div class="fn">Le mot de l'équipe</div><div class="fw">Cette fiche est <b>informative</b>. Quelles théories utiliser vraiment dans notre travail, c'est une question pour la psy de l'équipe — Mag voit ça avec elle. En attendant, un autre angle de vue, rien de plus.</div></div><div class="f-note">${icon('note')} <b>Source</b> : S. Karpman, « Fairy Tales and Script Drama Analysis », Transactional Analysis Bulletin, 1968. Fiche relue le 09/08/2026 — repère de réflexion, pas un avis clinique ni une position d'équipe.</div></div>`,
    "Santé mentale"),
  formation("Adresse de référence, CPAS compétent et agrément",
    "Sans adresse, plus de droits. Comprendre l'adresse de référence, savoir quel CPAS est compétent quand la personne change de centre, et ce que veut dire « agréé ».",[],
    `<div class="f-page">
  <div class="f-lead">${icon('compass')} <b>Trois notions qui n'en font qu'une en pratique.</b> Une personne sans logement perd ses droits faute d'adresse ; l'adresse de référence les lui rend ; et c'est un mot — « agréé » — qui décide quel CPAS doit la suivre quand elle change de centre.</div>

  <div class="f-h">1. L'adresse de référence</div>
  <div class="f-lead">Ce n'est <b>pas un logement</b> : c'est une adresse administrative, chez un CPAS, pour exister dans les registres et recevoir son courrier.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Trois conditions</b><span>Ne pas avoir les ressources pour se loger · ne plus être inscrit·e aux registres de la population · avoir introduit une demande d'aide auprès de ce CPAS.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Où la demander</b><span>Au CPAS de la commune où la personne est habituellement présente.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Ce que ça rouvre</b><span>Mutuelle, chômage, allocations familiales — et un endroit où le courrier officiel arrive.</span></div></div>
  </div>
  <div class="f-note">${icon('alert')} <b>À retenir :</b> l'adresse de référence rend des droits, mais elle <b>ne décide pas</b> quel CPAS est compétent pour l'aide sociale. Voir le point 2.</div>

  <div class="f-h">2. Quel CPAS est compétent ?</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>La règle générale</b><span>Le CPAS de la commune où la personne se trouve (loi du 2 avril 1965, art. 1er, 1°).</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>En établissement agréé</b><span>Le CPAS de la commune où elle était inscrite <b>au moment de son admission</b> reste compétent pendant tout le séjour, même si son inscription change ou disparaît (art. 2, §1er, 7°).</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>D'un établissement à l'autre</b><span>Sans interruption entre les deux, c'est le CPAS du <b>premier</b> qui reste compétent.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Sans abri, hors établissement</b><span>C'est le CPAS de sa <b>résidence de fait</b> (art. 2, §7) — et là, peu importe l'adresse de référence.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Jamais de renvoi de guichet</b><span>Le CPAS saisi à tort transmet la demande au CPAS compétent <b>dans les cinq jours</b> et intervient provisoirement s'il y a urgence (art. 3). Ce n'est pas à la personne de courir.</span></div></div>
  </div>

  <div class="f-h">3. L'agrément</div>
  <div class="f-lead">C'est l'autorisation obligatoire délivrée par le <b>Collège réuni de la COCOM</b> à un service d'aide aux sans-abri : sans elle, interdiction d'exercer.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Six services concernés</b><span>Urgence : hébergement d'urgence, accueil de jour. Insertion : maison d'accueil, guidance à domicile, housing first, travail de rue et maraude.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Combien de temps</b><span>Autorisation provisoire de 18 mois, puis agrément de 5 ans maximum, renouvelable — dans les limites du budget disponible.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Ce qu'il impose</b><span>Non-discrimination, respect de la vie privée et des droits fondamentaux, accueil dans les deux langues, règles du dossier social, participation des usagers, personnel qualifié et formé, règlement d'ordre intérieur, normes architecturales et comptables, rapport d'activités.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Ce qu'il donne</b><span>Des subsides : personnel, formation, fonctionnement.</span></div></div>
    <div class="f-step"><div class="sn">5</div><div class="st"><b>S'il n'est pas respecté</b><span>Avertissement, un mois pour se mettre en ordre, puis retrait — et trois mois de plus, pour un hébergement, afin de reloger les personnes accueillies.</span></div></div>
  </div>
  <div class="f-note">${icon('alert')} <b>Ce qui n'est pas tranché.</b> Le New Samusocial n'est pas passé par cette procédure : il est <b>créé directement</b> par l'ordonnance comme personne morale de droit public (art. 52). Savoir si cela vaut « agrément » au sens de la loi de 1965 est une question de droit — à faire confirmer par Vivalis (agrements-erkenningen@vivalis.brussels), le CPAS, ou le service juridique.</div>

  <div class="f-h">En une phrase</div>
  <div class="f-lead">L'adresse de référence rend les droits ; l'admission dans un établissement <b>agréé</b> gèle le CPAS compétent au jour de l'entrée ; hors établissement, c'est la commune où la personne se trouve vraiment.</div>

  <div class="f-note">${icon('note')} <b>Sources.</b> Loi du 2 avril 1965, art. 1er 1°, art. 2 §1er 7°, art. 2 §7 et art. 3. Loi du 19 juillet 1991 sur les registres de la population et AR du 16 juillet 1992. Ordonnance COCOM du 14 juin 2018, art. 5 à 8, 28 à 31, 35-36, 41 à 46, 52. Guide de compétence territoriale du SPP Intégration sociale (primabook.mi-is.be).</div>

  ${ficheLiens("Où l’envoyer",[
    ["Adresse de référence — Tous CPAS — la règle","La fiche pratique"],
    ["CPAS d'Anderlecht","Le CPAS d’Anderlecht"],
    ["Fédération des Services Sociaux","Un avis rapide — ligne gratuite"],
    ["Bureau d'Aide Juridique","Un avocat gratuit (BAJ)"]
  ])}
</div>`, "Droits et CPAS"),

  formation("L'avis d'incompétence au CPAS — ce n'est jamais à la personne de courir",
    "Un CPAS dit « ce n'est pas nous ». Ce qu'il DOIT faire, les délais qui le rattrapent, et quoi répondre quand on renvoie la personne à l'autre bout de Bruxelles.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('alert')} <b>La phrase qu'on entend au guichet : « Ce n'est pas notre CPAS, allez à X. »</b> Elle n'est pas illégale — un CPAS peut être incompétent. Ce qui est illégal, c'est de <b>renvoyer la personne</b> au lieu de transmettre son dossier. La loi met la charge sur l'administration, jamais sur elle.</div>

  <div class="f-h">Ce que le CPAS doit faire, dans les cinq jours</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Transmettre la demande lui-même</b><span>Par écrit, au CPAS qu'il estime compétent, dans les <b>5 jours</b>. La personne ne redépose rien nulle part.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Prévenir la personne par écrit</b><span>Dans le même délai, et en lui disant à QUEL CPAS le dossier est parti.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Motiver son incompétence</b><span>Par écrit, avec les raisons. Une décision non motivée est <b>nulle</b>.</span></div></div>
  </div>
  <div class="f-note">${icon('bulb')} <b>La date de la demande ne bouge pas.</b> C'est le jour où la personne s'est présentée au premier CPAS qui compte, pas le jour où le second reçoit le dossier. Les droits rétroagissent à cette date-là — d'où l'importance d'avoir une preuve du passage.</div>

  <div class="f-h">Le délai qui le rattrape</div>
  <div class="f-lead">S'il ne transmet pas dans les cinq jours, <b>il reste compétent</b> — et il doit accorder l'aide, revenu d'intégration compris, aussi longtemps qu'il n'a pas transmis. Le silence ne le libère pas : il l'engage.</div>

  <div class="f-h">Et si le second refuse aussi ?</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Il ne peut pas renvoyer le dossier une troisième fois</b><span>Il doit saisir le <b>SPP Intégration sociale</b> dans les 5 jours ouvrables, par le formulaire en ligne prévu pour ça.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Le SPP tranche en 5 jours ouvrables</b><span>Il désigne le CPAS qui doit intervenir <b>à titre provisoire</b>. Provisoire veut dire : la personne est payée pendant que les administrations se disputent.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Et l'urgence, pendant ce temps ?</b><span>Le CPAS saisi à tort doit intervenir provisoirement s'il y a urgence (art. 3). Une aide médicale urgente ne se met pas en attente d'un arbitrage.</span></div></div>
  </div>

  <div class="f-h">Ce qu'on fait, nous, concrètement</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Demander l'écrit, toujours</b><span>« Pouvez-vous me le mettre par écrit, avec le motif ? » Un refus oral ne se conteste pas ; un écrit motivé, si. Et s'il n'y a pas d'écrit, il n'y a pas de décision valable.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Noter la date du passage</b><span>Jour, heure, nom de la personne reçue. C'est cette date qui fixe les droits.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Ne pas envoyer la personne au second CPAS</b><span>Elle n'a rien à y faire tant que le dossier n'y est pas. L'y envoyer, c'est faire à sa place le travail que le premier CPAS doit faire — et lui faire perdre une journée.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Relancer au sixième jour</b><span>Passé les cinq jours sans transmission, le premier CPAS est toujours compétent. C'est le moment de le rappeler, par écrit, en citant l'article.</span></div></div>
    <div class="f-step"><div class="sn">5</div><div class="st"><b>Si ça bloque</b><span>Le Bureau d'Aide Juridique pour un avocat gratuit, ou la ligne de la Fédération des Services Sociaux pour un avis rapide. Le recours au tribunal du travail est de <b>3 mois</b> à dater de la notification.</span></div></div>
  </div>

  <div class="f-note">${icon('alert')} <b>Le piège du changement de centre.</b> Beaucoup d'avis d'incompétence viennent d'un déménagement d'hébergement. Rappel de l'autre formation : en établissement <b>agréé</b>, c'est le CPAS de la commune où la personne était inscrite <b>au moment de l'admission</b> qui reste compétent pendant tout le séjour. Le déménagement ne change donc rien — et c'est souvent ça qu'il faut leur écrire.</div>

  ${ficheLiens("Où l’envoyer, ou qui appeler",[
    ["Fédération des Services Sociaux","Un avis rapide — ligne gratuite"],
    ["Bureau d'Aide Juridique","Un avocat gratuit (BAJ)"],
    ["Adresse de référence — Tous CPAS — la règle","La règle de l’adresse de référence"],
    ["Réquisitoire — CPAS d'Anderlecht","Les CPAS qu’on appelle"]
  ])}

  <div class="f-note">${icon('note')} <b>Sources.</b> Loi du 2 avril 1965, art. 3 et art. 15 §4. Loi organique des CPAS du 8 juillet 1976, art. 58 §3. Loi du 26 mai 2002 sur le droit à l'intégration sociale, art. 18 §4. AR du 20 mars 2003. Guide de compétence territoriale du SPP Intégration sociale (primabook.mi-is.be) et mi-is.be/fr/outils-cpas/conflits-de-competence, relevés le 08/08/2026.</div>
</div>`, "Droits et CPAS"),
  formation("Double diagnostic — quand personne ne veut de la personne",
    "Déficience intellectuelle ET trouble psychique. Pourquoi le réseau la renvoie de porte en porte, ce qu'on peut faire quand même, et le réflexe qui évite le pire.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('alert')} <b>« Double diagnostic », c'est un mot d'administration pour une situation très concrète :</b> une personne a une déficience intellectuelle <b>et</b> un trouble psychiatrique ou du comportement. Le secteur du handicap répond qu'il n'est pas équipé pour le psychiatrique. La psychiatrie répond qu'elle n'est pas équipée pour le handicap. La personne, elle, reste dehors.</div>

  <div class="f-h">De qui on parle</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Au moins 110 000 personnes en Belgique</b><span>Environ 300 000 Belges ont une déficience intellectuelle ; près d'un tiers développe une maladie mentale au cours de sa vie — dépression profonde, psychose, troubles de l'attachement, troubles de l'humeur.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Quatre unités hospitalières dans tout le pays</b><span>Manage en Wallonie (25 lits), Louvain, Gand et Anvers en Flandre. <b>Aucune à Bruxelles.</b> C'est le chiffre à avoir en tête avant de promettre quoi que ce soit.</span></div></div>
  </div>

  <div class="f-h">Le réflexe qui change tout</div>
  <div class="f-lead">Quand une personne déficiente intellectuelle change de comportement — agitation, cris, refus, agressivité — le réflexe du réseau est de dire « trouble du comportement » et de chercher un lieu. <b>Cherchez d'abord une douleur.</b></div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Une douleur qui ne se dit pas se montre</b><span>Dent, oreille, ventre, constipation, infection urinaire. Quelqu'un qui n'a pas les mots pour dire « j'ai mal » le dit avec son corps et sa voix.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Un changement RÉCENT est un signal médical</b><span>Ce qui compte n'est pas le comportement en lui-même, c'est qu'il ait changé. « Depuis quand ? » est la meilleure question de l'entretien.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Regarder aussi ce qui a bougé autour</b><span>Un départ dans l'équipe, un changement de chambre, un traitement modifié, un deuil. Le monde a changé, pas la personne.</span></div></div>
  </div>
  <div class="f-note">${icon('bulb')} <b>Pourquoi ça compte pour nous.</b> Un « trouble du comportement » ferme des portes : les services refusent. Une douleur, ça se soigne en une semaine. Le mot qu'on écrit dans le dossier suit la personne pendant des années — on pèse avant d'écrire.</div>

  <div class="f-h">Ce qu'on fait, quand aucune porte ne s'ouvre</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Vérifier l'inscription au service PHARE</b><span>Sans reconnaissance du handicap, la moitié du secteur est fermée d'office. Si elle n'y est pas, c'est par là qu'on commence — même si c'est long.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Appeler ANAÏS</b><span>Une des rares maisons bruxelloises qui prend les deux à la fois : service de santé mentale, centre de jour, hébergement. Attention, quatre numéros selon le service.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Demander une équipe MOBILE plutôt qu'une place</b><span>Quand aucun lieu ne veut de la personne, il reste les équipes qui se déplacent. C'est souvent la seule réponse disponible, et elle est meilleure qu'une hospitalisation subie.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Ne pas accepter le renvoi sans nom</b><span>« Ce n'est pas chez nous » n'est pas une orientation. Demander : vers QUI, et qui appelle ? Sinon c'est nous qui recommencerons demain.</span></div></div>
  </div>

  ${ficheLiens("Où l’envoyer",[
    ["ANAÏS asbl","ANAÏS — les deux à la fois"],
    ["WOPS – Woluwe-Psycho-Social","WOPS — tous les âges"],
    ["Similes Bruxelles","Similes — pour les proches"],
    ["Free Clinic","Free Clinic"]
  ])}

  <div class="f-note">${icon('note')} <b>Sources.</b> Conseil Supérieur de la Santé, avis 9203 « Double diagnostic » (health.belgium.be). doublediagnostic.be, Université de Namur — répertoire des services spécialisés. pro.guidesocial.be, dossier « Double diagnostic : quelles structures d'accueil ? ». Relevés le 08/08/2026. ⚠ Le nombre de lits et les unités existantes bougent : à revérifier avant d'annoncer une place à quelqu'un.</div>
</div>`, "Handicap"),

  /* ⚠ FICHE DATÉE — À RETIRER APRÈS LE 24 NOVEMBRE 2026. Ce n'est pas un repère
     permanent comme les autres formations : c'est un programme qui se périme. Mag a
     envoyé le lien le 07/08/2026 en demandant de le ranger dans l'app. Quand les cinq
     dates seront passées, cette fiche ne rend plus service — elle ment. La supprimer,
     ou la remplacer par le programme suivant. */
  formation("Se former à la santé mentale en exil — l’automne 2026",
    "Cinq demi-journées à Bruxelles, 25 € (10 € en tarif réduit). Deux sont faites pour une équipe comme la nôtre. Inscription ET paiement deux semaines avant.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('alert')} <b>Le piège, c’est la date limite.</b> Il faut être inscrit <b>et avoir payé</b> deux semaines avant la formation — pas seulement s’être annoncé. Pour la première, le 22 septembre, cela veut dire <b>autour du 8 septembre</b>. Et il faut au moins douze inscrits pour qu’une séance ait lieu : s’y prendre tard, c’est risquer de la faire annuler pour tout le monde.</div>

  <div class="f-h">Les deux qui nous concernent vraiment</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>5 octobre, 13 h 15 → 16 h 30 · Premiers soins psychologiques</b><span>Le programme dit noir sur blanc pour qui c’est : « <b>les intervenant·es de terrain qui ne sont pas spécialisé·es dans la santé mentale</b> ». C’est-à-dire nous tous. Animé par Francesca Marzano, psychologue.<br>Entr’Aide des Marolles, rue des Tanneurs 169, 1000 Bruxelles.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>24 novembre, 12 h 45 → 15 h · La place du travail social dans le soin</b><span>« L’accompagnement psychosocial global en SSM : la fonction clinique de l’assistant·e social·e et la question de la porte d’entrée dans l’accompagnement. » Animé par <b>deux assistantes sociales</b>, Hanane Lafhal et Joyce Elias — pas par des psys qui parlent du travail social.<br>SSM Le Méridien, rue du Méridien 68, 1210 Saint-Josse-ten-Noode.</span></div></div>
  </div>

  <div class="f-h">Les trois autres</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>22 septembre, 9 h 15 → 12 h 30 · Travailler avec un interprète</b><span>« Entretiens avec interprètes en santé mentale : enjeux, implications et avantages. » Ouvert à toutes et tous. Pascale De Ridder et Nicolas Bruwier.<br>Entr’Aide des Marolles, rue des Tanneurs 169, 1000 Bruxelles.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>9 octobre, 9 h 45 → 13 h · MGF et droit des étrangers</b><span>« Pertinence des MGF dans le droit des étrangers », par Amélie Nsimba Nlasa, juriste. <b>Il faut déjà avoir les bases</b> sur les mutilations génitales féminines — un module gratuit en ligne existe pour les prendre avant.<br>GAMS, rue Gabrielle Petit 6, 1080 Bruxelles.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>5 novembre, 19 h 15 → 21 h 30 · Pour les médecins généralistes</b><span>« Comment le médecin généraliste peut accompagner les états de souffrance psychique des personnes exilées ? » Par deux psychiatres, Renaud Brankaer et Pauline Monhonval. Accréditation demandée. <b>Réservé aux généralistes</b> — mais c’est la soirée à signaler au médecin avec qui on travaille.<br>SSM Ulysse, rue de l’Ermitage 52, 1050 Ixelles.</span></div></div>
  </div>

  <div class="f-h">Comment on s’inscrit</div>
  <div class="f-card"><div class="fn">Il n’y a pas de formulaire en ligne — on écrit ou on appelle</div><div class="fw">Cihan Gunes<br>
  <b>reseau@ulysse-ssm.be</b> · <b>02 533 06 70</b><br><br>
  Paiement sur le compte <b>BE94 0682 3374 9314</b>.<br>
  ⚠ En communication : <b>le nom de la personne inscrite ET la ou les dates</b>. Sans ça, l’inscription ne se retrouve pas.</div></div>
  <div class="f-note">${icon('alert')} <b>Une place non annulée reste due.</b> Douze inscrits minimum pour que la séance ait lieu, vingt-cinq au maximum. Si quelqu’un ne peut plus venir, il faut prévenir — sinon l’équipe paie une place vide.</div>

  <div class="f-h">Deux choses à demander en appelant</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">?</div><div class="st"><b>Qui a droit au tarif à 10 €</b><span>Le programme annonce « 25 € (tarif préférentiel 10 €) » sans dire à qui s’applique le tarif réduit. C’est 15 € par personne et par module — sur cinq personnes, la question vaut d’être posée.</span></div></div>
    <div class="f-step"><div class="sn">?</div><div class="st"><b>Si une inscription groupée est possible</b><span>Le programme n’en parle pas. Vingt-cinq places par module : inscrire l’équipe d’un coup, c’est aussi s’assurer qu’on ne se retrouve pas à trois sur cinq.</span></div></div>
  </div>

  ${ficheLiens("Les lieux, dans le réseau",[
    ["SSM Ulysse","L’organisateur — santé mentale des personnes exilées"],
    ["Le Méridien","Où se donne la formation du 24 novembre"]
  ])}

  <div class="f-note">${icon('note')} <b>Source.</b> ulysse-ssm.be, page « Automne 2026 — nouveaux modules de formation du Réseau Santé Mentale en Exil », relevée le 07/08/2026. Programme organisé par le <b>Réseau Santé Mentale en Exil</b> avec le soutien de la COCOF. Dates, horaires, lieux et tarifs recopiés tels quels — <b>vérifier auprès de Cihan Gunes avant de payer</b> : un programme peut bouger.</div>
</div>`, "Santé mentale"),

  formation("Décrire une plaie dans une note — la méthode des soignants",
    "Six choses à écrire, toujours dans le même ordre, et un exemple rédigé. Plus l'erreur qui fait perdre une semaine.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('alert')} <b>La note part sans nous.</b> L'infirmier qui passera demain n'a jamais vu cette plaie. Sans point de départ écrit, il ne peut pas dire si elle s'améliore ou si elle s'aggrave — et une plaie qui s'aggrave sans que personne ne le voie, c'est une hospitalisation trois semaines plus tard.</div>

  <div class="f-h">Les six choses, toujours dans cet ordre</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>OÙ, précisément</b><span>Pas « au bras » : <b>face externe de l'avant-bras gauche, à trois doigts du coude</b>. Le côté compte — gauche et droite ne se soignent pas au même endroit du dossier. Et l'endroit explique beaucoup : dans un pli de l'aine ça macère, sous le talon ça fait mal dès qu'on pose le pied et ça ne cicatrise pas.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>COMBIEN — en centimètres, jamais en fruits</b><span>Longueur × largeur, et la profondeur si on la voit. « Grande comme une pièce de deux euros » ne se compare pas la semaine suivante. <b>4 × 2 cm</b>, si.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>DE QUELLE COULEUR EST LE FOND</b><span>C'est là que se lit l'évolution. <b>Noir</b> = tissu mort (nécrose). <b>Jaune</b> = fibrine. <b>Rouge vif et bombé</b> = ça bourgeonne, c'est bon signe. <b>Rose sur les bords</b> = ça se referme. On peut écrire plusieurs couleurs et leur part : « 30 % jaune, 70 % rouge ».</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>CE QUI COULE</b><span>Combien (le pansement est-il traversé ?), de quelle couleur (clair, jaune-vert, sanglant), et <b>si ça sent</b>. Une odeur forte se note : c'est souvent le premier signe d'infection, avant tout le reste.</span></div></div>
    <div class="f-step"><div class="sn">5</div><div class="st"><b>LE POURTOUR</b><span>La peau autour est-elle rouge, chaude, gonflée, blanchie et ramollie (macérée), ou sèche et craquelée ? Une plaie propre entourée d'une peau rouge et chaude sur plusieurs centimètres, c'est une urgence médicale.</span></div></div>
    <div class="f-step"><div class="sn">6</div><div class="st"><b>LA DOULEUR, CHIFFRÉE</b><span>« Sur 10, ça fait combien ? » — au repos, et pendant le soin. Un chiffre se compare ; « il a mal » ne se compare pas. Et une douleur qui augmente d'un jour à l'autre est un signal, même si la plaie a l'air pareille.</span></div></div>
  </div>
  <div class="f-note">${icon('bulb')} <b>Le moyen de s'en souvenir.</b> Où · Combien · Quelle couleur · Ce qui coule · Le pourtour · La douleur. Les soignants appellent ça la méthode TIME ; peu importe le nom, c'est l'ordre qui compte — pris toujours dans le même sens, rien ne s'oublie.</div>

  <div class="f-h">Un exemple, écrit pour de vrai</div>
  <div class="f-card"><div class="fn">Ce qu'on colle dans le dossier</div><div class="fw">PLAIE — 8 août, 9 h 30.<br>
  Face externe de l'avant-bras GAUCHE, à trois doigts du coude.<br>
  4 × 2 cm, peu profonde, pas de trou visible.<br>
  Fond : 30 % jaune (fibrine), 70 % rouge et bombé.<br>
  Écoulement : peu, jaune clair, pansement non traversé. Pas d'odeur.<br>
  Pourtour : rouge sur 1 cm environ, pas chaud, pas gonflé.<br>
  Douleur : 3/10 au repos, 6/10 pendant le soin.<br>
  Fait : nettoyage sérum physiologique, pansement gras, compresse.<br>
  À revoir : mercredi. <b>Prévenir si</b> le rouge s'étend, si ça sent, ou si la douleur monte au-dessus de 6 au repos.</div></div>
  <div class="f-note">${icon('note')} <b>Ce qui rend cette note utile, c'est la dernière ligne.</b> « Prévenir si… » transforme une description en consigne : la personne qui lit sait à quel moment elle doit décrocher son téléphone, et n'attend pas la visite suivante.</div>

  <div class="f-h">Les escarres : quatre stades, et une règle belge</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Stade 1 — une rougeur qui ne blanchit pas</b><span>La peau est intacte. On appuie dessus : si la rougeur ne pâlit pas, c'est déjà une escarre. C'est le seul stade réversible en quelques jours — c'est donc celui qu'il faut voir.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Stade 2 — la peau est ouverte</b><span>Une ampoule (phlyctène) ou une plaie superficielle.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Stade 3 — c'est creusé</b><span>La graisse sous la peau est visible.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Stade 4 — jusqu'au tendon ou à l'os</b><span>Hospitalisation.</span></div></div>
  </div>
  <div class="f-note">${icon('alert')} <b>En Belgique, une escarre de stade 2 ou plus se DÉCLARE</b> comme événement indésirable dans le système qualité de l'institution. Ce n'est pas une faute qu'on cache : c'est une déclaration qui sert à comprendre ce qui s'est passé. Ne pas la faire, en revanche, en est une.</div>

  <div class="f-h">La photo, si on en prend une</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Toujours avec une règle graduée à côté</b><span>Sans repère de taille, deux photos ne se comparent pas : on ne sait pas si c'est la plaie qui a grandi ou l'appareil qui s'est rapproché. Une latte posée à plat à côté de la plaie suffit.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Même distance, même lumière, chaque fois</b><span>Sinon la couleur change d'une photo à l'autre et on croit à une aggravation.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Jamais dans COUSIN, ni dans un téléphone personnel</b><span>Une photo de plaie est une donnée de santé. Elle va dans le dossier de l'institution, avec l'accord de la personne, et nulle part ailleurs.</span></div></div>
  </div>

  <div class="f-h">Ce qu'on n'écrit PAS</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">✕</div><div class="st"><b>Un diagnostic</b><span>« Escarre infectée », « ulcère variqueux » : ce n'est pas à nous de le poser. On écrit ce qu'on VOIT — rouge, chaud, ça sent — et le médecin nomme.</span></div></div>
    <div class="f-step"><div class="sn">✕</div><div class="st"><b>Un jugement sur la personne</b><span>« Ne se lave pas », « ne suit rien ». Ça ne soigne rien, ça reste des années dans un dossier, et ça change la façon dont le prochain soignant entrera dans la chambre.</span></div></div>
    <div class="f-step"><div class="sn">✕</div><div class="st"><b>Un nom, dans COUSIN</b><span>La règle de l'app vaut ici aussi : la note se rédige ici, se copie, et se complète DANS le dossier — c'est là qu'elle prend un nom.</span></div></div>
  </div>

  ${ficheLiens("Qui appeler",[
    ["Infirmiers de rue","Quand la personne refuse les soins"],
    ["Soins Chez Soi","Infirmiers à domicile 24h/24"],
    ["Médecins du Monde","Sans mutuelle, sans papiers"],
    ["Goujonissimo","La maison médicale du quartier"]
  ])}

  <div class="f-note">${icon('note')} <b>Sources.</b> Méthode TIME et évaluation des plaies chroniques : recommandations de soins du CHUV et guides infirmiers (journaldesinfirmiers.fr, walter-learning.com, reussistonifsi.fr). Stades d'escarre et déclaration en Belgique : soins-a-domicile-sperandieu.be, cisss-at.gouv.qc.ca. Relevés le 08/08/2026. <b>Repère de transmission, pas un protocole de soins</b> — le soin lui-même appartient à l'infirmier et au médecin.</div>
</div>`, "Soins"),
  formation("Premiers pas dans le réseau bruxellois",
    "Les trois marches à suivre de base : ouvrir un dossier CPAS, l'aide médicale urgente, et quand passer la main sur le séjour.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('compass')} <b>Pour qui arrive dans le réseau bruxellois.</b> Trois marches à suivre qu'on lit une fois, puis qu'on oublie — les guichets, eux, restent dans <b>Démarches</b>.</div>

  <div class="f-h">Ouvrir un dossier CPAS</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Déterminer la commune de résidence</b><span>C'est elle qui désigne le CPAS compétent.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Réunir les pièces</b><span>Composition de ménage, revenus, bail, identité.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Rendez-vous ou permanence</b><span>Selon les pratiques du CPAS concerné.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Délais légaux d'instruction</b><span>À vérifier au cas par cas.</span></div></div>
    <div class="f-step"><div class="sn">5</div><div class="st"><b>Suivi</b><span>RIS, aide médicale, aide sociale complémentaire.</span></div></div>
  </div>
  <div class="f-note">${icon('chevron')} <b>Adapter aux pratiques de chaque CPAS.</b></div>

  <div class="f-h">Aide Médicale Urgente (AMU)</div>
  <div class="f-lead">Information générale, non juridique. L'AMU permet des soins aux personnes <b>en séjour irrégulier</b>, via le CPAS.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Orienter vers le CPAS de la commune</b><span>C'est lui qui ouvre le droit.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Un médecin atteste le caractère « urgent »</b><span>L'attestation médicale est la pièce centrale.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>En parallèle : Médecins du Monde (CASO)</b><span>Pour l'accès aux soins sans attendre.</span></div></div>
  </div>
  <div class="f-note">${icon('alert')} <b>Confirmer la procédure avec le CPAS concerné.</b></div>

  <div class="f-h">Quand passer la main — droit des étrangers</div>
  <div class="f-lead">${icon('alert')} <b>Ne pas donner de conseil juridique soi-même.</b></div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Séjour, regroupement familial</b><span>ADDE, CIRÉ, Myria.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Demande d'asile</b><span>Fedasil, avocat spécialisé (BAJ).</span></div></div>
  </div>
  <div class="f-note">${icon('jchrono')} <b>Toujours vérifier les délais</b> : ils sont souvent courts et impératifs.</div>
  ${ficheLiens("Où l’envoyer",[
    ["Bruxelles Social","Bruxelles Social — l’annuaire"],
    ["Fédération des Services Sociaux","Un avis rapide — ligne gratuite"],
    ["Bruss'help","Bruss’help — une place d’urgence"],
    ["CPAS d'Anderlecht","Le CPAS d’Anderlecht"]
  ])}

</div>`, "Premiers pas"),

  /* Écrite le 31/07/2026 à sa demande : « dès qu'il y a quelqu'un qui a des droits, on
     doit faire en sorte qu'il les ait ». Tout est sourcé en bas de page ; ce qui n'a pas
     pu être vérifié est écrit comme tel. Les montants ne sont volontairement PAS chiffrés :
     ils sont indexés plusieurs fois par an et un chiffre périmé fait plus de mal que pas
     de chiffre du tout. */
  formation("Handicap — repérer les droits et les activer",
    "Trois administrations, une seule première marche. Ce qu'on demande à l'entrée, ce que la reconnaissance ouvre, et qui appeler pour se déplacer, se soigner et s'équiper.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('handicap')} <b>Le handicap ouvre des droits que personne ne propose spontanément.</b> Une personne peut passer des années sans allocation, sans carte, sans matériel — non pas parce qu'elle n'y a pas droit, mais parce qu'on ne lui a jamais posé la question. C'est à l'entrée qu'on la pose.</div>

  <div class="f-h">Trois administrations, et c'est là qu'on se perd</div>
  <div class="f-grid">
    <div class="f-card"><div class="fn">${icon('juridique')} Le fédéral — DGPH</div><div class="fw"><b>Reconnaît</b> le handicap, paie l'ARR et l'AI, délivre la carte de stationnement et l'European Disability Card. <b>Jusqu'à 65 ans.</b><br>02 202 02 02 · handicap.belgium.be</div></div>
    <div class="f-card"><div class="fn">${icon('cle')} Bruxelles — PHARE</div><div class="fw">Le <b>matériel</b>, l'<b>aménagement</b>, les <b>services d'accompagnement</b>, les centres de jour, l'emploi. COCOF, francophone.<br>02 800 82 03 · phare.irisnet.be</div></div>
    <div class="f-card"><div class="fn">${icon('accomp')} Bruxelles — Iriscare</div><div class="fw">Les <b>aides à la mobilité</b> (voiturette, rollator…) et l'<b>APA</b> à partir de <b>65 ans</b>.<br>0800 35 499 · iriscare.brussels</div></div>
    <div class="f-card"><div class="fn">${icon('alert')} L'erreur classique</div><div class="fw">Envoyer quelqu'un à PHARE ou à Iriscare <b>avant</b> la reconnaissance fédérale. Les deux portes restent fermées tant que la DGPH n'a pas décidé.</div></div>
  </div>

  <div class="f-h">Tout tient à un chiffre : les points</div>
  <div class="f-lead">Le médecin de la DGPH évalue la <b>perte d'autonomie</b> sur une échelle en points (déplacement, repas, hygiène, logement, courses, contacts sociaux). Ce chiffre commande la suite.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">7</div><div class="st"><b>7 points minimum</b><span>C'est le seuil d'ouverture de l'allocation d'intégration (AI).</span></div></div>
    <div class="f-step"><div class="sn">12</div><div class="st"><b>12 points</b><span>Un des chemins vers la carte de stationnement.</span></div></div>
    <div class="f-step"><div class="sn">%</div><div class="st"><b>Ou des pourcentages</b><span>Carte de stationnement également si incapacité permanente d'au moins 80 %, ou d'au moins 50 % aux membres inférieurs, ou paralysie / amputation des membres supérieurs.</span></div></div>
    <div class="f-step"><div class="sn">!</div><div class="st"><b>Ce n'est pas nous qui évaluons</b><span>On décrit ce qu'on observe au quotidien quand on nous le demande — on ne juge jamais si « ça vaut le coup » de déposer.</span></div></div>
  </div>

  <div class="f-h">1. À l'entrée : la question</div>
  <div class="f-lead">« <b>Avez-vous une carte ou une reconnaissance de handicap ? Une allocation ? Un dossier en cours ?</b> » — posée à <b>tout le monde</b>, dans la même liste que la mutuelle et le CPAS.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Pourquoi si tôt</b><span>Environ 4 mois pour une reconnaissance, jusqu'à 6 pour une carte de stationnement. Lancée le jour de l'accueil, la réponse arrive pendant le séjour.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>D'abord une adresse</b><span>Pas de dossier sans un endroit où le courrier arrive. Si la personne n'a pas d'adresse de référence, on commence par là.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Où ça se demande</b><span>My Handicap, avec eID ou itsme. Sans ordinateur : la <b>commune</b>, le <b>CPAS</b> et la <b>mutuelle</b> ont accès aux dossiers et introduisent la demande avec la personne. Une visite à domicile d'un assistant social de la DGPH peut être demandée.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Le piège des revenus</b><span>Les allocations regardent les revenus du <b>ménage</b> d'il y a deux ans. Quelqu'un sans rien aujourd'hui peut être refusé sur ses revenus d'avant : ça se conteste, ça ne se subit pas.</span></div></div>
  </div>

  <div class="f-h">2. Ce que la reconnaissance ouvre</div>
  <div class="f-grid">
    <div class="f-card"><div class="fn">${icon('demarche')} Allocations</div><div class="fw"><b>ARR</b> (remplacement de revenus) et <b>AI</b> (intégration) jusqu'à 65 ans ; <b>APA</b> via Iriscare au-delà. Montants indexés : à vérifier le jour même.</div></div>
    <div class="f-card"><div class="fn">${icon('pin')} Carte de stationnement</div><div class="fw">Liée à la <b>personne</b>, pas à la voiture. Durée illimitée en zone bleue, places réservées ; gratuité aux horodateurs selon la commune.</div></div>
    <div class="f-card"><div class="fn">${icon('ticket')} European Disability Card</div><div class="fw">Gratuite, pour la culture, le sport et les loisirs. <b>Automatique</b> pour les reconnaissances approuvées depuis le 1er janvier 2024.</div></div>
    <div class="f-card"><div class="fn">${icon('bulb')} Tarifs sociaux</div><div class="fw">Énergie et internet. À demander à l'opérateur ou au fournisseur — jamais automatique dans tous les cas.</div></div>
    <div class="f-card"><div class="fn">${icon('bed')} Matériel et aménagement</div><div class="fw">PHARE (aides individuelles) et Iriscare (aides à la mobilité, via prescription et bandagiste).</div></div>
    <div class="f-card"><div class="fn">${icon('accomp')} Accompagnement</div><div class="fw">Les services d'accompagnement agréés PHARE travaillent <b>là où la personne vit</b> — donc ils peuvent venir au centre.</div></div>
  </div>

  <div class="f-h">3. Se déplacer</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>TaxiBus (STIB) — 02 515 23 65</b><span>Porte-à-porte, réservé aux personnes reconnues par le SPF Sécurité sociale. <b>Inscription préalable obligatoire</b> (dossier + attestation) et <b>payant</b> : l'abonnement STIB ne le couvre pas, le compte s'alimente d'avance.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>SNCB — 02 607 30 00</b><span>Assistance gratuite dans plus de 150 gares, tous les jours 7h–21h30. À <b>réserver</b> : 24 h à l'avance, 3 h dans les gares les plus fréquentées. Aussi via l'appli « SNCB Assist ».</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Taxis adaptés</b><span>Une centaine de taxis bruxellois seulement sont équipés pour une chaise roulante. On réserve à l'avance, on ne compte pas sur la rue.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Avant de proposer un lieu</b><span>handy.brussels dit ce qui est réellement accessible : salles, musées, restaurants, toilettes, parkings.</span></div></div>
  </div>

  <div class="f-h">4. Les soins et le matériel</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Une plaie ne s'improvise pas</b><span>Pansement complexe, ulcère, escarre, injection : on fait passer un·e infirmier·ère à domicile. <b>Soins Chez Soi 02 420 54 57</b> (24h/24, et ils prennent les gens sans mutuelle) · CSD 02 537 98 66 · ASD 02 647 03 66. Toujours une <b>prescription médicale</b> d'abord.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Qui paie se règle AVANT</b><span>Mutuelle en ordre : remboursement INAMI. Sans mutuelle ou en séjour irrégulier : AMU ou réquisitoire du CPAS, demandé <b>avant</b> le soin.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Avant d'acheter quoi que ce soit</b><span>Solival (070 22 12 20) conseille gratuitement, se déplace dans les 19 communes et a une salle d'essai : ils disent ce qui convient et ce qui est remboursable.</span></div></div>
  </div>

  <div class="f-h">5. Voir, entendre, comprendre</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Info-Sourds de Bruxelles — 02 644 68 90</b><span>Interprètes en langue des signes, à réserver <b>dès qu'on connaît la date</b> : ils sont peu nombreux. Un proche n'est pas un interprète.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Ligue Braille — 02 533 32 11</b><span>Service social, canne blanche, adaptation. Permanence bruxelloise le <b>lundi 9h–13h sans rendez-vous</b>.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Handicap invisible</b><span>Douleur chronique, épilepsie, troubles psychiques, déficience intellectuelle, séquelles d'AVC : rien ne se voit, et les droits sont les mêmes.</span></div></div>
  </div>

  <div class="f-h">6. Quand on ferme la porte</div>
  <div class="f-lead">Un <b>aménagement raisonnable</b>, c'est adapter une situation concrète pour qu'une personne handicapée puisse y accéder : un rendez-vous au rez-de-chaussée, un document lisible, un délai, un accompagnement. <b>Le refuser est une discrimination.</b></div>
  <div class="f-note">${icon('juridique')} <b>Unia — 0800 12 800</b> (jours ouvrables 9h30–13h), signalement en ligne 24h/24. Gratuit et confidentiel. Le droit à l'inclusion et aux aménagements raisonnables figure à l'<b>article 22ter de la Constitution</b>.</div>

  <div class="f-do yes"><b>${icon('check')} À faire</b><ul>
    <li><b>Poser la question à tout le monde</b>, à l'entrée, comme on demande la mutuelle.</li>
    <li><b>Lancer tôt</b> : les délais se comptent en mois.</li>
    <li><b>Demander de l'aide pour la demande</b> : commune, CPAS, mutuelle ont accès à My Handicap.</li>
    <li><b>Transmettre le besoin à l'équipe</b> — chambre au rez, ne peut pas porter, interprète à prévoir.</li>
    <li><b>Vérifier les chiffres le jour même</b> : montants et conditions sont indexés.</li>
  </ul></div>
  <div class="f-do no"><b>${icon('alert')} À ne pas faire</b><ul>
    <li><b>Ne pas poser de diagnostic</b> ni décider à la place du médecin de la DGPH.</li>
    <li><b>Ne pas écrire de données de santé dans COUSIN</b> : l'app ne contient aucune donnée d'hébergé. Le dossier social, oui ; ici, non.</li>
    <li><b>Ne pas transmettre le diagnostic à toute l'équipe</b> — on transmet le besoin, pas la maladie.</li>
    <li><b>Ne jamais annoncer un montant de mémoire.</b></li>
    <li><b>Ne pas envoyer quelqu'un chez PHARE ou Iriscare</b> avant la reconnaissance fédérale.</li>
  </ul></div>

  <div class="f-note">${icon('question')} <b>Ce qu'on ne sait pas encore, et qui manque.</b> L'accessibilité des maisons d'accueil bruxelloises n'est documentée nulle part dans cet outil : une seule fiche en parle, et c'est pour dire que c'est difficile. Tant que ce n'est pas relevé maison par maison (ascenseur, plain-pied, chambre PMR, douche adaptée), <b>on appelle avant d'orienter</b> une personne qui ne peut pas prendre l'escalier.</div>

  <div class="f-note">${icon('note')} <b>Sources</b>, relevées le 31/07/2026 : handicap.belgium.be (reconnaissance, ARR, AI, carte de stationnement, European Disability Card, contact — nouveau numéro au 15/04/2026) · socialsecurity.be/citizen · ccf.brussels et phare.irisnet.be (Service PHARE, aides individuelles, services d'accompagnement) · iriscare.brussels (aides à la mobilité, APA) · handicap.brussels (STIB, SNCB, aménagements raisonnables, tarifs sociaux, interprétariat) · stib-mivb.be (règlement TaxiBus) · belgiantrain.be (assistance PMR) · solival.be · infosourds.be · braille.be · unia.be · bruxelles.aideetsoinsadomicile.be.<br><br>Repère de travail, <b>pas un avis juridique ni médical</b>. Les montants, seuils et conditions changent : les vérifier à la source le jour où on en parle.</div>
  ${ficheLiens("Où l’envoyer",[
    ["Service PHARE","Service PHARE — la reconnaissance"],
    ["DGPH","DGPH — les allocations"],
    ["Unia","Unia — discrimination"],
    ["handicap.brussels","Toute l’info handicap"]
  ])}

</div>`, "Handicap"),

  // CENTRE — infos pratiques du quotidien
  centre("Jour des poubelles","Sortie des poubelles — jours, couleurs et où les déposer.","Le rappel de l'accueil s'allume la veille dès 16 h et le matin de la collecte, aux couleurs des sacs à sortir. Il s'éteint à midi : les sacs sont dehors, le rappel ne sert plus."),
  centre("Distribution des produits","Produits distribués à l'accueil.","Tous les PREMIERS SAMEDIS du mois, à l'accueil.\n\nUn rappel apparaît dans l'app la veille au soir et le jour même."),
  centre("Draps et linge","Jour de lessive par étage — et changement à la demande.","À LA DEMANDE : les draps se changent tous les jours, il suffit de le demander.\n\nJOUR DE LESSIVE PAR ÉTAGE\nLundi — 1er étage, chambres 101 à 108\nMardi — 1er étage, chambres 113 à 122\nMercredi — 2e étage, chambres 201 à 222\nJeudi — 4e et 5e étage\nVendredi — 5e étage, chambres 501 à 512\nSamedi — 3e étage, chambres 301 à 310\nDimanche — 3e étage, chambres 312 à 322\n\nLe bouton bleu en bas de l'app affiche l'étage du jour."),
  /* ═══ LES DEUX INFIRMERIES (dicté par Mag le 08/08/2026) ═══
     Ce sont DEUX infirmeries, à deux étages, avec des horaires différents — et
     jusqu'ici l'app n'en disait pas un mot. Envoyer quelqu'un à la mauvaise heure
     ou au mauvais étage, dans un bâtiment où il faut prendre l'ascenseur, c'est un
     aller-retour pour rien.
     ⚠ LES HEURES SONT CELLES QU'ELLE M'A DONNÉES ce jour-là, la première depuis la
     PHOTO de l'affiche du rez-de-chaussée. À revérifier avec l'équipe médicale avant
     de s'y fier les yeux fermés — une affiche se démode, un horaire se négocie. */
  centre("Les deux infirmeries du centre",
    "Rez-de-chaussée et 2e étage (LAM) : deux infirmeries, deux horaires différents.",
    "⚠️ IL Y EN A DEUX, ET ELLES N'OUVRENT PAS AUX MÊMES HEURES. C'est la première chose à savoir avant d'envoyer quelqu'un.\n\n"+
    "🔹 REZ-DE-CHAUSSÉE — l'infirmerie et les rendez-vous\n"+
    "• 9 h 00 → 13 h 00\n"+
    "• 15 h 00 → 17 h 30\n"+
    "• 17 h 30 → 20 h 00\n"+
    "(Ce sont les heures de l'affiche « Horaire infirmerie / Rooster ziekenboeg » posée au rez.)\n\n"+
    "🔹 2e ÉTAGE — le LAM\n"+
    "• 7 h 45 → 9 h 30\n"+
    "• 11 h 30 → 12 h 30\n"+
    "• 17 h 30 → 19 h 30\n\n"+
    "🔹 LE RAPPORT : 20 h 30.\n\n"+
    "🔹 LA NUIT — au 2e étage, de 21 h 30 à 22 h 30.\n"+
    "⚠️ IL N'Y A QU'UNE SEULE INFIRMIÈRE LA NUIT. Ça ne veut pas dire qu'on n'appelle pas : ça veut dire qu'on n'appelle pas pour deux choses séparément, et qu'on regroupe ce qui peut attendre le passage. Pour une vraie urgence, c'est le 112 — pas l'infirmerie.\n\n"+
    "À VÉRIFIER : ces heures ont été relevées le 08/08/2026 (l'affiche du rez pour le rez, l'équipe pour le 2e). Si elles changent, c'est ici qu'il faut les corriger — et pas seulement sur l'affiche du couloir."),
  centre("Ascenseurs en panne","Qui appeler si un ascenseur est en panne.","Société ELS (pour tous les ascenseurs).\nTél : 02 381 05 81.\n\n⚠️ ET LES PERSONNES QUI NE PEUVENT PAS PRENDRE L'ESCALIER : un ascenseur en panne, pour elles, ce n'est pas un désagrément, c'est un enfermement. Prévenir la coordination le temps de la panne — repas et médicaments montés, chambre plus bas si la panne dure."),
  /* Ajouté le 31/07/2026 : « au centre, quand il y a un problème de plaies, on doit
     appeler une infirmière extérieure ». C'était su de quelques-uns et écrit nulle part. */
  centre("Soins infirmiers extérieurs — qui appeler","Plaie, pansement, injection : la marche à suivre complète, de l'appel au passage.",
    "QUAND ON APPELLE\nPlaie qui ne se referme pas, ulcère, escarre, pansement à refaire régulièrement, injection, sonde, retour d'hospitalisation avec des soins prescrits : ça ne s'improvise pas au centre, on fait passer un·e infirmier·ère à domicile.\n\n"+
    "AVANT TOUT : LA PRESCRIPTION\nUn soin infirmier à domicile n'est remboursé QUE s'il est prescrit par un médecin — sauf la toilette d'une personne dépendante. Donc l'ordre est toujours le même : MÉDECIN d'abord, infirmière ensuite. Sans prescription, aucun service ne facturera correctement et personne ne sera remboursé.\n\n"+
    "QUI APPELER — les quatre numéros\n"+
    "• SOINS CHEZ SOI — 02 420 54 57. Le premier à essayer : demandes urgentes 24h/24, et ils prennent les gens AVEC TOUTES LES MUTUELLES ET SANS MUTUELLE. Ils prêtent aussi du matériel.\n"+
    "• CSD BRUXELLES — 02 537 98 66. Toute nouvelle demande par téléphone ; soins annoncés dans les 24 h maximum. 24h/24, 7j/7, service de nuit.\n"+
    "• ASD BRUXELLES (Croix Jaune et Blanche) — 02 647 03 66. Les 19 communes, avec un service de coordination si la situation demande plusieurs intervenants.\n"+
    "• INFIRMIERS DE RUE — 02 265 33 00 (rue Gheude, Anderlecht ; horaires de bureau, deux versions dans la fiche — appeler). PAS pour un pansement à domicile : c'est l'équipe pour quelqu'un qui REFUSE les soins, qui ne va à aucun rendez-vous, ou qui repart en rue avec une plaie.\n"+
    "Les quatre fiches sont dans Réseau → Médical, avec le bouton d'appel.\n\n"+
    "👉 À COMPLÉTER PAR L'ÉQUIPE : le service avec lequel le centre travaille habituellement, le numéro direct, le nom de la personne de contact, et s'il existe une convention ou un accord de facturation. Tant que cette ligne est vide, on repart de zéro à chaque fois.\n\n"+
    "QUI PAIE — À RÉGLER AVANT LE PASSAGE\n"+
    "• Mutuelle en ordre : remboursement INAMI, rien à avancer dans la plupart des cas.\n"+
    "• Pas de mutuelle, séjour irrégulier : AMU ou réquisitoire du CPAS. L'AMU ne se limite pas à l'urgence malgré son nom — elle couvre les soins préventifs ET curatifs attestés par un médecin, à domicile comme à l'hôpital. Mais le réquisitoire se demande AVANT le soin : après, il est trop tard et la facture reste au centre ou sur la personne.\n"+
    "• Le CPAS ne verse jamais d'argent à la personne : il paie le prestataire. Donc c'est nous qui faisons le lien entre les deux.\n"+
    "• Modèles prêts dans Mails et notes : « Demande de réquisitoire (CPAS) », « Aide Médicale Urgente (AMU) » et « Demande de passage infirmier à domicile ».\n\n"+
    "CE QU'ON PRÉPARE POUR L'APPEL\nCe qu'on voit (endroit, taille, aspect, odeur, écoulement), depuis quand, ce qui a déjà été fait, la douleur, le traitement en cours, s'il y a un diabète.\nEt ce qu'on oublie toujours de dire : le NUMÉRO DE CHAMBRE, l'ÉTAGE, s'il y a un ascenseur, à quelle heure la personne est là, et si elle parle français.\nLes trames sont dans Mails et notes : « Soin de plaie — ulcère de jambe », « Diabète — contrôle et traitement », « Amputation d'orteils — surveillance », « Mobilité — chaise roulante ou rollator ».\n\n"+
    "CE QU'ON PRÉPARE POUR LE PASSAGE\n• Prévenir la personne, et prévenir l'accueil qu'un soignant va monter.\n• Un endroit où faire le soin à l'abri des regards — un soin dans un couloir, ça ne se fait pas.\n• De quoi se laver les mains, une poubelle, un point d'appui ou un lit accessible.\n• La prescription et la carte d'identité ou l'attestation à portée de main.\n\n"+
    "APRÈS LE PASSAGE\nNoter dans le dossier : ce qui a été fait, par qui, et QUAND EST LE PROCHAIN PASSAGE. Le trou classique, c'est le deuxième rendez-vous que personne n'a noté. Si l'état se dégrade entre deux visites, on rappelle le service — on n'attend pas la date prévue.\n\n"+
    "LA NUIT ET LE WEEK-END\nSoins Chez Soi (02 420 54 57) et CSD (02 537 98 66) annoncent une permanence 24h/24. Pour un avis MÉDICAL hors heures d'ouverture : garde médicale au 1710 (soirs, week-ends, jours fériés).\n\n"+
    "URGENCE — on n'attend pas\nRougeur chaude qui s'étend, fièvre, plaie noire ou malodorante, douleur brutale, pied froid : avis médical LE JOUR MÊME. 112 si l'état général se dégrade.\n\n"+
    "Sources : soinschezsoi.be · csdbxl.be · bruxelles.aideetsoinsadomicile.be · infirmiersderue.be · Médecins du Monde, note d'interpellation AMU (juin 2022) · diogenes.brussels (l'AMU à Bruxelles) · partenamut.be (remboursement des soins infirmiers à domicile). Relevé le 01/08/2026."),

  // MAILS TYPES — squelettes à remplacer par vos vrais textes.
  mailtpl("Demande de réquisitoire (CPAS)","Modèle à personnaliser.",
    ["Réquisitoire","CPAS","Soins","Kiné","Dentiste","Lunettes","Médicaments"],
    "Demande de réquisitoire — [votre service]",
    "Madame, Monsieur,\n\nDans le cadre de notre accompagnement, nous sollicitons un réquisitoire pour [soins / médicaments / autre].\n\nBénéficiaire : [nom, date de naissance ou référence]\nMotif : [préciser — par exemple : séances de kinésithérapie, soins dentaires, lunettes]\n\nNous restons à disposition pour tout complément et vous remercions pour votre suivi.\n\nBien à vous,", "Social"),
  mailtpl("Aide Médicale Urgente (AMU)","Modèle à personnaliser.",["AMU","CPAS","Santé"],
    "Demande d'aide médicale urgente (AMU) — [votre service]",
    "Madame, Monsieur,\n\nDans le cadre de notre accompagnement, nous sollicitons l'ouverture d'une aide médicale urgente pour la personne suivante.\n\nBénéficiaire : [nom, date de naissance ou référence]\nAttestation médicale : [jointe / à suivre]\n\nMerci de nous indiquer la marche à suivre et les pièces nécessaires.\n\nBien à vous,", "Social"),
  mailtpl("Demande de carte médicale","Modèle à personnaliser.",["Carte médicale","CPAS","Santé"],
    "Demande de carte médicale — [votre service]",
    "Madame, Monsieur,\n\nDans le cadre de notre accompagnement, nous sollicitons une carte médicale pour la personne suivante.\n\nBénéficiaire : [nom, date de naissance ou référence]\nPièces jointes : [composition de ménage / preuve de ressources / autre]\n\nMerci de nous préciser la durée de validité et les modalités de renouvellement.\n\nBien à vous,", "Social"),
  /* ─── MODÈLES ÉCRITS PAR CLAUDE le 01/08/2026, à sa demande ────────────────────────
     Ils étaient manquants : une fiche « Démarches » ouvrait un vide. Ils sont RÉDIGÉS,
     pas devinés — mais ils n'ont été relus par personne du métier : chaque modèle porte
     donc une ligne dans le chantier pour être vérifié. Ce qui est entre [crochets] est à
     remplir ; ce qui est écrit est proposé. */
  mailtpl("Demande d'adresse de référence (CPAS)","Modèle écrit par Claude — à relire.",
    ["Adresse de référence","CPAS","Sans abri","Droits"],
    "Demande d'adresse de référence — [nom de la personne]",
    "Madame, Monsieur,\n\nNous accompagnons [prénom + initiale du nom], sans logement à ce jour, et sollicitons pour elle une adresse de référence auprès de votre centre.\n\nLa personne remplit les conditions : elle ne dispose pas des ressources lui permettant de se loger, elle n'est plus inscrite aux registres de la population, et elle introduit par la présente une demande d'aide auprès de votre CPAS.\n\nPersonne concernée : [nom, prénom, date de naissance]\nSituation : [hébergement d'urgence / rue / autre]\nContact : [votre service, téléphone, mail]\n\nCette adresse lui permettra de conserver ses droits — mutuelle, allocations, courrier officiel — et de recevoir les décisions qui la concernent.\n\nNous restons à disposition pour tout document complémentaire.\n\nCordialement,\n[votre nom, votre fonction, votre service]", "Social"),
  mailtpl("Demande de rendez-vous RIS (revenu d'intégration)","Modèle écrit par Claude — à relire.",
    ["RIS","CPAS","Revenu d'intégration","Rendez-vous"],
    "Demande de rendez-vous — revenu d'intégration — [nom de la personne]",
    "Madame, Monsieur,\n\nNous accompagnons [prénom + initiale du nom] et sollicitons un rendez-vous en vue d'une demande de revenu d'intégration sociale.\n\nPersonne concernée : [nom, prénom, date de naissance]\nAdresse ou adresse de référence : [à compléter]\nSituation : [sans ressources depuis…, fin de droits…, autre]\n\nPourriez-vous nous indiquer la date de rendez-vous ainsi que les documents à apporter ?\n\nNous accompagnerons la personne le jour du rendez-vous si cela peut aider.\n\nCordialement,\n[votre nom, votre fonction, votre service]", "Social"),
  mailtpl("Demande de domiciliation","Modèle écrit par Claude — à relire.",
    ["Domiciliation","Commune","CPAS","Adresse"],
    "Demande de domiciliation — [nom de la personne]",
    "Madame, Monsieur,\n\nNous accompagnons [prénom + initiale du nom] dans ses démarches et sollicitons son inscription à l'adresse suivante : [adresse complète].\n\nPersonne concernée : [nom, prénom, date de naissance]\nAccord du titulaire du logement : [joint / à suivre]\n\nPourriez-vous nous préciser la marche à suivre, les documents attendus et le délai d'enquête de résidence ?\n\nCordialement,\n[votre nom, votre fonction, votre service]", "Social"),
  mailtpl("Affiliation ou réaffiliation à la mutuelle","Modèle écrit par Claude — à relire.",
    ["Mutuelle","Santé","Affiliation","Droits"],
    "Affiliation à la mutuelle — [nom de la personne]",
    "Madame, Monsieur,\n\nNous accompagnons [prénom + initiale du nom] et souhaitons régulariser sa situation auprès de votre organisme.\n\nPersonne concernée : [nom, prénom, date de naissance, numéro de registre national si connu]\nSituation actuelle : [jamais affiliée / affiliation interrompue depuis…]\nAdresse ou adresse de référence : [à compléter]\n\nPourriez-vous nous indiquer les documents nécessaires et, le cas échéant, la possibilité d'un rendez-vous ?\n\nCordialement,\n[votre nom, votre fonction, votre service]", "Médical"),
  mailtpl("Handicap — demande de reconnaissance (DGPH)","Modèle écrit par Claude — à relire.",
    ["Handicap","DGPH","Reconnaissance","Allocation"],
    "Accompagnement d'une demande de reconnaissance du handicap — [nom de la personne]",
    "Madame, Monsieur,\n\nNous accompagnons [prénom + initiale du nom] dans une demande de reconnaissance du handicap.\n\nPersonne concernée : [nom, prénom, date de naissance]\nSituation : [difficultés rencontrées, retentissement sur la vie quotidienne]\nMédecin traitant : [nom et coordonnées, s'il y en a un]\n\nPourriez-vous nous confirmer la procédure applicable, les pièces médicales attendues et le délai d'examen du dossier ?\n\nLa personne est hébergée dans notre centre et ne dispose pas d'un accès stable au courrier : nous vous remercions d'adresser les documents à [adresse ou adresse de référence].\n\nCordialement,\n[votre nom, votre fonction, votre service]", "Médical"),
  mailtpl("Handicap — Service PHARE, aide individuelle","Modèle écrit par Claude — à relire.",
    ["Handicap","PHARE","Matériel","Aide individuelle"],
    "Demande d'information — aide individuelle — [nom de la personne]",
    "Madame, Monsieur,\n\nNous accompagnons [prénom + initiale du nom], reconnue [ou : en cours de reconnaissance], et souhaitons introduire une demande d'aide individuelle pour [matériel, aménagement, accompagnement].\n\nPersonne concernée : [nom, prénom, date de naissance]\nBesoin : [décrire simplement : fauteuil, aide auditive, aménagement, accompagnement…]\n\nPourriez-vous nous indiquer les conditions d'accès, les documents à joindre et le délai de traitement ?\n\nCordialement,\n[votre nom, votre fonction, votre service]", "Social"),
  mailtpl("Prise de contact — avocat droit des étrangers","Modèle à personnaliser.",["Avocat","Juridique","Séjour"],
    "Demande de consultation — droit des étrangers",
    "Maître,\n\nDans le cadre de notre accompagnement, nous vous sollicitons pour une personne dont la situation de séjour nécessite un avis juridique.\n\nSituation en bref : [statut actuel / procédure en cours / échéance éventuelle]\nDocuments disponibles : [lister]\n\nSeriez-vous disponible pour une consultation ? Merci de nous indiquer vos disponibilités et modalités.\n\nBien à vous,", "Social"),

  /* ── HANDICAP (31/07/2026) : trois modèles pour que la démarche parte le jour même. ── */
  mailtpl("Demande de passage infirmier à domicile","Modèle à personnaliser.",["Plaies","Infirmière","Santé","Domicile"],
    "Demande de passage infirmier — [votre service]",
    "Madame, Monsieur,\n\nNous accueillons dans notre centre une personne qui nécessite des soins infirmiers que nous ne pouvons pas assurer sur place, et nous souhaitons organiser un passage à domicile.\n\nPersonne concernée : [nom, date de naissance ou référence]\nLieu : [adresse du centre], chambre [n°], étage [n°] — [ascenseur / escaliers]\nSoins demandés : [pansement / soin de plaie / injection / autre], fréquence estimée : [quotidienne / x par semaine]\nSituation en bref : [depuis quand, ce qui a déjà été fait, traitement en cours, diabète oui/non]\nPrescription médicale : [jointe / à suivre / à obtenir]\nCouverture : [mutuelle en ordre / AMU ou réquisitoire CPAS en cours / à clarifier]\n\nMerci de nous indiquer vos disponibilités et les documents qu'il vous faut avant le premier passage.\n\nBien à vous,", "Médical"),
  mailtpl("Handicap — demande d'information au Service PHARE","Modèle à personnaliser (matériel, aménagement, accompagnement).",["Handicap","PHARE","Matériel","Aides individuelles"],
    "Demande d'information — aides individuelles / accompagnement",
    "Madame, Monsieur,\n\nNous accompagnons une personne en situation de handicap domiciliée en Région bruxelloise et souhaitons savoir ce qui peut être introduit auprès de votre service.\n\nPersonne concernée : [nom, date de naissance ou référence]\nSituation : [reconnaissance DGPH obtenue le ... / demande en cours / pas encore introduite]\nBesoin : [matériel — préciser / aménagement / service d'accompagnement / autre]\nCe qui a déjà été fait : [prescription médicale, devis, contacts pris]\n\nPouvez-vous nous indiquer la marche à suivre, les pièces nécessaires et les délais ?\n\nBien à vous,", "Social"),
  notetpl("Handicap — ce qu'on a repéré à l'accueil",
    "Trame pour le dossier social. Le diagnostic reste au dossier ; l'équipe, elle, reçoit le besoin.",
    ["Handicap","Accueil","Droits"],
    "Question posée à l'entretien d'entrée le [date].\n\nCE QUE LA PERSONNE DIT AVOIR : [reconnaissance DGPH / carte de stationnement / European Disability Card / allocation ARR-AI / APA / invalidité mutuelle / rien / ne sait pas].\nDocuments vus : [lesquels] — copie au dossier avec son accord : [oui/non].\nNombre de points (si la décision DGPH est là) : [ ].\n\nCE QUI N'EST PAS ENCORE ACTIVÉ : [carte de stationnement / European Disability Card / tarif social énergie et internet / abonnement STIB / TaxiBus / aides matérielles PHARE / aide à la mobilité Iriscare].\nDémarche lancée : [laquelle, à quelle date, par qui] — prochaine échéance : [quand].\n\nCE QUE L'ÉQUIPE DOIT SAVOIR (le besoin, pas le diagnostic) : [chambre au rez ou près de l'ascenseur / ne peut pas porter / se déplace en chaise ou avec un rollator / a besoin d'un accompagnement pour ses rendez-vous / interprète en langue des signes à prévoir / documents à lire à voix haute / autre].\n\nAccord de la personne pour transmettre ces éléments à l'équipe : [oui/non].",
    "Social"),

  // ---- NOTES TYPES (brouillons inventés, à corriger par l'équipe soignante) ----
  notetpl("Soin de plaie — ulcère de jambe",
    "Brouillon inventé — à corriger par l'équipe.",
    ["Plaies"],
    "Localisation : jambe [gauche/droite], [face externe/interne], [tiers inférieur/moyen].\nType : ulcère veineux, présent depuis [durée].\nAspect : [taille] cm environ, fond [fibrineux/bourgeonnant/nécrotique], exsudat [faible/modéré/abondant], odeur [absente/présente].\nPourtour : peau [sèche/rouge/macérée], [pas de chaleur/chaleur], [pas d'œdème/œdème].\nDouleur : [absente/à la réfection/permanente], cotée [légère/modérée/forte].\nSoin fait : nettoyage [sérum physiologique/eau et savon], séchage, pansement [type], bande de maintien [avec/sans compression].\nSuite : réfection dans [délai]. Si l'exsudat augmente ou apparition d'une rougeur chaude : avis médical.",
    "Médical"),
  notetpl("Diabète — contrôle et traitement",
    "Brouillon inventé — à corriger par l'équipe.",
    [],
    "Glycémie [avant/après] le repas : valeur notée au dossier.\nTraitement : [injection/comprimé] selon la prescription, site d'injection changé.\nRepas pris : [oui/non]. Collation donnée : [oui/non].\nSignes observés : sueurs, tremblements, somnolence, soif importante — [aucun / préciser].\nPieds : contrôle visuel fait — [peau intacte / rougeur / plaie / ongles à surveiller].\nSuite : prochain contrôle [quand]. En cas de malaise : resucrage et appel médical.",
    "Médical"),
  notetpl("Mobilité — chaise roulante ou rollator",
    "Brouillon inventé — à corriger par l'équipe.",
    [],
    "Aide utilisée : [chaise roulante/rollator], état du matériel vérifié.\nTransferts : [autonome / partiellement / avec une personne en soutien].\nPoints d'appui (sacrum, talons, ischions) : [peau intacte / rougeur qui blanchit / rougeur persistante].\nInstallation : changement de position proposé, coussin de décharge [en place/absent].\nSuite : recontrôle des points d'appui au prochain passage.",
    "Médical"),
  notetpl("Amputation d'orteils — surveillance",
    "Brouillon inventé — à corriger par l'équipe.",
    ["Plaies"],
    "Localisation : pied [gauche/droit], orteils amputés — cicatrice [fermée/en cours].\nAspect : [pas d'écoulement/écoulement], [pas de rougeur/rougeur], extrémités [tièdes/froides].\nChaussage : chaussure adaptée [portée/non portée].\nSoin fait : lavage doux, séchage soigneux entre les orteils restants, pansement sec.\nSuite : surveillance quotidienne. Toute rougeur, chaleur, odeur ou plaie nouvelle = avis médical le jour même.",
    "Médical"),

  urgent(d("addictions","M.A.S.S. de Bruxelles","Bruxelles-Ville",
    "Maison d'Accueil Socio-Sanitaire : accueil bas seuil, soins et accompagnement social pour les usagers de drogues. Dispositif « TREMPLIN ».",
    "Usagers de drogues les plus marginalisés, éloignés des réseaux d'aide classiques","02 505 32 90","contact@mass-bxl.be","mass-bxl.be",
    "Rue de Woeringen 16-18, 1000 Bruxelles","",
    "« Bas seuil » : on peut y venir sans être demandeur de sevrage et sans conditions préalables. Vérifier les horaires d'accueil par téléphone avant d'orienter quelqu'un.")),

  m("Violences sexuelles","Ce qu'on fait, et surtout ce qu'on ne fait pas, quand une personne se confie.",
    "LE RÉFLEXE : le CPVS (Centre de Prise en charge des Violences Sexuelles)\n" +
    "Rue Haute 320, 1000 Bruxelles — 02 535 45 42 — CPVS@stpierre-bru.be — ouvert 24h/24, 7j/7.\n\n" +
    "SELON LE DÉLAI\n" +
    "• Moins de 72 h : on peut s'y présenter directement, appeler ou écrire. Prise en charge immédiate — soins, examen médico-légal, soutien psychologique.\n" +
    "• Entre 72 h et un mois : prendre rendez-vous par téléphone ou par mail ; le centre évalue ce qui reste possible.\n" +
    "• Au-delà : le centre oriente vers un suivi adapté.\n\n" +
    "CE QUI AIDE, SI LA PERSONNE EST D'ACCORD\n" +
    "• Éviter de se laver et de changer de vêtements avant l'examen, garder les vêtements dans un sac en papier.\n" +
    "• Y aller le plus tôt possible : certaines traces disparaissent vite.\n\n" +
    "⚠️ PORTER PLAINTE N'EST PAS OBLIGATOIRE pour être pris en charge. La personne peut être soignée et accompagnée sans déposer plainte, et décider plus tard. Si elle le souhaite, un inspecteur spécialement formé se déplace au centre pour recueillir sa déclaration.\n\n" +
    "NOTRE RÔLE\n" +
    "• Accueillir la parole, sans interroger : ne pas mener l'entretien, ne pas demander de détails.\n" +
    "• Ne pas faire répéter le récit, ni le faire raconter à plusieurs collègues.\n" +
    "• Noter les mots exacts de la personne, avec la date et l'heure.\n" +
    "• Proposer l'accompagnement physique au CPVS — beaucoup n'y vont pas seules.\n" +
    "• Ne rien promettre qu'on ne maîtrise pas.\n\n" +
    "AUTRES APPUIS\n" +
    "• SOS Viol — écoute et accompagnement : 0800 98 100.\n" +
    "• Écoute violences conjugales : 0800 30 030.\n\n" +
    "Repère d'orientation, pas un avis médical ni juridique. Source : CPVS / CHU Saint-Pierre."),

  d("urgences","CPVS — Violences sexuelles (24h/24)","Bruxelles-Ville",
    "Centre de Prise en charge des Violences Sexuelles : soins, examen médico-légal, soutien psychologique et dépôt de plainte sur place si la personne le souhaite.",
    "Toute victime de violences sexuelles, adultes et enfants","02 535 45 42","CPVS@stpierre-bru.be","320ruehaute.be",
    "Rue Haute 320, 1000 Bruxelles","Ouvert 24h/24, 7j/7",
    "Moins de 72 h : venir directement. Entre 72 h et un mois : prendre rendez-vous. Porter plainte n'est pas obligatoire pour être pris en charge."),
  d("social","Garance asbl","Bruxelles-Ville",
    "Prévention des violences faites aux femmes et aux personnes vulnérabilisées : stages d'autodéfense féministe et de défense verbale, formations pour professionnels.",
    "Femmes (cis et trans), personnes non binaires, professionnels","02 216 61 16","info@garance.be","garance.be",
    "Rue Royale 55, 1000 Bruxelles","",
    "Aucune aptitude sportive n'est nécessaire. Garance forme aussi les équipes de terrain : appeler pour organiser une séance pour l'équipe ou pour les personnes hébergées."),

  /* Ajouté le 01/08/2026 : c'est de là que viennent les mots qu'on emploie, et c'est
     à quinze minutes du centre. (La fiche DoucheFLUX, elle, existait déjà : elle a été
     complétée sur place plutôt que dupliquée.) */
  d("social","Syndicat des immenses","Anderlecht",
    "Groupe de pression et d'action des personnes sans chez-soi ou mal logées — pas un groupe de parole. Porte des revendications, intervient dans l'espace public, et a inventé le vocabulaire (« immense », « sans-chez-soirisme ») que reprend une partie du secteur.",
    "Personnes concernées, professionnels, tout public","","syndicatdesimmenses@gmail.com","syndicatdesimmenses.be",
    "Chez DoucheFLUX, rue des Vétérinaires 84, 1070 Anderlecht","Réunion tous les LUNDIS de 11h à 13h30",
    "Né en mars 2019 du groupe « Les précaires en colère », après la première assemblée ouverte de Droit à un toit / Recht op een dak. Fondé par Laurent d'Ursel, qui a aussi créé DoucheFLUX.\nCE QU'ON PEUT EN FAIRE : y envoyer une personne qui veut agir plutôt que subir — les réunions du lundi sont ouvertes. Et s'en servir pour l'équipe : le « Thésaurus de l'immensité » (200 mots, La Lettre volée, 2024) et la brochure « 17 mots pour en finir avec le sans-chez-soirisme » (ARC) sont des outils de formation.\nIls organisent l'Immense Festival et des universités d'été de l'immensité.\nSources : syndicatdesimmenses.be · arc-culture.be · maisonmedicale.org · reseaunomade.be. Relevé le 01/08/2026."),

  // ===== Centres de planning familial de Bruxelles (monplanningfamilial.be) =====
  d("planning","Planning familial et Sexologie d'Ixelles","Ixelles",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 646 42 73","","monplanningfamilial.be",
    "Rue du Vivier 89-93, 1050 Ixelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Saint-Gilles","Saint-Gilles",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 537 11 08","","monplanningfamilial.be",
    "Avenue du Parc 89, 1060 Saint-Gilles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Plan F","Saint-Josse-ten-Noode",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 230 04 62","","monplanningfamilial.be",
    "Rue des Guildes 22, 1210 Saint-Josse-ten-Noode","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning Marconi","Forest",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 345 10 25","","monplanningfamilial.be",
    "Rue Marconi 85, 1190 Forest","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","320 Rue Haute","Bruxelles-Ville",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 535 47 14","","monplanningfamilial.be",
    "Rue Haute 320, 1000 Bruxelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","La Senne","Bruxelles-Ville",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 548 98 18","","monplanningfamilial.be",
    "Boulevard de l'Abattoir 27, 1000 Bruxelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Saint-Josse","Saint-Josse-ten-Noode",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 217 44 50","","monplanningfamilial.be",
    "Place Quetelet 4, 1210 Saint-Josse-ten-Noode","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Jette","Jette",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 426 06 27","","monplanningfamilial.be",
    "Rue Léon Théodor 108, 1090 Jette","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Groupe Santé Josaphat","Schaerbeek",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 241 76 71","","monplanningfamilial.be",
    "Rue Royale Sainte-Marie 70, 1030 Schaerbeek","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Aimer à l'ULB — Erasme","Anderlecht",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 555 49 45","","monplanningfamilial.be",
    "Route de Lennik 806, 1070 Anderlecht","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Woluwe-Saint-Pierre","Woluwe-Saint-Pierre",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 762 00 67","","monplanningfamilial.be",
    "Rue Jean Deraeck 14, 1150 Woluwe-Saint-Pierre","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Aimer Jeunes","Bruxelles-Ville",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 511 32 20","","monplanningfamilial.be",
    "Rue Saint-Jean Népomucène 28, 1000 Bruxelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning Midi","Anderlecht",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 511 38 38","","monplanningfamilial.be",
    "Rue du Chimiste 34-36 bte 5, 1070 Anderlecht","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial d'Evere","Evere",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 216 20 04","","monplanningfamilial.be",
    "Rue Adolphe De Brandt 70, 1140 Evere","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Laeken","Bruxelles-Ville",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 325 46 40","","monplanningfamilial.be",
    "Boulevard Emile Bockstael 91, 1020 Bruxelles (Laeken)","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Free Clinic","Ixelles",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 512 13 14","","monplanningfamilial.be",
    "Chaussée de Wavre 154A, 1050 Ixelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial d'Auderghem","Auderghem",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 660 75 06","","monplanningfamilial.be",
    "Rue de la Stratégie 45, 1160 Auderghem","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial d'Uccle","Uccle",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 376 10 00","","monplanningfamilial.be",
    "Rue de Stalle 24, 1180 Uccle","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Woman'Dō","Ixelles",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","0471 22 59 36","","monplanningfamilial.be",
    "Chaussée de Waterloo 412F, 1050 Ixelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Les Bureaux de Quartiers","Schaerbeek",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 733 43 95","","monplanningfamilial.be",
    "Rue du Noyer 344, 1030 Schaerbeek","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Aimer à l'ULB — Solbosch","Ixelles",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 650 31 31","","monplanningfamilial.be",
    "Avenue Jeanne 38, 1050 Ixelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Forest","Forest",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 343 74 04","","monplanningfamilial.be",
    "Place Saint-Denis 18, 1190 Forest","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning des Marolles","Bruxelles-Ville",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 511 29 90","","monplanningfamilial.be",
    "Rue de la Roue 21, 1000 Bruxelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning familial de Boitsfort","Watermael-Boitsfort",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 673 39 34","","monplanningfamilial.be",
    "Avenue Léopold Wiener 64, 1170 Watermael-Boitsfort","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Collectif Contraception Santé des Femmes","Etterbeek",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 736 13 14","","monplanningfamilial.be",
    "Avenue des Celtes 50, 1040 Etterbeek","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Rosa","Bruxelles-Ville",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 546 14 33","","monplanningfamilial.be",
    "Rue du Midi 118-120, 1000 Bruxelles","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","CCFS","Woluwe-Saint-Lambert",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 736 41 50","","monplanningfamilial.be",
    "Avenue du Prince Héritier 192, 1200 Woluwe-Saint-Lambert","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning Séverine","Anderlecht",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 524 33 14","","monplanningfamilial.be",
    "Avenue Raymond Vander Bruggen 84, 1070 Anderlecht","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Faculté d'Aimer","Woluwe-Saint-Lambert",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 764 20 63","","monplanningfamilial.be",
    "Place Carnoy 16, 1200 Woluwe-Saint-Lambert","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),
  d("planning","Planning Leman","Molenbeek-Saint-Jean",
    "Consultations médicale, sociale, juridique, psychologique et sexologique. Contraception, test de grossesse, dépistage IST, IVG selon les centres.",
    "Tout public, y compris mineurs sans accord parental","02 230 10 30","","monplanningfamilial.be",
    "Boulevard Léopold II 184D, 1080 Molenbeek-Saint-Jean","",
    "Accueil possible sans rendez-vous pour une information ; consultation sur rendez-vous.\nUn ou une mineure n'a pas besoin de l'accord de ses parents pour venir.\nL'argent ne doit pas être un frein : les tarifs s'adaptent à la situation. Seules les consultations psychologiques sont payantes, et elles sont ajustées aux revenus.\n\n⚠ TOUS LES PLANNINGS NE PRATIQUENT PAS L'IVG. Sur les 42 centres de la fédération laïque, 21 seulement la pratiquent. C'est donc à VÉRIFIER AVANT d'envoyer quelqu'un — un aller-retour pour rien, dans ce moment-là, coûte des jours.\nOù vérifier : la carte de monplanningfamilial.be, ou un appel au centre.\nConfirmés à Bruxelles au 08/08/2026 : Marconi (Forest), Séverine (Anderlecht), Aimer à l'ULB - Erasme, Plan F. ⚠ Cette liste est INCOMPLÈTE : qu'un centre n'y figure pas ne veut PAS dire qu'il ne pratique pas l'IVG."),

  d("urgences","Bruss'help – orientation hébergement","Régional / Toutes communes",
    "Point d'entrée régional : trouve une place d'hébergement d'urgence et coordonne quand les centres sont pleins.",
    "Tout public","02 880 86 89","","brusshelp.org","","",
    "À appeler en premier quand on cherche une place le soir même."),
  d("urgences","Pierre d'Angle – asile de nuit","Bruxelles-Ville",
    "Asile de nuit : accueil inconditionnel, anonyme et gratuit (48 lits).",
    "Adultes","02 513 38 01","","pierredangle.be","Rue Terre-Neuve 153, 1000 Bruxelles","Tous les jours 20h – 8h",
    "Priorité aux nouvelles demandes en début de soirée."),
  d("urgences","Centre d'accueil d'urgence Ariane","Forest",
    "Premier hébergement d'urgence de courte durée avant réorientation. Accueil 24h/24.",
    "Adultes","02 346 66 60","","","Avenue du Pont de Luttre 132, 1190 Forest","24h/24 · 7j/7",
    "Contacter la permanence téléphonique avant de s'y présenter."),

  // ===== Médecine pour le Peuple — les 2 maisons médicales bruxelloises (medecine-pour-le-peuple.be)
  //       Le réseau en compte 11 en Belgique ; les 9 autres sont hors Bruxelles.
  //       ⚠ CELLE DE MOLENBEEK N'EST PAS ICI : elle existait en double, et les deux
  //       fiches ont été fusionnées le 07/08/2026 dans celle du haut, qui porte l'avis
  //       de l'équipe (reco). Ne pas la recréer ici — vérifier plus haut d'abord. =====
  d("medical","Médecine pour le Peuple — Schaerbeek","Schaerbeek",
    "Maison médicale multidisciplinaire au forfait : médecine générale, soins infirmiers, kiné selon les centres.",
    "Tout public, sur inscription","02 245 98 50","schaarbeek@gvhv.be","medecine-pour-le-peuple.be",
    "Chaussée de Haecht 276, 1030 Schaerbeek","Lun–Mer 8h30-12h30 et 13h30-18h30 · Jeu 8h30-11h et 13h30-18h30 · Ven 8h30-12h30 et 13h30-18h30",
    "Système du forfait : le patient inscrit ne paie rien à la consultation. Il faut d'abord s'inscrire auprès de la maison médicale.\nPour une personne sans mutuelle, appeler avant : les conditions d'inscription se vérifient au cas par cas."),

  // ===== Maisons d'accueil agréées COCOF — source : brochure AMA « 15 maisons d'accueil » =====
  // Séjour accompagné (≠ hébergement d'urgence). Coordonnées relevées telles quelles.
  d("maisons","Plateforme Informative de la Strada (PILS)","Régional / Toutes communes",
    "Outil réservé aux travailleurs sociaux : suit en temps réel les places disponibles dans les centres d'hébergement bruxellois. Inscription nécessaire.",
    "Travailleurs sociaux","02 880 86 89","info@brusshelp.org","lastradapils.brussels","","",
    "Lien corrigé le 30/07/2026 : l'ancienne adresse lstb.be ne répond plus, la plateforme est passée sur lastradapils.brussels.\nÀ faire une fois, puis on gagne un temps fou : plus besoin d'appeler chaque maison pour savoir s'il reste de la place.\nSi la plateforme ne répond pas : la Cellule d'orientation de Bruss'help (02 880 86 89) tient les places à jour pour la grande majorité des maisons d'accueil agréées."),

  // --- Pour tous ---
  /* LE RÉSEAU NÉERLANDOPHONE. Ajouté le 30/07/2026, vérifié sur caw.be — les 15 maisons
     ci-dessous sont agréées COCOF, donc francophones : sans ça, on ne pensait jamais à
     l'autre moitié du réseau. L'étiquette Néerlandophone permet de les isoler, et de les
     écarter le reste du temps : la quasi-totalité des personnes hébergées ne parle pas
     néerlandais. */
  tags(d("maisons","Opvanghuis Albatros (CAW Brussel)","Bruxelles-Ville",
    "La maison d'accueil du réseau néerlandophone bruxellois. Accueil d'urgence et à moyen terme.",
    "Hommes seuls · femmes seules, dont victimes de violences familiales · couples avec ou sans enfants · parents seuls avec enfants",
    "02 486 45 03","albatros@cawbrussel.be","caw.be/locaties/onthaalhuis-albatros",
    "Washuisstraat 40, 1000 Bruxelles","",
    "MAISON NÉERLANDOPHONE : l'accompagnement se fait en néerlandais. À ne proposer que si la personne le parle, ou si aucune place francophone n'est libre — auquel cas prévenir du décalage de langue.\nL'accompagnement porte sur l'administratif, le logement, les finances, l'emploi et la santé.\nSource : caw.be, relevé le 30/07/2026."),
    ["Néerlandophone","Hommes","Femmes","Couples","Avec enfants","Violences conjugales"]),

  tags(d("maisons","CAW Huis Brussel — la porte d'entrée néerlandophone","Bruxelles-Ville",
    "Le guichet du réseau d'aide néerlandophone à Bruxelles : c'est par là qu'on demande un hébergement, et pas seulement.",
    "Tout public — accompagnement en néerlandais",
    "0800 13 500","onthaal@cawbrussel.be","caw.be/locaties/caw-huis-brussel-centrum",
    "Antwerpselaan 34, 1000 Bruxelles","Du lundi au vendredi sur rendez-vous · joignable par téléphone en semaine de 9 h à 17 h",
    "CE QU'ON PEUT Y DEMANDER : logement et hébergement, aide aux victimes, migration, gestion administrative et financière, justice et détention, relations et famille, jeunes, aide en situation de crise.\nLe 0800 13 500 est gratuit.\nÀ RETENIR : c'est l'équivalent néerlandophone de nos portes d'entrée habituelles. Utile quand une personne parle néerlandais, ou quand tout est complet du côté francophone.\nSource : caw.be, relevé le 30/07/2026."),
    ["Néerlandophone","Sans rendez-vous"]),

  d("maisons","Les Trois Pommiers","Etterbeek",
    "Maison d'accueil, 40 places, chambres familiales.",
    "Femmes enceintes · adultes avec enfants","02 649 73 01","3pommiers.serv.soc@scarlet.be","lestroispommiers.be",
    "Avenue des Casernes 41, 1040 Bruxelles","Présence 24h/24 · permanence téléphonique 8h30–17h30",
    "Entrée : entretien préalable.\nRestrictions : pour les femmes enceintes et les adultes avec enfants.\nPrix de journée : 13,32 €/adulte · 8,11 €/enfant.\nServices : accompagnement social et éducatif, ateliers, activités enfants, groupe de paroles, suivi post-hébergement."),
  d("maisons","L'Ilot — Le 160 (accueil d'urgence)","Saint-Gilles",
    "Maison d'accueil d'urgence, 22 places, chambres collectives et familiales. Repas compris.",
    "Femmes · familles · couples","02 538 59 09","le160@ilot.be","ilot.be",
    "Chaussée de Charleroi 160, 1060 Bruxelles","Accueil 24h/24 si place disponible",
    "Entrée : accueil 24h/24 (si place).\nRestrictions : pas d'homme seul, ni de mineur non accompagné.\nPrix de journée : max 23,17 €/adulte · 13,90 €/enfant.\nServices : accompagnement social et éducatif, activités enfants, groupe de paroles."),
  d("maisons","Source — La Rive","Bruxelles-Ville",
    "Maison d'accueil, 34 places, chambres collectives, familiales et individuelles. Repas compris.",
    "Tout public — aucune restriction","02 512 72 04","source@misc.irisnet.be","",
    "Rue de la Senne 78, 1000 Bruxelles","Présence 24h/24",
    "Entrée : entretien préalable.\nRestrictions : aucune.\nPrix de journée : 23,17 €/adulte · 13,90 €/enfant.\nServices : accompagnement social, éducatif et psychologique, ateliers, activités enfants, suivi post-hébergement."),

  // --- Pour hommes seuls ---
  d("maisons","@ Home 18-24 (Petits Riens)","Forest",
    "Maison d'accueil pour jeunes hommes, 15 places, chambres individuelles. Repas compris.",
    "Hommes seuls de 18 à 24 ans","02 538 64 77","stievenart@petitsriens.be","petitsriens.be",
    "Avenue du Roi 190, 1190 Bruxelles","Présence 24h/24 · permanence téléphonique 7h–21h",
    "Entrée : entretien préalable.\nRestrictions : âge entre 18 et 24 ans, respecter le règlement (projet d'activation, reprise d'études ou formation).\nPrix de journée : 15 €/adulte.\nServices : accompagnement social et éducatif, groupe de paroles, suivi post-hébergement."),
  d("maisons","Foyer Georges Motte (Armée du Salut)","Bruxelles-Ville",
    "Maison d'accueil, 75 places, chambres collectives et individuelles. Repas compris.",
    "Hommes majeurs uniquement","02 217 61 36","foyergmotte.direction@hotmail.com","",
    "Boulevard d'Ypres 24, 1000 Bruxelles","Accueil 24h/24 si place disponible · présence 24h/24",
    "Entrée : entretien préalable, puis accueil 24h/24 si place.\nRestrictions : hommes majeurs uniquement.\nPrix de journée : max 22,50 €/adulte.\nServices : accompagnement social et éducatif, ateliers collectifs."),
  d("maisons","Home Baudouin (Œuvre de l'Hospitalité)","Bruxelles-Ville",
    "Maison d'accueil, 69 places, chambres collectives. Repas compris.",
    "Hommes seuls","02 512 64 95","educateurs@homebaudouin.be","",
    "Rue de la Violette 24, 1000 Bruxelles","Accueil 24h/24 si place disponible · présence 24h/24",
    "Entrée : accueil 24h/24 (si place).\nRestrictions : difficulté d'accès si mobilité réduite (escaliers).\nPrix de journée : 23,17 €/adulte.\nServices : accompagnement social et éducatif, groupe de paroles, suivi post-hébergement."),
  d("maisons","L'Ilot — Le 38","Bruxelles-Ville",
    "Maison d'accueil, 22 places, chambres collectives et individuelles.",
    "Hommes seuls","02 217 68 44","le38@ilot.be","ilot.be",
    "Rue Locquenghien 38, 1000 Bruxelles","Accueil 24h/24 si place disponible · présence 24h/24",
    "Entrée : entretien préalable.\nRestrictions : respecter le mode de vie (règlement d'ordre intérieur).\nPrix de journée : max 23,17 €/adulte.\nServices : accompagnement social, éducatif et psychologique, groupe de paroles, suivi post-hébergement."),
  d("maisons","Maison d'accueil des Petits Riens","Ixelles",
    "Maison d'accueil, 120 places, chambres collectives et individuelles. Repas compris.",
    "Hommes seuls","02 541 13 96","bertrand.desplanque@petitsriens.be","petitsriens.be",
    "Rue du Prévôt 30/32, 1050 Bruxelles","Présence 24h/24",
    "Entrée : entretien préalable.\nRestrictions : respecter le règlement (dont le projet d'activation).\nPrix de journée : 15 €/adulte.\nServices : accompagnement social et éducatif, ateliers, groupe de paroles, suivi post-hébergement."),

  // --- Pour femmes seules ---
  d("maisons","Accueil Montfort","Jette",
    "Maison d'accueil, 34 places, chambres individuelles + flats semi-autonomes. Repas compris.",
    "Femmes seules sans enfants","02 424 17 53","accueil@amontfort.be","",
    "Rue Église St-Pierre 12/18, 1090 Bruxelles","Présence 24h/24",
    "Autre numéro : 02 426 87 12.\nEntrée : entretien préalable.\nRestrictions : femmes seules sans enfants. Pour les flats : avoir séjourné dans la maison d'accueil.\nPrix de journée : 15 €/adulte (maison) · 13,50 €/adulte (flats).\nServices : accompagnement social, éducatif et psychologique, groupe de paroles, suivi post-hébergement."),

  // --- Pour femmes accompagnées ou non d'enfants ---
  d("maisons","Centre de prévention des violences conjugales et familiales","Bruxelles-Ville",
    "Maison d'accueil, 34 places, chambres collectives et familiales.",
    "Femmes victimes de violences conjugales ou familiales, avec ou sans enfants","02 539 27 44","violences.familiales@misc.irisnet.be","cpvcf.org",
    "Boulevard de l'Abattoir 28, 1000 Bruxelles","Permanence téléphonique 8h–21h (10h–17h le week-end)",
    "Entrée : entretien préalable.\nRestrictions : uniquement pour les victimes de violences conjugales ou familiales.\nPrix de journée : 13 €/adulte · 8 €/enfant.\nServices : accompagnement social, éducatif et psychologique, ateliers, activités enfants, groupe de paroles, suivi post-hébergement."),
  d("maisons","Chèvrefeuille","Ixelles",
    "Maison d'accueil, 40 places, chambres familiales et appartements. Repas compris.",
    "Femmes avec ou sans enfants (enfants de 6 ans maximum)","02 648 17 78","direction@chevrefeuille.be","",
    "Rue Lesbroussart 104-106, 1050 Bruxelles","Accueil 24h/24 si place disponible · présence 24h/24",
    "Entrée : entretien préalable.\nRestrictions : pas d'enfant de plus de 6 ans. Pour les appartements : avoir séjourné dans la maison d'accueil.\nPrix de journée : 21 €/adulte · 13 €/enfant.\nServices : accompagnement social et éducatif, activités enfants, ateliers, suivi post-hébergement."),
  d("maisons","Home Victor Du Pré (Œuvre de l'Hospitalité)","Bruxelles-Ville",
    "Maison d'accueil, 74 places, chambres individuelles et familiales. Repas compris.",
    "Femmes avec ou sans enfants","02 512 42 37","hdp-direction@homedupre.be","",
    "Rue des Charpentiers 5, 1000 Bruxelles","Accueil 24h/24 si place disponible · présence 24h/24",
    "Entrée : entretien préalable.\nRestrictions : pas de garçon de plus de 11 ans ; pas de personnes dépendantes (alcool, toxicomanie…).\nPrix de journée : 23,17 €/adulte · 13,90 €/enfant.\nServices : accompagnement social, éducatif et psychologique, ateliers, activités enfants, groupe de paroles."),
  d("maisons","La Maison Rue Verte","Saint-Josse-ten-Noode",
    "Maison d'accueil, 30 places, studios individuels et appartements. Crèche sur place.",
    "Femmes avec ou sans enfants — priorité aux victimes de violences intrafamiliales","02 223 56 47","lamaisonrueverte@scarlet.be","",
    "Rue Verte 42, 1210 Bruxelles","Permanence téléphonique 8h–18h en semaine",
    "Entrée : entretien préalable.\nRestrictions : priorité pour les victimes de violences intrafamiliales.\nPrix de journée : 10 €/adulte · 7 €/enfant — le moins cher du réseau.\nServices : accompagnement social, éducatif et psychologique, ateliers, activités enfants, groupe de paroles, suivi post-hébergement, crèche."),
  d("maisons","Le Chant d'Oiseau","Woluwe-Saint-Pierre",
    "Maison d'accueil, 24 places, chambres individuelles et familiales.",
    "Femmes avec ou sans enfants","02 660 36 61","info@vgz-co.be","",
    "Avenue du Chant d'Oiseau 42, 1150 Bruxelles","Présence 24h/24 · permanence téléphonique 8h–18h",
    "Entrée : entretien préalable.\nRestrictions : pas de garçon de plus de 12 ans.\nPrix de journée : 13,32 €/adulte · 8,11 €/enfant.\nServices : accompagnement social et éducatif, activités enfants, groupe de paroles, suivi post-hébergement."),
  d("maisons","Maison de la Mère et de l'Enfant (Armée du Salut)","Uccle",
    "Maison d'accueil, 40 places, chambres individuelles. Repas compris.",
    "Femmes avec ou sans enfants (enfants de 6 ans maximum)","02 376 17 01","lynn@adsmme.org","",
    "Chaussée de Drogenbos 225, 1180 Bruxelles","Présence 24h/24",
    "Entrée : entretien préalable.\nRestrictions : pas d'enfant de plus de 6 ans.\nPrix de journée : 23,17 €/adulte · 13,90 €/enfant.\nServices : accompagnement social, éducatif et psychologique, ateliers, activités enfants, suivi post-hébergement."),

  // ===== Hébergement d'urgence (hors Samusocial) — public =====
  d("maisons","L'Ilot — Maison d'accueil (femmes & familles)","Saint-Gilles","Femmes seules avec enfants et familles sans abri, 24/7 (22 lits). Accompagnement social.","","02 538 59 09","","ilot.be","Chaussée de Charleroi 160, 1060 Saint-Gilles","24h/24 · 7j/7","Profils : femmes et familles."),
  d("maisons","Talita asbl","Bruxelles-Ville","Hébergement pour femmes majeures avec ou sans enfants, notamment après des violences du (ex-)partenaire. Admission sur rendez-vous.","Femmes majeures, avec ou sans enfants","02 262 23 78","info@talita.brussels","talita.brussels","Cité du Sureau 3, 1000 Bruxelles","Lun–Ven 7h–23h · week-end 12h–23h","⚠ CE N'EST PAS GRATUIT : 20 € par jour et par adulte, 12,50 € par enfant. Le CPAS peut prendre en charge — à préparer AVANT d'y envoyer quelqu'un, sinon la porte se referme sur une question d'argent.\n\nPOUR QUI : femmes majeures, avec ou sans enfants, en difficulté — et en particulier après des violences physiques, psychologiques ou sexuelles d'un (ex-)partenaire.\n\nL'ACCUEIL SE FAIT EN SEPT LANGUES : français, néerlandais, anglais, allemand, italien, espagnol et lingala. Rare, et décisif quand la femme ne parle pas français.\n\nAdmission sur rendez-vous : on appelle d'abord, on ne se présente pas.\n\nSources : talita.brussels et ecouteviolencesconjugales.be, relevés le 08/08/2026."),
  d("maisons","CPAS — logement de transit / Housing First","Régional / Toutes communes","Solutions de logement via le CPAS : logement de transit, Housing First, logement communautaire. (Il n'existe pas d'« hôtel pas cher » comme dispositif — passer par le CPAS ou Brusshelp.)","","","","cpasbxl.brussels","","","PAS DE NUMÉRO ICI, ET C'EST NORMAL : ce n'est pas un service mais une porte à pousser dans CHAQUE commune. C'est le CPAS de la commune de la personne qui décide — voir les fiches CPAS du domaine Démarches, elles ont les numéros d'Anderlecht, Bruxelles-Ville, Molenbeek et Forest.\n\n⚠ IL N'EXISTE PAS D'« HÔTEL PAS CHER » comme dispositif. Quand quelqu'un le demande, ce qu'il cherche est soit l'hébergement d'urgence (Bruss'help, cellule d'orientation, 02 880 86 89), soit un logement de transit par le CPAS.\n\nHOUSING FIRST, c'est autre chose qu'un logement de transit : on donne un logement d'abord, sans exiger que la personne aille mieux avant. Porté à Bruxelles par plusieurs équipes — Infirmiers de rue avec le SMES, DoucheFLUX depuis 2023 — et par les CPAS.\n\nRelevé le 08/08/2026."),

  // ===== Drogues & addictions (poster public féda bxl, Édition 2024) =====
  d("addictions","Infor Drogues & Addictions","Bruxelles-Ville","Une voix au bout du fil jusqu'à 22 h, anonyme — et des consultations sur rendez-vous.","Tout public, y compris les proches","02 227 52 52","permanence@infordrogues.be","infordrogues.be","Consultations : rue du Marteau 19, 1000 Bruxelles","Permanence : Lun–Ven 8h–22h · samedi 10h–14h","LA PERMANENCE TIENT JUSQU'À 22 H EN SEMAINE, et le samedi de 10 h à 14 h. C'est un des rares numéros encore ouverts le soir, quand une inquiétude tombe et que tout est fermé. Anonyme : la personne n'a pas à se nommer.\n\nÇA MARCHE AUSSI POUR NOUS : on peut appeler pour une situation, sans la personne, et leur demander où orienter.\n\nLES CONSULTATIONS SONT AUTRE CHOSE : elles se prennent sur rendez-vous, au même numéro, et se donnent rue du Marteau 19.\n\nSi ça ne répond pas, on écrit à permanence@infordrogues.be EN LAISSANT UN NUMÉRO : ce sont eux qui rappellent.\n\nLa nuit et le dimanche, c'est Télé-Accueil au 107.\n\nSource : infordrogues.be, relevé le 08/08/2026."),
  d("addictions","Prospective Jeunesse","Régional / Toutes communes","Prévention avec les jeunes — pour les équipes, pas pour les usagers.","Professionnels de la jeunesse","02 512 17 66","","prospective-jeunesse.be","","","⚠ ON N'Y ENVOIE PAS UN JEUNE : c'est un service qui outille LES ADULTES qui travaillent avec des jeunes. Formations, accompagnement de projets, réflexion sur les usages.\n\nÀ QUOI ÇA SERT POUR NOUS : quand l'équipe ne sait pas comment parler de consommation avec les jeunes du centre, c'est eux qu'on appelle. Ils travaillent aussi sur les USAGES NUMÉRIQUES, qui arrivent vite dans les situations.\n\nMembre de la fédération bruxelloise des institutions spécialisées.\n\nSource : prospective-jeunesse.be, relevé le 08/08/2026."),
  d("addictions","Le Pélican","Koekelberg","Consultations alcool, drogues, jeu — et pour l'entourage. ⚠ Payant.","Personnes concernées et proches","02 502 08 61","contact@lepelican-asbl.be","lepelican-asbl.be","Rue Vanderborght 20, 1081 Koekelberg","Permanence téléphonique 9h–16h30 au 0471 63 78 95","⚠ CE SERVICE EST PAYANT, à dire AVANT d'y envoyer quelqu'un : l'entretien d'accueil coûte 5 €, et chaque consultation 20 €. Pour une personne sans revenus, ce n'est pas la bonne porte — voir la MASS, le Projet Lama ou un service de santé mentale.\n\nCE QUI EST GRATUIT CHEZ EUX : la permanence téléphonique, 0471 63 78 95, de 9 h à 16 h 30. On peut y poser une question sans rien payer.\n\nILS PRENNENT AUSSI L'ENTOURAGE — parents, conjoint, enfants. C'est plus rare qu'il n'y paraît.\n\nAlcool, drogues licites et illicites, et jeux d'argent.\n\nL'entretien d'accueil se prend au 02 502 08 61.\n\nSource : lepelican-asbl.be, relevé le 08/08/2026."),
  d("addictions","Modus Vivendi","Régional / Toutes communes","La maison mère de la réduction des risques à Bruxelles — le terrain, c'est Le Pilier, le Médibus et Modus Fiesta.","Professionnels et usagers","02 644 22 00","","modusvivendi-be.org","","","⚠ CE NUMÉRO EST CELUI DU SIÈGE. Pour envoyer quelqu'un quelque part, ce sont leurs trois services de terrain qu'il faut :\n• LE PILIER — matériel et écoute, lundi, mercredi, vendredi 14 h → 18 h.\n• MODUS FIESTA — le milieu festif, trois soirs par semaine, avec le testing du vendredi.\n• LE MÉDIBUS — le bus, place Sainctelette, mardi et jeudi.\n\nLe siège fait la prévention du sida, la formation et le plaidoyer sur la réduction des risques.\n\nSource : modusvivendi-be.org, relevé le 08/08/2026."),
  d("addictions","DUNE","Saint-Gilles","Réduction des risques — matériel stérile, soins, accueil social. Le soir, quand tout est fermé.","Personnes qui consomment, sans condition","02 503 29 71","","dune-asbl.be","Avenue Henri Jaspar 124, 1060 Saint-Gilles","Le CLIP : Lun–Ven 19h–21h30 (échange de matériel jusque 22h)","⚠ C'EST UN SERVICE DU SOIR, et c'est ce qui le rend précieux : le CLIP ouvre de 19 h à 21 h 30, quand presque tout le reste du réseau est fermé. Le 02 503 29 71 est l'administration, pas l'accueil.\n\nINCONDITIONNEL, ANONYME ET GRATUIT. Pas de papiers à montrer, pas de nom à donner.\n\nLES PERMANENCES, à retenir :\n• Sociale — mardi 19 h → 21 h 30 et jeudi 14 h → 17 h.\n• Médicale — mardi 19 h → 21 h 30 et jeudi 15 h → 17 h.\n• Maraudes — du lundi au vendredi, 19 h → 21 h 30.\n• MÉDIBUS — mardi et jeudi 15 h → 17 h 30, place Sainctelette à Molenbeek. C'est le bus qui va vers les gens.\n\nMatériel stérile : seringues, aluminium, pipe, paille, et des récupérateurs pour les seringues usagées.\n\nSource : dune-asbl.be, relevé le 08/08/2026."),
  d("addictions","Transit — Comptoir LAIRR","Bruxelles-Ville","Comptoir d'échange de matériel stérile, dans la maison Transit.","Personnes qui consomment, sans condition","02 215 89 90","","transitasbl.be","Rue Stephenson 96, 1000 Bruxelles","Le téléphone répond 24h/24","Le comptoir est DANS la maison Transit, rue Stephenson : même adresse que l'hébergement de crise et que l'accueil. Une seule porte pour plusieurs choses — utile à dire à quelqu'un qui n'ose pas.\n\nSans rendez-vous, sans condition administrative ni financière, gratuit.\n\nSource : transitasbl.be, relevé le 08/08/2026."),
  d("addictions","Transit — SCMR GATE","Bruxelles-Ville","La salle de consommation à moindre risque : consommer sous surveillance plutôt que dans la rue.","Personnes majeures qui consomment","02 253 59 99","","transitasbl.be","Rue de Woeringen 9, 1000 Bruxelles","Lun, mar, jeu, ven 10h–17h · mercredi 12h–17h","SANS RENDEZ-VOUS, sans condition administrative ni financière. On n'a rien à prouver, rien à signer.\n\nÀ QUOI ÇA SERT, quand on doit l'expliquer : consommer sous l'œil d'une équipe plutôt que dans une cage d'escalier. Moins d'overdoses, moins d'infections, du matériel propre — et quelqu'un à qui parler si la personne veut aller plus loin un jour.\n\nC'est dans le quartier du Midi, près des lieux de consommation en rue.\n\n⚠ Le mercredi, ça n'ouvre qu'à 12 h.\n\nSource : transitasbl.be, relevé le 08/08/2026."),
  d("addictions","Ex Æquo","Régional / Toutes communes","Santé des hommes gays et bisexuels — dépistage, et les questions liées au chemsex.","Hommes gays, bisexuels et HSH","02 736 28 61","","exaequo.be","","","LE CHEMSEX est leur spécificité : la consommation de produits dans un contexte sexuel. Ça ne se dit pas dans un service d'addictions classique, et ça ne se dit pas non plus chez le médecin — il faut un endroit où c'est déjà connu.\n\nIls font aussi du DÉPISTAGE VIH et des infections sexuellement transmissibles.\n\nPublic : hommes gays, bisexuels, et hommes qui ont des relations avec des hommes sans se dire gays — c'est ce que veut dire « HSH ».\n\nVoir aussi la RainbowHouse dans le domaine LGBTQI+.\n\nSource : exaequo.be, relevé le 08/08/2026."),
  d("addictions","Tabacstop","Régional / Toutes communes","Trente tabacologues au bout du fil, gratuitement — mais seulement l'après-midi.","Personnes qui fument ou vapotent","0800 111 00","conseil@tabacstop.be","tabacstop.be","","Lun–Ven 15h–19h","⚠ LA LIGNE N'OUVRE QUE DE 15 H À 19 H, du lundi au vendredi. En dehors, on laisse un message et ce sont eux qui rappellent — le dire, sinon la personne croit que ça ne marche pas.\n\nC'EST ENTIÈREMENT GRATUIT, y compris le coaching : une trentaine de tabacologues accompagnent la personne dans la durée, pas juste un conseil en passant. L'inscription au coaching se fait sur tabacstop.be.\n\nÇa vaut aussi pour LE VAPOTAGE.\n\nOn peut aussi écrire à conseil@tabacstop.be, et commander des brochures gratuites.\n\nInitiative de la Fondation contre le Cancer.\n\nSource : tabacstop.be et cancer.be, relevés le 08/08/2026."),
  d("addictions","Enaden — Unité de consultation","Saint-Gilles","Consultations médicales, psy et sociales — pour la personne ET son entourage.","Personnes concernées et proches","02 534 63 73","","enaden.be","Rue Saint-Bernard 114, 1060 Saint-Gilles","Lun–Ven 9h–18h · mercredi jusqu'à 19h","DE PRÉFÉRENCE SUR RENDEZ-VOUS : on appelle avant, on ne se présente pas au hasard.\n\nENADEN, C'EST CINQ MAISONS et non une seule. Ne pas donner ce numéro pour un hébergement ou pour un jeune — chacune a le sien :\n• Consultations — 02 534 63 73, rue Saint-Bernard 114\n• Hébergement de crise — 02 534 58 73, même adresse\n• Post-cure (séjour court) — 02 465 63 90, chaussée de Gand 1020-1022, Berchem\n• Centre de jour JEUNES 15-25 ans — 02 616 68 60, rue des Anciens Étangs 55, Forest\n\nIls prennent l'alcool, les drogues, les médicaments, le jeu et les écrans.\n\nMétro 2 arrêt Hôtel des Monnaies · trams 81, 91, 97.\n\nSource : enaden.be et platformbxl.brussels, relevés le 08/08/2026."),
  d("addictions","Babel (L'Équipe)","Régional / Toutes communes","Consultations quand l'addiction ET la souffrance psychique vont ensemble.","Adultes","02 543 03 43","","lequipeasbl.be","","","POUR LES DEUX À LA FOIS : santé mentale ET addictions, en ambulatoire. C'est la même maison que La Pièce (L'Équipe asbl), qui prend le double diagnostic en résidentiel.\n\nVoir la formation « Double diagnostic » : le handicap renvoie vers la psychiatrie, la psychiatrie vers le handicap, et Babel est une des adresses qui ne renvoie pas.\n\n⚠ Horaires et conditions d'accès à confirmer par téléphone.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","Projet Lama","Régional / Toutes communes","Traitement de substitution — et il peut commencer LE JOUR MÊME.","Personnes qui consomment, bas seuil","02 640 50 20","","projetlama.be","Trois centres : Ixelles, Bruxelles-Ville et Molenbeek","","⚠ LE TRAITEMENT PEUT DÉMARRER LE JOUR MÊME du premier contact si c'est nécessaire. C'est écrit sur leur site, et c'est la chose la plus importante de cette fiche : quand quelqu'un se décide un matin, on n'a pas trois semaines devant nous.\n\nTROIS CENTRES, TROIS NUMÉROS — appeler celui du quartier :\n• Ixelles — rue Américaine 211, 02 640 50 20\n• Bruxelles-Ville — rue Royale 109-111, 02 524 33 52\n• Molenbeek — rue Montagne aux Anges 25, 02 411 51 61\n\nL'ACCUEIL COMMUNAUTAIRE SE FAIT SANS RENDEZ-VOUS, et il ne sert pas qu'à la consommation : recherche de logement ou d'emploi, démarches sociales et administratives. À Molenbeek : lundi et jeudi 10 h → 13 h, mardi 10 h → 12 h 30, mercredi 13 h 30 → 16 h 45.\n\nSource : projetlama.be, relevé le 08/08/2026."),
  d("addictions","La M.A.S.S.","Bruxelles-Ville","Maison d'accueil socio-sanitaire : pour ceux que les autres services n'arrivent plus à aider.","Usagers de drogues les plus marginalisés","02 505 32 90","contact@mass-bxl.be","mass-bxl.be","Rue de Woeringen 16-18, 1000 Bruxelles","Accueil : Lun–Ven 10h30–18h30 · le jeudi à partir de 13h30","POUR QUI, ET C'EST ÉCRIT NOIR SUR BLANC CHEZ EUX : les usagers de drogues les plus marginalisés, ceux qui ne sont PLUS OU PAS SUFFISAMMENT aidés par les autres services. Sans logement, sans papiers, polyconsommation, troubles psychiatriques, avec ou sans mutuelle. Quand on a fait le tour et que ça a fermé partout, c'est ici.\n\nMaison de soins ambulatoire conventionnée INAMI, bas seuil.\n\n⚠ LE JEUDI, ÇA N'OUVRE QU'À 13 H 30. Deuxième numéro : 02 505 32 97.\n\nÀ deux pas de la salle de consommation GATE, même rue.\n\nSource : mass-bxl.be, relevé le 08/08/2026."),
  d("addictions","Résad — Réseau Soutien-Addictions","Ixelles","Accueil et accompagnement, pour la personne ET pour ses proches — toutes les addictions.","Personnes concernées, proches, professionnels","02 534 87 41","secretariat@resad.be","resad.be","Rue du Tabellion 64, 1050 Ixelles","","ILS PRENNENT LES DEUX : la personne concernée et son entourage. Beaucoup de services font l'un ou l'autre.\n\nTOUTES LES ADDICTIONS, y compris celles qu'on oublie : alcool, drogues, médicaments — mais aussi ÉCRANS, JEUX et SEXE. Quand la dépendance n'est pas un produit, c'est une des rares portes.\n\nIls reçoivent aussi les professionnels pour une situation.\n\nSource : resad.be, relevé le 08/08/2026."),
  d("addictions","Cannabis Clinic (CHU Brugmann)","Bruxelles-Ville","Consultations cannabis — le rendez-vous se prend PAR MAIL, pas par téléphone.","Personnes concernées et proches","02 477 27 76","cannabis.clinic@chu-brugmann.be","chu-brugmann.be","Place Van Gehuchten 4, 1020 Laeken (site Horta)","","⚠ ON N'OBTIENT PAS DE RENDEZ-VOUS AU TÉLÉPHONE : on écrit à cannabis.clinic@chu-brugmann.be avec le nom, le prénom, la date de naissance et UN NUMÉRO OÙ RAPPELER. C'est eux qui recontactent pour fixer la date.\n\nÀ dire à la personne, sinon elle appelle, tombe sur un secrétariat de psychiatrie et abandonne.\n\nC'est à l'Institut de psychiatrie et de psychologie médicale, site Horta du CHU Brugmann.\n\nSecrétariat : 02 477 27 76 ou 02 477 27 77, du lundi au vendredi.\n\nSource : chu-brugmann.be, relevé le 08/08/2026."),
  d("addictions","Clinique du jeu & addictions comportementales (CHU Brugmann)","Bruxelles-Ville","Jeu d'argent, écrans, achats — même maison, même façon de prendre rendez-vous.","Personnes concernées et proches","02 477 27 76","cliniquedujeu@chu-brugmann.be","cliniquedujeu.be","Place Van Gehuchten 4, 1020 Laeken","","⚠ COMME LA CANNABIS CLINIC : le rendez-vous se demande PAR MAIL à cliniquedujeu@chu-brugmann.be, avec nom, prénom, âge et un numéro où rappeler. Le téléphone ne sert qu'au secrétariat de psychiatrie.\n\nCE N'EST PAS QUE LE JEU D'ARGENT : les autres addictions comportementales aussi — écrans, achats. On y pense rarement, alors que c'est souvent ce qui accompagne le reste.\n\nIls reçoivent aussi les PROCHES.\n\nSource : cliniquedujeu.be et chu-brugmann.be, relevés le 08/08/2026."),
  d("addictions","PsyBru","Régional / Toutes communes","Séances chez un psychologue à 11 € — et gratuites avant 24 ans. Mais il faut une mutuelle en ordre.","Personnes en ordre de mutuelle","","info@psybru.be","psybru.be","","","LES PRIX, parce que c'est la vraie question : la PREMIÈRE SÉANCE EST TOUJOURS GRATUITE. Ensuite 11 € la séance individuelle, 4 € si la personne est BIM (intervention majorée), et 2,50 € en groupe. GRATUIT POUR LES MOINS DE 24 ANS depuis le 1er février 2024.\n\n⚠ IL FAUT ÊTRE EN ORDRE DE MUTUELLE. C'est la condition, et elle écarte une partie des gens qu'on accompagne : sans mutuelle, ce n'est pas la bonne porte — chercher plutôt un service de santé mentale (SSM) ou Médecins du Monde.\n\nPAS DE NUMÉRO CENTRAL, et ce n'est pas un oubli : PsyBru n'est pas un cabinet mais un ANNUAIRE. On va sur psybru.be, on choisit un psychologue par commune, et on l'appelle directement, lui.\n\nSources : psybru.be et etterbeek.brussels, relevés le 08/08/2026."),
  urgent(d("addictions","Transit — Hébergement de crise","Bruxelles-Ville","20 lits d'urgence pour usagers de drogues — et NOUS pouvons faire admettre quelqu'un à toute heure.","Majeurs, problème d'assuétude","02 215 89 90","","transitasbl.be","Rue Stephenson 96, 1000 Bruxelles","Téléphone 24h/24 · demandes sur place 9h–12h","⚠ CE QUI CHANGE TOUT POUR NOUS : les demandes se font sur place entre 9 h et 12 h — MAIS 24 H/24 SUR RECOMMANDATION D'UN PROFESSIONNEL. Nous en sommes. Un appel de notre part à 22 h peut ouvrir une place que la personne n'obtiendrait pas seule.\n\n20 LITS, plus 2 lits d'urgence réservés notamment aux SORTIES DE PRISON. Séjour de 13 jours maximum.\n\nCONDITIONS : être majeur et avoir un problème d'assuétude, licite ou illicite. Sans rendez-vous, sans condition administrative ni financière. Gratuit.\n\n⚠ L'ÉQUIPE N'EST PAS MÉDICALISÉE. Pour quelqu'un en sevrage compliqué ou avec un problème médical aigu, ce n'est pas le bon endroit — voir la MASS ou les urgences.\n\nMême maison que le comptoir LAIRR.\n\nSource : transitasbl.be, relevé le 08/08/2026.")),
  d("addictions","Enaden — Hébergement / post-cure","Berchem-Sainte-Agathe","Hébergement de crise (15 jours) puis post-cure en séjour court.","Personnes concernées","02 534 58 73","","enaden.be","Crise : rue Saint-Bernard 114, Saint-Gilles · Post-cure : chaussée de Gand 1020-1022, Berchem","","DEUX ÉTAPES, DEUX ADRESSES, DEUX NUMÉROS — ne pas les confondre :\n• HÉBERGEMENT DE CRISE — 02 534 58 73, rue Saint-Bernard 114 à Saint-Gilles. 15 jours, négociables et renouvelables.\n• POST-CURE, séjour court — 02 465 63 90, chaussée de Gand 1020-1022 à Berchem-Sainte-Agathe. C'est l'après, quand la crise est passée.\n\n⚠ La crise se prépare avec eux : la candidature se dépose à l'avance, ce n'est pas un accueil d'urgence où l'on pousse la porte. Pour une place le soir même, voir plutôt Transit.\n\nSource : enaden.be et platformbxl.brussels, relevés le 08/08/2026."),
  d("addictions","Hestia (Projet Lama)","Régional / Toutes communes","Appartements de transition — mais PAS pour sortir de la rue.","Personnes déjà suivies","0472 63 07 02","","projetlama.be","","","⚠ CE N'EST PAS UNE SORTIE DE RUE, et c'est écrit noir sur blanc dans le dispositif : Hestia loge des personnes déjà accompagnées, en transition vers autre chose. Y adresser quelqu'un qui dort dehors, c'est un refus assuré et une déception de plus.\n\nPour la rue, voir Bruss'help, Transit ou le Housing First.\n\nRattaché au Projet Lama.\n\nSource : projetlama.be, relevé le 08/08/2026."),
  d("addictions","La Pièce","Régional / Toutes communes","Communauté thérapeutique pour double diagnostic — et elle N'EXIGE PAS l'abstinence.","Adultes, difficultés psy + consommation","02 223 09 00","","lequipeasbl.be","","","⚠ C'EST LA DIFFÉRENCE QUI COMPTE : La Pièce N'EXIGE PAS L'ABSTINENCE pour entrer. La plupart des cures résidentielles la demandent — celle-ci accueille des gens qui consomment encore. Pour quelqu'un qui n'y arrive pas mais qui veut être aidé, c'est parfois la seule porte.\n\nPOUR QUI : des adultes avec d'importantes difficultés psychologiques ASSOCIÉES à la consommation de produits illégaux. C'est le fameux double diagnostic — voir la formation.\n\nCOMBIEN DE TEMPS : 6 mois renouvelables, jusqu'à 2 ans. C'est un long séjour, avec vie communautaire, suivi individuel et thérapie de groupe.\n\nGéré par L'Équipe asbl.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","Centre L'Orée","Uccle","Centre de jour alcool, drogues et médicaments — on y entre par une séance du mercredi.","Adultes","02 347 57 57","","centreloree.be","Avenue Maréchal Joffre 149, 1180 Uccle","Lun–Ven 9h–19h · samedi 9h–16h · jours fériés 9h–13h","⚠ ON N'ENTRE PAS QUAND ON VEUT : une SÉANCE D'INFORMATION OBLIGATOIRE a lieu tous les MERCREDIS À 15 H, sur inscription préalable au 02 347 57 57. Sans elle, pas d'admission. C'est la première chose à organiser avec la personne.\n\n⚠ L'ENGAGEMENT EST LOURD : minimum 18 HEURES PAR SEMAINE sur place. En échange, la personne garde son logement et sa vie — c'est un centre de JOUR, pas une cure résidentielle.\n\nOUVERT LE SAMEDI (9 h → 16 h) et même les jours fériés (9 h → 13 h). Peu de services tiennent ça.\n\nAutres numéros : direction 02 348 95 20, secrétariat 02 348 95 21.\n\nSource : centreloree.be, relevé le 08/08/2026."),
  d("addictions","Urgence vitale — 112","Régional / Toutes communes","Overdose, perte de conscience, convulsions : on appelle sans hésiter.","Tout public","112","","","","24h/24","QUAND ON APPELLE SANS SE POSER DE QUESTION : perte de conscience, respiration lente ou arrêtée, lèvres bleues, convulsions, la personne ne réagit pas quand on la secoue.\n\n⚠ DIRE CE QUI A ÉTÉ CONSOMMÉ, si on le sait. Ce n'est pas de la délation : c'est ce qui permet aux secours de donner le bon antidote. La peur des ennuis fait perdre des minutes qui comptent.\n\nEN ATTENDANT : mettre la personne SUR LE CÔTÉ, ne jamais la laisser seule, ne rien lui faire boire.\n\nGratuit, 24 h/24, depuis n'importe quel téléphone même sans crédit.\n\nLe 112 pour le médical, le 101 pour la police."),
  d("addictions","Hôpital Saint-Jean — addictologie","Bruxelles-Ville","Psychiatrie générale avec lits alcool et drogues — et des urgences psychiatriques 24h/24.","Adultes","02 221 91 11","","clstjean.be","","","⚠ SAINT-JEAN FAIT PARTIE DES TROIS SERVICES D'URGENCES PSYCHIATRIQUES OUVERTS 24 H/24 à Bruxelles, avec Erasme et Saint-Pierre. C'est là qu'on va la nuit, pas dans une clinique privée.\n\nPour les urgences elles-mêmes : 02 221 91 00.\n\nLits alcool et drogues en psychiatrie générale.\n\nCOMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : clstjean.be et lbsm.be, relevés le 08/08/2026."),
  d("addictions","Clinique La Ramée (Epsylon)","Uccle","Cure de sevrage alcool, drogues, médicaments — on y entre par une séance du JEUDI.","Adultes","02 431 76 00","","epsylon.be","","Séance d'information : tous les jeudis à 10h","⚠ DEUX RENDEZ-VOUS OBLIGATOIRES AVANT D'ENTRER, et des créneaux très étroits :\n1. LA SÉANCE D'INFORMATION, tous les JEUDIS À 10 H (sauf jours fériés), à la clinique. Sans elle, pas d'admission.\n2. ENSUITE SEULEMENT, le rendez-vous avec un psychiatre — et le bureau téléphonique pour le prendre n'ouvre que les LUNDI, MERCREDI ET VENDREDI de 9 H 30 À 10 H 30. Une heure, trois fois par semaine. Le noter dans l'agenda avec la personne, sinon la fenêtre se rate.\n\nLA CURE DURE AU MINIMUM TROIS SEMAINES, et le programme se pense en trois temps : pré-cure, cure, post-cure. Ce n'est pas un dépannage.\n\nC'est l'unité 1 de La Ramée, qui prend aussi la psychiatrie générale.\n\nSource : epsylon.be, relevé le 08/08/2026."),
  d("addictions","Alcooliques Anonymes (AA)","Régional / Toutes communes","Groupes de parole entre personnes concernées — gratuit, anonyme, sans inscription.","Personnes qui boivent","078 15 25 56","","alcooliquesanonymes.be","Des groupes dans toute la Région","","CE N'EST PAS UN SERVICE, ce sont des réunions entre personnes qui vivent la même chose. Gratuit, anonyme, sans inscription et sans dossier : on pousse la porte, on peut se taire toute la séance.\n\n⚠ NE PAS FIGER UN HORAIRE : les groupes et leurs heures changent. On donne la CARTE DES GROUPES sur alcooliquesanonymes.be — chacun y trouve celui de son quartier. Il existe aussi des réunions EN LIGNE, utiles quand quelqu'un n'ose pas encore entrer dans une salle.\n\nLe 078 15 25 56 répond pour orienter vers le bon groupe.\n\nPOUR L'ENTOURAGE, c'est Al-Anon, pas AA.\n\nSource : alcooliquesanonymes.be, relevé le 08/08/2026."),
  d("addictions","Narcotiques Anonymes","Régional / Toutes communes","Groupes de parole entre personnes concernées, pour toutes les drogues.","Personnes qui consomment","0476 64 30 54","","na-belgium.org","Des groupes dans toute la Région","","Même principe qu'AA, mais pour toutes les drogues : des réunions entre pairs, gratuites, anonymes, sans inscription.\n\n⚠ Les horaires bougent — donner la liste des réunions sur na-belgium.org plutôt qu'une heure qui sera fausse dans trois mois.\n\nCe n'est pas un traitement et ça ne remplace pas un suivi : ça se cumule avec le Projet Lama ou la MASS, ça ne les remplace pas.\n\nSource : na-belgium.org, relevé le 08/08/2026."),
  d("addictions","Al-Anon / Alateen","Régional / Toutes communes","Pour ceux qui vivent à côté : famille, conjoint, enfants. Alateen pour les ados.","Proches d'une personne qui boit","02 216 09 08","","al-anon.be","Des groupes dans toute la Région","Tous les jours 9h–22h","POUR L'ENTOURAGE, PAS POUR LA PERSONNE QUI BOIT — c'est toute la différence avec AA, et on se trompe souvent de porte.\n\nLA LIGNE RÉPOND TOUS LES JOURS DE 9 H À 22 H, week-end compris. Peu de numéros tiennent cet horaire-là.\n\nALATEEN est la branche pour les ADOLESCENTS qui vivent avec un parent qui boit. À retenir quand on accompagne une famille : l'enfant aussi a un endroit.\n\nSource : al-anon.be et aide-alcool.be, relevés le 08/08/2026."),
  d("addictions","Aide Alcool","Régional / Toutes communes","Accompagnement en ligne par un psychologue, gratuit et anonyme — mais il n'y a personne à appeler.","Personnes qui boivent et leurs proches","","","aide-alcool.be","","","ON N'APPELLE PAS AIDE ALCOOL : c'est un service ENTIÈREMENT EN LIGNE, il n'a pas de téléphone. Un psychologue accompagne la personne par chat, une fois par semaine sur rendez-vous, GRATUITEMENT et de façon ANONYME. Tout passe par aide-alcool.be.\n\nÇa convient à quelqu'un qui n'ose pas encore parler en face, ou qui ne veut pas être vu entrant dans un service.\n\nSI LA PERSONNE VEUT UNE VOIX AU BOUT DU FIL, ce sont ces numéros-là qu'on donne :\n• Infor-Drogues — 02 227 52 52, du lundi au vendredi de 8 h à 22 h, samedi de 10 h à 14 h. Anonyme, et ils donnent des adresses près de chez soi.\n• Télé-Accueil — 107, 24 h/24, aussi par chat.\n• Al-Anon, pour les PROCHES — 02 216 09 08, tous les jours de 9 h à 22 h.\n\nSource : aide-alcool.be, relevé le 08/08/2026."),
  urgent(d("addictions","Ligne d'écoute Santé Mentale","Régional / Toutes communes","Un numéro vert pour parler, anonyme et gratuit.","Tout public","0800 12341","","","","","Gratuit et anonyme : la personne n'a pas à se nommer, et l'appel ne coûte rien même sans crédit.\n\n⚠ HORAIRES À CONFIRMER. En attendant, les valeurs sûres pour une écoute 24 h/24 sont Télé-Accueil au 107 (aussi par chat) et, pour les drogues, Infor Drogues au 02 227 52 52 jusqu'à 22 h.\n\nRelevé le 08/08/2026.")),
  d("addictions","Univers Santé","Hors Bruxelles","Prévention en milieu ÉTUDIANT — et c'est à Louvain-la-Neuve.","Étudiants et professionnels de l'enseignement","010 47 28 28","","univers-sante.be","Louvain-la-Neuve","","⚠ DEUX RAISONS DE NE PAS S'Y TROMPER : c'est pour le milieu ÉTUDIANT, et ce n'est pas à Bruxelles — l'indicatif 010, c'est Louvain-la-Neuve.\n\nUtile seulement si on accompagne un étudiant, ou pour de la documentation sur la prévention.\n\nSource : univers-sante.be, relevé le 08/08/2026."),
  d("addictions","ULB Santé","Bruxelles-Ville","Prévention et santé pour les ÉTUDIANTS de l'ULB.","Étudiants de l'ULB","02 650 21 25","","ulb.be","","","⚠ RÉSERVÉ AUX ÉTUDIANTS DE L'ULB. Ne pas y envoyer quelqu'un qui n'y est pas inscrit.\n\nÀ retenir quand on accompagne un jeune qui étudie là-bas : il a droit à un service de santé sur son campus, souvent gratuit, et il l'ignore.\n\nSource : ulb.be, relevé le 08/08/2026."),
  d("addictions","FARES","Régional / Toutes communes","Prévention du tabac — pour les équipes, et de la documentation.","Professionnels","02 512 29 36","","fares.be","","","⚠ POUR LES PROFESSIONNELS, pas pour les fumeurs. Pour arrêter, c'est TABACSTOP au 0800 111 00, gratuit, avec un tabacologue.\n\nCE QUE FARES APPORTE : documentation et formations sur le tabac, y compris pour les publics précaires — chez qui le tabagisme est massif et presque jamais abordé.\n\nIls travaillent aussi sur la tuberculose.\n\nSource : fares.be, relevé le 08/08/2026."),
  d("addictions","Modus Vivendi — Le Pilier","Bruxelles-Ville","Matériel stérile, écoute — et l'analyse de produits, le mardi.","Personnes qui consomment","02 315 78 80","","modusvivendi-be.org","Rue du Poinçon 49-51, 1000 Bruxelles","Permanences : lundi, mercredi et vendredi 14h–18h","⚠ TROIS JOURS SEULEMENT : lundi, mercredi et vendredi, de 14 h à 18 h. Y envoyer quelqu'un un mardi ou un jeudi, c'est l'envoyer devant une porte fermée.\n\nL'ANALYSE DE PRODUITS (testing), c'est le MARDI de 15 h à 17 h 30, dans leurs locaux. Savoir ce qu'il y a vraiment dans un produit évite des overdoses — c'est le genre de chose qu'on ne pense pas à proposer.\n\nMatériel d'injection et d'inhalation, préservatifs, écoute, orientation.\n\n⚠ Deux adresses circulent pour Le Pilier (rue du Poinçon et rue Van Artevelde). Appeler avant de s'y rendre.\n\nSource : modusvivendi-be.org et brusshelp.org, relevés le 08/08/2026."),
  d("addictions","Modus Vivendi — Modus Fiesta","Bruxelles-Ville","Le lieu du milieu festif : infos sans morale, matériel, et testing de produits le vendredi.","Personnes qui consomment, milieu festif","02 644 22 00","","modusvivendi-be.org","Rue Van Artevelde 130, 1000 Bruxelles","Lundi et mercredi 16h–20h · vendredi 18h–22h","ON Y PARLE DE DROGUES SANS DISCOURS MORALISATEUR, avec des professionnels ET d'anciens usagers. Pour quelqu'un qui refuse tout ce qui ressemble à un service, c'est souvent la seule porte qui s'ouvre.\n\nLE TESTING (service TRIP) : le VENDREDI de 18 h à 21 h 30. Savoir ce qu'il y a vraiment dans un produit évite des overdoses.\n\n⚠ TROIS SOIRS SEULEMENT, et tard : lundi et mercredi 16 h → 20 h, vendredi 18 h → 22 h. Ce sont des horaires de vie nocturne, pas de bureau.\n\nMatériel : kits sniff, matériel d'injection stérile, préservatifs. Et des brochures fiables sur les produits.\n\n⚠ Les horaires changent l'été. Vérifier sur leur site avant d'y envoyer quelqu'un.\n\nSource : modusvivendi-be.org, relevé le 08/08/2026."),
  d("addictions","Plateforme Bruxelloise pour la Santé Mentale (PBSM)","Régional / Toutes communes","Pour les ÉQUIPES : formations, répertoire des services, et la carte des dispositifs.","Professionnels","02 289 09 60","","platformbxl.brussels","","","⚠ POUR LES PROFESSIONNELS, PAS POUR LES USAGERS. On n'y envoie personne se faire soigner.\n\nCE QU'ELLE NOUS DONNE : le RÉPERTOIRE de tous les services de santé mentale et d'addictions de Bruxelles — c'est la source de beaucoup de nos fiches — et une affiche « Dispositifs drogues et addictions à Bruxelles » qui tient sur un mur, faite avec féda bxl. À imprimer et à afficher au bureau.\n\nElles organisent aussi des formations.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","féda bxl","Régional / Toutes communes","La fédération des 30 institutions drogues et addictions — pour les équipes.","Professionnels","02 514 12 60","","fedabxl.be","","","⚠ POUR LES PROFESSIONNELS. Elle fédère TRENTE institutions bruxelloises : information, prévention, réduction des risques, soin, accompagnement.\n\nCE QUI SERT VRAIMENT : leur lettre électronique annonce les FORMATIONS, les événements et les offres d'emploi du secteur. Et leurs « apéro-réseaux » sont des rencontres entre professionnels — c'est là qu'on met un visage sur les gens qu'on appelle toute l'année.\n\nQuand on ne sait plus vers qui orienter, ils orientent les équipes.\n\nSource : fedabxl.be, relevé le 08/08/2026."),
  d("addictions","CAP-ITI","Régional / Toutes communes","Pour les personnes détenues, internées ou sorties de prison qui consomment — et leurs proches.","Personnes judiciarisées et leurs proches","02 538 47 90","","capiti.be","","","POUR QUI, PRÉCISÉMENT : les personnes incarcérées, INTERNÉES ou libérées qui consomment drogues, alcool ou médicaments. Et leurs PROCHES, qui n'ont souvent nulle part où aller.\n\nÇA COMMENCE PAR UN ENTRETIEN avec un assistant social, qui analyse la demande. Ce n'est pas un accueil libre.\n\nLe mot « interné » n'est pas un synonyme de détenu : il désigne une mesure de défense sociale pour une personne jugée irresponsable de ses actes. Peu de services les prennent.\n\nSource : capiti.be, relevé le 08/08/2026."),
  d("addictions","SAMPAS — Réseau Hépatite C","Bruxelles-Ville","Ils SE DÉPLACENT pour dépister l'hépatite C — y compris chez nous.","Usagers et ex-usagers de drogues","02 506 70 92","sampas@stpierre-bru.be","reseauhepatitec.be","CHU Saint-Pierre, rue Haute 322, 1000 Bruxelles","","⚠ CE QU'IL FAUT RETENIR : SAMPAS EST UNE ÉQUIPE MOBILE. Ils se déplacent dans les institutions partenaires de toute la Région pour dépister sur place. Autrement dit, ON PEUT LES FAIRE VENIR AU CENTRE plutôt que d'envoyer les gens à l'hôpital — et pour ce public, c'est la différence entre un dépistage fait et un dépistage jamais fait.\n\nCE QU'ILS APPORTENT : des tests rapides d'orientation diagnostique, et un FIBROSCAN MOBILE pour évaluer l'état du foie. Du matériel d'hôpital qui vient à la personne.\n\nÉquipe complète : médecin, assistants sociaux, infirmiers, et un pair-aidant.\n\nIls assurent aussi des consultations dédiées au CHU Saint-Pierre, avec accès aux traitements antiviraux — l'hépatite C se guérit aujourd'hui.\n\nMême adresse qu'Aquarelle, rue Haute.\n\nSource : reseauhepatitec.be, relevé le 08/08/2026."),
  d("addictions","Réseau Aide & Justiciable (RAJ)","Régional / Toutes communes","Formation et intervention autour de la sortie de détention — côté équipes.","Professionnels","02 346 31 51","","","","","Plutôt de la FORMATION et de l'intervention avec le public sortant de détention que de l'accueil direct.\n\nPOUR UNE PERSONNE, les portes sont plutôt : CAP-ITI si elle consomme, RIZOME-BXL pour le logement et les dettes, ou le service d'aide aux justiciables de sa commune.\n\n⚠ Missions et accès à confirmer par téléphone.\n\nRelevé le 08/08/2026."),
  d("addictions","Tremplin","Bruxelles-Ville","Les consultations médico-sociales DANS la salle de consommation Gate.","Personnes qui fréquentent la SCMR","02 253 59 99","","transitasbl.be","Rue de Woeringen 9, 1000 Bruxelles","Lun–Ven 10h–17h · mercredi 12h–17h","L'INTÉRÊT EST DANS L'ENDROIT : ces consultations se donnent À L'INTÉRIEUR de la salle de consommation Gate. La personne n'a pas de rendez-vous à prendre ailleurs, pas de porte supplémentaire à pousser — elle est déjà là.\n\nMême horaire et même numéro que la SCMR.\n\nSource : transitasbl.be, relevé le 08/08/2026."),
  d("addictions","Clinique troubles internet & jeux (Saint-Luc)","Woluwe-Saint-Lambert","Écrans, jeux vidéo, jeux d'argent — consultations spécialisées.","Personnes concernées et proches","02 764 21 60","ctij.rdv-saintluc@uclouvain.be","saintluc.be","Institut de psychiatrie, avenue Mounier 18, 1200 Woluwe-Saint-Lambert","","⚠ NUMÉRO CORRIGÉ LE 08/08/2026 : la fiche portait le 0800 35 777, qui est celui de SOS JEU, une ligne d'écoute — pas la clinique. Le bon numéro pour un rendez-vous est le 02 764 21 60, ou le mail ctij.rdv-saintluc@uclouvain.be.\n\nLe 0800 35 777 reste utile pour une première écoute anonyme sur le jeu d'argent : le garder en tête, mais savoir ce que c'est.\n\nÉquipe de psychiatres et psychologues spécialisés dans les addictions COMPORTEMENTALES — celles sans produit.\n\nAutre adresse pour la même chose, plus près : la Clinique du jeu du CHU Brugmann.\n\nSource : saintluc.be, relevé le 08/08/2026."),
  d("addictions","Interstices asbl (CHU Saint-Pierre)","Bruxelles-Ville","Trois portes à Saint-Pierre — dont une pour les parents et FUTURS parents, sans condition.","Usagers, parents, urgences","02 535 30 52","","interstices-stpierre.be","CHU Saint-Pierre, Bruxelles","Liaison : Lun–Ven 9h–16h30","TROIS SECTEURS, TROIS NUMÉROS :\n• LIAISON-ADDICTIONS — 02 535 30 52, du lundi au vendredi de 9 h à 16 h 30. ⚠ Ils font de l'évaluation et de l'ORIENTATION, PAS du suivi au long cours. Ne pas y envoyer quelqu'un pour un accompagnement durable.\n• PARENTALITÉ-ADDICTION / ESPACE ALIZÉS — 02 535 30 51 ou 02 502 32 85. Pour les parents ET LES FUTURS PARENTS concernés par une addiction, et leurs enfants. SANS AUCUNE CONDITION D'ADMISSION. Mardi 10 h → 17 h, mercredi 12 h → 17 h, jeudi 13 h → 18 h, vendredi 10 h → 17 h.\n• URGENCES-TOXICOMANIES, au sein des urgences de l'hôpital.\n\nPOURQUOI ESPACE ALIZÉS COMPTE : une femme enceinte qui consomme a peur qu'on lui prenne son enfant, et ne consulte donc nulle part. Ici, il n'y a pas de condition — c'est ce qu'on peut lui dire.\n\nSource : interstices-stpierre.be, relevé le 08/08/2026."),
  d("addictions","La Trace","Régional / Toutes communes","L'accompagnement passe par le SPORT — pour ceux que les entretiens rebutent.","Personnes concernées","02 538 49 22","","","","","LE SPORT COMME PORTE D'ENTRÉE, et c'est tout l'intérêt : pour quelqu'un qui ne supporte pas de s'asseoir en face d'un psy, faire du sport ensemble crée le lien autrement. L'accompagnement psycho-social vient pendant, ou après.\n\nRare à Bruxelles. À proposer quand tout le reste a été refusé.\n\n⚠ Horaires, adresse et conditions à confirmer par téléphone.\n\nRelevé le 08/08/2026."),
  d("addictions","Chapelle-aux-Champs","Woluwe-Saint-Lambert","Consultations psycho-médico-sociales, pour la personne et son entourage.","Adultes et proches","02 764 31 20","","chapelle-aux-champs.be","","","Service de santé mentale universitaire, lié à l'UCLouvain et à Saint-Luc.\n\nILS PRENNENT AUSSI L'ENTOURAGE, pas seulement la personne concernée.\n\n⚠ DEMANDER LE DÉLAI AVANT D'ANNONCER UN RENDEZ-VOUS : les services de santé mentale universitaires ont souvent de longues listes d'attente.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","Centre médical Epsylon — Addictions","Régional / Toutes communes","Consultations addictions sur deux sites : Saint-Michel et Saint-Luc.","Adultes","02 614 37 50","","epsylon.be","Cliniques de l'Europe (Saint-Michel) et Cliniques Saint-Luc","","DEUX SITES, DEUX NUMÉROS : 02 614 37 50 pour les Cliniques de l'Europe (Saint-Michel), 02 764 21 21 pour Saint-Luc.\n\n⚠ POUR UNE CURE DE SEVRAGE, ce n'est pas ici : c'est LA RAMÉE, avec sa séance d'information du jeudi à 10 h. Ici, ce sont des consultations.\n\nRéseau Epsylon.\n\nSource : epsylon.be, relevé le 08/08/2026."),
  d("addictions","Équipe mobile — SYNER'SANTE / Le Renfort (Enaden)","Régional / Toutes communes","Une équipe qui se déplace, quand la personne ne peut pas venir.","Professionnels et personnes concernées","0493 26 04 66","","enaden.be","","","POUR QUAND LA PERSONNE NE SE DÉPLACE PAS. C'est nous qui appelons pour demander qu'ils viennent — c'est le principe d'une équipe mobile, et on n'y pense presque jamais.\n\nMédico-psychosocial, rattaché à Enaden.\n\nSource : projetlama.be (répertoire des dispositifs) et enaden.be, relevés le 08/08/2026."),
  d("addictions","Équipe mobile — COVER (Projet Lama)","Régional / Toutes communes","L'équipe qui va voir les gens en hébergement d'urgence, en squat ou en rue.","Personnes sans logement qui consomment","02 486 53 09","equipe-cover@projetlama.be","cover.brussels","","","EXACTEMENT NOTRE PUBLIC : COVER accompagne, sur le plan socio-sanitaire, les personnes en HÉBERGEMENT D'URGENCE, EN SQUAT OU EN RUE qui consomment. Ils se déplacent — on peut les appeler pour quelqu'un qui n'ira jamais dans un service.\n\nFinancé par la Cocom.\n\n⚠ À VÉRIFIER AVANT DE S'Y FIER : en décembre 2025, les équipes mobiles du Projet Lama étaient annoncées comme MENACÉES DE DISPARITION faute de financement. Appeler pour confirmer qu'elles tournent encore.\n\nOn peut aussi écrire à equipe-cover@projetlama.be.\n\nSource : cover.brussels et projetlama.be, relevés le 08/08/2026."),
  d("addictions","Équipe mobile — ARTHA (Projet Lama)","Anderlecht","Pour les personnes exilées qui consomment — et leurs bureaux sont rue Gheude.","Personnes en exil, situation de vulnérabilité","0456 18 95 32","equipe-artha@projetlama.be","projetlama.be","Rue Gheude 47-49, 1070 Anderlecht","","DANS NOTRE COMMUNE, rue Gheude — la même rue que les Infirmiers de rue et la Fédération des Services Sociaux.\n\nPOUR QUI : les personnes usagères de drogues EN SITUATION D'EXIL, avec de la médiation interculturelle. Quand la langue et le parcours migratoire s'ajoutent à la consommation, les services habituels ne suffisent pas.\n\nÉquipe mobile : ils se déplacent. Créée à l'automne 2019.\n\n⚠ À VÉRIFIER : en décembre 2025, les équipes mobiles du Projet Lama étaient annoncées comme menacées faute de financement. Appeler pour confirmer.\n\nSource : projetlama.be, relevé le 08/08/2026."),
  urgent(d("addictions","Équipe de liaison (Transit)","Régional / Toutes communes","Ils vont dans la rue, à la rencontre des gens qui n'iront jamais dans un service.","Personnes en rue qui consomment","0477 34 50 86","","transitasbl.be","","","MARAUDES ET APPROCHE COMMUNAUTAIRE : c'est l'équipe qui va vers, en rue, avec du matériel de réduction des risques. On peut les appeler pour signaler une situation ou un lieu.\n\nRattachée à Transit, rue Stephenson — la même maison que l'hébergement de crise et le comptoir.\n\nSource : transitasbl.be, relevé le 08/08/2026.")),
  urgent(d("addictions","Médibus (Le Pilier)","Régional / Toutes communes","Le bus qui va aux gens — mardi et jeudi, place Sainctelette.","Personnes en rue qui consomment","0493 89 12 37","","modusvivendi-be.org","Place Sainctelette, 1080 Molenbeek","Mardi et jeudi 15h–17h30","UN BUS, PAS UN BUREAU : il se gare place Sainctelette, à Molenbeek, LE MARDI ET LE JEUDI de 15 h à 17 h 30. Matériel de réduction des risques, rencontre, orientation.\n\nPour quelqu'un qui ne franchira jamais la porte d'une association, un bus dans la rue est parfois la seule chose qui marche.\n\nPorté avec DUNE et Médecins du Monde.\n\n⚠ Deux jours par semaine seulement, et deux heures et demie. Vérifier avant d'annoncer un passage.\n\nSource : modusvivendi-be.org et dune-asbl.be, relevés le 08/08/2026.")),
  d("addictions","L'Ambulatoire — Forest","Forest","Suivi psycho-social pendant la détention et à la sortie.","Personnes détenues ou sortant de détention","02 848 50 18","","","","","LE MOMENT CLÉ EST LA SORTIE : un suivi qui commence EN détention et continue dehors évite la rupture du jour de la libération, qui est le moment de toutes les rechutes.\n\nVoir aussi CAP-ITI pour la consommation et Rizome-Bxl pour le logement et les dettes — les trois se complètent.\n\n⚠ Conditions d'accès à confirmer par téléphone.\n\nRelevé le 08/08/2026."),
  d("addictions","Espaces femmes (créneaux réservés)","Régional / Toutes communes","Créneaux d'accueil réservés aux femmes dans plusieurs services.","","","","","","","DUNE : lundis 19h–21h30 · Transit : mardis 13h–16h · M.A.S.S. & Le Pilier : vendredis 14h–16h30 · DoucheFLUX : mercredis · La Trace : 1ers mardis du mois"),
  d("addictions","Wops de nuit","Woluwe-Saint-Lambert","Le centre de NUIT : on y dort, on garde ses journées.","Adultes","02 474 30 40","","wops-asbl.be","Chaussée de Roodebeek 471, 1200 Woluwe-Saint-Lambert","","CE QUI EST RARE : un centre psychothérapeutique DE NUIT. La personne garde ses journées — travail, formation, démarches — et vient dormir dans un cadre soignant. Quand ce sont les nuits qui posent problème et qu'une hospitalisation complète serait de trop.\n\nSÉJOUR DE 6 MOIS, renouvelable une seule fois.\n\nMême maison que WOPS de jour et que le service de santé mentale — voir la fiche WOPS en Santé mentale.\n\nSource : wops-asbl.be, relevé le 08/08/2026."),
  d("addictions","Centre de jour Enaden","Forest","Centre de jour — adultes, et une unité pour les 15-25 ans.","Adultes · jeunes 15–25 ans","02 644 55 72","","enaden.be","Jeunes : rue des Anciens Étangs 55, 1190 Forest","","DEUX PUBLICS, DEUX NUMÉROS :\n• Adultes — 02 644 55 72. Six mois, deux ans au maximum.\n• JEUNES DE 15 À 25 ANS — 02 616 68 60, rue des Anciens Étangs 55 à Forest. C'est une unité à part, pensée pour eux ; ne pas envoyer un jeune sur la ligne adultes.\n\nSource : enaden.be et platformbxl.brussels, relevés le 08/08/2026."),
  d("addictions","Hôpital de jour le Quotidien (Fond'Roy)","Uccle","Hôpital de jour addictions — on dort chez soi, on se soigne la journée.","Adultes","02 431 77 00","","epsylon.be","","","LA DIFFÉRENCE AVEC UNE CURE : la personne rentre dormir chez elle. Pour quelqu'un qui a un logement et ne veut pas le quitter, ou qui a des enfants, c'est ce qui rend le soin possible.\n\nLe 02 431 77 00 est aussi le numéro des PRÉ-ADMISSIONS de Fond'Roy — c'est par là qu'on commence.\n\nRéseau Epsylon, avec La Ramée.\n\nSource : epsylon.be, relevé le 08/08/2026."),
  d("addictions","Wops de jour","Woluwe-Saint-Lambert","Le centre de JOUR : on se soigne la journée, on rentre dormir chez soi.","Adultes","02 736 90 86","","wops-asbl.be","Chaussée de Roodebeek 471, 1200 Woluwe-Saint-Lambert","","L'INVERSE DU CENTRE DE NUIT, dans la même maison : ici on vient la journée et on rentre dormir chez soi.\n\nWOPS a quatre unités en un seul lieu — santé mentale, centre de jour, centre de nuit et lieu de liens. Voir la fiche WOPS en Santé mentale pour l'ensemble.\n\nSource : wops-asbl.be, relevé le 08/08/2026."),
  d("addictions","C.A.T.S. Solbosch","Uccle","Post-cure résidentielle — ici, l'abstinence fait partie du contrat.","Adultes de plus de 18 ans","02 649 79 01","","lesolbosch.be","Chaussée d'Alsemberg 206, 1190 Bruxelles","","⚠ ICI, L'ABSTINENCE EST PROPOSÉE ET FAIT PARTIE DU TRAVAIL — c'est l'inverse de La Pièce, qui ne l'exige pas. Bien choisir selon où en est la personne : envoyer quelqu'un qui consomme encore dans une post-cure, c'est le mettre en échec.\n\nCOMMENT ON ENTRE : une SÉANCE D'INFORMATION ouverte à tous explique le fonctionnement — et présente aussi d'autres pistes du réseau si ce n'est pas le bon endroit. Ensuite, deux entretiens : c'est la procédure d'admission.\n\nCOMBIEN DE TEMPS : un contrat de base de 5 MOIS, prolongeable par tranches de 3 mois.\n\nPour les plus de 18 ans dont l'alcool, les drogues ou les médicaments sont devenus un problème majeur du quotidien.\n\nSource : lesolbosch.be et platformbxl.brussels, relevés le 08/08/2026."),
  d("addictions","CHIREC — Sainte-Anne/Saint-Remi (Anderlecht)","Anderlecht","Consultations ambulatoires en addictologie, dans un hôpital généraliste de proximité.","","02 434 37 65","","chirec.be","","","LE RÉSEAU CHIREC — un même groupe, plusieurs portes. Appeler l'un ne donne pas accès à tout : chaque site a ses services.\n\nLES TROIS SITES PRINCIPAUX :\n• Sainte-Anne Saint-Remi — ANDERLECHT, notre commune. Hôpital généraliste de proximité, 300 lits.\n• Delta — Auderghem. Le plus récent et le plus gros, 500 lits, avec urgences et SMUR.\n• Braine-l'Alleud - Waterloo — Brabant wallon, 300 lits.\n\nLES CONSULTATIONS ET LA CHIRURGIE DE JOUR : cliniques de la Basilique et Edith Cavell ; centres médicaux Parc Léopold, Europe-Lambermont, CityClinic Louise et Jean Monnet.\n\nCE QU'IL FAUT EN RETENIR : pour une URGENCE avec SMUR c'est Delta ; pour du généraliste de proximité, Sainte-Anne Saint-Remi est à côté de chez nous.\n\nSource : informations transmises par l'équipe le 08/08/2026, à recouper avec chirec.be."),
  d("addictions","Hôpital Universitaire UZ Brussel","Jette","Consultations en addictologie — hôpital NÉERLANDOPHONE.","Adultes","02 477 60 12","","uzbrussel.be","Laarbeeklaan 101, 1090 Jette","","⚠ C'EST UN HÔPITAL NÉERLANDOPHONE. On y est reçu en français, mais le dossier, les courriers et une partie de l'équipe travaillent en néerlandais. À dire à la personne avant, et à prendre en compte si elle ne parle ni l'un ni l'autre.\n\nConsultations ambulatoires en addictologie.\n\nLeurs urgences : 02 477 51 00.\n\nCOMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : uzbrussel.be, relevé le 08/08/2026."),
  d("addictions","Hôpital Iris Sud — Molière-Longchamp","Forest","Consultations en addictologie — réseau IRIS, comme Saint-Pierre, Brugmann et Bracops.","Adultes","02 432 81 32","","his-izz.be","","","RÉSEAU IRIS SUD, avec Bracops (Anderlecht) et Etterbeek-Ixelles — donc dans le même grand réseau public que Saint-Pierre et Brugmann. Voir la fiche « Chercher quelqu'un aux urgences ».\n\nConsultations ambulatoires en addictologie.\n\nCOMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : his-izz.be, relevé le 08/08/2026."),
  d("addictions","Cliniques Saint-Luc — alcoologie / hépatologie","Woluwe-Saint-Lambert","Unité d'alcoologie et unité intégrée d'hépatologie.","","02 764 11 11","","saintluc.be","Avenue Hippocrate 10, 1200 Woluwe-Saint-Lambert","","⚠ NUMÉRO CORRIGÉ LE 08/08/2026 : la fiche portait le 02 605 60 00, qui est celui d'un autre hôpital. Le standard de Saint-Luc est le 02 764 11 11.\n\nAvenue Hippocrate 10, 1200 Woluwe-Saint-Lambert.\n\nSource : saintluc.be, relevé le 08/08/2026."),
  d("addictions","Centre psycho-social St Alexius","Bruxelles-Ville","Hôpital psychiatrique avec service addictologie — NÉERLANDOPHONE.","Adultes","02 512 90 33","","alexianen.be","","","⚠ ÉTABLISSEMENT NÉERLANDOPHONE. Le vérifier avant d'y envoyer quelqu'un qui ne parle que le français.\n\nCOMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","Clinique Sans Souci","Jette","Hôpital psychiatrique avec service addictologie.","Adultes","02 478 04 33","","sanssouci.be","","","COMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","Clinique Fond'Roy (Epsylon)","Uccle","Hôpital psychiatrique avec service addictologie — pré-admissions au même numéro.","Adultes","02 431 77 00","","epsylon.be","","","LES PRÉ-ADMISSIONS SE PRENNENT AU 02 431 77 00 — c'est par là qu'on commence, pas en se présentant.\n\nRéseau Epsylon, avec La Ramée. ⚠ Pour une CURE de sevrage, c'est La Ramée qu'il faut, avec sa séance d'information du jeudi — pas Fond'Roy.\n\nCOMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : epsylon.be, relevé le 08/08/2026."),
  d("addictions","Clinique Sanatia","Régional / Toutes communes","Hôpital psychiatrique avec service addictologie.","","02 605 60 00","","","","","⚠ NUMÉRO À VÉRIFIER : le 02 605 60 00 figurait aussi sur la fiche de Saint-Luc, qui a un autre standard. L'un des deux était faux — celui de Saint-Luc est corrigé, celui-ci reste à confirmer par un appel.\n\nRelevé le 08/08/2026."),
  d("addictions","Hôpital Molière","Forest","Service addictologie — réseau IRIS Sud.","Adultes","02 348 59 00","","his-izz.be","","","RÉSEAU IRIS SUD, avec Bracops et Etterbeek-Ixelles.\n\nCOMMENT ON ENTRE EN HÔPITAL PSYCHIATRIQUE, en général : ce n'est pas un service où l'on se présente. Il faut un ENTRETIEN DE PRÉ-ADMISSION avec l'équipe, obtenu par téléphone. Pour une urgence la nuit, ce sont les urgences psychiatriques ouvertes 24 h/24 : Saint-Jean, Erasme et Saint-Pierre.\n\nSource : his-izz.be, relevé le 08/08/2026."),
  d("addictions","Interface","Régional / Toutes communes","La parole des usagers et des proches, portée collectivement — pas un service d'aide.","Usagers et proches qui veulent s'impliquer","02 289 09 60","","platformbxl.brussels","","","⚠ ON N'Y ENVOIE PAS QUELQU'UN POUR ÊTRE AIDÉ : Interface porte la représentation des usagers et de leurs proches dans le réseau. C'est de la participation, pas du soin.\n\nÀ QUOI ÇA SERT POUR NOUS : quand une personne veut que son expérience serve à quelque chose, ou faire remonter ce qui ne va pas dans les services, c'est ici. Ça peut être un levier après un parcours difficile.\n\nMême numéro que la Plateforme Bruxelloise pour la Santé Mentale, qui l'héberge.\n\nSource : platformbxl.brussels, relevé le 08/08/2026."),
  d("addictions","Autre'Lieu","Schaerbeek","Une autre façon de penser la santé mentale — réflexion et rencontres, pas des soins.","Professionnels, usagers, proches","02 230 62 60","","autrelieu.be","","","⚠ CE N'EST PAS UN LIEU DE SOINS : on n'y prend pas rendez-vous pour être suivi. C'est un centre de réflexion et de rencontres sur les alternatives à la psychiatrie classique — journées d'étude, publications, débats.\n\nÀ QUOI ÇA SERT POUR NOUS : quand on cherche à comprendre autrement une situation qui coince, ou à se former sur ce que la psychiatrie ne règle pas.\n\nSource : autrelieu.be, relevé le 08/08/2026."),
  d("addictions","Aidants-Proches","Bruxelles-Ville","Pour celui qui aide au quotidien et s'épuise — reconnaissance, soutien, droits.","Proches aidants, y compris jeunes aidants","02 474 02 55","info@aidantsproches.brussels","aidantsproches.brussels","Boulevard de Smet de Naeyer 570, 1020 Laeken","","POUR CELUI QUI AIDE, PAS POUR LA PERSONNE MALADE. Quand un proche s'occupe seul de quelqu'un qui devient dépendant, il s'épuise en silence et personne ne lui demande jamais comment il va.\n\nILS PENSENT AUSSI AUX JEUNES AIDANTS — des enfants et des ados qui s'occupent d'un parent. On les voit rarement, et ils ne se nomment jamais comme ça.\n\nSoutien technique et humain, information sur les droits et le statut d'aidant proche.\n\nSource : aidantsproches.brussels, relevé le 08/08/2026."),
  d("addictions","Similes BXL","Ixelles","Pour les familles et proches — voir la fiche complète en Santé mentale.","Proches et familles","02 511 06 19","info@similes.brussels","similes.brussels","Rue Maria Malibran 49, 1050 Ixelles","Lun–Ven 9h–17h","POUR LES PROCHES, PAS POUR LA PERSONNE MALADE.\n\n⚠ NE PAS COMPOSER LE 0408.951.208 qui circule : c'est leur numéro d'entreprise, pas un téléphone. Le vrai est le 02 511 06 19.\n\nLa fiche complète est dans le domaine SANTÉ MENTALE — groupes de parole, formations, entretiens, et l'information sur les droits et la gestion des biens.\n\nSource : similes.brussels, relevé le 08/08/2026."),
  d("addictions","Réseau Nomade","Saint-Gilles","Réseau de professionnels autour du savoir des personnes concernées — pas un service où l'on envoie quelqu'un.","Professionnels et personnes concernées","","simon.lemaire@dune-asbl.be","reseaunomade.be","Avenue Henri Jaspar 124, 1060 Saint-Gilles","","⚠ ON N'Y ENVOIE PAS UN BÉNÉFICIAIRE : ce n'est pas un lieu d'aide mais un RÉSEAU DE PROFESSIONNELS, qui rassemble des associations bruxelloises autour de la participation et du savoir des personnes concernées.\n\nÀ QUOI ÇA SERT POUR NOUS : les « Midis Nomades », des rencontres où l'on parle de pair-aidance et de participation, ouvertes aussi aux personnes concernées. Et un répertoire des initiatives participatives, où l'on peut inscrire un projet.\n\nPas de téléphone : le contact se fait par mail, avec Simon Lemaire.\n\nSource : reseaunomade.be, relevé le 08/08/2026."),
  d("addictions","Rizome-Bxl","Bruxelles-Ville","Sortie de prison : accompagnement, relogement — et médiation de dettes.","(Ex-)détenus et leurs proches","02 209 34 00","","rizome-bxl.be","Boulevard Anspach 41, 1000 Bruxelles","","DEUX CHOSES QU'ON NE TROUVE PAS ENSEMBLE AILLEURS :\n• UN DISPOSITIF LOGEMENT pour les personnes qui sortent de prison — le moment où tout se joue, et où presque personne ne prend le relais.\n• LA MÉDIATION DE DETTES. Une sortie de détention s'accompagne presque toujours de dettes accumulées, d'amendes et de saisies. Ils sont agréés pour ça.\n\nIls accompagnent aussi LES PROCHES des détenus.\n\nAgréé par la Commission communautaire commune.\n\nSource : rizome-bxl.be, relevé le 08/08/2026."),
  d("addictions","RaPR — Relais Psychosocial pour la Réinsertion","Schaerbeek","Accompagnement des personnes détenues ou sortant de détention.","(Ex-)détenus","02 211 34 40","","","Schaerbeek","","Accompagnement psychosocial pendant et après la détention, tourné vers la réinsertion.\n\nAVEC QUI ÇA SE COMBINE : Rizome-Bxl pour le logement et les dettes, CAP-ITI si la personne consomme, L'Ambulatoire pour le suivi. Aucun des quatre ne fait tout — les nommer ensemble évite que la personne croie avoir trouvé la seule porte.\n\n⚠ Conditions d'accès et adresse précise à confirmer par téléphone.\n\nRelevé le 08/08/2026."),
  d("addictions","I.Care asbl","Saint-Gilles","Santé en prison et continuité des soins à la sortie — prison de Haren. À appeler AVANT la libération.","Personnes détenues et sortant de détention","02 218 51 01","info@i-careasbl.be","i-careasbl.be","Rue Berckmans 109, 1060 Saint-Gilles","","LE MOMENT OÙ ILS SERVENT LE PLUS, c'est la SORTIE : leur métier est la continuité des soins pendant l'enfermement, lors d'un transfert et à la libération. Un traitement qui s'arrête le jour de la sortie, c'est la rechute — les appeler AVANT la date, pas après.\n\nOÙ ILS TRAVAILLENT : la prison de Haren, hommes et femmes, prévenus et condamnés, plus trois établissements wallons. Aussi les annexes psychiatriques et les centres fermés.\n\nCE QU'ILS FONT DEDANS : promotion de la santé en cellule (Cellul'Air), groupes, Pow-Wow (aller vers, sans rendez-vous), la bibliothèque, la santé des femmes et la précarité menstruelle, et de la réduction des risques liés aux drogues en détention.\n\nSources : i-careasbl.be et platformbxl.brussels, relevés le 08/08/2026."),

  // ===== Pratiques : conduite à tenir face à un risque suicidaire (généralisée, sans données internes) =====
  m("Risque suicidaire","Repères généraux face à un risque suicidaire ou une tentative.","RISQUE SUICIDAIRE IDENTIFIÉ\n• Proposer à la personne de voir un·e psy (du centre ou externe).\n• Prévenir l'équipe de la fragilité de la personne, sans entrer dans les détails, pour qu'une attention particulière soit portée.\n• Demander de transmettre toute observation particulière du comportement.\n• Si la personne refuse : contacter l'équipe mobile de crise de la zone.\n• Si un·e psy objective un risque élevé de passage à l'acte : proposer un accompagnement aux urgences psychiatriques et/ou une feuille de liaison, avec reprise de contact.\n\nTENTATIVE DE SUICIDE\n• Appeler le 112.\n• Contacter les urgences pour expliquer la situation et demander une évaluation par un·e psychiatre.\n• Si retour en rue : avertir le réseau de la personne.\n\nURGENCE VITALE : 112 · Prévention du suicide (gratuit, 24h/24) : 0800 32 123."),

  // ===== Formations : Violentomètre =====
  /* Écrite le 01/08/2026 à sa demande : « toutes ces informations qui, par la rigolette,
     amènent à l'apprentissage du sans-abrisme ». D'où le jeu au milieu — on retient un mot
     qu'on a cherché, pas un mot qu'on a lu. Les définitions sont celles du Syndicat des
     immenses, recopiées, pas reformulées : ce sont leurs mots. */
  formation("Les mots qu'on emploie",
    "SDF, sans-abri, immense : d'où viennent les mots, ce qu'ils font aux gens, et le vocabulaire inventé par les personnes concernées elles-mêmes.",[],
    `<div class="f-page">
  <div class="f-lead">${icon('petition')} <b>« Mal nommer les gens ajoute à leur malheur sur la terre. »</b> C'est le principe du Syndicat des immenses : ne pas savoir nommer une souffrance, c'est ne pas pouvoir la dénoncer. Ils ont donc fabriqué les mots qui manquaient — <b>200 à ce jour</b>.</div>

  <div class="f-h">1. Pourquoi les mots comptent</div>
  <div class="f-lead">« SDF » : sans domicile <b>fixe</b> — comme si le problème était la fixité. « Sans-abri » : comme si un abri suffisait. « Précaire », « exclu », « bénéficiaire » : chaque fois, la personne <b>disparaît derrière son problème</b>.</div>
  <div class="f-note">${icon('alert')} Le Syndicat rappelle qu'il n'est pas un groupe de parole mais un <b>groupe de pression</b>. La différence tient dans un mot : on ne les écoute pas, on négocie avec eux.</div>

  <div class="f-h">2. Immense — le mot qu'ils ont choisi</div>
  <div class="f-grid">
    <div class="f-card"><div class="fn">${icon('star')} Immense</div><div class="fw"><b>I</b>ndividu dans une <b>M</b>erde <b>M</b>atérielle <b>É</b>norme mais <b>N</b>on <b>S</b>ans <b>E</b>xigences.<br>Le problème est dit — <b>matériel</b> — sans que la personne y soit réduite. Et elle a des <b>exigences</b>, pas des besoins.</div></div>
    <div class="f-card"><div class="fn">${icon('user')} Escapé·e</div><div class="fw"><b>E</b>nclos·e dans le <b>S</b>ystème, mais <b>Cap</b>able <b>A</b>isément et <b>P</b>ériodiquement de s'en <b>É</b>chapper.<br>Celle qui a un logement et de quoi souffler : partir, se distraire, décompresser. <b>C'est nous.</b></div></div>
    <div class="f-card"><div class="fn">${icon('compass')} Immenscapé·e</div><div class="fw">Immense dans certaines dimensions de sa vie, escapé·e dans d'autres. La plupart des gens, en réalité — la frontière n'est pas un mur.</div></div>
    <div class="f-card"><div class="fn">${icon('home')} Sans-chez-soirisme</div><div class="fw">Le mot juste à la place de « sans-abrisme ». <b>Un abri n'est pas un chez-soi</b> : une place en dortoir ne fait pas un domicile.</div></div>
  </div>

  <div class="f-h">3. Pourquoi ça dure : les quatre piliers</div>
  <div class="f-lead">Quatre mots expliquent, selon eux, pourquoi le sans-chez-soirisme <b>explose en Belgique et implose en Finlande</b>.</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Hiérarchisme</b><span>Croire que toutes les vies humaines n'ont pas la même valeur.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Désuniversalisme</b><span>Deux poids, deux mesures : à situation égale, traitement différent.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Allomorphisme</b><span>Tendance à croire qu'une situation impensable, inacceptable, insupportable ou invivable <b>pour soi</b> est gérable, acceptable, supportable ou vivable <b>pour d'autres</b>.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Nécropolitique</b><span>Punir les personnes sans chez-soi d'être encore en vie, en leur rendant la vie impossible.</span></div></div>
  </div>
  <div class="f-note">${icon('bulb')} <b>Celui qui pique le plus, c'est l'allomorphisme.</b> C'est le mot qui décrit le moment où on se dit « bon, elle a une place, ça va » — pour une nuit qu'on ne passerait pas soi-même.</div>

  <div class="f-h">4. Comment ça s'arrête : deux mots</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Udéskif</b><span>Acronyme approximatif d'« <b>Universalisation De Ce Qui Fonctionne</b> ». Ce qui marche déjà quelque part, pour quelques-uns, on le donne à tout le monde.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Créalpolitik</b><span>Le contraire de la realpolitik : se méfier des contraintes présentées d'entrée de jeu comme insurmontables, refuser les faux dilemmes qui paralysent l'imagination, rejeter la logique des « enveloppes fermées ».</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Éluctable</b><span>« Ce qui n'est pas inéluctable est éluctable. » Le sans-chez-soirisme n'est pas une fatalité : c'est une décision collective, qui peut se décider autrement.</span></div></div>
    <div class="f-step"><div class="sn">→</div><div class="st"><b>Fatalâche</b><span>Celle ou celui qui préfère penser que c'est une fatalité, et décide de ne pas remettre sa conviction en question.</span></div></div>
  </div>
  <div class="f-note">${icon('stats')} <b>La Finlande.</b> Elle a fait chuter son nombre de personnes sans chez-soi à l'échelle nationale. C'est l'argument central du Syndicat : la preuve que c'est possible existe déjà, ailleurs.</div>

  <div class="f-h">5. Le petit jeu des mots</div>
  <div class="f-lead">Devinez d'abord, dépliez ensuite. Un mot qu'on a cherché reste ; un mot qu'on a lu, non.</div>
  <div class="f-jeu">
    <details><summary>Une personne qui a un logement et de quoi s'échapper de temps en temps</summary><p><b>Escapé·e.</b> Enclos·e dans le Système, mais Capable Aisément et Périodiquement de s'en Échapper.</p></details>
    <details><summary>Croire qu'une nuit qu'on ne supporterait pas soi-même est supportable pour un autre</summary><p><b>Allomorphisme.</b> Le pilier le plus discret, et le plus efficace.</p></details>
    <details><summary>Donner à tout le monde ce qui marche déjà pour quelques-uns</summary><p><b>Udéskif.</b> Universalisation De Ce Qui Fonctionne.</p></details>
    <details><summary>Le contraire d'inéluctable</summary><p><b>Éluctable.</b> Ce qui n'est pas inéluctable est éluctable — donc ça peut s'arrêter.</p></details>
    <details><summary>Quelqu'un qui trouve que c'est triste mais que c'est comme ça</summary><p><b>Fatalâche.</b> Fataliste, et un peu lâche.</p></details>
    <details><summary>Un abri n'est pas un chez-soi : comment dit-on, alors ?</summary><p><b>Sans-chez-soirisme.</b> Et pas sans-abrisme.</p></details>
  </div>
  <div class="f-note">${icon('note')} Le <b>Thésaurus de l'immensité</b> (Caroline Lamarche et Laurent d'Ursel, La Lettre volée, mars 2024) contient les 200 mots : <b>17</b> pour identifier et combattre le sans-chez-soirisme, <b>183</b> pour le décrire dans son quotidien. La brochure <b>« 17 mots pour en finir avec le sans-chez-soirisme »</b> (ARC) reprend les dix-sept, et se lit en une heure.</div>

  <div class="f-h">6. Le Syndicat des immenses</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>D'où il vient</b><span>Mars 2019, du groupe « Les précaires en colère », après la première assemblée ouverte de Droit à un toit / Recht op een dak. Fondé par <b>Laurent d'Ursel</b>, qui avait créé DoucheFLUX.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Ce qu'il est</b><span>Un lobby citoyen, un groupe de pression et d'action — <b>pas</b> un groupe de parole. Trente-huit revendications à ce jour, une intervention publique par mois.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Où on le trouve</b><span>Tous les <b>lundis de 11h à 13h30</b>, chez DoucheFLUX, rue des Vétérinaires 84 à Anderlecht. Les réunions sont ouvertes.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Ce qu'il fabrique</b><span>L'Immense Festival, les universités d'été de l'immensité, des conférences gesticulées, des publications.</span></div></div>
  </div>

  <div class="f-h">7. DoucheFLUX, à quinze minutes d'ici</div>
  <div class="f-lead">Centre de jour ouvert en 2017 près de la gare du Midi, <b>dans notre commune</b> : 20 douches, une buanderie, 450 casiers. Douche 1 €, lessive 1 € les 3 kg, casier de 1 à 2 € la semaine. <b>Mercredi matin et début d'après-midi : réservé aux femmes.</b> 02 319 58 27.</div>
  <div class="f-note">${icon('chat')} <b>« Le rêve de la personne sans chez-soi n'est pas une douche, c'est un logement. »</b> — Laurent d'Ursel, RTBF, 2022. Le lieu qui donne des douches passe son temps à dire que la douche n'est pas la solution : être sans logement est un problème de <b>logement</b>, pas un problème social ou sanitaire. D'où leur projet Housing First, lancé en 2023.</div>

  <div class="f-h">8. Ce que ça change pour nous</div>
  <div class="f-do yes"><b>${icon('check')} À faire</b><ul>
    <li><b>Dire le nom des gens</b> avant leur catégorie. « Monsieur X », pas « le SDF de la 214 ».</li>
    <li><b>Se demander « et si c'était moi ? »</b> — c'est exactement le test que vise le mot allomorphisme.</li>
    <li><b>Y envoyer quelqu'un qui veut agir</b> plutôt que subir : le lundi, chez DoucheFLUX, c'est ouvert.</li>
    <li><b>Se servir des mots comme d'outils</b> en réunion et dans les rapports : ils rendent visible ce qu'on n'arrivait pas à formuler.</li>
  </ul></div>
  <div class="f-do no"><b>${icon('alert')} À ne pas faire</b><ul>
    <li><b>Ne pas imposer « immense » à quelqu'un</b> qui ne se reconnaît pas dedans. Un mot choisi par un groupe ne se colle pas de force sur une personne.</li>
    <li><b>Ne pas confondre le vocabulaire et l'action.</b> Ils le disent eux-mêmes : c'est un groupe de pression, pas un club de langue.</li>
    <li><b>Ne pas transformer ça en leçon de morale</b> entre collègues. Ce sont des outils, pas un examen de vertu.</li>
  </ul></div>

  <div class="f-note">${icon('note')} <b>Sources</b>, relevées le 01/08/2026 : syndicatdesimmenses.be (bienvenue, piliers du sans-chez-soirisme persistant, thésaurus de l'immensité, boîte à armes politiques, l'immense festival) · arc-culture.be — « 17 mots pour en finir avec le sans-chez-soirisme » · Caroline Lamarche et Laurent d'Ursel, <i>Le Thésaurus de l'immensité</i>, La Lettre volée, 2024 · maisonmedicale.org — « L'immense combat du Syndicat des immenses » · doucheflux.be et anderlecht.be · RTBF, 25/08/2022 et Immense Festival · moustique.be, 01/03/2024.<br><br>Les définitions sont <b>recopiées</b> du Syndicat, pas reformulées : ce sont leurs mots, pas les nôtres.</div>
</div>`, "Les mots"),
  formation("TAM — Technique d'Audition de Mineurs","Comment la police recueille la parole d'un enfant victime ou témoin, et ce que ça change pour nous.",[],
`<div class="f-page">
  <div class="f-lead">${icon('camera')} <b>Le TAM, c'est l'audition filmée d'un enfant victime ou témoin</b>, menée par un policier spécialement formé. Principe clé : <b>une seule audition, bien faite</b> — chaque fois qu'on refait raconter l'enfant, on abîme son témoignage.</div>

  <div class="f-h">En deux mots</div>
  <div class="f-grid">
    <div class="f-card"><div class="fn">${icon('user')} Qui</div><div class="fw">Des policiers volontaires, formés et diplômés (116 h sur 4 semaines : théorie + jeux de rôle). Section TAM créée en 2001 à la police fédérale.</div></div>
    <div class="f-card"><div class="fn">${icon('stats')} Combien</div><div class="fw">Environ 6 500 auditions filmées de mineurs par an en Belgique.</div></div>
    <div class="f-card"><div class="fn">${icon('juridique')} Le cadre</div><div class="fw">Loi du 28 novembre 2000 sur la protection pénale des mineurs — articles 91bis à 101 du Code d'instruction criminelle.</div></div>
    <div class="f-card"><div class="fn">${icon('compass')} La méthode</div><div class="fw">Protocole <b>NICHD</b>, la référence internationale : questions ouvertes, récit libre, zéro suggestion.</div></div>
  </div>

  <div class="f-h">Ce que dit la loi</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Qui décide</b><span>C'est le procureur du Roi ou le juge d'instruction qui ordonne l'enregistrement audiovisuel — jamais nous, jamais l'institution.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Pour quelles infractions</b><span>Les faits listés à l'article 91bis : essentiellement mœurs, maltraitance, traite des êtres humains, violences.</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>L'accord de l'enfant</b><span>L'enregistrement se fait avec son consentement. <b>En dessous de 12 ans, il suffit de l'informer</b> — mais on lui explique toujours.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Une audition qui compte</b><span>La vidéo peut remplacer une comparution : elle évite à l'enfant de répéter son récit devant le tribunal.</span></div></div>
  </div>

  <div class="f-h">Comment se passe l'audition (protocole NICHD)</div>
  <div class="f-steps">
    <div class="f-step"><div class="sn">1</div><div class="st"><b>Accueil et présentation</b><span>Local adapté, l'enfant comprend qui est en face de lui et pourquoi c'est filmé.</span></div></div>
    <div class="f-step"><div class="sn">2</div><div class="st"><b>Les règles du jeu</b><span>« Tu peux me dire je ne sais pas. » « Si je me trompe, corrige-moi. » « On ne dit que ce qui est vrai. »</span></div></div>
    <div class="f-step"><div class="sn">3</div><div class="st"><b>Entraînement au récit</b><span>On fait raconter un souvenir neutre et récent (une fête, une journée d'école). C'est l'étape la plus importante : l'enfant apprend à raconter longuement avant qu'on aborde les faits.</span></div></div>
    <div class="f-step"><div class="sn">4</div><div class="st"><b>Transition vers les faits</b><span>Amenée par des questions très ouvertes, sans jamais nommer une personne ni un acte à la place de l'enfant.</span></div></div>
    <div class="f-step"><div class="sn">5</div><div class="st"><b>Récit libre</b><span>« Raconte-moi tout ce qui s'est passé, du début jusqu'à la fin. » Puis on relance : « Et ensuite ? », « Parle-moi encore de ça. »</span></div></div>
    <div class="f-step"><div class="sn">6</div><div class="st"><b>Questions plus précises, en dernier</b><span>Seulement si nécessaire, et toujours après le récit libre — jamais avant.</span></div></div>
    <div class="f-step"><div class="sn">7</div><div class="st"><b>Clôture</b><span>Retour à un sujet neutre, remerciements, explication de la suite.</span></div></div>
  </div>

  <div class="f-h">Notre rôle à nous</div>
  <div class="f-do yes"><b>${icon('check')} À faire</b><ul>
    <li><b>Accueillir la parole</b> si l'enfant se confie : écouter, ne pas couper, rester calme.</li>
    <li><b>Noter mot à mot</b> ce qu'il a dit spontanément, avec la date, l'heure et le contexte. Ses mots à lui, pas les nôtres.</li>
    <li><b>Signaler sans attendre</b> à la hiérarchie et à l'autorité compétente (parquet / police / SAJ-SPJ selon la situation).</li>
    <li><b>Le rassurer</b> : il a bien fait de parler, il n'est pas responsable, on va s'occuper de lui.</li>
  </ul></div>
  <div class="f-do no"><b>${icon('alert')} À ne pas faire</b><ul>
    <li><b>Ne pas mener l'enquête.</b> Ce n'est ni notre rôle ni notre formation.</li>
    <li><b>Ne pas faire répéter</b> le récit, et ne pas faire raconter à plusieurs collègues : chaque redite fragilise le témoignage.</li>
    <li><b>Aucune question fermée ou suggestive</b> (« C'est papa qui t'a fait ça ? », « Il t'a touchée ici ? ») — elles peuvent contaminer la mémoire de l'enfant et rendre son récit inutilisable au procès.</li>
    <li><b>Ne rien promettre</b> qu'on ne maîtrise pas (« ça restera entre nous », « il ira en prison »).</li>
  </ul></div>

  <div class="f-do no" style="margin-top:14px"><b>${icon('alert')} Ne pas confondre</b><ul>
    <li><b>Mineur victime ou témoin</b> → TAM, audition filmée.</li>
    <li><b>Mineur suspect</b> → régime <b>Salduz</b> : droit à un avocat, cadre totalement différent.</li>
  </ul></div>

  <div class="f-note"><b>Sources :</b> Police fédérale — section TAM (police.be) · Loi du 28.11.2000 relative à la protection pénale des mineurs, art. 91bis à 101 du Code d'instruction criminelle (ejustice.just.fgov.be) · Protocole d'audition du NICHD · Guide Social — « Auditions des mineurs victimes ou témoins d'infractions ».<br><br>Cette fiche est un <b>repère de sensibilisation</b>, pas une formation certifiante ni un avis juridique. En cas de doute sur une situation : coordination + autorité compétente.</div>
  ${ficheLiens("Où l’envoyer",[
    ["SDJ","Service Droit des Jeunes"],
    ["Services d'Aide aux Justiciables","Aide aux Justiciables"],
    ["SOS Viol","SOS Viol"],
    ["Bureau d'Aide Juridique","Un avocat gratuit (BAJ)"]
  ])}

</div>`, "Entretien & écoute"),
  formation("Violentomètre — repérer les violences","Situer une relation : saine, vigilance, ou danger. Outil de sensibilisation (violences faites aux jeunes femmes).",[],`<div class="vm"><div class="vm-z green"><b>Profite — la relation est saine quand il…</b><ul><li>respecte tes décisions et tes goûts</li><li>accepte tes ami·es et ta famille</li><li>a confiance en toi</li><li>est content quand tu t'épanouis</li><li>s'assure de ton accord pour ce que vous faites ensemble</li></ul></div><div class="vm-z orange"><b>Vigilance, dis stop ! Il y a de la violence quand il…</b><ul><li>t'ignore quand il est en colère</li><li>te fait du chantage si tu refuses</li><li>rabaisse tes opinions et tes projets</li><li>se moque de toi en public, te manipule, est jaloux en permanence</li><li>contrôle tes sorties, habits, maquillage</li><li>fouille tes textos, mails, applis</li><li>insiste pour que tu envoies des photos intimes</li><li>t'isole de ta famille et de tes ami·es</li></ul></div><div class="vm-z red"><b>Protège-toi, demande de l'aide — tu es en danger quand il…</b><ul><li>te traite de folle quand tu lui fais des reproches</li><li>te pousse, tire, gifle, secoue, frappe</li><li>menace de se suicider à cause de toi</li><li>te touche sans ton consentement</li><li>menace de diffuser des photos intimes</li><li>t'oblige à regarder des films pornos ou à avoir des relations sexuelles</li></ul></div><p class="vm-src">Outil : Ville de Paris / Seine-Saint-Denis — En avant toutes.</p>${ficheLiens("Où l’envoyer",[
    ["Écoute Violences Conjugales","Écoute Violences Conjugales — 0800"],
    ["CPVCF","Centre de Prévention des Violences"],
    ["Talita","Talita — hébergement pour femmes"],
    ["SOS Viol","SOS Viol"]
  ])}
</div>`, "Violences")
];

function d(dom,nom,commune,desc,pub,tel,mail,site,adr,horaires,notes){
  return {id:uid(),fav:false,domaine:dom,nom,commune,desc,public:pub,referent:"",tel,mail,site,adr,horaires,notes};
}
/* CONSEILLÉE PAR L'ÉQUIPE : la fiche remonte en tête de son domaine, dans un
   paquet à part. Une recommandation de collègue vaut mieux qu'un annuaire. */
/* CONSEILLÉE PAR L'ÉQUIPE (rendu réel construit le 08/08/2026).
   ⚠ Jusqu'ici `reco` ne servait À RIEN : le drapeau était posé sur trois fiches
   et n'était lu nulle part. Goujonissimo se trouvait en tête du Médical par
   hasard, par ordre alphabétique. Mag : « je préférerais que ça se voie, et
   surtout qu'on puisse écrire POURQUOI ».
   Le deuxième argument est cette raison-là. Elle s'affiche telle quelle, en
   toutes lettres, sous le nom : « parce que l'équipe trouve ça chouette et
   qu'ils parlent beaucoup de langues » vaut mieux qu'une pastille muette. */
function reco(fiche, pourquoi){ fiche.reco=true; if(pourquoi) fiche.recoTxt=pourquoi; return fiche; }
/* ═══ ET SON CONTRAIRE : LA FICHE QU'ON DÉCONSEILLE (Mag, 08/08/2026) ═══
   « Et aussi ceux qu'on déconseille. » C'est au moins aussi utile que l'inverse :
   un service où l'équipe a envoyé quelqu'un et où ça s'est mal passé, on ne peut
   pas le deviner, et on y renvoie quelqu'un six mois plus tard.
   ⚠ LA RAISON EST OBLIGATOIRE dans les faits : « déconseillé » sans motif, c'est
   une rumeur. On écrit ce qui s'est passé, pas un jugement.
   La fiche N'EST PAS SUPPRIMÉE et ne descend pas au fond : elle reste à sa place,
   avec son avertissement. Une adresse qu'on déconseille reste parfois la seule. */
function deco(fiche, pourquoi){ fiche.deco=true; if(pourquoi) fiche.decoTxt=pourquoi; return fiche; }
/* Pose les étiquettes de tri sur une fiche (Culture : Musée, Gratuit, Extérieur…). */
function tags(fiche, liste){ fiche.tags=liste||[]; return fiche; }
function m(nom,desc,notes){
  return {id:uid(),fav:false,domaine:"methodes",nom,commune:"",desc,public:"",referent:"",tel:"",mail:"",site:"",adr:"",horaires:"",notes};
}
function cpas(nom,commune,tel,site,adr){
  return d("social",nom,commune,"Revenu d'intégration (RIS), aide sociale, guidance budgétaire, aide médicale urgente.","Habitants de la commune",tel,"",site,adr,"","");
}
/* Fiche-mémo (lecture/formation) : `memo` = texte long affiché en pleine page dans la fiche. */
function memo(dom,nom,desc,site,memoTxt){
  const o=d(dom,nom,"Régional / Toutes communes",desc,"Professionnels","","",site,"","",""); o.memo=memoTxt; return o;
}
/* Fiche « formation » : `page` = HTML riche (cartes/schéma) affiché à l'ouverture ;
   `metiers` = groupes de travailleurs concernés (filtre). Vide = pour tout le monde. */
function formation(nom,desc,metiers,page,theme){
  const o=d("formations",nom,"Régional / Toutes communes",desc,"Professionnels","","","","","",""); o.page=page; o.metiers=metiers||[]; o.theme=theme||""; return o;
}
/* ═══ LE BOUTON QUI MÈNE D'UNE FORMATION À UNE FICHE DU RÉSEAU (08/08/2026) ═══
   Ces deux fonctions doivent rester DANS CE SCRIPT-CI, avec `formation()` : les
   pages de formation sont écrites à l'intérieur de SAMPLE, et le hoisting des
   fonctions ne franchit pas la frontière d'un bloc <script>. Placées plus bas,
   elles n'existent pas encore quand SAMPLE se construit — et l'app entière tombe
   sur un « ficheLiens is not defined ». C'est arrivé, d'où ce commentaire.
   Elles sont PURES : elles n'écrivent que du HTML, sans lire DATA — qui n'existe
   pas non plus à ce moment-là. Le nom de la fiche est résolu au CLIC, par
   `allerFiche()`, qui vit avec le reste de la navigation.
   Même raison pour l'échappement fait à la main plutôt qu'avec `esc()` : `esc()`
   est déclarée dans le script d'après, donc introuvable d'ici. */
function fbEsc(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function ficheBtn(nom,libelle){
  const t=String(nom).replace(/'/g,"\\'");
  return '<button class="fbtn" onclick="allerFiche(\''+t+'\')">'+
    '<span class="ic">'+icon('compass')+'</span>'+fbEsc(libelle||nom)+'</button>';
}
function ficheLiens(titre,paires){
  return '<div class="f-h">'+fbEsc(titre||'Où l’envoyer')+'</div>'+
    '<div class="fboutons'+(paires.length===1?' n1':'')+'">'+
    paires.map(function(x){ return ficheBtn(x[0],x[1]); }).join('')+'</div>';
}
/* Modèle de mail : `objet` + `corps` copiables ; `keywords` pour le filtre par mot-clé. */
/* Fiche « Centre » : infos pratiques du quotidien (rythme, logistique). */
function centre(nom,desc,notes){
  return {id:uid(),fav:false,domaine:"centre",nom,commune:"",desc,public:"",referent:"",tel:"",mail:"",site:"",adr:"",horaires:"",notes};
}
function mailtpl(nom,desc,keywords,objet,corps,famille,genre){
  const o=d("mails",nom,"Régional / Toutes communes",desc,"Professionnels","","","","","",""); o.objet=objet; o.corps=corps; o.keywords=keywords||[];
  // Deux tris demandés par l'équipe : mail ou note, et médical ou social.
  o.famille = famille || ((keywords||[]).indexOf('Médical')>=0 ? 'Médical' : 'Social');
  o.genre   = genre || 'Mail';
  return o;
}
/* Note type : même fiche, mais rangée dans « Notes » (le corps sert de canevas à recopier). */
function notetpl(nom,desc,keywords,corps,famille){
  const o=mailtpl(nom,desc,keywords,'',corps,famille,'Note'); return o;
}
/* Guide de questions (arbre interactif) : `guideKey` renvoie vers GUIDES. */
function guide(nom,desc,metiers,guideKey,theme){
  const o=d("formations",nom,"Régional / Toutes communes",desc,"Professionnels","","","","","",""); o.isGuide=true; o.guideKey=guideKey; o.metiers=metiers||[]; o.theme=theme||""; return o;
}
/* Fiche « démarche » : format standard. `attention` = la particularité locale,
   c'est le champ qui explique pourquoi Anderlecht ≠ Molenbeek ≠ Ville de Bruxelles. */
function dem(type,cpasNom,commune,ou,comment,attention,delai,mail){
  return {id:uid(),fav:false,domaine:"demarches",demarche:type,
    nom:type+" — "+cpasNom, commune, desc:"", public:"", referent:"",
    tel:"", mail:mail||"", site:"", adr:"", horaires:"",
    ou:ou||"", comment:comment||"", attention:attention||"", delai:delai||"", maj:"", notes:""};
}

/* Une fiche marquée urgente reste dans son domaine ET remonte dans le panneau Urgences.
   Une seule fiche, deux endroits : rien à maintenir en double. */
function urgent(fiche){ fiche.urgent=true; return fiche; }
/* D'où vient ce qui est écrit sur la fiche. Sa règle, posée le 31/07/2026 : « surtout
   n'invente rien, donc source ». Ce qu'on n'a pas vérifié doit se dire dans le texte. */
function src(fiche, sources){ fiche.notes=sources||''; return fiche; }

/* Version du catalogue fourni : à incrémenter à chaque mise à jour des données de départ.
   La fusion (load) rafraîchit le catalogue tout en gardant les favoris et les fiches ajoutées par l'utilisateur. */
/* ── Étiquettes des maisons d'accueil ───────────────────────────────────────
   Posées par NOM, à part du catalogue, pour qu'on puisse les compléter au fil de
   l'eau sans toucher aux fiches. Chaque étiquette vient de ce que la fiche dit
   déjà (public admis, restrictions) — rien n'est deviné.
   ⚠️ MANQUE PARTOUT : l'accessibilité (ascenseur, plain-pied, chambre PMR).
   Une seule maison en parle aujourd'hui, Home Baudouin, et c'est pour dire que
   c'est difficile. À remplir à la main dès qu'on a l'information. */
const TAGS_MAISONS = {
  "Plateforme Informative de la Strada (PILS)":            ["Places libres en direct"],
  "Les Trois Pommiers":                                    ["Femmes","Avec enfants","Femmes enceintes"],
  "L'Ilot — Le 160 (accueil d'urgence)":                   ["Femmes","Couples","Avec enfants","Sans rendez-vous"],
  "Source — La Rive":                                      ["Tout public","Hommes","Femmes","Couples","Avec enfants"],
  "@ Home 18-24 (Petits Riens)":                           ["Hommes","Jeunes 18-24"],
  "Foyer Georges Motte (Armée du Salut)":                  ["Hommes","Sans rendez-vous"],
  "Home Baudouin (Œuvre de l'Hospitalité)":                ["Hommes","Sans rendez-vous","Escaliers — difficile en chaise"],
  "L'Ilot — Le 38":                                        ["Hommes"],
  "Maison d'accueil des Petits Riens":                     ["Hommes"],
  "Accueil Montfort":                                      ["Femmes","Sans enfants"],
  "Centre de prévention des violences conjugales et familiales": ["Femmes","Violences conjugales","Avec enfants"],
  "Chèvrefeuille":                                         ["Femmes","Avec enfants"],
  "Home Victor Du Pré (Œuvre de l'Hospitalité)":           ["Femmes","Avec enfants"],
  "La Maison Rue Verte":                                   ["Femmes","Violences conjugales","Avec enfants"],
  "Le Chant d'Oiseau":                                     ["Femmes","Avec enfants"],
  "Maison de la Mère et de l'Enfant (Armée du Salut)":     ["Femmes","Avec enfants"]
};
SAMPLE.forEach(function(p){ if(TAGS_MAISONS[p.nom]) p.tags=(p.tags||[]).concat(TAGS_MAISONS[p.nom]); });

/* Point de départ des itinéraires : le centre. */
const ITI_DEPART = 'Bd Prince de Liège 38, 1070 Anderlecht';
const APP_VERSION = 'v439';
/* 01/08/2026 : deux travaux se rejoignent ici — les CPAS d'Anderlecht, de la Ville de
   Bruxelles et de Forest, l'adresse de référence ; et le domaine Handicap, DoucheFLUX,
   le Syndicat des immenses, les soins infirmiers extérieurs. Le numéro passe au-dessus
   des deux, sinon un téléphone garderait la moitié de l'ancien catalogue. */
const SEED_VERSION = 97;
function slug(t){return (t||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,64);}
/* ═══ QUELLES FICHES D'HÉBERGEMENT SONT DE L'URGENCE (08/08/2026) ═══
   Marquées ici, en un seul endroit, à partir de CE QUE LA FICHE DIT D'ELLE-MÊME —
   pas d'un souvenir ni d'une intuition :
     Ariane          « accueil d'urgence de courte durée (3 × 7 jours), 24h/24 »
     Pierre d'Angle  « asile de nuit, accueil inconditionnel »
     CAW Archipel    « assistance sociale d'urgence »
     Albatros        « Hébergement d'urgence »
     L'Ilot — Le 160 « Maison d'accueil d'urgence », le nom le dit
     Opvanghuis      « Accueil d'urgence et à moyen terme »
   Et les TROIS PORTES D'ENTRÉE, qui ne sont pas des lits mais des numéros à faire
   quand tout est plein — leur place est du côté de l'urgence, parce qu'un appel ne
   peut jamais être un déplacement pour rien :
     Bruss'help · PILS · CAW Huis Brussel

   ⚠ LA RÈGLE DE CLASSEMENT, EN CAS DE DOUTE : une fiche ne passe en urgence que si
   elle dit explicitement urgence, nuit, 24h/24 ou inconditionnel. Tout le reste
   reste en maison d'accueil. Une fausse urgence coûte un trajet de nuit pour rien
   devant une porte fermée ; une maison d'accueil rangée trop prudemment ne coûte
   qu'un clic. Les deux erreurs ne se paient pas au même prix.

   ⚠ SI UN NOM CHANGE ICI, LE DRAPEAU TOMBE EN SILENCE et la fiche repasse en
   maison d'accueil. D'où le contrôle juste en dessous, qui crie dans la console. */
const HEBERG_URGENCE=[
  "Centre d'accueil d'urgence Ariane",
  "Pierre d'Angle",
  "CAW Archipel",
  "Albatros",
  "L'Ilot — Le 160 (accueil d'urgence)",
  "Opvanghuis Albatros (CAW Brussel)",
  "Bruss'help – Cellule d'orientation",
  "Plateforme Informative de la Strada (PILS)",
  "CAW Huis Brussel — la porte d'entrée néerlandophone"
];
(function marquerUrgence(){
  let n=0;
  SAMPLE.forEach(function(p){
    if(p.domaine==='maisons' && HEBERG_URGENCE.indexOf(p.nom)>=0){ p.urgence=true; n++; }
  });
  if(n!==HEBERG_URGENCE.length){
    const manquants=HEBERG_URGENCE.filter(function(nom){
      return !SAMPLE.some(function(p){ return p.domaine==='maisons' && p.nom===nom; });
    });
    console.warn('COUSIN — hébergement d’urgence : '+n+'/'+HEBERG_URGENCE.length+
      ' fiches marquées. Introuvables : '+manquants.join(' · '));
  }
})();
/* Les fiches d'un pavé du Réseau. Un pavé lit son propre domaine, sauf s'il déclare
   un `src` — et il peut n'en prendre qu'une partie, via `garde`. C'est ce qui permet
   aux deux portes de l'hébergement de partager les mêmes fiches sans qu'aucune ne
   change de `sid`. */
function fichesDe(key){
  const d=DOM[key]; if(!d) return [];
  const src=d.src||key;
  return DATA.filter(function(p){
    return p.domaine===src && (!d.garde || d.garde(p));
  });
}
(function assignSids(){
  const seen={};
  SAMPLE.forEach(p=>{
    const base='seed-'+slug(p.domaine+'-'+p.nom); let s=base, n=1;
    while(seen[s]) s=base+'-'+(++n);
    seen[s]=1; p.sid=s;
  });
})();
</script>