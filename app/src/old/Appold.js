import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {initRejestr, zmienRejestr} from "./actions/rejestr";

import Dom from "./components/Dom"
import Swiatlo from './components/Swiatlo'
import Ogrzewanie from "./components/Ogrzewanie"
import './App.css';

const States = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected'
};

class App extends Component {
  state = {
    status: States.DISCONNECTED,
    interval: null,
  };
  componentDidMount () {
    this.connect();
  }
  componentWillUnmount () {
    this.ws.close();
  }
  connect () {
    this.ws = new WebSocket('ws://192.168.0.205:8080');
    this.ws.onopen = () => this.onConnectionOpen();
    this.ws.onclose = () => this.onConnectionClose();
    this.ws.onmessage = (event) => this.onConnectionMessage(event);
    this.ws.sendJSON = (obj) => this.ws.send(JSON.stringify(obj));
    this.setState({status: States.CONNECTING});
  }
  onConnectionOpen () {
    console.log("connection is open");
    this.setState({status: States.CONNECTED});
  }
    // this.ws.sendJSON({'auth': config.authToken,});
    // this.ws.sendJSON({'key': 'STATUS',});  
  onConnectionClose () {
    console.log("connection is closed, reconnecting every 5*60 sec");
    this.setState({ status: States.DISCONNECTED });
    // reconnect mechanics
    const interval = setInterval(() => {
      if (this.state.status === States.CONNECTING || this.state.status === States.CONNECTED) {
        clearInterval(this.state.interval);
        return;
      }
      this.connect();
    }, 5*60*1000)
    this.setState({interval});
  }  
  onConnectionMessage (event) {
    const data = JSON.parse(event.data);
    if (data.key === 'initRejestr') {
        // console.log("msg : ", data.key, data.value);
        this.props.initRejestr(data.value);
    } else {
      this.props.zmienRejestr(data);
    }
  }
  onConnectionWriteHandler = (key, value) => 
    this.ws.sendJSON({key, value});

  render() {
    return (
      <div>
        <Route  location={this.props.location} path="/" 
          render={(props) => <Dom {...props}/>} />
        <Route  location={this.props.location} path="/ogrzewanie" 
          render={(props)=><Ogrzewanie {...props} 
          onConnectionWriteHandler={(addr, value)=>this.onConnectionWriteHandler(addr, value)} />} />
        <Route  location={this.props.location} path="/swiatlo" 
          render={(props)=> <Swiatlo {...props}  
          onConnectionWriteHandler={(addr, value)=>this.onConnectionWriteHandler(addr, value)} />} /> 
      </div>
    );
  }
}
export default connect(null, {initRejestr, zmienRejestr})(App)
