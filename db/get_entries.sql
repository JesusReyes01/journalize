SELECT ae.title, ae.date, ae.img, au.email, ae.entry_id
FROM app_entry ae
JOIN app_user au
ON ae.author_id = au.user_id
WHERE ae.author_id = $1
ORDER BY ae.date DESC;