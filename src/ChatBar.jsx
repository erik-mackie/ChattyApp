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
  handleChange(evt) {
    this.setState({usernameFieldValue: evt.target.value})
  }

  render(){
    // send
    const messageOnEnter = evt => {
      if(evt.key === 'Enter') {
        const messageInput = evt.target;

        this.props.messageToServer(messageInput.value);
        messageInput.value = "";
      }
    }
    // change username on enter;
    const usernameOnKeypress = evt => {
      if(evt.key === 'Enter' && evt.target.name === "userBar") {
        updateUser(evt);
      }
    }

    const updateUser = evt => {

      const userInput = evt.target;

      this.props.changeUserName(userInput.value);
    }

    return(
      <footer className="chatbar">
        <input
          className="chatbar-username" name="userBar"
          value={this.state.usernameFieldValue}
          onChange={this.handleChange}
          onKeyPress={usernameOnKeypress}
          onBlur={updateUser}
        />
        <input className="chatbar-message" name="messageBar" placeholder="Type a message and hit ENTER" onKeyPress={messageOnEnter} />
      </footer>
      );
  }

}

export default ChatBar;



