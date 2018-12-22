import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Button} from 'react-native';


export default class HomeScreen extends Component {
  
  render() {   
    return (
      <View style={styles.container}>
        <ScrollView style={styles.body}>
          <Text>MY OUTFIT</Text>
          <Button
            title="Go to clothes"
            onPress={() => this.props.navigation.navigate('Garments')}
          />
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