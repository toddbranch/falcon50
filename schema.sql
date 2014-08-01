drop table if exists runners, checkpoints, checkins;

create table runners (
    bib int not null,
    name_first varchar(100),
    name_last varchar(100),
    race varchar(100),
    registered bool default 0,
    primary key(bib)
);

create table checkpoints (
    id int not null unique,
    primary key (id)
);

create table checkins (
    id int not null auto_increment unique,
    checkpoint_id int,
    runner_bib int,
    checkin_time time,
    primary key (id)
);

load data local infile 'bibs.csv' into table runners
    fields terminated by ','
    lines terminated by '\n'
    ignore 1 lines
    (race, name_first, name_last, bib);

insert into checkpoints values(1);
insert into checkpoints values(2);
insert into checkpoints values(3);
insert into checkpoints values(4);
insert into checkpoints values(5);
