import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image,  } from 'react-native';
import Amplify, { Auth, Storage } from 'aws-amplify';

import ImagePickerContainer from './src/components/ImagePickerContainer.js';
import { createGarmentAPI, listGarmentsAPI } from './src/scripts/garment-api-calls.js';

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
    const garmentObj = {
      name: 'My first Garment!',
      description: 'new jeans!',
      type: "TROUSERS"
    };
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>My Outfit</Text>
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
        <TouchableOpacity onPress={listGarmentsAPI}>
          <Text>Get all your clothes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => createGarmentAPI(garmentObj)}>
          <Text>Store new garment</Text>
        </TouchableOpacity>
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

export default withAuthenticator(App);