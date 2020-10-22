create table if not exists app_user (
    user_id serial primary key,
    email varchar(250),
    password varchar(250)
);

create table if not exists app_entry (
    entry_id serial primary key,
    img text,
    content text,
    author_id int references app_user(user_id)
);

create table if not exists feeling(
    feeling_id serial primary key,
    img text
   
);