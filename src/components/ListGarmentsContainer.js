import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import { listGarmentsAPI } from '../scripts/garment-api-calls.js';
import { List, ListItem } from 'react-native-elements'

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
        // console.log("ListGarmentsContainer" , result.data.listGarments.items);
        this.setState({
          garments: result.data.listGarments.items
        });
      }) 
      .catch(err => {
        console.log(err);
      })
  }

  render() {
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