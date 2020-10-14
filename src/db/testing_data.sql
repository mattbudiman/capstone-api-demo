---USERS--- Note: All passwords are just 'E'
INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Jay', 'Gatsby', 'Jay', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Don', 'Quixote', 'Don', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Ebinizer', 'Scrooge', 'Ebinezer', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Edna', 'Pontellier', 'Edna', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Max', 'Disher', 'Max', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Sancho', 'Panza', 'Sancho', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('agent', 'Charles', 'Marlow', 'Charles', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('supervisor', 'Samwise', 'Gamgee', 'Sam', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('supervisor', 'George', 'Orr', 'George', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(user_type, first_name, last_name, username, hashed_password)
VALUES ('supervisor', 'Zadok', 'Allen', 'Zadok', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');


---CUSTOMERS---
INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Scott', 'Fitzgerald', '555-123-4567');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Miguel', 'Cervantes', '555-123-4567');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Charles', 'Dickens', '555-312-1542');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Kate', 'Chopin', '555-333-7777');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('George', 'Schuyler', '555-000-9191');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Tobias', 'Smollett', '555-600-8091');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Joseph', 'Conrad', '555-666-7171');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('John', 'Tolkien', '555-345-5454');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Ursula', 'Le Guin', '555-122-9898');

INSERT INTO customers(first_name, last_name, phone_number)
VALUES ('Howard', 'Lovecraft', '555-000-9999');



--CALLS--
INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 1, 'Hello', ( 'positive', ( 0.80, 0.10 , 0.10) ) );


INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 2, 'Youre disgusting, I hate you, I want to kill you, give me two hundred dollars', ( 'negative', ( 0.10, 0.10 , 0.80) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 3, 'This was an alright call.', ( 'neutral', ( 0.25, 0.60 , 0.15) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 4, 'This was a mixed call.', ( 'neutral', ( 0.33, 0.34 , 0.33) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 5, 'I had a great time this evening.', ( 'positive', ( 0.90, 0.05 , 0.05) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 6, 'The truth may be stretched thin, but it never breaks, and it always surfaces above lies, as oil floats on water', ( 'neutral', ( 0.20, 0.75 , 0.05) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 7, 'They were conquerors, and for that you want only brute force--nothing to boast of, when you have it, since your strength is just an accident arising from the weakness of others', ( 'neutral', ( 0.20, 0.75 , 0.05) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 8, 'Theres some good in this world, Mr. Frodo… and its worth fighting for', ( 'positive', ( 0.70, 0.20 , 0.10) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 9, 'The end justifies the means. But what if there never is an end? All we have is means.', ( 'positive', ( 0.73, 0.14 , 0.13) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (1, 10, '
The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents. We live on a placid island of ignorance in the midst of black seas of the infinity, and it was not meant that we should voyage far.
', ( 'negative', ( 0.15, 0.28 , 0.57) ) );


INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (2, 1, 'Whenever you feel like criticizing any one, just remember that all the people in this world havent had the advantages that youve had.', ( 'positive', ( 0.70, 0.20 , 0.10) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (3, 2, 'Life is like a box of chocolates, you never know what youre gonna get', ( 'neutral', ( 0.20, 0.68 , 0.12) ) );

INSERT INTO calls(user_id, customer_id, transcript, sentiment)
VALUES (10, 3, 'Reflect upon your present blessings -- of which every man has many -- not on your past misfortunes, of which all men have some.', ( 'neutral', ( 0.90, 0.08 , 0.02) ) );
