create table if not exists app_user (
    user_id serial primary key,
    first_name varchar(100),
    last_name varchar(100),
    email varchar(250),
    password varchar(250)
);

create table if not exists app_entry (
    entry_id serial primary key,
    title varchar(250),
    date varchar(250),
    img text,
    content text,
    author_id int references app_user(user_id)
);

create table if not exists app_dark_mode (
    user_id int references app_user(user_id),
    dark_mode boolean
    
);

create table if not exists feeling(
    feeling_id serial primary key,
    img text
   
);
insert into app_user(first_name, last_name, email, password)
values ('testfirst', 'testlast','qwe','qwe')

insert into app_entry (title, date, content, author_id)
values ('test title 1','2020-10-23', 'test content ', 1 );

insert into app_entry (title, date, content, author_id)
values ('test title 2', '2020-10-24', 'test content 2 ', 1 );