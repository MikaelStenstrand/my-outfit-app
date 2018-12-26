import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import { Icon, Divider, Button } from 'react-native-elements';
import { TextInput, Snackbar } from 'react-native-paper';
import { GarmentType } from '../../scripts/garmentTypes.js';
import { createGarmentAPI, updateGarmentAPI, deleteGarmentAPI } from '../../scripts/garment-api-calls.js';
import ImagePickerContainer from '../../components/ImagePickerContainer.js';
import { getPhotoFromCloud, deletePhoto } from '../../scripts/cloudStorage.js';


export default class GarmnetCreationView extends Component {
  static navigationOptions = ({ navigation }) => {
    const garment = navigation.getParam('garment');
    const isEditing = navigation.getParam('isEditing');
    if (isEditing)  {
      console.log('EDITING');
      if (!garment && !garment.hasOwnProperty('name')) {return;}
      return {
        title: `Edit ${garment.name}`,
        headerRight: (
          <View
            rippleColor="rgba(0, 0, 0, .32)"
            style={{
              paddingRight: 10,
              paddingTop: 5,
            }}>
            {/* DELETE BUTTON */}
            <Icon
              name='trash'
              type='font-awesome'
              color='#fff'
              onPress={() => {
                Alert.alert(
                  'Delete Clothes',
                  'Do you want to delete this piece of clothing?',
                  [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {
                      deleteGarment(garment, navigation);
                    }},
                  ],
                  { cancelable: true }
                );
              }}
            />
          </View>
        )
      }
    } else {
      console.log('NEW GARMENT')
      return {
        title: 'New Clothes',
      }
    }
  }

  constructor(props)  {
    super(props);
    const isEditing = props.navigation.getParam('isEditing', false);
    const garment = props.navigation.getParam('garment', {});
    this.state = {
      isEditing: isEditing,
      garmentPhotCloudURL: '',
      isSaved: false,
      isError: false,
    }
    if (isEditing && garment.hasOwnProperty('id'))  {
      this.state.id = garment.id;
      this.state.name = garment.name;
      this.state.description = garment.description;
      this.state.type = garment.type;
      this.state.photoURI = garment.photoURI;
      this.fetchPhoto(this.state.photoURI);
    } else {
      // NEW GARMENT
      this.state.id = '';
      this.state.name = '';
      this.state.description = '';
      this.state.type = GarmentType.UNKNOWN;
      this.state.photoURI = '';
    }
  }

  async saveNewGarment()  {
    const newGarment = this.createGarmentObject();
    const response = await createGarmentAPI(newGarment);
    if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('createGarment')) {
      this.setState({ 
        isSaved: true,
        isError: false,
        id: response.data.createGarment.id,
      });
    } else {
      this.setState({ 
        isSaved: false,
        isError: true 
      });
      console.log('Error saving new garmnet: ', response);
    }
  }

  async updateGarment() {
    const garmentToBeUpdated = this.createGarmentObject();
    const response = await updateGarmentAPI(garmentToBeUpdated)
    if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('updateGarment')) {
      this.setState({
        isSaved: true,
        isError: false,
      });
    } else {
      this.setState({
        isSaved: false,
        isError: true,
      });
      console.log('Eerror updating garment!', response);
    }
  }

  createGarmentObject() {
    const garment = {
      name: this.state.name,
      description: this.state.description || '',
      type: this.state.type || GarmentType.UNKNOWN,
      photoURI: this.state.photoURI || '',
    };
    if (this.state.isEditing) {garment.id = this.state.id}
    return garment;
  }
  
  /**
   * called from ImagePickerContainer
   * stores the URI to state and fetches the image from cloud
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

  fetchPhoto() {
    if (this.state.photoURI !== '') {
      getPhotoFromCloud(this.state.photoURI)
      .then((result) => {
        this.setState({
          garmentPhotCloudURL: result,
        });
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  navigateOnSaved() {
    const garment = {
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      type: this.state.type,
      photoURI: this.state.photoURI,
    };
    this.props.navigation.popToTop();
    this.props.navigation.navigate('GarmentDetailView', {
      garment: garment,
    })
  }

  navigateOnDeleted() {
    this.props.navigation.popToTop();
  }

  renderActionButton(isEditing)  {
    if(isEditing) {
      return (
        <Button
          title='update'
          icon={{name: 'save'}}
          onPress={() => this.updateGarment()}
        />
      )
    } else {
      // NEW GARMENT
      return (
        <Button
          title='save'
          icon={{name: 'save'}}
          onPress={() => this.saveNewGarment()}
        />
      )
    }
  }

  renderGarmentPhoto() {
    if (this.state.garmentPhotCloudURL !== '') {
      return (
        <Image
          style={styles.garmentPhoto}
          source={{uri: this.state.garmentPhotCloudURL}}
          resizeMode="contain"
        />
      )
    }
  }

  renderPhotoButton() {
    let photoButton;
    if (this.state.isEditing) {
      photoButton = <ImagePickerContainer title='edit photo' capturePhotoURI={this.capturePhotoURI.bind(this)}/>
    } else {
      photoButton = (this.state.photoURI === '') ? (<ImagePickerContainer title='add a photo' capturePhotoURI={this.capturePhotoURI.bind(this)}/>) : <Text></Text>
    }
    return photoButton;
  }

  renderErrorMessage()  {
    const text = 'Something went wrong...';
    return (
      <Snackbar
        visible={this.state.isError || this.props.navigation.getParam('isError')}
        onDismiss={() => {
          this.setState({ isError: false })
          this.props.navigation.setParams({isError: false});
        }}
        duration={2500}
        style={{backgroundColor: 'rgb(64,0,0)'}}
        action={{
          label: 'Try again!',
          onPress: () => {
            console.log('pressed')
          },
        }}
      >
        {text}
      </Snackbar>
    );
  }
  
  renderDeletedMessage()  {
    const text = "Clothes deleted";
    return (
      <Snackbar
        visible={this.props.navigation.getParam('isDeleted')}
        onDismiss={() => {
          this.props.navigation.setParams({isDeleted: false});
          this.navigateOnDeleted();
        }}
        style={{backgroundColor: 'rgb(35,77,32)'}}
        duration={2500}
        action={{
          label: 'Great!',
          onPress: () => {
            console.log('pressed')
          },
        }}
      >
        {text}
      </Snackbar>
    );
  }

  renderSavedMessage()  {
    const text = (this.state.isEditing) ? 'Clothes updated' : 'New clothes saved';
    return (
      <Snackbar
        visible={this.state.isSaved}
        onDismiss={() => {
          this.setState({ isSaved: false })
          this.navigateOnSaved();
        }}
        style={{backgroundColor: 'rgb(35,77,32)'}}
        duration={2500}
        action={{
          label: 'Great!',
          onPress: () => {
            console.log('pressed')
          },
        }}
      >
        {text}
      </Snackbar>
    );
  }


  render() {
    const actionButton = this.renderActionButton(this.state.isEditing);
    const photoButton = this.renderPhotoButton();
    const garmentPhoto = this.renderGarmentPhoto();
    const errorMessage = this.renderErrorMessage();
    const savedMessage = this.renderSavedMessage();
    const deleteMessage = this.renderDeletedMessage();
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
          { photoButton }
          <View style={styles.garmentPhotoContainer}>
            { garmentPhoto }
          </View>
        </ScrollView>
        <View>
          { actionButton }
          { errorMessage }
          { savedMessage }
          { deleteMessage }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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

function deleteGarment(garment, navigation)  {
  const photoURI = garment.photoURI;
  deleteGarmentAPI(garment)
    .then((response) => {
      if(response && response.hasOwnProperty('data') && response.data.hasOwnProperty('deleteGarment') && response.data.deleteGarment !== null) {
        // deleting the photo from S3 bucket
        deletePhoto(photoURI);
        navigation.setParams({isDeleted: true});
      }
    }).catch((err) => {
      console.log(err);
      navigation.setParams({isError: true, isDeleted: false});
    });
}