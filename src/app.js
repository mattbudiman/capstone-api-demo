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
app.post('/api/v1/calls', upload.single('audio'), async (req, res) => {
  console.log(req.file);
  try {
    const transcript = await Azure.SpeechToText.recognize(req.file.buffer);
    const sentiment = await Azure.TextAnalytics.analyzeSentiment(transcript);
    const call = await db.createCall({
      agentId: parseInt(req.body.agentId),
      customerId: parseInt(req.body.customerId),
      transcript,
      sentiment
    });
    res.send({ ok: true, call });
  } catch (error) {
    res.send({ ok: false, error: `Error: ${JSON.stringify(error)}` });
  }
});

app.post('/api/v1/test', Authorize.user, (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.end(JSON.stringify({message: 'This is a test.'}));
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
    req.session.userType = "supervisor";
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
    req.session.userType = "supervisor";
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
