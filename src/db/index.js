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

async function createCall({ agentId, customerId, transcript, sentiment }) {
  const sql = `
    INSERT INTO calls (
      agent_id,
      customer_id,
      transcript,
      sentiment
    )
      VALUES ($1, $2, $3, ($4, ($5, $6, $7)))
      RETURNING *
  `;
  const values = [
    agentId,
    customerId,
    transcript,
    sentiment.label,
    sentiment.scores.positive,
    sentiment.scores.neutral,
    sentiment.scores.negative
  ];
  const call = await querySingle(sql, values);
  return {
    id: call.id,
    agentId: call.agent_id,
    customerId: call.customer_id,
    transcript,
    sentiment: {
      label: sentiment.label,
      scores: {
        positive: sentiment.scores.positive,
        neutral: sentiment.scores.neutral,
        negative: sentiment.scores.negative
      }
    }
  };
}

async function createUser({ username, password, firstName, lastName }) {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) reject(err);
            resolve(hash);
        });
    });
    const sql = `
    INSERT INTO users (
      username,
      password,
      first_name,
      last_name
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const values = [
        username,
        hashedPassword,
        firstName,
        lastName
    ];
    try {
        const result = await querySingle(sql, values);
        return {
            id: result.id,
            username: result.username,
            firstName: result.first_name,
            lastName: result.last_name
        };
    }
    catch(e) {
        //probably duplicate username
        //console.log(e);
    }
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
  const values = [
    username
  ];
  const result = await querySingle(sql, values);
  if(result) {
    const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password, result.password, function(err, result) {
            if(err) reject(err);
            resolve(result);
        });
    });
    return match
        ? {id: result.id, username: result.username, firstName: result.first_name, lastName: result.last_name}
        : null;
  }
  return null;
}

module.exports = {
  createCall,
  createUser,
  authenticateUser
};
