import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class EnergyScreen extends React.Component {
  static navigationOptions = {
    title: 'Energy',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
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
