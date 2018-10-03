import React, {Component} from 'react';


class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameFieldValue: this.props.currentUser
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle user field change
  handleChange(evt) {
    this.setState({usernameFieldValue: evt.target.value})
  }

  render(){

    const messageOnEnter = evt => {
      if(evt.key === 'Enter') {
        const messageInput = evt.target;
        // new message obj
        const newMessage = {
          id: new Date(),
          type: "incomingMessage",
          content: messageInput.value,
          username: this.props.currentUser
        };
        // check if user handle field has changed, then update new message user handle.
        if (newMessage.username !== this.state.usernameFieldValue) {
          newMessage.username = this.state.usernameFieldValue;
          this.props.changeUserName(this.state.usernameFieldValue);
        }
        this.props.addNewMessage(newMessage);
        messageInput.value = "";
      }
    }
    // change username on enter;
    const usernameOnEnter = evt => {
      if(evt.key === 'Enter') {
        const userInput = evt.target;
        this.props.changeUserName(userInput.value);
      }
    }

    return(
      <footer className="chatbar">
        <input className="chatbar-username" name="userBar"
                value={this.state.usernameFieldValue}
                onChange={this.handleChange}
                onKeyPress={usernameOnEnter} />
        <input className="chatbar-message" name="messageBar" placeholder="Type a message and hit ENTER" onKeyPress={messageOnEnter} />
      </footer>
      );
  }

}

export default ChatBar;


