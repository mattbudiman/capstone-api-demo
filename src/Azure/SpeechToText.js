const sdk = require('microsoft-cognitiveservices-speech-sdk');

// AZURE SPEECH SDK CONFIG
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

function recognize(audioFileBuffer) {
  const recognizer = createSpeechRecognizer(audioFileBuffer);
  return new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      result => {
        console.log(result);
        resolve(result.privText);
        recognizer.close();
      },
      error => {
        reject(error);
        recognizer.close();
      }
    );
  })
}

module.exports = {
  recognize
};
