---USERS--- Note: All passwords are just 'E'
INSERT INTO users(id, first_name, last_name, username, password)
VALUES (1, 'Jay', 'Gatsby', 'Jay', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (2, 'Don', 'Quixote', 'Don', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (3, 'Ebinizer', 'Scrooge', 'Ebinezer', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (4, 'Edna', 'Pontellier', 'Edna', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (5, 'Max', 'Disher', 'Max', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (6, 'Sancho', 'Panza', 'Sancho', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (7, 'Charles', 'Marlow', 'Charles', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (8, 'Samwise', 'Gamgee', 'Sam', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (9, 'George', 'Orr', 'George', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(id, first_name, last_name, username, password)
VALUES (10, 'Zadok', 'Allen', 'Zadok', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

---AGENTS---
INSERT INTO agents(user_id)
VALUES (1);

INSERT INTO agents(user_id)
VALUES (2);

INSERT INTO agents(user_id)
VALUES (3);

INSERT INTO agents(user_id)
VALUES (4);

INSERT INTO agents(user_id)
VALUES (5);

INSERT INTO agents(user_id)
VALUES (6);

INSERT INTO agents(user_id)
VALUES (7);



---SUPERVISORS---
INSERT INTO supervisors(user_id)
VALUES (8);

INSERT INTO supervisors(user_id)
VALUES (9);

INSERT INTO supervisors(user_id)
VALUES (10);


---CUSTOMERS---
INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (1, 'Scott', 'Fitzgerald', '555-123-4567');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (2, 'Miguel', 'Cervantes', '555-123-4567');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (3, 'Charles', 'Dickens', '555-312-1542');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (4, 'Kate', 'Chopin', '555-333-7777');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (5, 'George', 'Schuyler', '555-000-9191');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (6, 'Tobias', 'Smollett', '555-600-8091');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (7, 'Joseph', 'Conrad', '555-666-7171');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (8, 'John', 'Tolkien', '555-345-5454');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (9, 'Ursula', 'Le Guin', '555-122-9898');

INSERT INTO customers(id, first_name, last_name, phone_number)
VALUES (10, 'Howard', 'Lovecraft', '555-000-9999');



--CALLS--
INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 1, 'Hello', ( 'positive', ( 0.80, 0.10 , 0.10) ), 6, '2018-09-29 03:00' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (2, 1, 2, 'Youre disgusting, I hate you, I want to kill you, give me two hundred dollars', ( 'negative', ( 0.10, 0.10 , 0.80) ), 15, '2018-11-14 07:00');

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (3, 1, 3, 'This was an alright call.', ( 'neutral', ( 0.25, 0.60 , 0.15) ), 4, '2018-12-04 09:00');

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (4, 1, 4, 'This was a mixed call.', ( 'neutral', ( 0.33, 0.34 , 0.33) ), 12, '2018-12-29 12:00' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (5, 1, 5, 'I had a great time this evening.', ( 'positive', ( 0.90, 0.05 , 0.05) ), 60, '2019-02-16 20:24' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (6, 1, 6, 'The truth may be stretched thin, but it never breaks, and it always surfaces above lies, as oil floats on water', ( 'neutral', ( 0.20, 0.75 , 0.05) ), 75, '2017-03-30 20:24' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (7, 1, 7, 'They were conquerors, and for that you want only brute force--nothing to boast of, when you have it, since your strength is just an accident arising from the weakness of others', ( 'neutral', ( 0.20, 0.75 , 0.05) ), 90, '2019-04-18 11:07' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (8, 1, 8, 'Theres some good in this world, Mr. Frodo… and its worth fighting for', ( 'positive', ( 0.70, 0.20 , 0.10) ), 33, '2019-04-22 10:59' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (9, 1, 9, 'The end justifies the means. But what if there never is an end? All we have is means.', ( 'positive', ( 0.73, 0.14 , 0.13) ), 55, '2019-08-26 13:11' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (10, 1, 10, '
The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents. We live on a placid island of ignorance in the midst of black seas of the infinity, and it was not meant that we should voyage far.
', ( 'negative', ( 0.15, 0.28 , 0.57) ), 999, '2019-12-16 21:14' );


INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (11, 2, 1, 'Whenever you feel like criticizing any one, just remember that all the people in this world havent had the advantages that youve had.', ( 'positive', ( 0.70, 0.20 , 0.10) ), 400, '2020-07-04 11:14' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (12, 3, 2, 'Life is like a box of chocolates, you never know what youre gonna get', ( 'neutral', ( 0.20, 0.68 , 0.12) ), 33, '2020-08-26 09:00' );

INSERT INTO calls(id, agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (13, 7, 3, 'Reflect upon your present blessings -- of which every man has many -- not on your past misfortunes, of which all men have some.', ( 'neutral', ( 0.90, 0.08 , 0.02) ), 777, '2020-10-12 23:54' );
