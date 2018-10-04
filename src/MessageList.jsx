import React, {Component} from 'react';


function MessageList(props) {


  const passedMessages = props.messages.map( (message) => {

    return (
      message.type === "incomingMessage"
        ? <div className="message" key={message.id}>
            <span className="message-username"style={{color: message.color}} >{message.username}</span>
            <span className="message-content">{message.content}</span>
          </div>
        : <div className="message system" key={message.id}>
            {message.content};
          </div>
    )
  });
    return (
      <main className="messages">
        {passedMessages}
      </main>
    );
}

export default MessageList;
