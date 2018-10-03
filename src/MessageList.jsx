import React, {Component} from 'react';


function MessageList(props) {


  const passedMessages = props.messages.map( (message) => {
    let {id, type, content, username} = message;

    return (
      type === "incomingMessage"
        ? <div className="message" key={id}>
            <span className="message-username">{username}</span>
            <span className="message-content">{content}</span>
          </div>
        : <div className="message system" key={id}>
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
