import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Amplify, { Storage } from 'aws-amplify';

import AppNavigator from './src/navigation/AppNavigator.js';
import ImagePickerContainer from './src/components/ImagePickerContainer.js';

// INITIALIZATIONS
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
import { withAuthenticator } from 'aws-amplify-react-native';
global.Buffer = global.Buffer || require("buffer").Buffer; // file reading buffer

class App extends Component {
  render() {
    return (
      <AppNavigator />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default withAuthenticator(App);