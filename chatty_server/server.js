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



wss.on('connection', (ws) => {
  //current users on connection
  const numUsers = {
    type: 'newUserConnected',
    count: wss.clients.size,
  };
  wss.broadcast(numUsers);
  // assign color to user
  ws.color = randomColor();


  // recieve new message as json and parse
  ws.on('message', function incoming(data) {
    const post = JSON.parse(data);
    // add unique ID before sending to message handlers
    post.id = uuidv1();
    //manage incoming data and change datatype
    const incomingPost = handlePosts(post);
    // assign color to particular post from user obj

    switch(incomingPost.type) {
        case 'incomingMessage':
        incomingPost.color = ws.color;
        wss.broadcast(incomingPost);
        break;
        case 'incomingNotification':
        wss.broadcast(incomingPost);
        break;
      default:
        // show an error in the console if the message type is unknown
        throw new Error('Unknown event type ' + incomingPost.type);
    }
  }); // on.message

  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
    numUsers.count = wss.clients.size;
    wss.broadcast(numUsers);
  })
}); // on.connection



// deletes all other data, need to just change type
function handlePosts(post) {
  const postToManage = post;

    postToManage.type === 'postMessage'
      ? postToManage.type = 'incomingMessage'
      : postToManage.type = 'incomingNotification'

  return postToManage;
}

// random color for user name
function randomColor() {
  const colorList = ['#B22222','#0000CD','#9ACD32','#FF8C00']
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


