insert into games (
id,
state
) values (
$1,
$2
) on conflict (id)
do update set
state = $2;
