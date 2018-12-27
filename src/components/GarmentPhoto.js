import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { getPhotoFromCloud } from '../scripts/cloudStorage';

export default class GarmentPhoto extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      garmentPhotoCloudURL: '',
    };
  }

  componentDidMount() {
    this.fetchPhoto(this.props.photoURI);
  }

  componentDidUpdate(prevProps)  {
    if (this.props.photoURI && this.props.photoURI !== '' && prevProps.photoURI !== this.props.photoURI) {
      this.fetchPhoto(this.props.photoURI);
    }
  }

  async fetchPhoto(URI) {
    if (URI && URI !== '') {
      const result = await getPhotoFromCloud(URI);
      this.setState({
        garmentPhotoCloudURL: result,
      });
    }
  }

  renderGarmentPhoto() {
    if (this.state.garmentPhotoCloudURL && this.state.garmentPhotoCloudURL !== '') {
      return (
        <Image
          style={styles.garmentPhoto}
          source={{uri: this.state.garmentPhotoCloudURL}}
          resizeMode="contain"
        />
      )
    }
  }

  render() {
    const garmentPhoto = this.renderGarmentPhoto();
    return (
      <View style={styles.garmentPhotoContainer}>
        {garmentPhoto}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  garmentPhotoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  garmentPhoto: {
    width: 200, 
    height: 200,
  }
});