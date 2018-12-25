import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Divider } from 'react-native-paper';
import { GarmentType } from '../../scripts/garmentTypes.js';
import { createGarmentAPI } from '../../scripts/garment-api-calls.js';
import { Button, Icon, Text } from 'react-native-elements';
import ImagePickerContainer from '../../components/ImagePickerContainer.js';
import { getPhotoFromCloud } from '../../scripts/cloudStorage.js';
import { sharedStyles } from '../../scripts/sharedStyles.js';

const config = {
  timeoutGoBack: 1500,
};

export default class GarmentNewView extends Component {
  static navigationOptions = {
    title: 'New Clothes'
  }
  constructor(props)  {
    super(props);
    this.state = {
      name: '',
      description: '',
      type: GarmentType.UNKNOWN,
      photoURI: '',
      garmentPhotoForRendering: '',
      isCreated: false,
      isError: false,
    };
  }

  async saveNewGarment()  {
    const newGarment = {
      name: this.state.name,
      description: this.state.description || '',
      type: this.state.type || GarmentType.UNKNOWN,
      photoURI: this.state.photoURI || '',
    }
    const response = await createGarmentAPI(newGarment);
    if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('createGarment')) {
      this.setState({ 
        isCreated: true,
        isError: false,
      });
      setTimeout(() => {
        this.props.navigation.goBack()
      }, config.timeoutGoBack);
    } else {
      this.setState({ 
        isCreated: false,
        isError: true 
      });
    }
  }

  renderCreatedMessage()  {
    if(this.state.isCreated) {
      return (
        <View style={sharedStyles.row}>
          <Icon name='thumb-up' color='#0B6623'></Icon>
          <Text>New clothing added!</Text>
        </View>
      );
    } else {
      return (<Text></Text>)
    }
  }
  
  renderErrorMessage()  {
    if (this.state.isError) {
      return (
        <View style={sharedStyles.row}>
          <Icon name='thumb-down' color='#8b0000'></Icon>
          <Text>Ups! Problems occur</Text>
        </View>
      )
    } else {
      return (<Text></Text>)
    }
  }

  /**
   * called from ImagePickerContainer
   * @param {file URI of the file stored in cloud} uri 
   */
  capturePhotoURI(uri) {
    if (uri && uri.hasOwnProperty('key')) {
      this.setState({
        photoURI: uri.key,
      });
      this.fetchPhoto(uri);
    }
  }
  
  async fetchPhoto() {
    if (this.state.photoURI !== '') {
      const result = await getPhotoFromCloud(this.state.photoURI);
      this.setState({
        garmentPhotoForRendering: result,
      });
    }
  }
  
  renderGarmentPhoto() {
    if (this.state.garmentPhotoForRendering !== '') {
      return (
        <Image
          style={styles.garmentPhoto}
          source={{uri: this.state.garmentPhotoForRendering}}
          resizeMode="contain"
        />
      )
    }
  }

  render() {
    let createdMessage = this.renderCreatedMessage();
    let errorMessage = this.renderErrorMessage();
    
    let garmentPhoto = this.renderGarmentPhoto();
    const addPhotoButton = (this.state.photoURI === '') ? (<ImagePickerContainer capturePhotoURI={this.capturePhotoURI.bind(this)}/>) : <Text></Text>

    return (
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            label='Clothing'
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            label='Description'
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
          />
          <TextInput
            label='Gategory'
            value={this.state.type}
            onChangeText={(type) => this.setState({ type })}
          />
          <Divider />
          { addPhotoButton }
          <View style={styles.garmentPhotoContainer}>
            { garmentPhoto }
          </View>
        </ScrollView>
        <View>
          { createdMessage }
          { errorMessage }
          <Button
            title='save'
            icon={{name: 'save'}}
            onPress={() => this.saveNewGarment()}
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
  largerButton: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  garmentPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  garmentPhoto: {
    width: 200, 
    height: 200,
  }
});