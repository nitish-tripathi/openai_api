
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

var number_of_same_topic_questions = 0;

const configuration = new Configuration({
    organization: `${process.env.ORG}`,
    apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);
const promptMessage = "I am a highly intelligent interviewer bot. My name is Carl. I am a representative of HiringBrains and conduct small first-impression technical interviews for c# on telephone. This is a telephonic conversation. \n\nQ: Ask to give his short introduction.\nA: ahh So yeah, let's kick start the interview with an introduction of yourself.\n\nQ: Ask to give his short introduction.\nA: umm this is Great! but before we start the interview, can you please introduce yourself.\n\nQ: Ask an architectural question about c#.\nA: How do you implement inheritance in C#? Can you provide an example of how you might use inheritance in a C# project?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: umm thank you for your answer. Can you umm explain to me how do you implement inheritance in C# and Can you provide an example of how you might use inheritance in a C# project?\n\nQ:  Ask a question about c#, but acknowledge the previous answer.\nA: ah yeah this this sounds good. Umm so lets now move to another question. Can you explain the concept of async and await in C#? How do you use these keywords to implement asynchronous programming in C#?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: umhh Ok. Moving on to another question, can you explain the difference between a value type and a reference type in C#? How do you decide which one to use in a particular situation?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Great explanation. Can you explain the concept of generics in C#? How do you use generics to create type-safe code?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Excellent. Can you explain the concept of LINQ in C#? How do you use LINQ to query data from a collection?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Very good. Can you explain the concept of delegates in C#? How do you use delegates to create callbacks and event handlers?\n\nQ: Ask an easy question about c#, but acknowledge the previous answer.\nA: Fascinating. Can you explain the concept of partial classes in C#? How is it used to divide a large class into separate files for easier development and management?\n\nQ: End the interview.\nA: umm thank you very much for your time today. That concludes today's interview. I hope to see you in the next meeting. Have a great day!";
//const response = await openai.listEngines();

app.use(bodyParser.json());
app.use(cors());

app.post('/start', (req, res) => {
    res.json({
        message: `Thank you for joining the interview today. I am Carl, a representative from HiringBrains. 
        I will be conducting a short technical interview around your expertise and our needs. We will start with your brief introduction and then I will ask few c# technical questions.
        This is the first round of the entire interview process. In the next step, we will then invite you to a longer interivew. So, that being said, lets start with your brief introduction!`,
    });
});

app.post('/', async (req, res) => {
    var message = "";
    if(number_of_same_topic_questions <= 2){
        console.log("same question");
        number_of_same_topic_questions = number_of_same_topic_questions + 1;
        message = `Acknowledge the answer and ask technical architectural programming interview question in c# based on the response: ${req.body.message}.`;
    }else {
        console.log("different question");
        message = "Acknowledge the answer and say that you will ask a question on different topic. Ask technical architectural programming interview question in c#.";
        number_of_same_topic_questions = 0;
    }
    
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
    if (response.data) {
        if (response.data.choices) {
            res.json({
                message: response.data.choices[0].text
            });
        }
    }
});

// app.post('/', async (req, res) => {
//     const { message } = req.body;
//     console.log(message);
//     const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: `${promptMessage} \n\nQ:${message} \nA:`,
//         temperature: 1,
//         max_tokens: 200,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0,
//         stop: ["\n"],
//     });
//     console.log(response.data);
//     if (response.data) {
//         if (response.data.choices) {
//             res.json({
//                 message: response.data.choices[0].text
//             });
//         }
//     }
// });

app.listen(port, () => {
    console.log(`Example app listening`);
});