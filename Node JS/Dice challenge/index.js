// Google Palm API AI Initial code

const { DiscussServiceClient } = require("@google-ai/generativelanguage");
const { GoogleAuth } = require("google-auth-library");
const express = require('express');
const app = express();
const path = require('path');
const port = 3000; // The port where the HTTP reqeuest and responses will play out
app.set('view engine', 'ejs')
var bodyParser = require('body-parser');
var variableName = '';
var aiComment1 = '';
var aiComment2 = '';


const MODEL_NAME = "models/chat-bison-001";
const API_KEY = process.env.AIzaSyCO17CaCoMT9sX9juzNVnrJQFt1h1w6AsY;
app.use(bodyParser.urlencoded({ extended: true }));

const client = new DiscussServiceClient({
    authClient: new GoogleAuth().fromAPIKey("AIzaSyCO17CaCoMT9sX9juzNVnrJQFt1h1w6AsY"),
});


// This is used to make our current directory's view folder the default director for our server from which we
// can fetch and use resources like images, files, html and css files.

app.use(express.static(path.join(__dirname, 'public')))

// This is used to define what will be displayed in the default directory '/' in the port 3000.

app.get('/', function (req, res) {
    res.render('pages/index', { aiComment1: aiComment1, aiComment2: aiComment2 }); // Pass variableName to the index.ejs template.
    variableName = ''
});

app.post('/', (req, res) => {
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
                messages: [{ content: "Give an unique sentence one about a loser and a winner then make sure they are seperated by delimeter." }],
            },
        });
        var variableName = result[0].candidates[0].content;
        console.log(variableName);
        aiComment1 = variableName.split(',')[0];
        aiComment2 = variableName.split(',')[1];
        return aiComment1,aiComment2; // Return the result from the API call.
    }
    // Function call to the asynchronous function
    main(text)
        .then((result) => {
            variableName = result; // Assign the result to the global variable.
            res.redirect('/'); // Redirect after the API call is finished.
        })
        .catch((error) => { // Catching the error if the asynchrounous function fails
            console.error("Error:", error);
            res.redirect('/');
        });
});

app.listen(port, () => { // Makes the http pages work listen to the port defined above
    console.log(`Example app listening on port ${port}`);
});