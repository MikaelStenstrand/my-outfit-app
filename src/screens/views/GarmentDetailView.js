import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { sharedStyles } from '../../scripts/sharedStyles.js';
import GarmentPhoto from '../../components/GarmentPhoto.js';

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
              // Navigate to GarmentCreationView for editing
              navigation.navigate('GarmentCreationView', {
                garment: garment,
                isEditing: true,
              })
            }}
          />
        </View>
      )
    }
  }
  
  render() {
    const garment = this.props.navigation.getParam('garment', '{}');
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

              <GarmentPhoto photoURI={garment.photoURI} />

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
});

export default withNavigation(GarmentDetailView);