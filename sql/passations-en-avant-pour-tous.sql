-- 20/10/2026 : « mettre en avant » ne reserve plus a Afaf (visible par tous) ; lignes reservees converties (ids 134, 136)
update public.passations set en_avant=true, pour_qui=null where pour_qui = array['afaf.aboulkhir@samusocial.be'];
