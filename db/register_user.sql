INSERT INTO app_user(
    email,
    password
)
VALUES(
    ${email},
    ${hash}
)

returning user_id, email;