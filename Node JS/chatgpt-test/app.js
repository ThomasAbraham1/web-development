const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

const OPENAI_API_KEY = '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';
const GPT3_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const MAX_TOKENS = 100;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    const prompt = getRandomPrompt(); // Generate a new random prompt
    res.render('index', { prompt, completion: '' });
  });

function getRandomPrompt() {
  const prompts = [
    "Translate the following English text to French: 'Hello, how are you?'",
    "Generate a short story about a mysterious island.",
    "Explain the concept of quantum mechanics to a 10-year-old.",
    // Add more prompts here...
  ];

  const randomIndex = Math.floor(Math.random() * prompts.length);
  return prompts[randomIndex];
}

app.get('/', (req, res) => {
  res.render('index', { prompt: getRandomPrompt(), completion: '' });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const response = await axios.post(GPT3_ENDPOINT, {
      'prompt': prompt,
      'max_tokens': MAX_TOKENS,
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const completion = response.data.choices[0].text.trim();
    res.render('index', { prompt, completion });
  } catch (error) {
    console.error('Error fetching the response:', error);
    res.render('index', { prompt: req.body.prompt, completion: 'Error fetching the response' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
