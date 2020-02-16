const express = require('express');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const severities = require('./severity');


app.use(express.json({ extended: false }));

app.use(cors());

app.post('/', async (req, res) => {
  console.log(req.body);
  console.log(severities);
  const {
    TextAnalyticsClient,
    TextAnalyticsApiKeyCredential
  } = require('@azure/ai-text-analytics');
  // Creates a client
  const client = new TextAnalyticsClient(
    'https://wreco-nlp.cognitiveservices.azure.com/',
    new TextAnalyticsApiKeyCredential('133eada7d2484c32b5df5f88a38ee941')
  );
  const { name, symptoms, files } = req.body;

  const [result1] = await client.analyzeSentiment([symptoms]);
  const [result2] = await client.extractKeyPhrases([symptoms]);
  let returnObj = {
    name: name,
    symptoms: result2.keyPhrases,
    timestamp: new Date().toISOString()
  };
  console.log(result2.keyPhrases);
  console.log(Object.keys(severities).length);
  for (let i = 0; i < result2.keyPhrases.length; i++) {
    for (let j = 0; j < Object.keys(severities).length; j++) {
      if (
        severities[[Object.keys(severities)[j]]].includes(result2.keyPhrases[i])
      ) {
        returnObj.severity = Object.keys(severities)[j];
      }
    }
  }
  if (!returnObj.severity) {
    returnObj.severity = 'moderate';
  }
  console.log(returnObj);
  res.send(returnObj);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
