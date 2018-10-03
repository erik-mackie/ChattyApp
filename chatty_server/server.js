// server.js

const express = require('express');
const SocketServer = require('ws').Server;

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

// (ws), different client paths ex ws1 ws2 etc
wss.on('connection', (ws) => {
  console.log('Client connected');

    const msg = {
    message: "Connected to server"
  };

  // recieve new message as json and parse
  ws.on('message', function incoming(data) {
    console.log(JSON.parse(data));
  });
  // Send the msg object as a JSON-formatted string.
  ws.send(JSON.stringify(msg));

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));

});



  // Construct a msg object containing the data the server needs to process the message from the chat client.

