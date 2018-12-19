import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import { createGarmentAPI, listGarmentsAPI } from '../scripts/garment-api-calls.js';
import { Button, List, ListItem, Icon } from 'react-native-elements'

export default class ListGarmentsContainer extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      garments: [],
    };
  }

  componentDidMount() {
    listGarmentsAPI()
      .then(result => {
        console.log("component did mount" ,result.data.listGarments.items);
        this.setState({
          garments: result.data.listGarments.items
        });
      }) 
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    console.log('render:', this.state.garments)

    return (
      <View>
        <List containerStyle={{marginBottom: 20}}>
            {
              this.state.garments.map((item) => (
                <ListItem
                  roundAvatar
                  avatar={{}}
                  key={Math.random()}
                  title={item.name}
                  subtitle={item.type}
                />
              ))
            }
          </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});