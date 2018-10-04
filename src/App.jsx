import React, {Component} from 'react';
const dep = require
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import NavBar from './navBar.jsx';


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
      socket : new WebSocket('ws://localhost:3001')
    };
    //this.addNewMessage = this.addNewMessage.bind(this);
    this.messageToServer = this.messageToServer.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }

  componentDidMount() {

    const ws = this.state.socket;
    // handle server messages
    ws.onmessage = (event) => {
      const messageFromServer = JSON.parse(event.data);

      switch(messageFromServer.type) {
        case 'incomingMessage':
          this.setState({
            messages: this.state.messages.concat(messageFromServer),
          })
        break;
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
    const messageToSend = message;
    //send new message as string
     this.state.socket.send(JSON.stringify(messageToSend));
  }

  // change user name
  changeUserName(user) {
    this.setState({
      currentUser: user
    });
  }

  render() {
    //refactor as terary, this is gross, make use of less lines
    // if (this.state.loading) {
    //   return (
    //     <div>
    //       <Loading />
    //       <NavBar numUsers={this.state.numUsers}/>
    //       <ChatBar currentUser={this.state.currentUser}/>
    //     </div>
    //     )
    // } else {
    //   return (
    //     <div>
    //       <h1>Messages</h1>
    //       <NavBar numUsers={this.state.numUsers}/>
    //       <MessageList messages={this.state.messages}/>
    //       <ChatBar currentUser={this.state.currentUser} changeUserName={this.changeUserName} messageToServer={this.messageToServer} />
    //     </div>
    //   );
    // }
    return (
      this.state.loading
        ? <div>
            <Loading />
            <NavBar numUsers={this.state.numUsers}/>
            <ChatBar currentUser={this.state.currentUser}/>
          </div>
        : <div>
            <h1>Messages</h1>
            <NavBar numUsers={this.state.numUsers}/>
            <MessageList messages={this.state.messages}/>
           <ChatBar currentUser={this.state.currentUser} changeUserName={this.changeUserName} messageToServer={this.messageToServer} />
          </div>
    );

  }
}


export default App;


