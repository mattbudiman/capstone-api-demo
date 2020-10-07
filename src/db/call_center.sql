CREATE TYPE SENTIMENT_LABEL AS ENUM ('positive', 'neutral', 'negative', 'mixed');

CREATE TYPE SENTIMENT_SCORES AS (
  positive NUMERIC,
  neutral NUMERIC,
  negative NUMERIC
);

CREATE TYPE SENTIMENT AS (
  label SENTIMENT_LABEL,
  scores SENTIMENT_SCORES
);

CREATE TABLE users (
  id BIGSERIAL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  password VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE agents (
  user_id INTEGER,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE supervisors (
  user_id INTEGER,
  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE
);

CREATE TABLE customers (
  id BIGSERIAL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE calls (
  id BIGSERIAL,
  agent_id INTEGER NOT NULL,
  customer_id INTEGER NOT NULL,
  transcript TEXT,
  sentiment SENTIMENT,
  PRIMARY KEY (id),
  FOREIGN KEY (agent_id) REFERENCES agents (user_id)
    ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers (id)
    ON DELETE CASCADE
);
