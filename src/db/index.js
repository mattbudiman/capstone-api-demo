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
    agentId: call.agent_id,
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

async function createCall({ agentId, customerId, transcript, sentiment }) {
  const sql = `
    INSERT INTO calls (
      agent_id,
      customer_id,
      transcript,
      sentiment
    )
      VALUES ($1, $2, $3, ($4, ($5, $6, $7)))
      RETURNING
        agent_id,
        customer_id,
        transcript,
        to_json(sentiment) AS sentiment
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
  return convertCallToCamelCase(call);
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
    let user = null;
    const client = await pool.connect();  // Necessary to use transactions
    try {
        await client.query('BEGIN');
        const { rows } = await client.query(sql, values);
        const [result] = rows;
        await client.query('INSERT INTO agents VALUES ($1) RETURNING *', [result.id]);
        await client.query('COMMIT');
        user = {
            id: result.id,
            username: result.username,
            firstName: result.first_name,
            lastName: result.last_name
        };
    }
    catch(e) {
        //probably duplicate username
        //console.log(e);
        await client.query('ROLLBACK');
    }
    finally {
        client.release();
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

/**
 * Get all calls an agent was part of.
 * @param {*} agentId The user ID of the agent
 */
async function getCallsBy(agentId) {
  const sql = `
    SELECT
      id,
      agent_id,
      customer_id,
      transcript,
      to_json(sentiment) AS sentiment
    FROM calls WHERE agent_id = $1
  `;
  const values = [agentId];
  const calls = await query(sql, values);
  return calls.map(call => convertCallToCamelCase(call));
}

module.exports = {
  createCall,
  createUser,
  authenticateUser,
  getCallsBy
};
