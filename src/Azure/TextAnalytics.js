const {
  TextAnalyticsClient,
  TextAnalyticsApiKeyCredential
} = require('@azure/ai-text-analytics');

// AZURE TEXT ANALYTICS SDK CONFIG
const endpoint = process.env.AZURE_TEXT_ANALYTICS_ENDPOINT;
const apiKey = process.env.AZURE_TEXT_ANALYTICS_KEY;
const credential = new TextAnalyticsApiKeyCredential(apiKey);

const client = new TextAnalyticsClient(endpoint, credential);

async function analyzeSentiment(text) {
  const [result] = await client.analyzeSentiment([text]);
  console.log(result);
  return {
    label: result.sentiment,
    scores: result.confidenceScores
  };
}

module.exports = {
  analyzeSentiment
};
