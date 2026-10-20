-- 19/10/2026 : commentaire des entrants jusqu'a 2000 caracteres (300 coupait en silence)
alter table public.entrants drop constraint if exists entrants_commentaire_check; alter table public.entrants add constraint entrants_commentaire_check check (commentaire is null or char_length(commentaire) <= 2000);
