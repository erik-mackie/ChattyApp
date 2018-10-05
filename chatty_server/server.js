// server.js

const express = require('express');
const WebSocket = require('ws');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1'); // UUID generator

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
.use(express.static('public'))
.listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });



wss.on('connection', (ws) => {
  //current users on connection
  function tattleAboutClientCount() {
    const numUsers = {
      type: 'newUserConnected',
      count: wss.clients.size,
    };
    wss.broadcast(numUsers);
  }
  tattleAboutClientCount();
  // assign color to user
  ws.color = randomColor();


  // recieve new message as json and parse
  ws.on('message', function incoming(data) {
    const post = JSON.parse(data);
    //manage incoming data and change datatype
    const incomingPost = Object.assign({}, post); // duplicate so we don't edit the incoming one
    // add unique ID before sending to message handlers
    incomingPost.id = uuidv1();

    // handling messages to client
    switch(post.type) {
      case 'postMessage':
        incomingPost.type = 'incomingMessage';
        incomingPost.color = ws.color;
        break;
      case 'postNotification':
        incomingPost.type = 'incomingNotification';
        break;

      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + post.type);
    }

    wss.broadcast(incomingPost);
  }); // on.message

  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
    tattleAboutClientCount();
  })
}); // on.connection

// random color for user name
function randomColor() {
  const colorList = ['#B22222','#0000CD','#9ACD32','#FF8C00', '#ff00ff', '#000000']
  return colorList[Math.floor(Math.random()*colorList.length)]
}

//broadcast messages to all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};


