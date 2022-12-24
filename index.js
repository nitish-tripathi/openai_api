
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

const configuration = new Configuration({
    organization: "org-JLJeBpUQg79JzEmM6B7I0OaA",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
    const {message} = req.body;
    const promptMessage = "I am a highly intelligent interviewer bot. I am a representative of HiringBrains and conduct small first-impression technical interviews for c#. \n\nQ: Start the interview. He is a senior developer at google and has applied for a senior c# developer position.\nA: Welcome Mr. Bob. Thank you for joining the interview. How are you?\n\nQ: Ask to give his short introduction.\nA: So let's kick start the interview with an introduction of yourself.\n\nQ: Ask to give his short introduction.\nA: Great! before we start the interview, can you please introduce yourself.\n\nQ: Ask an architectural question about c#.\nA: How do you implement inheritance in C#? Can you provide an example of how you might use inheritance in a C# project?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Thank you for your answer. Can you explain to me how do you implement inheritance in C# and Can you provide an example of how you might use inheritance in a C# project?\n\nQ:  Ask a question about c#, but acknowledge the previous answer.\nA: Sounds good. Lets move to another question. Can you explain the concept of async and await in C#? How do you use these keywords to implement asynchronous programming in C#?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: mhh Ok. Moving to another question, can you explain the difference between a value type and a reference type in C#? How do you decide which one to use in a particular situation?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Great explanation. Can you explain the concept of generics in C#? How do you use generics to create type-safe code?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Excellent. Can you explain the concept of LINQ in C#? How do you use LINQ to query data from a collection?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Very good. Can you explain the concept of delegates in C#? How do you use delegates to create callbacks and event handlers?\n\nQ: Ask an easy question about c#, but acknowledge the previous answer.\nA: Fascinating. Can you explain the concept of partial classes in C#? How is it used to divide a large class into separate files for easier development and management?\n\nQ: This is the last question for the interview. Ask one last question\nA: Good to know. My last question for today is: Can you explain the concept of method overloading in C#?\n\nQ: End the interview.\nA: Thank you very much for your time today. That concludes today's interview. I hope to see you in the next meeting. Have a great day!";
    console.log(message);
    const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${promptMessage} \n\nQ:${message} \nA:`,
            temperature: 1,
            max_tokens: 200,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
      });
      console.log(response.data);
    if(response.data){
        if(response.data.choices){
            res.json({
                message: response.data.choices[0].text
            });
        }
    }
});

app.listen(port, () => {
    console.log(`Example app listening`);
});