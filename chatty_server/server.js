// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1'); // UUID generator

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()

 // Make the express server serve static assets (html, javascript, css) from the /public folder
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.


// const chatPosts = [];

// on connection to server, take in message data into message array
wss.on('connection', (ws) => {
  //current resents on each connection

  console.log('Client connected');
  // recieve new message as json and parse
  ws.on('message', function incoming(data) {

    const post = JSON.parse(data);

    // add unique ID before sending to message handlers
    post.id = uuidv1();

    //manage incoming data and change datatype
    const incomingPost = handlePosts(post)

    // chatPosts.push(incomingPost);
    // // just send incoming
    // console.log(chatPosts)
    wss.broadcast(incomingPost);

  }); // on.message


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () =>
    console.log('Client disconnected'));
});



// deletes all other data, need to just change type
function handlePosts(post) {
  const postToManage = post;

    postToManage.type === "postMessage"
      ? postToManage.type = "incomingMessage"
      : postToManage.type = "incomingNotification"

  return postToManage;
}


//broadcast messages to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

  // Construct a msg object containing the data the server needs to process the message from the chat client.

