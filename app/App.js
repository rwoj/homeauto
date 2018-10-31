/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n'
});
const States = {
  CONNECTED: 'connected',
  CONNECTING: 'connecting',
  DISCONNECTED: 'disconnected'
};

type Props = {};
export default class App extends Component<Props> {
  state = {
    items: '',
    status: States.DISCONNECTED,
    interval: null,
  };

  componentDidMount () {
    this.connect();
  }

  connect () {
    this.ws = new WebSocket('ws://192.168.0.205:8080');

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
    console.log("dane : ", data);
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
      <View style={styles.container}>
        <Text style={styles.welcome}>Tu testowa apka + !</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text style={styles.instructions}>{JSON.stringify(this.state.items)}</Text>
      </View>
    );
  }
}

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
});
