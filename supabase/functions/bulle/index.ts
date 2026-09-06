/* ═══ LA BULLE DE COUSIN — la partie cachée ═══
   Fonction Supabase (Edge Function). Elle existe pour UNE raison : la clé qui
   fait payer ne doit jamais se trouver dans index.html. Le site est public —
   n'importe qui pourrait la lire et dépenser l'argent de Mag.

   Le site envoie ici : la question, et les quelques fiches qu'il a trouvées.
   Cette fonction vérifie qui demande, retire ce qui est confidentiel, appelle
   Claude, et renvoie le texte. Rien d'autre ne sort.

   ⚠ RÈGLE B (Mag, 05/09/2026) : les contacts directs — mail perso, ligne
   directe — NE PARTENT PAS. Le site les enlève déjà avant d'envoyer ; on les
   enlève une deuxième fois ici. Deux filets valent mieux qu'un : le jour où
   quelqu'un modifie le site, la règle tient toujours.

   Déploiement :  supabase functions deploy bulle
   La clé se dépose dans Supabase (Edge Functions → Secrets), jamais dans le code :
                  supabase secrets set ANTHROPIC_API_KEY=sk-ant-...  */

const MODELE = 'claude-sonnet-5';

/* QUI A LE DROIT. La liste ne s'écrit PAS ici : ce dépôt est public, et les
   adresses de l'équipe n'ont rien à y faire. Elle vit dans un secret Supabase,
   à côté de la clé — une suite d'adresses séparées par des virgules :
       supabase secrets set BULLE_ACCES="une@adresse.be,autre@adresse.be"
   ⚠ Chaque personne ajoutée là dépense sur la clé de Mag. */
function autorises(): string[] {
  return (Deno.env.get('BULLE_ACCES') || '')
    .split(',').map((x) => x.trim().toLowerCase()).filter(Boolean);
}

/* CE QUI NE SORT JAMAIS D'ICI. Les champs d'une fiche qu'on efface avant
   d'envoyer la question à Claude. La bulle saura qu'un contact direct existe,
   elle ne saura pas lequel — et elle dira d'ouvrir la fiche. */
const CONFIDENTIEL = ['mailDirect', 'telDirect', 'contact', 'refPerso', 'confidentiel'];

const CADRE = `Tu es COUSIN, l'assistant de l'équipe du Samusocial de Bruxelles,
au centre d'Anderlecht. Tu parles à un professionnel : éducateur, travailleur
social, infirmier. Il connaît son métier, tu ne le lui expliques pas.

Tu ne disposes que des fiches ci-dessous. Elles viennent de l'application COUSIN.

RÈGLES, dans l'ordre :

1. Tu réponds UNIQUEMENT à partir de ces fiches. Si la réponse n'y est pas, tu
   dis « Ce n'est pas dans COUSIN » et tu t'arrêtes. Tu ne complètes jamais avec
   ce que tu crois savoir du réseau bruxellois.

2. Tu ne recopies AUCUN numéro de téléphone, AUCUNE adresse, AUCUN horaire, et
   AUCUN mail. Le site les affiche lui-même sous ta réponse, tels qu'ils sont
   écrits dans la base. Toi, tu nommes la fiche : « c'est Le Clos, sa carte est
   en dessous ». Un chiffre que tu écrirais serait un chiffre de trop.

3. Certaines fiches ont un contact direct qui ne t'est pas montré. Quand une
   fiche le signale, dis simplement : « il y a un contact direct sur la fiche,
   ouvre-la ».

4. Tu écris court. Trois ou quatre phrases. Pas d'introduction, pas de
   conclusion, pas de « n'hésitez pas ». On te lit debout, entre deux choses.

5. Si aucune fiche ne convient, dis-le franchement et propose le mot à chercher
   autrement. C'est utile : ça remonte au chantier de l'application.

6. Aucun nom de personne accueillie ne doit apparaître dans ta réponse. Si la
   question en contient un, écris « Monsieur X » ou « Madame Y ».`;

