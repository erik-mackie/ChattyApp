import React, {Component} from 'react';

//


class ChatBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameFieldValue: this.props.currentUser
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // handle user field change
  //mentor advice, fix not in app.js
  handleChange(evt) {
    this.setState({usernameFieldValue: evt.target.value})
  }

  render(){
    // send
    const messageOnEnter = evt => {
      if(evt.key === 'Enter') {
        const messageInput = evt.target;
        // new message obj
        const newMessage = {
          type: "postMessage",
          username: this.props.currentUser,
          content: messageInput.value
        };
        //check if user handle field has changed, then update new message user handle.
        // if (newMessage.username !== this.state.usernameFieldValue) {
        //   newMessage.username = this.state.usernameFieldValue;
        //   this.props.changeUserName(this.state.usernameFieldValue);
        // }
        // this.props.addNewMessage(newMessage);
        this.props.messageToServer(newMessage);
        messageInput.value = "";
      }
    }
    // must run on enter press
    // change username on enter;
    const usernameOnEnter = evt => {
      if(evt.key === 'Enter' && evt.target.name === "userBar") {
        updateUser(evt);
      }
    }

    const updateUser = evt => {

        const userInput = evt.target;
        const newNotification = {
          type: "postNotification",
          content: `${this.props.currentUser} changed their name to ${userInput.value}`,
        }
        this.props.changeUserName(userInput.value);
        // if user input is equal to current user, do not send new server notification
        if (this.props.currentUser !== userInput.value) {
          this.props.messageToServer(newNotification);
        }
    }

    return(
      <footer className="chatbar">
        <input className="chatbar-username" name="userBar"
                value={this.state.usernameFieldValue}
                onChange={this.handleChange}
                onKeyPress={usernameOnEnter}
                onBlur={updateUser} />
        <input className="chatbar-message" name="messageBar" placeholder="Type a message and hit ENTER" onKeyPress={messageOnEnter} />
      </footer>
      );
  }

}

export default ChatBar;



