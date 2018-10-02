import React, {Component} from 'react';
const dep = require
import ChatBar from './ChatBar.jsx';
import Message from './MessageList.jsx';

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
      messages: [1,2,3,4],
      currentUser: "Anonymous"
    };
  }

  componentDidMount() {
    // After 3 seconds, set `loading` to false in the state.
    setTimeout(() => {
      this.setState({loading: false}); // this triggers a re-render!
    }, 1000)
  }
  render() {
    //refactor as terary, this is gross, make use of less lines
    if (this.state.loading) {
      return (
        <div>
          <Loading />
          <ChatBar />
        </div>
        )
    } else {
      return (
        <div>
          <h1>Hello React :)</h1>
          <Message />
          <ChatBar />
        </div>
      );
    }
  }
}


export default App;


{
// responsible for storing all data for in this.state
}