/* ═══ LE DEUXIÈME MÉTIER : METTRE DES NOTES AU PROPRE (Mag, 05/09/2026) ═══
   On écrit en vrac pendant l'entretien — des bouts de phrases, des mots jetés. On
   veut le récupérer lisible, pour le coller dans le 6D.

   ⚠ CE CADRE EST PLUS SÉVÈRE QUE L'AUTRE, et il doit le rester : une note d'entretien
   est un document de travail sur quelqu'un. Ce qu'on n'a pas écrit ne doit pas
   apparaître. Un modèle qui « complète » une note sociale invente la vie d'une
   personne — et c'est cette version-là qui finira dans un dossier.

   ⚠ LE NOM NE VIENT JAMAIS ICI : il vit dans son propre champ, dans l'application,
   et l'app n'envoie que le texte de la note. C'est la règle dite à l'oral à l'équipe :
   on écrit « Monsieur X ». */
const CADRE_NOTE = `Tu remets au propre les notes d'un travailleur social du
Samusocial de Bruxelles, dictées pendant ou après un entretien.

CE QUE TU RENDS : une seule version. Il existe DEUX formes, et c'est le CONTENU de la
note qui décide — jamais le métier de qui écrit. Un infirmier écrit aussi des notes de
situation ; un travailleur social peut décrire une plaie qu'il a vue.

═══ COMMENT CHOISIR ═══
FORME SOIN, seulement si la note décrit un ACTE DE SOIN ou un ÉTAT CLINIQUE :
plaie, pansement, points de suture, glycémie, tension, traitement, injection,
constantes, douleur physique, surveillance, orientation vers un médecin ou les
urgences pour un motif médical.
FORME RÉCIT dans TOUS les autres cas : un entretien, une situation dans le centre,
un fait observé, un incident, une sanction, une demande, une tension entre personnes.
⚠ EN CAS DE DOUTE, ET AUSSI QUAND LA NOTE MÊLE LES DEUX : c'est la FORME RÉCIT. Une
note de situation écrite en style clinique se lit mal ; une note de soin écrite en
récit reste lisible. Le doute penche donc du côté du récit.
⚠ Tu ne dis JAMAIS quelle forme tu as choisie. Pas de titre, pas d'annonce.

═══ LA FORME SOIN ═══
Descriptive, pas narrative. On ne raconte pas un échange : on décrit.
- Dans cet ordre, et seulement avec ce qui a été dit : ce qui est constaté (où, quoi,
  aspect, mesures) · ce qui a été fait · où la personne a été orientée · ce qui suit.
- ⚠ CE QUE LE SOIGNANT CONSTATE S'AFFIRME : « Coupure de 3 cm au pied droit. » Pas de
  conditionnel là-dessus — c'est vu, pas rapporté.
- ⚠ CE QUE LA PERSONNE DIT RESTE ATTRIBUÉ : « Dit avoir mal depuis trois jours. »
  On ne transforme pas une plainte en constat.
- ⚠ LES CHIFFRES, LES CÔTÉS, LES DOSES ET LES HEURES SE RECOPIENT À L'IDENTIQUE.
  Droit reste droit, gauche reste gauche, 12 reste 12. C'est le point qui compte le
  plus de toute cette consigne : une note de soin peut finir dans un dossier.
- Aucun diagnostic, aucune conduite à tenir que le soignant n'a pas dictée.

═══ LA FORME RÉCIT ═══
LE TON, VALIDÉ PAR MAG LE 07/09/2026 :
- Des phrases construites, liées entre elles. « Je lui demande alors comment il a pu
  sortir » plutôt que quatre phrases côte à côte sans lien.
- Le récit de l'échange, quand la dictée en contient un : la question, puis la
  réponse. « Je lui demande… Il répond que… »
- Des verbes de parole variés, choisis pour ce qu'ils disent de l'échange :
  rapporte, répond, indique, précise, confirme, revient sur, MAINTIENT quand la
  personne redit la même chose après une relance. Pas dix fois « il me dit ».
- ⚠ LE CONDITIONNEL TENU JUSQU'AU BOUT sur tout ce qui est RAPPORTÉ et non constaté :
  « serait venu », « l'aurait forcé », « ils seraient sortis ». Dans un écrit qui peut
  ressortir des mois plus tard, la différence entre ce que le professionnel a vu et ce
  qu'on lui a raconté doit se lire à chaque phrase.
- Phrases courtes malgré tout. Les « euh », « alors », les répétitions de l'oral
  disparaissent.
- ⚠ TU AÈRES : un paragraphe par moment de l'entretien, séparé par une ligne vide.
  L'arrivée et le motif ; puis ce qui est rapporté ; puis chaque question et sa
  réponse. Un bloc compact se relit mal, et une note se relit toujours — parfois par
  quelqu'un qui n'était pas là.

⚠ LA LIGNE À NE JAMAIS FRANCHIR — mieux raconter, oui ; ajouter un fait, jamais :
- ⚠ TU N'AJOUTES AUCUNE CIRCONSTANCE QUI N'A PAS ÉTÉ DITE — ni le moment, ni le lieu,
  ni la durée. « venu me voir pour un événement » ne devient PAS « pour un événement
  survenu dans la nuit », même si l'heure citée plus loin le laisse penser. Déduire,
  c'est déjà ajouter : c'est au professionnel d'écrire ce qu'il sait.
- Tu ne RELIES que ce qui est déjà dit. Si la note ne parle pas de l'état de la porte,
  tu n'écris pas « alors que la porte est toujours fermée » — même si ça rendrait la
  phrase meilleure. Ce que le professionnel n'a pas dit, tu ne le sais pas.
- Aucune appréciation, aucun ressenti prêté à qui que ce soit : ni « visiblement
  affecté », ni « semble sincère », ni « paraît confus ». Aucun diagnostic, aucun
  conseil, aucune conclusion.
- ⚠ TU NE DÉPLIES JAMAIS UNE ABRÉVIATION, même évidente. Elles ont un sens local que
  tu ne connais pas : ici « MM » veut dire MAISON MÉDICALE. Un modèle a écrit
  « Médecins du Monde » le 05/09/2026 — cette phrase serait partie dans un dossier.
  MM reste MM, AMU reste AMU, RIS reste RIS, CPAS reste CPAS, MENA reste MENA. Ce que
  tu ne comprends pas, tu le recopies.
- Tu n'ajoutes pas de sujet à une phrase qui n'en a pas : « arrive hier soir » devient
  « Arrivé hier soir. », jamais « Monsieur X est arrivé hier soir ».
- ⚠ LES NOMS SE GARDENT TELS QUELS (Mag, 07/09/2026 : « nous, on mettra le prénom, ou
  alors monsieur ou madame »). Tu ne remplaces pas un prénom par « Monsieur X », et tu
  n'ajoutes pas de nom là où il n'y en a pas. C'est l'équipe qui décide comment elle
  nomme les gens, pas toi.

TU RENDS LE TEXTE, RIEN D'AUTRE. Pas de titre, pas d'introduction, pas de commentaire
sur ton travail.`;

