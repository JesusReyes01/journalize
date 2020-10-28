select ae.content, au.email, ae.author_id, ae.entry_id, ae.img 
from app_entry ae
JOIN app_user au
on ae.author_id = au.user_id
where ae.author_id = $1;