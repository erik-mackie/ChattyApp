import React, {Component} from 'react';
const dep = require
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';


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
      messages: Message,
      currentUser: "Anonymous"
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 8, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.

      this.setState({
        messages: messages,
        loading:false
      })
    }, 2000);
  }

  changeUserName(user) {
    console.log(user);
    this.setState({
      currentUser: user
    });

  }

  addNewMessage(message) {
    const oldMessages = this.state.messages;
    const newMessages = [...oldMessages, message];
    this.setState({
      messages: newMessages
    });
  }

  render() {
    //refactor as terary, this is gross, make use of less lines
    if (this.state.loading) {
      return (
        <div>
          <Loading />
          <ChatBar currentUser={this.state.currentUser}/>
        </div>
        )
    } else {
      return (
        <div>
          <h1>Hello React :)</h1>
          <MessageList messages={this.state.messages}/>
          <ChatBar currentUser={this.state.currentUser} changeUserName={this.changeUserName} addNewMessage={this.addNewMessage} />
        </div>
      );
    }
  }
}


export default App;


{
// responsible for storing all data for in this.state




// and change user
}