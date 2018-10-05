import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';

// const test = 'https://exmaple.com/image.jpg';
// console.log(test.match(/[^/]+(jpg|png|gif)$/))


function Loading() {
  return (
    <h1>Loading...</h1>
  )
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading:true,
      messages: [],
      currentUser: 'Anonymous',
      numUsers: 0,
    };
    this.messageToServer = this.messageToServer.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }

  componentDidMount() {

    this.ws = new WebSocket(`ws://localhost:3001`);
    // handle server messages
    this.ws.onmessage = (event) => {
      const messageFromServer = JSON.parse(event.data);

      switch(messageFromServer.type) {
        case 'incomingMessage':
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(messageFromServer)
          });
        break;
        case 'newUserConnected':
          this.setState({
            numUsers: messageFromServer.count,
          })
        break;
        default:
          // show an error in the console if the message type is unknown
          throw new Error('Unknown event type ' + messageFromServer.type);
      }
    }

    // faux time for message load
    setTimeout(() => {
      console.log('Simulating incoming message');
      this.setState({
        loading:false
      })
    }, 1000);
  }

  // send new message to server
  messageToServer(message) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser,
      content: message
    }
    //send new message as string
    this.ws.send(JSON.stringify(newMessage));
  }

  // change user name
  changeUserName(newUsername) {
    const newNotification = {
      type: "postNotification",
      content: `${this.state.currentUser} changed their name to ${newUsername}`,
    };
    // if user input is equal to current user, do not send new server notification
    if (this.state.currentUser !== newUsername) {
      this.ws.send(JSON.stringify(newNotification));
    }
    this.setState({
      currentUser: newUsername
    });
  }

  render() {

    return (
      this.state.loading
        ? <div>
            <NavBar numUsers={this.state.numUsers}/>
            <Loading />
            <ChatBar currentUser={this.state.currentUser}/>
          </div>
        : <div>
            <NavBar numUsers={this.state.numUsers}/>
            <h1>Messages</h1>
            <MessageList messages={this.state.messages}/>
            <ChatBar currentUser={this.state.currentUser} changeUserName={this.changeUserName} messageToServer={this.messageToServer} />
          </div>
    );

  }
}


export default App;



