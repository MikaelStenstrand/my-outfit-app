import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput, Button, Divider, Text } from 'react-native-paper';
import { GarmentType } from '../../scripts/garmentTypes.js';
import { createGarmentAPI } from '../../scripts/garment-api-calls.js';

export default class GarmentNewView extends Component {
  static navigationOptions = {
    title: 'New Clothes'
  }
  constructor(props)  {
    super(props);
    this.state = {
      name: '',
      description: '',
      type: GarmentType.UNKNOWN,
      isCreated: false,
      isError: false,
    };
  }

  async saveNewGarment()  {
    const newGarment = {
      name: this.state.name,
      description: this.state.description || '',
      type: this.state.type || GarmentType.UNKNOWN,
    }
    const response = await createGarmentAPI(newGarment);
    if (response && response.hasOwnProperty('data') && response.data.hasOwnProperty('createGarment')) {
      this.setState({ 
        isCreated: true,
        isError: false,
      });
    } else {
      this.setState({ 
        isCreated: false,
        isError: true 
      });
    }
  }

  renderCreatedMessage()  {
    if(this.state.isCreated) {
      return (
        <Button icon="thumb-up" color='#0B6623' style={styles.createdButton}>New clothing added!</Button>
      );
    } else {
      return (<Text></Text>)
    }
  }
  
  renderErrorMessage()  {
    if (this.state.isError) {
      return (<Button icon="thumb-down" color='#8b0000' style={styles.createdButton}>Ups! Problems occur</Button>)
    } else {
      return (<Text></Text>)
    }
  }

  render() {
    let createdMessage = this.renderCreatedMessage();
    let errorMessage = this.renderErrorMessage();

    return (
      <View style={styles.container}>
        <ScrollView>
          <TextInput
            label='Clothing'
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />
          <TextInput
            label='Description'
            value={this.state.description}
            onChangeText={(description) => this.setState({ description })}
          />
          <TextInput
            label='Gategory'
            value={this.state.type}
            onChangeText={(type) => this.setState({ type })}
          />
          <Button
            icon='save'
            onPress={() => this.saveNewGarment()}>
            Save it!
          </Button>

          <Divider />

          { createdMessage }
          { errorMessage }
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  createdButton: {

  }
});