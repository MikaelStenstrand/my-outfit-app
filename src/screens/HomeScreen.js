import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button} from 'react-native';
import Amplify, { Storage } from 'aws-amplify';

import { createGarmentAPI } from '../scripts/garment-api-calls.js';

// UI-ELEMENTS
import { Icon } from 'react-native-elements'

export default class HomeScreen extends Component {
  
  render() {
    // Testing purposes
    const newGarment = {
      name: 'My first Garment!',
      description: 'new jeans!',
      type: "TROUSERS"
    };
    
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <Text>MY OUTFIT</Text>
          <Button
            title="Go to clothes"
            onPress={() => this.props.navigation.navigate('Garments')}
          />
        </ScrollView>
        <View style={styles.footer}>
          <Icon
              raised
              name='plus'
              type='font-awesome'
              color='#f50'
              onPress={() => createGarmentAPI(newGarment)} 
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    marginTop: 50,
  },
  footer: {
    position:'absolute',
    bottom: 15,
    right: 15,
    alignSelf:'flex-end'
  }
});