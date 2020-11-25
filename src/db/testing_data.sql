---USERS--- Note: All passwords are just 'E'
INSERT INTO users(first_name, last_name, username, password)
VALUES ('Jay', 'Gatsby', 'Jay', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Don', 'Quixote', 'Don', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Ebinizer', 'Scrooge', 'Ebinezer', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Edna', 'Pontellier', 'Edna', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Max', 'Disher', 'Max', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Sancho', 'Panza', 'Sancho', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Charles', 'Marlow', 'Charles', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Samwise', 'Gamgee', 'Sam', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('George', 'Orr', 'George', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

INSERT INTO users(first_name, last_name, username, password)
VALUES ('Zadok', 'Allen', 'Zadok', '$2b$10$J7jJOfPeSHVPsY1xskkPOeBuWResmleKXvfgltBSqhjwOlfqJNnJ6');

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

INSERT INTO agents(user_id)
VALUES (8);


---SUPERVISORS---
INSERT INTO supervisors(user_id)
VALUES (8);

INSERT INTO supervisors(user_id)
VALUES (9);

INSERT INTO supervisors(user_id)
VALUES (10);


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
INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Hello', ( 'positive', ( 0.80, 0.10 , 0.10) ), 6, '2018-09-29 03:00' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 2, 'Youre disgusting, I hate you, I want to kill you, give me two hundred dollars', ( 'negative', ( 0.10, 0.10 , 0.80) ), 15, '2018-11-14 07:00');

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 3, 'This was an alright call.', ( 'neutral', ( 0.25, 0.60 , 0.15) ), 4, '2018-12-04 09:00');

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 4, 'This was a mixed call.', ( 'neutral', ( 0.33, 0.34 , 0.33) ), 12, '2018-12-29 12:00' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 5, 'I had a great time this evening.', ( 'positive', ( 0.90, 0.05 , 0.05) ), 60, '2019-02-16 20:24' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 6, 'The truth may be stretched thin, but it never breaks, and it always surfaces above lies, as oil floats on water', ( 'neutral', ( 0.20, 0.75 , 0.05) ), 75, '2017-03-30 20:24' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 7, 'They were conquerors, and for that you want only brute force--nothing to boast of, when you have it, since your strength is just an accident arising from the weakness of others', ( 'neutral', ( 0.20, 0.75 , 0.05) ), 90, '2019-04-18 11:07' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 8, 'Theres some good in this world, Mr. Frodo… and its worth fighting for', ( 'positive', ( 0.70, 0.20 , 0.10) ), 33, '2019-04-22 10:59' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 9, 'The end justifies the means. But what if there never is an end? All we have is means.', ( 'positive', ( 0.73, 0.14 , 0.13) ), 55, '2019-08-26 13:11' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 10, '
The most merciful thing in the world, I think, is the inability of the human mind to correlate all its contents. We live on a placid island of ignorance in the midst of black seas of the infinity, and it was not meant that we should voyage far.
', ( 'negative', ( 0.15, 0.28 , 0.57) ), 999, '2019-12-16 21:14' );


INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (2, 1, 'Whenever you feel like criticizing any one, just remember that all the people in this world havent had the advantages that youve had.', ( 'positive', ( 0.70, 0.20 , 0.10) ), 400, '2020-07-04 11:14' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (3, 2, 'Life is like a box of chocolates, you never know what youre gonna get', ( 'neutral', ( 0.20, 0.68 , 0.12) ), 33, '2020-08-26 09:00' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (7, 3, 'Reflect upon your present blessings -- of which every man has many -- not on your past misfortunes, of which all men have some.', ( 'neutral', ( 0.90, 0.08 , 0.02) ), 777, '2020-10-12 23:54' );

--Week 11-18 -  11 - 25 --
INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Knowing others is to be clever. Knowing yourself is to be enlightened.', ( 'neutral', ( 0.35, 0.60 , 0.05) ), 20, '2020-11-18 20:54' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 3, 'Overcoming others requires force. Overcoming yourself requires strength', ( 'neutral', ( 0.20, 0.55 , 0.25) ), 15, '2020-11-19 13:24' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 5, 'To know that you have enough is to be rich', ( 'positive', ( 0.70, 0.25 , 0.05) ), 18, '2020-11-20 14:18' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 7, 'A person of high virtue is not conscious of virtue and therefore possesses Virtue. A person of little virtue tries to be virtuous and therefore lacks Virtue.', ( 'positive', ( 0.70, 0.15 , 0.15) ), 15, '2020-11-21 04:36' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 9, 'When we lose the Tao, we turn to Virtue. When we lose Virtue, we turn to kindness. When we lose kindness, we turn to morality.', ( 'positive', ( 0.70, 0.25 , 0.05) ), 45, '2020-11-22 22:01' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 2, 'Be content with what you have and you will not be disgraced. Know when to stop and you will be preserved from danger. Only in this way will you long endure.', ( 'neutral', ( 0.25, 0.75 , 0.25) ), 35, '2020-11-23 21:01' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 4, 'I am kind to those who are kind. I am also kind to those who are not kind. Thus, there is an increase in kindness.', ( 'positive', ( 0.80, 0.20 , 0.20) ), 60, '2020-11-24 18:50' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 6, 'If I have even little sense, I will walk upon the great path of Tao and only fear straying from it. This Great Way is straight and smooth yet people often prefer the side roads.', ( 'neutral', ( 0.10, 0.65 , 0.25) ), 87, '2020-11-25 11:30' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 8, 'A tree as big as a persons embrace begins as a tiny shoot. A terrace nine stories high rises from a shovelful of earth. A journey of a thousand miles begins under your feet.', ( 'neutral', ( 0.10, 0.65 , 0.25) ), 99, '2020-11-20 12:30' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 10, 'Because of gentleness I am able to be courageous. Because of simplicity I am able to be generous. Because of daring not to be first I am able to lead.', ( 'positive', ( 0.70, 0.20 , 0.10) ), 35, '2020-11-21 22:30' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 2, 'A person whose courage lies in daring will meet death. A person whose courage lies in not daring will encounter life', ( 'neutral', ( 0.10, 0.80 , 0.10) ), 35, '2020-11-21 22:30' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 3, 'The mighty tree will invite the axe.', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 7, '2020-11-22 14:26' );

--Month Nov 2020--
INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Apple', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 7, '2020-11-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 2, 'Banana', ( 'positive', ( 0.80, 0.20 , 0.20) ), 8, '2020-11-05 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 4, 'Dragonfruit', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 27, '2020-11-07 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 5, 'Kiwi', ( 'negative', ( 0.15, 0.15 , 0.70) ), 7, '2020-11-12 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 6, 'Starfruit', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 57, '2020-11-17 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 7, 'Coconut', ( 'positive', ( 0.90, 0.05 , 0.05) ), 7, '2020-11-26 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 8, 'Pineapple', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 100, '2020-11-28 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 9, 'Watermelon', ( 'negative', ( 0.15, 0.15 , 0.70) ), 20, '2020-11-28 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 10, 'Peach', ( 'neutral', ( 0.15, 0.70 , 0.15) ), 7, '2020-11-30 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 9, 'Mango', ( 'positive', ( 0.85, 0.05 , 0.10) ), 2, '2020-11-07 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 8, 'Durian', ( 'negative', ( 0.05, 0.10 , 0.85) ), 7, '2020-11-29 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 7, 'Apricot', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 3, '2020-11-29 14:26' );

--year 2020--
INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Angelfish', ( 'positive', ( 0.95, 0.03 , 0.02) ), 760, '2020-01-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Arowana', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 2, '2020-02-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Betta', ( 'negative', ( 0.01, 0.01 , 0.98) ), 35, '2020-03-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Black Ghost Knifefish', ( 'negative', ( 0.10, 0.05 , 0.85) ), 7, '2020-04-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Clown Loach', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 7, '2020-05-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Guppie', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 10, '2020-06-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Swordtail', ( 'positive', ( 0.65, 0.20 , 0.25) ), 7, '2020-07-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Rainbowfish', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 7, '2020-08-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Tetra', ( 'neutral', ( 0.05, 0.80 , 0.15) ), 50, '2020-09-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Butterflyfish', ( 'positive', ( 0.95, 0.02 , 0.03) ), 7, '2020-10-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Clownfish', ( 'negative', ( 0.15, 0.05 , 0.80) ), 7, '2020-12-01 14:26' );

INSERT INTO calls(agent_id, customer_id, transcript, sentiment, call_length, time_stamp)
VALUES (1, 1, 'Blue Tang', ( 'positive', ( 0.95, 0.03 , 0.02) ), 7, '2020-01-19 14:26' );


--DEPARTMENTS--
INSERT INTO departments (name)
VALUES ('Department 1'), ('Department 2'), ('Department 3');


--DEPARTMENT MEMBERSHIPS--
INSERT INTO in_department (user_id, department_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 2),
  (7, 2),
  (8, 2),
  (9, 3),
  (10, 3);


--DEPARTMENT MANAGERS--
INSERT INTO manages_department (supervisor_id, department_id)
VALUES
  (8, 1),
  (9, 1),
  (10, 1),
  (8, 2),
  (10, 2),
  (9, 3)
