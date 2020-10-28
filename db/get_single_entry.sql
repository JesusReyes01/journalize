SELECT  ae.title, ae.date, ae.img, ae.content, au.user_id
FROM app_entry ae
JOIN app_user au ON ae.author_id = au.user_id
WHERE ae.entry_id = $1;