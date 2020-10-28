const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const multer = require('multer');

const Azure = require('./Azure');  // Wrapper around Azure SDKs
const db = require('./db');
const Authorize = require('./middleware/Authorize');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(session({secret: '$2y$12$bxwP0kYY9wqyjUgORJTgnu09u4/40N5Q4rewgJps6.KMSWRGyWN4m', resave: true, saveUninitialized: false}));

const upload = multer();  // File upload middleware

// FORM
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// API ROUTES
app.post('/api/v1/calls', Authorize.supervisor, upload.single('audio'), async (req, res) => {
  console.log(req.file);
  try {
    const agentId = parseInt(req.body.agentId);
    const customerId = parseInt(req.body.customerId);
    console.log(agentId, customerId);

    const call = await db.createEmptyCall({ agentId, customerId });

    // Upload call audio
    await Azure.Storage.uploadCall(req.file, call.id);

    res.send({ ok: true, call });

  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
});

app.get('/api/v1/agents', Authorize.supervisor, async (req, res) => {
  try {
    const agents = await db.getAgents();
    res.send({ ok: true, agents });
  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
});

app.get('/api/v1/customers', Authorize.supervisor, async (req, res) => {
  try {
    const customers = await db.getCustomers();
    res.send({ ok: true, customers });
  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
});

app.post('/api/v1/test', Authorize.user, (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.end(JSON.stringify({message: 'This is a test.'}));
});

app.get('/api/v1/me/calls', Authorize.agent, async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  try {
    const calls = await db.getCallsBy(req.session.userId);
    res.send({ ok: true, calls });
  } catch (error) {
    res.send({ ok: false, message: `Error: ${JSON.stringify(error)}` });
  }
});

// Get particular call
app.get('/api/v1/me/calls/:callId', Authorize.agent, async (req, res) => {
  const agentId = req.session.userId;
  const callId = req.params.callId;
  try {
    const call = await db.getCall(agentId, callId);
    if (!call) {
      return res.status(404).end(JSON.stringify({ ok: false, message: 'Call not found' }));
    }
    res.send({ ok: true, call });
  } catch (error) {
    res.send({ ok: false, message: error.message });
  }
});

app.post('/api/v1/login', async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (!req.body.username || !req.body.password) {
    return res.status(401).end({error: 'Missing Required Fields'});
  }
  const result = await db.authenticateUser({
    username: req.body.username,
    password: req.body.password
  });
  if (result) {
    req.session.userId = result.id;
    req.session.isAgent = result.isAgent;
    req.session.isSupervisor = result.isSupervisor;
    return res.status(200).end(JSON.stringify(result));
  }
  else {
    return res.status(401).end(JSON.stringify({error: 'Invalid Login Credentials'}));
  }
});

app.post('/api/v1/register', async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (!req.body.username || !req.body.password || !req.body.firstName || !req.body.lastName) {
    return res.status(401).end(JSON.stringify({error: 'Missing Required Fields'}));
  }
  const result = await db.createUser({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });
  if (result) {
    req.session.userId = result.id;
    req.session.isAgent = result.isAgent;
    req.session.isSupervisor = result.isSupervisor;
    return res.status(200).end(JSON.stringify(result));
  }
  else {
    return res.status(401).end(JSON.stringify({error: 'Could Not Create Account'}));
  }
});

app.get('/api/v1/logout', async (req, res) => {
  req.session.destroy();
  return res.status(200).end();
});

module.exports = app;
