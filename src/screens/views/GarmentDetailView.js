import React, { Component } from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { getPhotoFromCloud } from '../../scripts/cloudStorage.js';
import { Icon } from 'react-native-elements';
import { sharedStyles } from '../../scripts/sharedStyles.js';

class GarmentDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    const garment = navigation.getParam('garment');
    if (!garment && !garment.hasOwnProperty('name')) {return;}
    return {
      title: `${garment.name}`,
      headerRight: (
        <View
          rippleColor="rgba(0, 0, 0, .32)"
          style={{
            paddingRight: 10,
            paddingTop: 5,
          }}>
          <Icon
            name='edit'
            type='font-awesome'
            color='#fff'
            onPress={() => {
              navigation.navigate('GarmentEditView', {
                garment: garment,
              })
            }}
          />
        </View>
      )
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
        <View style={sharedStyles.container}>
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
          <Text style={sharedStyles.debug}>{garment.id}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
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