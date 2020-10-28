SELECT  ae.content, au.email, ae.author_id, ae.entry_id, ae.img
FROM app_entry ae
JOIN app_user au ON ae.author_id = au.user_id
WHERE au.entry_id = $1;