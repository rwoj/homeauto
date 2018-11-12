import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View} from 'react-native';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'remote-redux-devtools';
import rootReducer from './reducers';
import {pobraneUstawienia} from './actions/ustawienia';
import homeConfig from './homeConfig/konfiguracja';
import {odczytRejestru, zmianaRejestruWyjscia, zmianaRejestruWySatel, 
  zmianaRejestruWyTemp, zmianaRejestruWyTempNast} from "./actions/rejestr"
import MainNavigator from './components/MainNavigator'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) 
)
store.dispatch(pobraneUstawienia(homeConfig));

const States = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected'
};

export default class App extends Component {
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
    console.log("on connection open");
    this.setState({status: States.CONNECTED});
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
  onConnectionMessage (event) {
    const data = JSON.parse(event.data);
    switch (data.key){
      case 'initRejestr':
        store.dispatch(odczytRejestru(data.value));
        break;
      case 'wyjscia':
        store.dispatch(zmianaRejestruWyjscia(data.value));
        break;
      case 'wySatel':
        store.dispatch(zmianaRejestruWySatel(data.value));
        break;
      case 'wyTemp':
        store.dispatch(zmianaRejestruWyTemp(data.value));
        break;
      case 'wyTempNast':
        store.dispatch(zmianaRejestruWyTempNast(data.value));
        break;
      default: 
        console.log("not a valid message");  
    } 
  }
  onConnectionWriteHandler = (key, value) => 
    this.ws.sendJSON({key, value});

  render() {
    return (
      <Provider store={store}>
          <MainNavigator />
      </Provider>      
    );
  }
}


/*      <View style={styles.container}>
        <Text style={styles.welcome}>Tu testowa apka + !</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{JSON.stringify(this.state.items)}</Text>
      </View>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
}); */
