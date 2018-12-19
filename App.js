import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Amplify, { Storage } from 'aws-amplify';

import ImagePickerContainer from './src/components/ImagePickerContainer.js';
import ListGarmentsContainer from './src/components/ListGarmentsContainer.js';
import { createGarmentAPI, listGarmentsAPI } from './src/scripts/garment-api-calls.js';

// UI-ELEMENTS
import { Button, List, ListItem, Icon } from 'react-native-elements'

// INITIALIZATIONS
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
import { withAuthenticator } from 'aws-amplify-react-native';
global.Buffer = global.Buffer || require("buffer").Buffer; // file reading buffer

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      image: '',
      garments: [],
    };
  }

  async getPhotoFromCloud()  {
    const result = await Storage.list('photos/', {level: 'private'})
    console.log('all images: ',result);
    let image = await Storage.get(result[0].key, {level: 'private'});
    this.setState({
      image: image,
    });
  }

  render() {
    // Testing purposes
    const newGarment = {
      name: 'My first Garment!',
      description: 'new jeans!',
      type: "TROUSERS"
    };
    
    return (
      <View style={styles.contianer}>
        <ScrollView style={styles.body}>
          <Text>My Outfit</Text>
          <ImagePickerContainer />
          <TouchableOpacity onPress={this.getPhotoFromCloud.bind(this)}>
            <Text>Get photo from cloud</Text>
          </TouchableOpacity>
          <View>
            <Image
              style={{width: 50, height: 50}}
              source={{uri: this.state.image}}
            />
          </View>
          <Button
            raised
            backgroundColor='#6699cc'
            icon={{ name: 'cached' }}
            title='Get all your clothes'
            onPress={listGarmentsAPI}
          />

          <ListGarmentsContainer />

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

export default withAuthenticator(App);