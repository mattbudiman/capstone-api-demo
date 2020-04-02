const {
  TextAnalyticsClient,
  TextAnalyticsApiKeyCredential
} = require('@azure/ai-text-analytics');

// AZURE TEXT ANALYTICS SDK CONFIG
const endpoint = process.env.AZURE_TEXT_ANALYTICS_ENDPOINT;
const apiKey = process.env.AZURE_TEXT_ANALYTICS_KEY;
const credential = new TextAnalyticsApiKeyCredential(apiKey);

const client = new TextAnalyticsClient(endpoint, credential);

function analyzeSentiment(text) {
  return client.analyzeSentiment([text]);  // Returns a Promise
}

module.exports = {
  analyzeSentiment
};
