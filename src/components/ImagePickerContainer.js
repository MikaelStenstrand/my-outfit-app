import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { uploadFile } from "../scripts/cloudStorage.js";
import ImagePicker from 'react-native-image-picker';

// S3 upload configuration
// https://aws-amplify.github.io/docs/js/storage#file-access-levels
const uploadOptions = {
  contentType: 'image/jps',
  level: 'private'
};

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
        uploadFile(response, uploadOptions);
        // add new clouth with the new image
      }
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.takePhoto.bind(this)}>
          <Text>Take photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});