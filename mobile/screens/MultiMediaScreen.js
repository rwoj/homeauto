import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default class MultiMediaScreen extends React.Component {
  static navigationOptions = {
    title: 'Multimedia',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Ta strona jest jeszcze w budowie</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
