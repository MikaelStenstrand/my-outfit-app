import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { uploadFile } from "../scripts/cloudStorage.js";
import ImagePicker from 'react-native-image-picker';
import { Button } from 'react-native-elements';

export default class ImagePickerContainer extends Component {

  takePhoto() {
    const imagePickerOptions = {};  // https://github.com/react-native-community/react-native-image-picker/blob/master/docs/Reference.md
    ImagePicker.showImagePicker(imagePickerOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        return;
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        return;
      } else {
        uploadFile(response)
          .then((result) => {
            this.props.capturePhotoURI(result); // passing the photo URI to parent for storing
          }).catch((err) => {
            console.log(err);
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Button
            icon={{name: 'add-a-photo'}}
            title='add a photo' 
            onPress={() => this.takePhoto()}  
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});