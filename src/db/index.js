const { Pool } = require('pg');

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

module.exports = {
  createCall
};
