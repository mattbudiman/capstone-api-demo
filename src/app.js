const path = require('path');
const express = require('express');
const multer = require('multer');
const Azure = require('./Azure');  // Wrapper around Azure SDKs
const db = require('./db');

const app = express();
const upload = multer();  // File upload middleware

// FORM
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

// API ROUTES
app.post('/api/v1/calls', upload.single('audio'), (req, res) => {
  console.log(req.file);
  const agentId = parseInt(req.body.agentId);
  const customerId = parseInt(req.body.customerId);

  // BEGIN CALL PROCESSING
  const recognizer = Azure.SpeechToText.createSpeechRecognizer(req.file.buffer);
  // Send audio file to Azure to be converted to text
  recognizer.recognizeOnceAsync(
    async speechResult => {
      console.log(speechResult);
      const transcript = speechResult.privText;
      try {
        // Do sentiment analysis
        const {
          sentiment,
          confidenceScores
        } = await Azure.TextAnalytics.analyzeSentiment(transcript);
        // Add call to database
        const call = await db.createCall({
          agentId,
          customerId,
          transcript,
          sentiment: {
            label: sentiment,
            scores: confidenceScores
          }
        });
        console.log(call);
        res.send({ ok: true, call });
      } catch (error) {
        res.send({
          ok: false,
          message: `An error occurred: ${JSON.stringify(error)}`
        });
      }
      recognizer.close();
    },
    error => {
      res.send({
        ok: false,
        message: `An error occurred: ${JSON.stringify(error)}`
      });
      recognizer.close();
    }
  );
});

module.exports = app;
