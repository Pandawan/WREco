const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));

app.post('/', cors(), async (req, res) => {
  console.log(req.body);
  const {
    TextAnalyticsClient,
    TextAnalyticsApiKeyCredential
  } = require('@azure/ai-text-analytics');
  // Creates a client
  const client = new TextAnalyticsClient(
    'https://wreco-nlp.cognitiveservices.azure.com/',
    new TextAnalyticsApiKeyCredential('133eada7d2484c32b5df5f88a38ee941')
  );
  const { name, symptoms } = req.body;

  const [result1] = await client.analyzeSentiment([symptoms]);
  const [result2] = await client.extractKeyPhrases([symptoms]);

  res.send({ ...result1, ...result2 });
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
