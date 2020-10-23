create table if not exists app_user (
    user_id serial primary key,
    email varchar(250),
    password varchar(250)
);

create table if not exists app_entry (
    entry_id serial primary key,
    date date,
    img text,
    content text,
    author_id int references app_user(user_id)
);

create table if not exists feeling(
    feeling_id serial primary key,
    img text
   
);

insert into app_entry (date, content, author_id)
values ('2020-10-23', 'test content ', 1 );

insert into app_entry (date, content, author_id)
values ('2020-10-24', 'test content 2 ', 1 );