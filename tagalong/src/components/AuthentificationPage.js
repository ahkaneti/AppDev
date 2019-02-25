import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

type Props = {};

class AuthentificationPage extends Component{
  ConfirmFunction(){
    this.props.navigation.navigate('Tabs');
  }

  render(){
    return(
      <View>
        <Text> AuthentificationPage </Text>
        <TouchableOpacity onPress = {()=>this.ConfirmFunction()}><Text>Confirm</Text></TouchableOpacity>
      </View>
      );
  }
}
export default AuthentificationPage;
