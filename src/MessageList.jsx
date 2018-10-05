import React, {Component} from 'react';


function SystemMessage(props) {
  const { content } = props.message;
  return (
    <div className="message system">
      {content};
    </div>
  )
}

function ChatMessage(props) {
  const { color, username, content} = props.message;
  return (
    <div className="message" >
      <span className="message-username" style={{color: color}}>{username}</span>
      <span className="message-content">{content}</span>
    </div>
  )
}

function MessageList(props) {

  const passedMessages = props.messages.map( (message) => {
    return (
      message.type === 'incomingMessage'
        ? <ChatMessage key={message.id} message={message}/>
        : <SystemMessage key={message.id} message={message} />
    )
  });
  return (
    <main className="messages">
      {passedMessages}
    </main>
  );
}

export default MessageList;
