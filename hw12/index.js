
// You MUST have a file called "token.secret" in the same directory as this file!
// This should be the secret token found in https://dashboard.ngrok.com/
// Make sure it is on a single line with no spaces!
// It will NOT be committed.

// TO START
//   1. Open a terminal and run 'npm start'
//   2. Open another terminal and run 'npm run tunnel'
//   3. Copy/paste the ngrok HTTPS url into the DialogFlow fulfillment.
//
// Your changes to this file will be hot-reloaded!

import fetch from 'node-fetch';
import fs from 'fs';
import ngrok from 'ngrok';
import morgan from 'morgan';
import express from 'express';

// Read and register with secret ngrok token.
ngrok.authtoken(fs.readFileSync("token.secret").toString().trim());

// Start express on port 53705
const app = express();
const port = 53705;

// Accept JSON bodies and begin logging.
app.use(express.json());
app.use(morgan(':date ":method :url" :status - :response-time ms'));

// "Hello World" endpoint.
// You should be able to visit this in your browser
// at localhost:53705 or via the ngrok URL.
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({
    msg: 'Express Server Works!'
  }))
})

// Dialogflow will POST a JSON body to /.
// We use an intent map to map the incoming intent to
// its appropriate async functions below.
// You can examine the request body via `req.body`
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_request
app.post('/', (req, res) => {
  const intent = req.body.queryResult.intent.displayName;

  // A map of intent names to callback functions.
  // The "HelloWorld" is an example only -- you may delete it.
  const intentMap = {
    "GetNumUsers": doNumOfUsers,
    "GetNumMessages": doNumOfPosts,
    "GetChatroomMessages": doGetPosts,
  }

  if (intent in intentMap) {
    // Call the appropriate callback function
    intentMap[intent](req, res);
  } else {
    // Uh oh! We don't know what to do with this intent.
    // There is likely something wrong with your code.
    // Double-check your names.
    console.error(`Could not find ${intent} in intent map!`)
    res.status(404).send(JSON.stringify({ msg: "Not found!" }));
  }
})

// Open for business!
app.listen(port, () => {
  console.log(`DialogFlow Handler listening on port ${port}. Use 'npm run tunnel' to expose this.`)
})

// Your turn!
// See https://cloud.google.com/dialogflow/es/docs/fulfillment-webhook#webhook_response
// Use `res` to send your response; don't return!

async function doNumOfUsers(req, res) {
  const response = await fetch('https://www.cs571.org/s23/hw12/api/numUsers', {
    method: 'GET',
    headers: { "X-CS571-ID": "bid_2a1709990731052fcc9b", }
  });
  const json = await response.json();
  console.log(json)

  res.status(200).send({
    fulfillmentMessages: [
      {
        text: {
          text: [
            `There are ${json.users} users registered on BadgerChat!`
          ]
        }
      }
    ]
  })
}

async function doNumOfPosts(req, res) {
  const chatroom = req.body.queryResult.parameters.Chatrooms;
  if (chatroom === "") {
    const response = await fetch('https://www.cs571.org/s23/hw12/api/numMessages', {
      method: 'GET',
      headers: { "X-CS571-ID": "bid_2a1709990731052fcc9b", }
    });
    const json = await response.json();

    res.status(200).send({
      fulfillmentText: `There are ${json.messages} posts on BadgerChat!`
    })
  } else {
    const response = await fetch(`https://www.cs571.org/s23/hw12/api/chatroom/${chatroom}/numMessages`, {
      method: 'GET',
      headers: { "X-CS571-ID": "bid_2a1709990731052fcc9b", }
    });
    const json = await response.json();

    res.status(200).send({
      fulfillmentText: `There are ${json.messages} posts on ${chatroom}!`
    })
  }
}

async function doGetPosts(req, res) {
  const chatroom = req.body.queryResult.parameters.chatroom;
  let number = req.body.queryResult.parameters.number;
  const response = await fetch(`https://www.cs571.org/s23/hw12/api/chatroom/${chatroom}/messages`, {
    method: 'GET',
    headers: { "X-CS571-ID": "bid_2a1709990731052fcc9b", }
  });

  const json = await response.json();
  const cards = [];

  // make sure at most 5 cards and at least 1 card returned
  if (number > 5) {
    number = 5;
  } else if (number < 1) {
    number = 1;
  }

  for (let i = 0; i < number; i++) {
    const card = {
      card: {
        title: json.messages[i].title,
        subtitle: json.messages[i].poster,
        buttons: [
          {
            text: "READ MORE",
            postback: `https://cs571.org/s23/badgerchat/chatrooms/${chatroom}/messages/${json.messages[i].id}`
          }
        ]
      }
    }
    cards.push(card)
  }

  res.status(200).send({
    fulfillmentMessages: cards
  })
}