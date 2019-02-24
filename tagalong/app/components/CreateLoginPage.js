
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

type Props = {};

class CreateLoginPage extends Component{
  CreatePageFunction(){
    this.props.navigation.navigate('CreatePage');
  };

  LoginPageFunction(){
    this.props.navigation.navigate('LoginPage');
  };

  render(){
    return(
      <View>
        <TouchableOpacity onPress={()=> this.LoginPageFunction()}><Text>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=> this.CreatePageFunction()}><Text>Create Account</Text></TouchableOpacity>
      </View>
      );
  }
}
export default CreateLoginPage;
