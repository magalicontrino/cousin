# COUSIN

Outil d'équipe pour les travailleurs sociaux du centre, à Bruxelles.
En ligne : **https://cousin.magalicontrino.com** — connexion Google obligatoire.

> ⚠ Ce README a été refait le 21/08/2026. L'ancien décrivait une app qui n'existe
> plus (fond noir et accent or, fichier local sans serveur, import/export JSON).
> Si une phrase d'ici ne correspond plus à ce que fait l'app, **c'est le README
> qu'il faut corriger**, pas la mémoire de quelqu'un.

---

## Ce que c'est

Une seule page web (`index.html`, ~21 000 lignes, tout dedans : style, code,
catalogue). Publiée par GitHub Pages. Elle sert à trois choses :

1. **Le réseau** — ~378 fiches d'adresses bruxelloises (où dormir, se soigner,
   faire valoir ses droits), rangées **par besoin** et pas par métier d'association.
2. **Le centre** — le quotidien de la maison (linge, poubelles, chambres, produits)
   et les outils de l'équipe (protocole, démarches, mails types, formations).
3. **Les urgences** — les numéros, en gros, appelables en une touche.

Plus, pour chacun : sa check-list du jour, ses favoris, le fil de l'équipe, et une
page Admin pour la coordination.

## Les quatre boutons du bas

`Accueil · Réseau · Centre · Urgences`. Toute la navigation tient là. La visite
d'arrivée (`#/bienvenue`) fait **quatre écrans, un par bouton**.

---

## Comment on publie

```bash
git add index.html sw.js && git commit && git push origin main
```

⚠ **Toujours monter la version du cache dans `sw.js`** (`cousin-vNNN`) dans le même
commit, sinon les téléphones de l'équipe continuent de servir l'ancienne version.
GitHub Pages met une à deux minutes. **Toujours vérifier sur le vrai site après**,
pas seulement en local.

Pour regarder en local : `python3 -m http.server` à la racine, puis ouvrir
`index.html`. La connexion Google ne marchera pas en local — pour voir un écran,
masquer la porte (`document.getElementById('authGate').style.display='none'`) et
appeler la vue à la main (`vCentre()`, `vBienvenue()`…).

---

## Les règles de l'app, celles qui coûtent cher quand on les oublie

**Une page répond à UNE question.** Deux informations qui répondent à deux
questions différentes ne s'emboîtent pas : elles se posent côte à côte, ou l'une
attend sa vraie place.

**Trois gestes, et pas un de plus :**
- **ça se déploie** → une poignée de portes ; on en prend une, on s'en va ;
- **une feuille monte du bas** → un endroit où l'on travaille, et d'où l'on revient ;
- **une page glisse** → quand ça continue ailleurs, que ça s'imprime, ou que ça a
  une adresse qu'on partage.

**Une seule forme de ligne par page** : rangée claire, rond pastel, dessin **noir**
dedans, chevron dans son rond gris. La couleur vit dans le rond, jamais en aplat —
un aplat plein crie « attention », et c'est réservé à ce qui alerte.

**Au survol, rien ne se déplace.** Un élément qui bouge sous le curseur se dérobe :
le survol clignote et le clic se perd. Le fond s'éclaircit, un trait net apparaît.

**⚠ Ne jamais réécrire `innerHTML` sans condition dans `render()`.** Réécrire ne met
pas les boutons à jour : elle en fabrique de neufs et jette les anciens — celui qui
est sous le curseur disparaît. C'est sorti trois fois au même endroit (l'aperçu
téléphone, le rail de gauche, la barre « voir comme »). On prépare l'HTML, on le
compare (`__html`), on n'écrit que s'il a changé.

**⚠ Supabase ne LÈVE pas d'erreur, il en RENVOIE une.** `{data:null, error:{…}}`.
Un `try/catch` seul ne voit rien passer. Lire `.error`, toujours — et surtout ne
jamais confondre **« la base n'a pas répondu »** avec **« non »** : c'est ce qui a
affiché « ton compte n'est pas autorisé » à l'administratrice, et ce qui lui faisait
perdre son rôle en silence.

**On n'invente jamais une donnée.** Pas un numéro de téléphone incertain, pas une
adresse devinée, pas un chiffre décoratif. Un champ qu'on ne connaît pas se demande
par téléphone — il ne se déduit pas. Un filtre faux ne dérange pas : il **cache une
adresse juste**.

**On n'écrit pas ce qui ne change rien à ce qu'on fait.** Pas d'appréciation
personnelle dans une fiche (« et c'est rare », « et surtout ce qu'on ne fait pas »),
et on n'explique pas leur métier à des gens du métier.

**Le papier est le livrable.** L'app sert à écrire ; l'équipe reçoit une feuille.
Toute liste doit pouvoir s'imprimer, en gros caractères, le téléphone en gras.

**Ce qui est grave se voit en arrivant**, mesuré à 375 px de large. La loupe est un
filet, pas un chemin.

---

## Où sont les choses

| | |
|---|---|
| `index.html` | l'app entière — style, code, catalogue des fiches |
| `sw.js` | le cache hors ligne ; **monter la version à chaque publication** |
| `picto/` | les dessins (SVG), posés en masque : ils prennent la couleur du texte |
| `font/` | Eastman, en woff2 |
| `sql/` | les tables et les policies Supabase |
| `propositions/` | les maquettes à regarder avant de trancher — pas le site |
| `sauvegardes/`, `vieux/` | l'avant, gardé exprès |

**Les données vivent à trois endroits** : le catalogue des fiches est **dans le
code** (il se publie par le dépôt) ; les comptes, listes, avis et chambres sont
**dans Supabase** ; les préférences d'affichage sont **dans le téléphone**.

---

## Ce qui reste ouvert (au 21/08/2026)

- **Le retri du Réseau** — proposition prête, deux points à trancher avec l'équipe :
  garder ou couper les cartes à une ou deux fiches, et où couper « Se sevrer »
  (44 fiches). C'est de la connaissance de terrain, pas une décision de code.
- **Le champ « public » des 30 maisons d'accueil**, à poser à la main. Tant qu'il
  est deviné, aucune pastille « Femmes » honnête ne peut revenir.
- **23 fiches sans numéro de téléphone** (elles étaient 53 début août).
- **Albatros** : deux fiches, deux numéros, une seule adresse — ça se règle par un
  coup de fil.
- **La sieste** : l'étiquette existe, aucun lieu ne la porte. Ça ne peut venir que
  de l'équipe.
- **De Hoeksteen** absent du catalogue ; **Trempoline** relevé mais pas écrit (les
  conditions d'admission ne sont publiées nulle part).
