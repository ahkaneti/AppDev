import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

type Props = {};

class ForgotPasswordPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      emailText: 'Enter email adress',
      passwordText: 'Enter new password',
    }
  }

  render(){
    let emailText = this.state.emailText;
    let passwordText = this.state.passwordText;
    return(
      <View style={styles.container}>
        <Text style={styles.title}> Forgot Password </Text>
        <Text style={styles.emailText}>Email</Text>
        <TextInput style={styles.inputEmail}/>
        <Text style={styles.passwordText}>New Password</Text>
        <TextInput style={styles.inputPassword}/>
      </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BD9BF7',
  },
  title: {
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 35,
  },
  inputEmail: {
    marginTop: 1,
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  inputPassword: {
    marginTop: 1,
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  passwordText:{
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Verdana',
  },
  emailText: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Verdana',
  },
})

export default ForgotPasswordPage;
