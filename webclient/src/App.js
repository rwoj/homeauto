import React, { Component } from 'react';
import './App.css';

const States = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected'
};

class App extends Component {
  state = {
    items: {},
    status: States.DISCONNECTED,
    interval: null,
  };

  componentDidMount () {
    this.connect();
  }

  connect () {
    this.ws = new WebSocket('ws://localhost:8080');

    this.ws.onopen = () => this.onConnectionOpen();
    this.ws.onmessage = (event) => this.onConnectionMessage(event);
    this.ws.onclose = () => this.onConnectionClose();
    this.ws.sendJSON = (obj) => this.ws.send(JSON.stringify(obj));

    this.setState({status: States.CONNECTING});
  }

  onConnectionOpen () {
    // this.ws.sendJSON({
    //     'auth': config.authToken,
    // });
    console.log("on connection open");
    // this.ws.sendJSON({
    //     'key': 'STATUS',
    // });
    this.setState({status: States.CONNECTED});
  }

  onConnectionMessage (event) {
    const data = JSON.parse(event.data);
    console.log("dane : ",data);
    this.setState({ items: data });
  }

  onConnectionClose () {
    this.setState({ status: States.DISCONNECTED });

    // reconnect mechanics
    const interval = setInterval(() => {
        if (this.state.status === States.CONNECTING || this.state.status === States.CONNECTED) {
            clearInterval(this.state.interval);
            return;
        }
        this.connect();
    }, 1000)

    this.setState({interval});
  }

  componentWillUnmount () {
    this.ws.close();
  }

  render() {
    return (
      <div className="App">
            siema
      </div>
    );
  }
}

export default App;
