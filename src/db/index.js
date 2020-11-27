const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const Azure = require('../Azure');

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
  },
  callLength: call.call_length,
  timeStamp: call.time_stamp
  };
}

async function createEmptyCall({ agentId, customerId }) {
  const sql = `
    INSERT INTO calls (
      agent_id,
      customer_id
    )
      VALUES ($1, $2)
      RETURNING
        id,
        agent_id,
        customer_id
  `;
  const values = [
    agentId,
    customerId
  ];
  const call = await querySingle(sql, values);
  return {
    id: call.id,
    agentId: call.agent_id,
    customerId: call.customerId
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
        id,
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

async function createUser({ username, password, firstName, lastName, email, phoneNumber }) {
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
      last_name,
      email,
      phone_number
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `;
    const values = [
        username,
        hashedPassword,
        firstName,
        lastName,
        email,
        phoneNumber
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
            lastName: result.last_name,
            email: result.email,
            phoneNumber: result.phoneNumber,
        };
    }
    catch(e) {
        //probably duplicate username
        console.log(e);
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
    SELECT u.*,
           CASE WHEN EXISTS(SELECT 1 FROM agents a WHERE a.user_id = u.id) THEN true ELSE false END AS is_agent,
           CASE WHEN EXISTS(SELECT 1 FROM supervisors s WHERE s.user_id = u.id) THEN true ELSE false END AS is_supervisor
    FROM users u
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
        ? {id: result.id, username: result.username, firstName: result.first_name, lastName: result.last_name,
          email: result.email, phoneNumber: result.phone_number, isAgent: result.is_agent, isSupervisor: result.is_supervisor}
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
      to_json(sentiment) AS sentiment,
      call_length,
      time_stamp
    FROM calls WHERE agent_id = $1
  `;
  const values = [agentId];
  const calls = await query(sql, values);
  return calls.map(call => convertCallToCamelCase(call));
}

async function getAgents() {
  const sql = `
    SELECT
      id,
      first_name,
      last_name,
      username,
      id IN (SELECT user_id FROM agents) AS is_agent,
      id IN (SELECT user_id FROM supervisors) AS is_supervisor
    FROM users
    WHERE id IN (SELECT user_id FROM agents)
  `;
  const results = await query(sql);
  const agents = results.map(result => {
    return {
      id: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      username: result.username,
      isAgent: result.is_agent,
      isSupervisor: result.is_supervisor
    }
  });
  return agents;
}

async function getUsers() {
  const sql = `
    SELECT
      id,
      first_name AS "firstName",
      last_name AS "lastName",
      username,
      email,
      phone_number AS "phoneNumber",
      id IN (SELECT user_id FROM agents) AS "isAgent",
      id IN (SELECT user_id FROM supervisors) AS "isSupervisor"
    FROM users
  `;
  const users = await query(sql);
  return users;
}

async function getCustomers() {
  const sql = `
    SELECT
      id,
      first_name,
      last_name,
      phone_number
    FROM customers
  `;
  const results = await query(sql);
  const customers = results.map(result => {
    return {
      id: result.id,
      firstName: result.first_name,
      lastName: result.last_name,
      phoneNumber: result.phone_number
    }
  });
  return customers;
}

async function getCall(agentId, callId) {
  const sql = `
    SELECT
      id,
      agent_id,
      customer_id,
      transcript,
      to_json(sentiment) AS sentiment,
      call_length,
      time_stamp
    FROM calls
    WHERE
      agent_id = $1 AND
      id = $2
  `;
  const values = [agentId, callId];
  const result = await querySingle(sql, values);
  if (!result) {
    return null;
  }
  console.log(result);
  const call = convertCallToCamelCase(result);
  call.url = Azure.Storage.getSasUrl(callId);
  return call;
}

// Get all departments
async function getDepartments() {
  const sql = 'SELECT id, name FROM departments';
  const departments = await query(sql);
  return departments;
}

// Get department managers
async function getDepartmentManagers(departmentId) {
  const sql = `
    SELECT
      id,
      first_name AS "firstName",
      last_name AS "lastName",
      username,
      id IN (SELECT user_id FROM agents) AS "isAgent",
      id IN (SELECT user_id FROM supervisors) AS "isSupervisor"
    FROM users
    WHERE id IN (
      SELECT supervisor_id
      FROM manages_department
      WHERE department_id = $1
    )
  `;
  const values = [departmentId];
  const managers = await query(sql, values);
  return managers;
}

// Get members of department with specified departmentId
async function getDepartmentMembers(departmentId) {
  const sql = `
    SELECT
      id,
      first_name AS "firstName",
      last_name AS "lastName",
      username,
      id IN (SELECT user_id FROM agents) AS "isAgent",
      id IN (SELECT user_id FROM supervisors) AS "isSupervisor"
    FROM users
    WHERE id IN (
      SELECT user_id
      FROM in_department
      WHERE department_id = $1
    )
  `;
  const values = [departmentId];
  const members = await query(sql, values);
  return members;
}

// Get department with specified departmentId
async function getDepartment(departmentId) {
  const sql = `
    SELECT D.id, D.name
    FROM departments D
    WHERE D.id = $1
  `;
  const values = [departmentId];
  const department = await querySingle(sql, values);
  department.managers = await getDepartmentManagers(departmentId);
  department.members = await getDepartmentMembers(departmentId);
  return department;
}

// Get departments a user is a member of
async function getUserDepartments(userId) {
  const sql = `
    SELECT D.id, D.name
    FROM departments D, in_department I
    WHERE
      I.user_id = $1 AND
      D.id = I.department_id
  `;
  const values = [userId];
  const departments = await query(sql, values);
  return departments;
}

// Get departments that a supservisor manages
async function getDepartmentsManaged(supervisorId) {
  const sql = `
    SELECT D.id, D.name
    FROM departments D
    WHERE D.id IN (
      SELECT M.department_id
      FROM manages_department M
      WHERE M.supervisor_id = $1
    )
  `;
  const values = [supervisorId];
  const departments = await query(sql, values);
  return departments;
}

// Add user to a department
async function addUserToDepartment(departmentId, userId) {
  const sql = `
    INSERT INTO in_department (department_id, user_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;
  const values = [departmentId, userId];
  await query(sql, values);
  const department = await getDepartment(departmentId);
  return department;
}

// Remove a user from a department
async function removeUserFromDepartment(departmentId, userId) {
  const sql = `
    DELETE FROM in_department
    WHERE department_id = $1 AND user_id = $2
  `;
  const values = [departmentId, userId];
  await query(sql, values);
  const department = await getDepartment(departmentId);
  return department;
}

module.exports = {
  createEmptyCall,
  createCall,
  createUser,
  authenticateUser,
  getCallsBy,
  getAgents,
  getUsers,
  getCustomers,
  getCall,
  getDepartments,
  getDepartment,
  getDepartmentMembers,
  getUserDepartments,
  getDepartmentsManaged,
  addUserToDepartment,
  removeUserFromDepartment
};
