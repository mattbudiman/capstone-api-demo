const path = require('path');
const express = require('express');
const multer = require('multer');
const Azure = require('./Azure');  // Wrapper around Azure SDK

const app = express();
const upload = multer();  // File upload middleware

// FORM
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// API ROUTES
app.post('/api/v1/calls', upload.single('audio'), (req, res) => {
  console.log(req.file);
  const recognizer = Azure.SpeechToText.createSpeechRecognizer(req.file.buffer);
  const handleError = err => res.send({ ok: false, err });  // Error handler
  // Send audio file to Azure
  recognizer.recognizeOnceAsync(
    speechResult => {
      console.log(speechResult);
      // Do sentiment analysis on audio text
      Azure.TextAnalytics.analyzeSentiment(speechResult.privText)
        .then(sentimentResult => {
          console.log(sentimentResult);
          res.send({
            ok: true,
            speechResult,
            sentimentResult
          });
        })
        .catch(handleError);
      recognizer.close();
    },
    handleError
  );
});

module.exports = app;
