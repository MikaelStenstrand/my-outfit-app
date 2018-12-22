import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements'
import { createGarmentAPI } from '../scripts/garment-api-calls.js';

import ListGarmentsContainer from '../components/ListGarmentsContainer.js';

export default class GarmentsScreens extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Clothes',
    };
  };

  render() {
    // Testing purposes
    const newGarment = {
      name: 'My first Garment!',
      description: 'new jeans!',
      type: "TROUSERS"
    };

    return (
      <View style={styles.container}>
        <ScrollView>
          <ListGarmentsContainer />
          <Button
            title="detailed view"
            onPress={() => this.props.navigation.navigate('GarmentDetailView')}
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
  },
  footer: {
    position:'absolute',
    bottom: 15,
    right: 15,
    alignSelf:'flex-end'
  }
});