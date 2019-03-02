
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import {robotoWeights} from 'react-native-typography';

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
      <View style={styles.container}>
      <Text style={styles.title}> Tagalong </Text>
        <TouchableOpacity style ={styles.LoginButton} onPress={()=> this.LoginPageFunction()}><Text style ={styles.LoginText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style = {styles.CreateButton} onPress={()=> this.CreatePageFunction()}><Text style ={styles.CreateText}>Create Account</Text></TouchableOpacity>
      </View>
      );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BD9BF7',
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 50,
  },
  LoginButton: {
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 60,
      backgroundColor: '#AF8CEA',
      borderRadius: 25,
      shadowColor: 'rgba(0,0,0, .9)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1,
  },
  LoginText: {
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 15,
  },
  CreateButton: {
      marginTop: 25,
      alignItems: 'center',
      justifyContent: 'center',
      width: 150,
      height: 60,
      backgroundColor: '#AF8CEA',
      borderRadius: 25,
      shadowColor: 'rgba(0,0,0, .9)', // IOS
      shadowOffset: { height: 1, width: 1 }, // IOS
      shadowOpacity: 1, // IOS
      shadowRadius: 1,
  },
  CreateText: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 15,
  }

});
export default CreateLoginPage;
