import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView} from 'react-native';
import { Button } from 'react-native-paper';

export default class HomeScreen extends Component {
  
  render() {   
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <Text>MY OUTFIT</Text>
          <Button
            mode="contained"
            icon="add-a-photo"
            onPress={() => this.props.navigation.navigate('Garments')}>
              Got to Clothes
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    marginTop: 50,
  },
});