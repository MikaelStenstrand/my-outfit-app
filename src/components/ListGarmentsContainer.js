import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { listGarmentsAPI, subscribeToUpdateGarmentAPI, subscribeToCreateGarmentAPI, subscribeToDeleteGarmentAPI } from '../scripts/garmentApi.js';
import { withNavigation } from 'react-navigation';
import { List } from 'react-native-paper';
import { Button } from 'react-native-elements';

class ListGarmentsContainer extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      garments: [],
    };
  }

  componentDidMount() {
    const options = { limit: 50 };
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
    this.subscribe();
  }

  async subscribe() {
    const subscriptionUpdate = await subscribeToUpdateGarmentAPI(this.handleGarmentSubscription.bind(this));
    const subscriptionCreate = await subscribeToCreateGarmentAPI(this.handleGarmentSubscription.bind(this));
    const subscriptionDelete = await subscribeToDeleteGarmentAPI(this.handleGarmentSubscription.bind(this));
    this.setState({
      subscriptionUpdate,
      subscriptionCreate,
      subscriptionDelete,
    });
  }

  handleGarmentSubscription(data)  {
    if (data && data.hasOwnProperty('value') && data.value.hasOwnProperty('data') && data.value.data) {
      if (data.value.data.onUpdateGarment) {
        const changedGarment = data.value.data.onUpdateGarment;
        if(!changedGarment) return;
        const garments = this.state.garments;
        const garmnetToUpdateIndex = garments.findIndex((garment) => garment.id === changedGarment.id)
        garments[garmnetToUpdateIndex] = changedGarment;
        this.setState({ garments });

      } else if(data.value.data.onCreateGarment) {
        const addedGarment = data.value.data.onCreateGarment;
        if(!addedGarment) return;
        const garments = this.state.garments;
        garments.push(addedGarment);
        this.setState({ garments });

      } else if(data.value.data.onDeleteGarment) {
        const deletedGarment = data.value.data.onDeleteGarment;
        if(!deletedGarment) return;
        const garments = this.state.garments;
        const garmnetToRemoveIndex = garments.findIndex((garment) => garment.id === deletedGarment.id)
        garments.splice(garmnetToRemoveIndex, 1);
        this.setState({ garments });
      }
    }
  }

  navigateToGarmentDetail(garment)  {
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
                photoURI={garment.photoURI}
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