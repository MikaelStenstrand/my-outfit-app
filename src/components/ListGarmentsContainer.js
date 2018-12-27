import React, {Component} from 'react';
import {StyleSheet, View, RefreshControl} from 'react-native';
import { listGarmentsAPI, subscribeToUpdateGarmentAPI, subscribeToCreateGarmentAPI, subscribeToDeleteGarmentAPI } from '../scripts/garmentApi.js';
import { withNavigation } from 'react-navigation';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

const config = {
  garmentDataFetchingOptions: { limit: 50 }
}

class ListGarmentsContainer extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      garments: [],
      isRefreshing: false,
    };
  }

  componentDidMount() {
    this.fetchGarments(config.garmentDataFetchingOptions);
    this.subscribe();
  }

  async fetchGarments(options) {
    listGarmentsAPI(options)
      .then(result => {
        this.setState({
          garments: result.data.listGarments.items
        });
      }) 
      .catch(err => {
        console.log(err);
      })
  }

  onRefresh() {
    this.setState({ isRefreshing: true });
    this.fetchGarments(config.garmentDataFetchingOptions)
      .then(() => this.setState({ isRefreshing: false }))
      .catch((err) => console.log(err));
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
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.onRefresh()}
            />
        }>
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});

export default withNavigation(ListGarmentsContainer);