-- Some starter burgers on the table

USE burgers_db;

INSERT INTO burgers (burger_name) 
VALUES ('Not If I Can Kelp It Burger'), ('Beets Me Burger'), ('Yes I Cayenne Burger'), ("I'm OK, You're Ok-ra Burger");

INSERT INTO burgers (burger_name, devoured) 
VALUES ('TestBurgy', TRUE);