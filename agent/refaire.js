/* Refait le fichier agent/COUSIN-catalogue.md à partir de index.html.
   À relancer quand le catalogue a bougé :   node agent/refaire.js
   (à lancer depuis la racine du dépôt) */
const fs=require('fs'), path=require('path');
const RACINE=path.join(__dirname,'..');
const S=__dirname;

/* 1. On extrait les fiches du gros index.html. Le catalogue y est écrit en dur,
   dans un tableau SAMPLE construit par des appels d(...). On isole les blocs de
   code qui le fabriquent et on les exécute à part, avec un décor minimal. */
const html=fs.readFileSync(path.join(RACINE,'index.html'),'utf8').split('\n');
function bloc(a,b){ return html.slice(a-1,b).join('\n'); }
const uidLigne=html.findIndex(l=>l.indexOf('function uid()')===0)+1;
const ligneSample=html.findIndex(l=>l.indexOf('const SAMPLE = [')===0)+1;
/* on remonte au début du bloc <script> qui la contient : les fonctions d(), m(),
   cpas()… y sont définies, et sans elles SAMPLE ne se construit pas */
let debut=ligneSample; while(debut>1 && html[debut-1].trim()!=='<script>') debut--;
debut++;
if(!uidLigne||!ligneSample){ console.error('Je ne retrouve plus SAMPLE ni uid dans index.html — le fichier a bougé.'); process.exit(1); }
let fin=ligneSample; while(fin<html.length && html[fin].indexOf('</script>')!==0) fin++;

global.document={addEventListener(){},querySelector(){return null},querySelectorAll(){return []},getElementById(){return null}};
global.localStorage={getItem(){return null},setItem(){},removeItem(){}};
let a;
try{
  a=new Function(bloc(uidLigne,uidLigne)+'\n'+bloc(debut,fin)+'\n;return SAMPLE;')();
}catch(e){ console.error('Extraction impossible :',e.message); process.exit(1); }
console.log(a.length+' fiches lues dans index.html');


const LAB={urgences:"Urgences",maisons:"Maisons d'accueil",social:"Services sociaux, CPAS, colis, douches",
 medical:"Se soigner — maisons médicales et santé",santementale:"Tête et esprit",addictions:"Drogues & addictions",
 demarches:"Les démarches",etrangers:"Papiers et séjour",juridique:"Juridique",logement:"Logement",
 handicap:"Handicap",planning:"Planning familial",famille:"Retrouver sa famille",educatif:"Jeunesse & familles",
 lgbt:"LGBTQI+",culture:"Activités & culture",volontariat:"Volontariat",formations:"Formations et cours",
 methodes:"Protocoles",centre:"Gestion du centre",accompagnement:"Accompagnement",journee:"Centre de jour",
 mails:"Modèles de mail"};
const ORDRE=["urgences","maisons","social","medical","santementale","addictions","demarches","etrangers",
 "juridique","logement","handicap","planning","famille","educatif","lgbt","culture","volontariat",
 "journee","accompagnement","centre","methodes","formations","mails"];

function txt(html){
  if(!html) return '';
  return html
    .replace(/<style[\s\S]*?<\/style>/gi,'')
    .replace(/<script[\s\S]*?<\/script>/gi,'')
    .replace(/<h([1-6])[^>]*>/gi,(m,n)=>'\n\n'+'#'.repeat(Math.min(6,+n+2))+' ')
    .replace(/<\/h[1-6]>/gi,'\n')
    .replace(/<li[^>]*>/gi,'\n- ')
    .replace(/<br\s*\/?>/gi,'\n')
    .replace(/<\/(p|div|tr|ul|ol|section|blockquote)>/gi,'\n')
    .replace(/<\/(b|strong)>\s*<span/gi,' — <span')
    .replace(/<(p|div|section|blockquote|tr|table)\b[^>]*>/gi,'\n')
    .replace(/<td[^>]*>/gi,' | ')
    .replace(/<[^>]+>/g,'')
    .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&quot;/g,'"').replace(/&#39;|&rsquo;/g,"'").replace(/&eacute;/g,'é').replace(/&egrave;/g,'è')
    .replace(/&agrave;/g,'à').replace(/&ccedil;/g,'ç').replace(/&ecirc;/g,'ê').replace(/&hellip;/g,'…')
    .replace(/[ \t]+/g,' ')
    .replace(/\n{3,}/g,'\n\n')
    .split('\n').map(l=>l.trim()).join('\n').trim();
}

