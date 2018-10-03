import React, {Component} from 'react';


class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: new Date(),
      currentUser: this.props.currentUser
    };
  }

  render(){

    const messageOnEnter = evt => {
      if(evt.key === 'Enter') {
        const messageInput = evt.target;
        this.props.addNewMessage({
          id: this.state.id,
          type: "incomingMessage",
          content: messageInput.value,
          username: this.currentUser
        });
        messageInput.value = "";
      }
    }
    const usernameOnEnter = evt => {
      if(evt.key === 'Enter') {
        const userInput = evt.target;
        this.props.changeUserName(userInput.value);
      }
    }

    return(
      <footer className="chatbar">
        <input className="chatbar-username" name="userBar" defaultValue={this.state.currentUser} onKeyPress={usernameOnEnter} />
        <input className="chatbar-message" name="messageBar" placeholder="Type a message and hit ENTER" onKeyPress={messageOnEnter} />
      </footer>
      );
  }

}

export default ChatBar;


