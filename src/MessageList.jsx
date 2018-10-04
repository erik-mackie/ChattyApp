import React, {Component} from 'react';


function MessageList(props) {


  const passedMessages = props.messages.map( (message) => {
    // let {id, type, content, username} = message;
    return (
      message.type === "incomingMessage"
        ? <div className="message" key={message.id}>
            <span className="message-username">{message.username}</span>
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