const L=[];
L.push('# COUSIN — le catalogue des fiches');
L.push('');
L.push('Ce document est un export de l\'application COUSIN, faite par et pour l\'équipe du Samusocial à Bruxelles (centre d\'Anderlecht).');
L.push('');
L.push('Export du 5 septembre 2026 — ' + a.length + ' fiches.');
L.push('');
L.push('> ⚠ **Ce fichier fige un état.** L\'application, elle, continue d\'être corrigée. Pour un numéro de téléphone, un horaire ou une adresse, la fiche dans COUSIN fait foi, pas ce document.');
L.push('');
L.push('---');

const dejaVus=new Set();
ORDRE.forEach(function(dom){
  const lot=a.filter(f=>f.domaine===dom && !f.page && !f.corps);
  if(!lot.length) return;
  L.push(''); L.push('## '+(LAB[dom]||dom)+'  ('+lot.length+' fiches)'); L.push('');
  lot.sort((x,y)=>(x.commune||'').localeCompare(y.commune||'')||x.nom.localeCompare(y.nom));
  lot.forEach(function(f){
    dejaVus.add(f.nom);
    L.push('### '+f.nom);
    const meta=[];
    if(f.commune) meta.push('**Où :** '+f.commune);
    if(f.adr) meta.push('**Adresse :** '+f.adr);
    if(f.tel) meta.push('**Téléphone :** '+f.tel);
    if(f.mail) meta.push('**Mail :** '+f.mail);
    if(f.site) meta.push('**Site :** '+f.site);
    if(f.horaires) meta.push('**Quand :** '+f.horaires);
    if(f.public) meta.push('**Pour qui :** '+f.public);
    if(f.desc) L.push(f.desc);
    if(meta.length){ L.push(''); meta.forEach(m=>L.push('- '+m)); }
    if(f.tags && f.tags.length) L.push('- **Étiquettes :** '+f.tags.join(', '));
    if(f.recoTxt) L.push('- **Conseillée par l\'équipe :** '+f.recoTxt);
    if(f.decoTxt) L.push('- **⚠ Déconseillée par l\'équipe :** '+f.decoTxt);
    if(f.notes){ L.push(''); L.push(f.notes.split('\n').filter(x=>x.trim()).join('\n')); }
    L.push('');
  });
});

// Les cours
const cours=a.filter(f=>f.page);
if(cours.length){
  L.push(''); L.push('---'); L.push('');
  L.push('# Les cours de COUSIN  ('+cours.length+')');
  L.push('');
  L.push('Ce sont les pages de formation écrites dans l\'application. Elles expliquent une règle ou une procédure.');
  cours.forEach(function(f){
    L.push(''); L.push('## '+f.nom); L.push('');
    if(f.desc) L.push('*'+f.desc+'*'); L.push('');
    L.push(txt(f.page));
    L.push('');
  });
}

// Les mails
const mails=a.filter(f=>f.corps);
if(mails.length){
  L.push(''); L.push('---'); L.push('');
  L.push('# Les modèles de mail  ('+mails.length+')');
  L.push('');
  L.push('Écrits dans la voix de l\'équipe. L\'application ne les envoie pas : elle prépare un brouillon, c\'est la personne qui appuie sur envoyer.');
  mails.forEach(function(f){
    L.push(''); L.push('## '+f.nom); L.push('');
    if(f.desc) L.push(f.desc);
    if(f.objet) L.push('**Objet :** '+f.objet);
    if(f.corps){ L.push(''); L.push('```'); L.push(f.corps); L.push('```'); }
  });
}

const sortie=L.join('\n').replace(/\n{3,}/g,'\n\n');
fs.writeFileSync(path.join(S,'COUSIN-catalogue.md'), sortie);
console.log('écrit — agent/COUSIN-catalogue.md,', (sortie.length/1024).toFixed(0)+' Ko');
