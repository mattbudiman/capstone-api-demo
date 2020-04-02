const path = require('path');
const express = require('express');
const multer = require('multer');
const Azure = require('./Azure');  // Wrapper around Azure SDKs

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
  // Send audio file to Azure
  recognizer.recognizeOnceAsync(
    speechResult => {
      console.log(speechResult);
      // Do sentiment analysis on audio text
      Azure.TextAnalytics.analyzeSentiment(speechResult.privText)
        .then(sentimentResult => {
          console.log(sentimentResult);
          const { sentiment, confidenceScores } = sentimentResult[0];
          res.send({
            ok: true,
            transcript: speechResult.privText,
            sentiment,
            confidenceScores
          });
        })
        .catch(error => res.send({ ok: false, error }));
      recognizer.close();
    },
    error => {
      res.send({ ok: false, error });
      recognizer.close();
    }
  );
});

module.exports = app;
