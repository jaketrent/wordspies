begin;

create table games (
id varchar(250) primary key,
state jsonb,
created timestamp default now(),
updated timestamp default now()
);


end;
