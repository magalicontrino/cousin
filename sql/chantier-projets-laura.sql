-- ---------------------------------------------------------------------------
-- CHANTIER — une ligne de plus : « Voir les projets avec Laura » (18/08/2026).
-- Texte en base64 : le collage vers l'editeur SQL mange les accents.
-- Rejouable : n'insere rien si la ligne existe deja non faite.
-- Passe le 18/08/2026 -> ligne id 111, bloc « Ca attend tes collegues ».
-- (detail mis a jour le meme jour : correction de l'adresse Lama Molenbeek.)
-- ---------------------------------------------------------------------------
insert into public.chantier(bloc, titre, detail, ordre)
select convert_from(decode('w4dhIGF0dGVuZCB0ZXMgY29sbMOoZ3Vlcw==','base64'),'UTF8'),
       convert_from(decode('Vm9pciBsZXMgcHJvamV0cyBhdmVjIExhdXJh','base64'),'UTF8'),
       convert_from(decode('Qml0aHVtZSDigJQgYml0aHVtZS5vcmcgwrcgUHJvamV0IExhbWEg4oCUIHByb2pldGxhbWEuYmUKCuKaoCBMRSBQUk9KRVQgTEFNQSBFU1QgRMOJSsOAIERBTlMgTCdBUFAgOiA0IGZpY2hlcyBkYW5zIERyb2d1ZXMgJiBhZGRpY3Rpb25zIChQcm9qZXQgTGFtYSwgSGVzdGlhLCBDT1ZFUiwgQVJUSEEpLiBSaWVuIMOgIGNyw6llci4K4oaSIE1BSVMgVU5FIEFEUkVTU0UgRVNUIEZBVVNTRSA6IGxlIGNlbnRyZSBkZSBNb2xlbmJlZWsgbidlc3QgcGx1cyBydWUgTW9udGFnbmUgYXV4IEFuZ2VzIDI1LiBMZXVyIHNpdGUgZGl0IGJvdWxldmFyZCBMw6lvcG9sZCBJSSAxODRiLCAxMDgwICgwMiA0MTEgNTEgNjEpLiDDgCBjb25maXJtZXIgYXZlYyBMYXVyYSwgcHVpcyBjb3JyaWdlciBsYSBmaWNoZS4KCuKaoCBCSVRIVU1FIEVTVCDDgCBDSEFSTEVST0ksIHBhcyDDoCBCcnV4ZWxsZXMgKGF2ZW51ZSBQYXVsIFBhc3R1ciAzOCwgNjAwMSkuIEFjY29tcGFnbmVtZW50IGRlIHJ1ZSBldCBoYWJpdGF0IGFsdGVybmF0aWYgKHNxdWF0cywgY2FiYW5lcyksIGNhbWlvbm5ldHRlIGFtw6luYWfDqWUuIEplc3NpY2EgTWF1cyAwNDU1IDE5OSA0MzEgwrcgTWFydGluIENlY2lsaW90IDA0NTUgMTk5IDQzMCDCtyBoZWxsb0BiaXRodW1lLm9yZy4KCsOAIHRyYW5jaGVyIGF2ZWMgTGF1cmEgOiBvbiBsZSBnYXJkZSBvdSBwYXMsIGV0IGRhbnMgcXVlbCB0aXJvaXIuIE1hIHByb3Bvc2l0aW9uIDogTWFyYXVkZSwgY29tbXVuZSDCqyBIb3JzIEJydXhlbGxlcyDCuy4=','base64'),'UTF8'),
       5
where not exists (
  select 1 from public.chantier
   where titre = convert_from(decode('Vm9pciBsZXMgcHJvamV0cyBhdmVjIExhdXJh','base64'),'UTF8') and fait = false);

select id, bloc, titre, left(detail,60) as debut, fait
  from public.chantier
 where titre = convert_from(decode('Vm9pciBsZXMgcHJvamV0cyBhdmVjIExhdXJh','base64'),'UTF8');
