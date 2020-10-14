const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const pool = new Pool();

async function query(sql, values) {
  const { rows } = await pool.query(sql, values);
  return rows;
}

async function querySingle(sql, values) {
  const [row] = await query(sql, values);
  return row || null;
}

/**
 * Converts the fields of a Postgres call record to camelcase.
 * @param {*} call Call record as returned by Postgres
 */
function convertCallToCamelCase(call) {
  console.log(call);
  return {
    id: call.id,
    userId: call.user_id,
    customerId: call.customer_id,
    transcript: call.transcript,
    sentiment: {
      label: call.sentiment.label,
      scores: {
        positive: call.sentiment.scores.positive,
        neutral: call.sentiment.scores.neutral,
        negative: call.sentiment.scores.negative
      }
    }
  };
}

async function getUsers() {
  const sql = 'SELECT * FROM users';
  const results = await query(sql);
  const users = results.map(result => {
    return {
      id: result.id,
      username: result.username,
      firstName: result.first_name,
      lastName: result.last_name,
      userType: result.user_type
    };
  });
  return users;
}

async function getCustomers() {
  const sql = 'SELECT * FROM customers';
  const results = await query(sql);
  const customers = results.map(result => {
    return {
      id: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      phoneNumber: result.phone_number
    };
  });
  return customers;
}

async function createEmptyCall({ userId, customerId }) {
  const sql = `
    INSERT INTO calls (
      user_id,
      customer_id
    )
      VALUES ($1, $2)
      RETURNING
        id,
        user_id,
        customer_id
  `;
  const values = [
    userId,
    customerId
  ];
  const call = await querySingle(sql, values);
  return {
    id: call.id,
    userId: call.user_id,
    customerId: call.customerId
  };
}

async function createUser({ username, password, firstName, lastName }) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  const sql = `
    INSERT INTO users (
      username,
      hashed_password,
      first_name,
      last_name
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [username, hashedPassword, firstName, lastName];
  let result = null;
  try {
    result = await querySingle(sql, values);
  } catch (e) {
    //probably duplicate username
    console.log(e);
  }
  let user = null;
  if (result) {
    user = {
      id: result.id,
      username: result.username,
      firstName: result.first_name,
      lastName: result.last_name,
      userType: result.user_type
    };
  }
  return user;
}

async function getUser({ username }) {
  const sql = `
    SELECT * FROM users
    WHERE username = $1
  `;
  const values = [
    username
  ];
  const result = await querySingle(sql, values);
  return result ? {id: result.id, username: result.username, firstName: result.firstName, lastName: result.lastName} : null;
}

async function authenticateUser({ username, password }) {
  const sql = `
    SELECT u.*, p.relname
    FROM users u, pg_class p
    WHERE username = $1
  `;
  const values = [username];
  const result = await querySingle(sql, values);
  if (result) {
    const match = await new Promise((resolve, reject) => {
      bcrypt.compare(password, result.hashed_password, function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
    return match
      ? {
          id: result.id,
          username: result.username,
          firstName: result.first_name,
          lastName: result.last_name,
          userType: result.user_type,
        }
      : null;
  }
  return null;
}

/**
 * Get all calls an agent was part of.
 * @param {*} userId The user ID of the agent
 */
async function getCallsBy(userId) {
  const sql = `
    SELECT
      id,
      user_id,
      customer_id,
      transcript,
      to_json(sentiment) AS sentiment
    FROM calls WHERE user_id = $1
  `;
  const values = [userId];
  const calls = await query(sql, values);
  return calls.map(call => convertCallToCamelCase(call));
}

module.exports = {
  createEmptyCall,
  createUser,
  authenticateUser,
  getCallsBy,
  getUsers,
  getCustomers
};
