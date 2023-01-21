insert into venues (id, name, location, url)
values
(1, 'Private Event', null, null),
(2, 'Park City Music Hall', '2926 Fairfield Ave., Bridgeport, CT', 'https://parkcitymusichall.com'),
(3, 'Fairfield Theater Company (FTC)', '70 Sanford St., Faifield, CT', 'https://fairfieldtheatre.org'),
(4, 'Milford PorchFest', '61 Melba St., Milford CT', 'https://www.milfordporchfest.com',),
(5, 'Lincoln Parkapalooza', 'Lincoln Park, 455 Jackman Ave., Fairifeld, CT', null),
(6, 'Halloween Yacht Club', '10 Seaview Ave., Stamford CT', 'https://www.hyc.net'),
(7, 'Fairfield Sherman Green (the Gazebo)', 'Reef Road, Fairfield CT', null),
(8, 'BRYAC', '3074 Fairfiele Ave., Bridgeport CT', 'https://www.bryac.biz')
;

insert into images (id, src, alt_text)
values
(1, 'rachs_hope.jpeg', 'gig poster, Rach''s Hope, March 11th 2023'),
(2, 'posters/2023_01_13.jpg', 'gig poster Jan 13th 2023'),
;

insert into gigs (id, venue_id, image_id, time_24hour, gig_date, description)
values
(1, 3, 1, null, '2023-03-11', '<a href="https://www.rachshope.org/">Rach''s Hope</a> PJ Gala fundraiser')
(2, 2, 2, 2100, '2021-01-13', 'Back so soon? Yes! Ellis Island is thrilled to be back at Park City. Come see the opening band Get Lit at 9pm and stick around, drink, and dance as we rock the house all night long!')
;
