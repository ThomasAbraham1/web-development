const http = require('http');
const axios = require('axios');

const OPENAI_API_KEY = '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';
const GPT3_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const MAX_TOKENS = 60;
let randomPrompt;

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

// Trigger the API call on server startup to get a random prompt
axios.post(GPT3_ENDPOINT, {
  'prompt': getRandomPrompt(),
  'max_tokens': MAX_TOKENS,
}, {
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  randomPrompt = response.data.choices[0].text.trim();
})
.catch(error => {
  console.error('Error fetching the random prompt:', error);
});

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`Generated Text:\n\n${randomPrompt}`);
}).listen(8080);

console.log('Server running at http://localhost:8080/');
