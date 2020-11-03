UPDATE app_dark_mode
SET dark_mode = $2
WHERE user_id = $1

returning dark_mode;