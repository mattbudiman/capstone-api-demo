const path = require('path');
const express = require('express');
const multer = require('multer');
const dotenv = require('dotenv');
const sdk = require('microsoft-cognitiveservices-speech-sdk');

dotenv.config();  // Load environment variables from .env

const PORT = process.env.PORT || 3000;

const app = express();
const upload = multer();  // File upload middleware

// FORM
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// API ROUTES
app.post('/api/v1/calls', upload.single('audio'), (req, res) => {
  console.log(req.file);
  res.send({ ok: true });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
