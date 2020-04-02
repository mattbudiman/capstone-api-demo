const path = require('path');
const express = require('express');
const multer = require('multer');
const azure = require('./azure');  // Wrapper around Azure SDK

const app = express();
const upload = multer();  // File upload middleware

// FORM
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// API ROUTES
app.post('/api/v1/calls', upload.single('audio'), (req, res) => {
  console.log(req.file);
  const recognizer = azure.createSpeechRecognizer(req.file.buffer);
  // Send audio file to Azure and return text
  recognizer.recognizeOnceAsync(
    result => {
      console.log(result);
      res.send({
        ok: true,
        result
      });
      recognizer.close();
    },
    err => {
      console.log(err);
      res.send({
        ok: false,
        err
      });
      recognizer.close();
    }
  );
});

module.exports = app;