function nettoie(fiche: Record<string, unknown>) {
  const propre: Record<string, unknown> = {};
  let cache = false;
  for (const [k, v] of Object.entries(fiche)) {
    if (CONFIDENTIEL.includes(k)) { if (v) cache = true; continue; }
    if (v) propre[k] = v;
  }
  if (cache) propre.contactDirect = 'Cette fiche a un contact direct — il est dans l\'application, pas ici.';
  return propre;
}

Deno.serve(async (req: Request) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    /* ⚠ `apikey` DOIT ÊTRE LÀ. Sans lui, le navigateur pose sa question préalable
       (le « préflight »), n'obtient pas son autorisation, et l'appel n'a même pas
       lieu : on ne voit qu'un « Failed to fetch » qui ne dit rien. Une heure perdue
       le 05/09/2026. Le client Supabase envoie toujours cet en-tête. */
    'Access-Control-Allow-Headers': 'authorization, content-type, apikey, x-client-info',
    'Content-Type': 'application/json',
  };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  const refus = (msg: string, code = 400) =>
    new Response(JSON.stringify({ erreur: msg }), { status: code, headers: cors });

  try {
    /* 1. QUI DEMANDE. On ne croit pas le site sur parole : on redemande à
       Supabase à qui appartient le jeton de connexion. */
    const jeton = (req.headers.get('authorization') || '').replace('Bearer ', '');
    if (!jeton) return refus('Il faut être connecté.', 401);

    const qui = await fetch(`${Deno.env.get('SUPABASE_URL')}/auth/v1/user`, {
      headers: { Authorization: `Bearer ${jeton}`, apikey: Deno.env.get('SUPABASE_ANON_KEY') ?? '' },
    });
    if (!qui.ok) return refus('Connexion expirée — reconnecte-toi.', 401);
    const email = String(((await qui.json()) as { email?: string }).email || '').toLowerCase();

    const liste = autorises();
    if (!liste.length) return refus('La liste des accès n\'est pas installée sur le serveur.', 500);
    if (!liste.includes(email)) return refus('La bulle n\'est pas ouverte à ce compte.', 403);

    /* 2. CE QU'ON ENVOIE. */
    const { question, fiches, mode } = await req.json();
    if (!question || typeof question !== 'string') return refus('Pas de question.');
    if (question.length > 6000) return refus('Texte trop long — coupe-le en deux.');

    /* METTRE AU PROPRE : pas de fiches, pas de catalogue, un autre cadre. Le texte
       part seul — l'app ne joint ni le nom, ni la chambre, ni la langue. */
    if (mode === 'note') {
      const cle0 = Deno.env.get('ANTHROPIC_API_KEY') || Deno.env.get('Cousin Agent');
      if (!cle0) return refus('La clé n\'est pas installée sur le serveur.', 500);
      const rn = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'x-api-key': cle0, 'anthropic-version': '2023-06-01' },
        body: JSON.stringify({
          model: MODELE, max_tokens: 1500, system: CADRE_NOTE,
          messages: [{ role: 'user', content: question }],
        }),
      });
      if (!rn.ok) {
        const dn = await rn.text();
        console.error('Anthropic a refusé (note) :', rn.status, dn);
        if (rn.status === 400 && dn.includes('credit')) return refus('Le compte n\'a plus de crédit.', 402);
        return refus('La mise au propre n\'est pas arrivée. Ta note n\'a pas bougé — réessaie.', 502);
      }
      const dj = await rn.json();
      const propre = (dj.content || []).filter((b: { type: string }) => b.type === 'text')
        .map((b: { text: string }) => b.text).join('\n').trim();
      console.log('note', email, dj.usage?.input_tokens, '→', dj.usage?.output_tokens);
      return new Response(JSON.stringify({ texte: propre }), { headers: cors });
    }

    const lot = Array.isArray(fiches) ? fiches.slice(0, 8).map(nettoie) : [];
    if (!lot.length) {
      return new Response(JSON.stringify({
        texte: "Je n'ai trouvé aucune fiche pour ça dans COUSIN. Essaie un autre mot — ou c'est qu'il manque une fiche.",
        sansFiche: true,
      }), { headers: cors });
    }

    /* 3. L'APPEL. La clé ne quitte jamais ce fichier. */
    /* Le secret s'appelle « Cousin Agent » — c'est le nom que Mag lui a donné en
       le déposant. On accepte les deux noms : celui-là, et le nom d'usage, pour
       le jour où on le renomme proprement. */
    const cle = Deno.env.get('ANTHROPIC_API_KEY') || Deno.env.get('Cousin Agent');
    if (!cle) return refus('La clé n\'est pas installée sur le serveur.', 500);

    const rep = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': cle, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: MODELE,
        max_tokens: 700,
        system: CADRE,
        messages: [{
          role: 'user',
          content: `LES FICHES DONT TU DISPOSES :\n\n${JSON.stringify(lot, null, 1)}\n\n---\n\nLA QUESTION : ${question}`,
        }],
      }),
    });

    if (!rep.ok) {
      const d = await rep.text();
      console.error('Anthropic a refusé :', rep.status, d);
      if (rep.status === 400 && d.includes('credit')) return refus('Le compte n\'a plus de crédit.', 402);
      return refus('La réponse n\'est pas arrivée. Réessaie dans un instant.', 502);
    }

    const data = await rep.json();
    const texte = (data.content || []).filter((b: { type: string }) => b.type === 'text')
      .map((b: { text: string }) => b.text).join('\n').trim();

    /* Ce qu'on a dépensé, pour le journal — on ne garde pas la question. */
    console.log('bulle', email, data.usage?.input_tokens, '→', data.usage?.output_tokens);

    return new Response(JSON.stringify({ texte }), { headers: cors });
  } catch (e) {
    console.error('bulle — panne :', e);
    return refus('Panne de la bulle. Ce n\'est pas ta faute.', 500);
  }
});
