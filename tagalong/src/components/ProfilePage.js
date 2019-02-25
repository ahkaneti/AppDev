import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

type Props = {};

class ProfilePage extends Component{
  SignOutFunction(){
    this.props.navigation.navigate('CreateLoginPage');
  };
  render(){
    return(
      <View>
        <Text> Profile Page </Text>
        <TouchableOpacity onPress = {()=>this.SignOutFunction()}><Text>Sign Out</Text></TouchableOpacity>
      </View>
      );
  }
}
export default ProfilePage;
