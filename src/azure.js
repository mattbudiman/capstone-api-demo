const sdk = require('microsoft-cognitiveservices-speech-sdk');

// AZURE SDK CONFIG
const subscriptionKey = process.env.AZURE_SPEECH_SUBSCRIPTION_KEY;
const serviceRegion = process.env.AZURE_SPEECH_SERVICE_REGION;

function createSpeechRecognizer(audioFileBuffer) {
  const pushStream = sdk.AudioInputStream.createPushStream();
  pushStream.write(audioFileBuffer);
  const audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);

  const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
  speechConfig.speechRecognitionLanguage = 'en-US';

  return new sdk.SpeechRecognizer(speechConfig, audioConfig);
}

module.exports = {
  createSpeechRecognizer
};
