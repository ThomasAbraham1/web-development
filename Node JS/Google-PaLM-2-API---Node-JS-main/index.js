// Google Palm API AI Initial code

const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.set('view engine', 'ejs')
var bodyParser = require('body-parser');
var variableName = '';

const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.AIzaSyCO17CaCoMT9sX9juzNVnrJQFt1h1w6AsY;
app.use(bodyParser.urlencoded({ extended: true })); 

const client = new DiscussServiceClient({
  authClient: new GoogleAuth().fromAPIKey("AIzaSyCO17CaCoMT9sX9juzNVnrJQFt1h1w6AsY"),
});




app.use(express.static(path.join(__dirname,'views')))
app.get('/', function(req, res) {
  res.render('pages/index', { variableName: variableName }); // Pass variableName to the index.ejs template.
  variableName = ''
});

app.post('/',(req,res)=>{
    var text = req.body.prompt;

    async function main(text) {
        const result = await client.generateMessage({
          model: MODEL_NAME, // Required. The model to use to generate the result.
          temperature: 0.5, // Optional. Value `0.0` always uses the highest-probability result.
          candidateCount: 1, // Optional. The number of candidate results to generate.
          prompt: {
            // optional, preamble context to prime responses
            context: "Respond to all questions with a rhyming poem.",
            // Optional. Examples for further fine-tuning of responses.
            examples: [
              {
                input: { content: "What is the capital of California?" },
                output: {
                  content:
                    `If the capital of California is what you seek,
      Sacramento is where you ought to peek.`,
                },
              },
            ],
            // Required. Alternating prompt/response messages.
            messages: [{ content: text}],
          },
        });
        var variableName = result[0].candidates[0].content;
        console.log(variableName);
        return result[0].candidates[0].content; // Return the result from the API call.
      }
    
      main(text)
        .then((result) => {
          variableName = result; // Assign the result to the global variable.
          res.redirect('/'); // Redirect after the API call is finished.
        })
        .catch((error) => {
          console.error("Error:", error);
          res.redirect('/');
        });
    });
    
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });