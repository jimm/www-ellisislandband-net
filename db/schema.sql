create table venues (
  id integer primary key,
  name text,
  location text,
  url text
);

create table images (
  id integer primary key,
  src text not null,
  alt_text text
);

create table gigs (
  id integer primary key,
  venue_id integer,
  image_id integer,
  time_24hour integer,
  gig_date text,
  description text,
  foreign key (venue_id) references venues(id),
  foreign key (image_id) references images(id)
);
