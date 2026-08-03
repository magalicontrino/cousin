-- COUSIN -- Une ligne de chantier de plus (demande de Mag, 03/08/2026) : « rajoute dans la
-- checklist » -- apres avoir decouvert, en cherchant qui etait « Theclick Bxl », que six
-- personnes sont dans la liste avec une adresse personnelle, dont quatre en double.
--
-- Ecrit en base64 : le presse-papier vers l editeur SQL abime les accents (constate le
-- 01/08, des lignes de chantier etaient arrivees en mojibake dans son app).
-- Deja joue le 03/08 ; garde ici pour la trace.

insert into public.chantier (bloc, titre, detail, ordre) values (
  convert_from(decode('w4dhIGF0dGVuZCB1bmUgcGhyYXNlIGRlIHRvaQ==','base64'),'UTF8'),
  convert_from(decode('VHJhbmNoZXIgbGVzIDYgYWRyZXNzZXMgcGVyc29ubmVsbGVzIChkb250IDQgZG91YmxvbnMp','base64'),'UTF8'),
  convert_from(decode('UmVsZXbDqSBsZSAwMy8wOCBkYW5zIGxhIGxpc3RlIGRlIGwnw6lxdWlwZS4gTHVpcyA6IGx1aXMucm9kcmlndWVzQHNhbXVzb2NpYWwuYmUgbidhIGphbWFpcyBzZXJ2aSwgaWwgc2UgY29ubmVjdGUgYXZlYyB0aGVjbGljay5ieGxAZ21haWwuY29tIChkZW1hbmRlIGFwcHJvdXbDqWUgbGUgMjkvMDcsIGF2ZWMgbGUgbW90IMKrIEwgUyDigJQgQydlc3QgbHVpeiDCuykgZXQgYXBwYXJhw650IHNhbnMgbcOpdGllciBuaSB2cmFpIG5vbS4gTcOqbWUgY2hvc2UgcG91ciBpbWVuZWNoZXJmYW91aSwgYXplcm91YWxub3JkaW5lNCBldCBsb25hbWF0aGlsZGU3NyA6IGxldXIgYWRyZXNzZSBAc2FtdXNvY2lhbC5iZSBleGlzdGUgRVQgbGV1ciBHbWFpbCwgZG9uYyBpbHMgY29tcHRlbnQgZG91YmxlIGRhbnMgbGVzIHN0YXRpc3RpcXVlcywgZXQgYydlc3QgdG91am91cnMgbGUgR21haWwgcXVpIHNlIGNvbm5lY3RlLiBSZXN0ZW50IGdhbmRpMTIgKFRTKSBldCB5YXN6YWtpcyAoc2FucyBtw6l0aWVyKSwgcXVpIG4nb250IHBhcyBkJ8OpcXVpdmFsZW50IHByb2Zlc3Npb25uZWwuIERldXggZmHDp29ucyBkZSB0cmFuY2hlciA6IGdhcmRlciBsZXMgR21haWwgZW4gbGV1ciBtZXR0YW50IHVuIG5vbSBldCB1biBtw6l0aWVyLCBvdSBkw6lzYWN0aXZlciBsZXMgR21haWwgZXQgZGVtYW5kZXIgw6AgY2hhY3VuIGRlIHBhc3NlciBzdXIgc29uIGFkcmVzc2UgQHNhbXVzb2NpYWwuYmUg4oCUIGMnZXN0IGxhIHLDqGdsZSBxdWUgdHUgYXMgcG9zw6llIHBvdXIgbGVzIG5vdXZlYXV4Lg==','base64'),'UTF8'),
  106);

-- 106 etait deja pris (les pictos des activites) : on la pose juste apres.
update public.chantier set ordre = 107
 where ordre = 106 and titre like 'Trancher les 6 adresses%';

select ordre, titre from public.chantier where ordre between 100 and 110 order by ordre;
