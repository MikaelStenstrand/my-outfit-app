import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';

import ListGarmentsContainer from '../components/ListGarmentsContainer.js';

export default class GarmentsScreens extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <ListGarmentsContainer />
          <Button
            title="Go to clothes"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    marginTop: 50,
  },
});