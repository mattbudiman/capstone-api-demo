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

CREATE TYPE USER_TYPE AS ENUM ('agent', 'supervisor');

CREATE TABLE users (
  id BIGSERIAL,
  first_name VARCHAR(20) NOT NULL,
  last_name VARCHAR(20) NOT NULL,
  username VARCHAR(20) UNIQUE NOT NULL,
  hashed_password VARCHAR(60) NOT NULL,
  user_type USER_TYPE NOT NULL DEFAULT 'agent',
  PRIMARY KEY (id)
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
  user_id BIGINT NOT NULL,
  customer_id INTEGER NOT NULL,
  transcript TEXT,
  sentiment SENTIMENT,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
    ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers (id)
    ON DELETE CASCADE
);
