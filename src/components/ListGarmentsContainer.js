import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
// import { List, ListItem } from 'react-native-elements'
import { listGarmentsAPI } from '../scripts/garment-api-calls.js';
import { withNavigation } from 'react-navigation';
import { List } from 'react-native-paper';

class ListGarmentsContainer extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      garments: [],
    };
  }

  componentDidMount() {
    const options = { limit: 20 };
    listGarmentsAPI(options)
      .then(result => {
        // console.log("ListGarmentsContainer" , result.data.listGarments.items);
        this.setState({
          garments: result.data.listGarments.items
        });
      }) 
      .catch(err => {
        console.log(err);
      })
  }

  navigateToGarmentDetail(garment)  {
    console.log(this.props)
    this.props.navigation.navigate('GarmentDetailView', {
      garment: garment,
    });
  }

  render() {
    return (
      <View>
          {
            this.state.garments.map((garment) => (
              <List.Item
              title={garment.name}
              description={garment.description}
              key={garment.id}
              onPress={() => this.navigateToGarmentDetail(garment)}
            />
            ))
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default withNavigation(ListGarmentsContainer);