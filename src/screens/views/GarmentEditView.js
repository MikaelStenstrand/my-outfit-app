import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { sharedStyles } from '../../scripts/sharedStyles.js';
import { deleteGarmentAPI } from '../../scripts/garment-api-calls.js';
import { deletePhoto } from '../../scripts/cloudStorage.js';

const config = {
  timeoutGoBack: 1500,
};

export default class GarmentEditView extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      isDeleted: false,
    };
  }

  async deleteGarment(garment) {
    const photoURI = garment.photoURI;
    const response = await deleteGarmentAPI(garment);
    if(response && response.hasOwnProperty('data') && response.data.hasOwnProperty('deleteGarment') && response.data.deleteGarment !== null) {
      // deleting the photo from S3 bucket
      deletePhoto(photoURI);
      this.setState({
        isDeleted: true,
        isError: false,
      })
      setTimeout(() => {
        this.props.navigation.navigate('Garments')
      }, config.timeoutGoBack);
    } else {
      this.setState({
        isDeleted: false,
        isError: true,
      })
    }
  }

  renderErrorMessage()  {
    if (this.state.isError) {
      return (
        <View style={sharedStyles.row}>
          <Icon name='thumb-down' color='#8b0000'></Icon>
          <Text>Ups! Problems occur</Text>
        </View>
      )
    } else {
      return (<Text></Text>)
    }
  }

  renderDeletedMessage()  {
    if(this.state.isDeleted) {
      return (
        <View style={sharedStyles.row}>
          <Icon name='thumb-up' color='#0B6623'></Icon>
          <Text>Deleted!</Text>
        </View>
      );
    } else {
      return (<Text></Text>)
    }
  }

  render() {
    const garment = this.props.navigation.getParam('garment');
    const errorMessage = this.renderErrorMessage();
    const deletedMessage = this.renderDeletedMessage();
    if (!garment && !garment.hasOwnProperty('id'))  {return;}
    return (
      <View style={sharedStyles.container}>
        <ScrollView>
          <Text>{garment.name}</Text>
          <Text>{garment.description}</Text>
        </ScrollView>
        <View stlye={sharedStyles.footer}>
          { errorMessage }
          { deletedMessage }
          <Button
              icon={{name: 'trash', type:'font-awesome'}}
              backgroundColor='#AA0114'
              title='Delete'
              onPress={() => this.deleteGarment(garment)}
            />
          <Text style={sharedStyles.debug}>{garment.id}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
});