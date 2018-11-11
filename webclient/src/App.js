import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {initRejestr, zmienRejestr} from "./actions/rejestr";
// import api from "./api";
// import {pobraneUstawienia} from './actions/ustawienia'
  
import TestDom from "./components/TestDom"
// import Dom from "./components/Dom"
// import Swiatlo from './components/Swiatlo'
// import Ogrzewanie from "./components/Ogrzewanie"
import './App.css';

const States = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected'
};

class App extends Component {
  state = {
    // items: {},
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
    if (data.key === 'initRejestr'){
      console.log("message : ", data.key, data.value);
      this.props.initRejestr(data.value)
      // this.props.initRejestr({wyjscia: [{id: 45, value: 0}, {id: 34, value: 12}], 
      //   wyTemp: [{id: 45, value: 23}], wyTempNast: [{id: 45, value: 23}]});
    } else {
      this.props.zmienRejestr(data)
    }
  }
// socket.on('wyjscia', (dane)=>store.dispatch(zmianaRejestruWyjscia(dane)))
// socket.on('wySatel', (dane)=>store.dispatch(zmianaRejestruWySatel(dane)))
// socket.on('wyTemp', (dane)=>store.dispatch(zmianaRejestruWyTemp(dane)))
// socket.on('wyTempNast', (dane)=>store.dispatch(zmianaRejestruWyTempNast(dane)))
    // this.setState({ items: data });
  render() {
    return (
      <div>
        <Route  location={this.props.location} path="/" exact component={TestDom} />
      </div>
    );
  }
}
export default connect(null, {initRejestr, zmienRejestr})(App)


        // <Route  location={this.props.location} path="/ogrzewanie" exact component={Ogrzewanie}  />
        // <Route  location={this.props.location} path="/swiatlo" exact component={Swiatlo}  /> 

// const App = ({location}) => (
//     <div>
//       <Route  location={location} path="/" exact component={Dom} />
//       <Route  location={location} path="/ogrzewanie" exact component={Ogrzewanie}  />
//       <Route  location={location} path="/swiatlo" exact component={Swiatlo}  /> 
//     </div>
// )
