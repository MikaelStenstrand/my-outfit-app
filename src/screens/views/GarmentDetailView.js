import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { getPhotoFromCloud } from '../../scripts/cloudStorage.js';

class GarmentDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'detailed view',
    }
  }
  
  constructor(props)  {
    super(props)
    this.state = {
      garmentPhotoForRendering: '',
    }
  }

  componentDidMount() {
    const garment = this.props.navigation.getParam('garment', {});
    this.fetchPhoto(garment.photoURI);
  }
  
  async fetchPhoto(URI) {
    if (URI !== '') {
      const result = await getPhotoFromCloud(URI);
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
    const garment = this.props.navigation.getParam('garment', '{}');
    const garmentPhoto = this.renderGarmentPhoto();
    if (!garment.hasOwnProperty('id')) {
      return (<View><Text>Ups! Something went wrong...</Text></View>)
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>{garment.name}</Text>
            <View>
              <Text>{garment.type}</Text>
              <Text>{garment.description}</Text>
              <View style={styles.garmentPhotoContainer}>
                { garmentPhoto }
              </View>
            </View>
          </ScrollView>
          <Text style={styles.debug}>{garment.id}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  debug: {
    color: '#b2b2b2'
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

export default withNavigation(GarmentDetailView);