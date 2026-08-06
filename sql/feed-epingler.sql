-- COUSIN — Réparer l'épinglage du fil (06/08/2026)
--
-- Le symptôme : dans Le fil, le bouton « Épingler » ne fait rien.
-- La cause : la colonne `epingle` existe bien (elle a été ajoutée par
-- sql/feed-couleurs.sql), mais la table `feed` n'a jamais reçu d'autorisation
-- de MODIFICATION. La sécurité (RLS) laisse donc lire, écrire un message et le
-- supprimer — mais pas modifier une ligne existante. L'ordre part, ne touche
-- aucune ligne, et rien ne se passe : aucune erreur, aucun message.
--
-- La règle posée ici : SEULE l'administration peut épingler ou détacher, et
-- elle ne peut toucher qu'à ça — pas au texte des autres, pas à leur nom.

drop policy if exists feed_epingler on public.feed;
create policy feed_epingler on public.feed
  for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- On n'ouvre que la colonne `epingle` : le texte d'un message reste intouchable.
grant update (epingle) on public.feed to authenticated;
