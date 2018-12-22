import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class GarmentDetailView extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'detailed view',
    }
  }

  render() {
    const garment = this.props.navigation.getParam('garment', '{}');
    if (Object.keys(garment).length === 0) {
      return (<View><Text>Ups! Something went wrong...</Text></View>)
    } else {
      return (
        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.title}>{garment.name}</Text>
            <View>
              <Text>{garment.type}</Text>
              <Text>{garment.description}</Text>
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
  }
});

export default withNavigation(GarmentDetailView);