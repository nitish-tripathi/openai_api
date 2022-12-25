const express = require("express");
require("actions-on-google")
const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const cors = require('cors');

// require('dotenv').config();
const axios = require('axios');
const { WebhookClient } = require("dialogflow-fulfillment");

const configuration = new Configuration({
  organization: `${process.env.ORG}`,
  apiKey: `${process.env.OPENAI_API_KEY}`,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());

app.post("/dialogflow", express.json(), (req, res) => {
  
  console.log("welcome!");
  const agent = new WebhookClient({ request: req, response: res });
  let intentMap = new Map();
  intentMap.set("Default Fallback Intent", queryGPT);
  agent.handleRequest(intentMap);

  const dialog = `I am a highly intelligent interviewer bot. My name is Carl. I am a representative of HiringBrains and conduct small first-impression technical interviews for c# on telephone. This is a telephonic conversation. \n\nQ: Ask to give his short introduction.\nA: ahh So yeah, let's kick start the interview with an introduction of yourself.\n\nQ: Ask to give his short introduction.\nA: umm this is Great! but before we start the interview, can you please introduce yourself.\n\nQ: Ask an architectural question about c#.\nA: How do you implement inheritance in C#? Can you provide an example of how you might use inheritance in a C# project?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: umm thank you for your answer. Can you umm explain to me how do you implement inheritance in C# and Can you provide an example of how you might use inheritance in a C# project?\n\nQ:  Ask a question about c#, but acknowledge the previous answer.\nA: ah yeah this this sounds good. Umm so lets now move to another question. Can you explain the concept of async and await in C#? How do you use these keywords to implement asynchronous programming in C#?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: umhh Ok. Moving on to another question, can you explain the difference between a value type and a reference type in C#? How do you decide which one to use in a particular situation?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Great explanation. Can you explain the concept of generics in C#? How do you use generics to create type-safe code?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Excellent. Can you explain the concept of LINQ in C#? How do you use LINQ to query data from a collection?\n\nQ: Ask a question about c#, but acknowledge the previous answer.\nA: Very good. Can you explain the concept of delegates in C#? How do you use delegates to create callbacks and event handlers?\n\nQ: Ask an easy question about c#, but acknowledge the previous answer.\nA: Fascinating. Can you explain the concept of partial classes in C#? How is it used to divide a large class into separate files for easier development and management?\n\nQ: End the interview.\nA: umm thank you very much for your time today. That concludes today's interview. I hope to see you in the next meeting. Have a great day!`;

  async function queryGPT(agent) {
    let query = agent.query;
    var message = "";
    if (number_of_same_topic_questions <= 2) {
      console.log("same question");
      number_of_same_topic_questions = number_of_same_topic_questions + 1;
      message = `Acknowledge the answer and ask technical architectural programming interview question in c# based on the response: ${query}.`;
    } else {
      console.log("different question");
      message = "Acknowledge the answer and say that you will ask a question on different topic. Ask technical architectural programming interview question in c#.";
      number_of_same_topic_questions = 0;
    }
    // agent.add('Sorry! I am unable to understand this at the moment. I am still learning humans. You can pick any of the service that might help me.');

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${dialog} \n\nQ:${message} \nA:`,
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
        agent.add(response.data.choices[0]);
      }
    }

  }
});
const port = 3000;
app.listen(port, () => console.log(`App listening on port ${port} !`))
var number_of_questions = 0;
