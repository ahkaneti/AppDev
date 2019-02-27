/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';


type Props = {};
class LoginPage extends Component{
  LoginFunction(){
    this.props.navigation.navigate('Tabs');
  };
  ForgotFunction(){
    this.props.navigation.navigate('ForgotPasswordPage');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Login</Text>
        <Text style={styles.headers}>Username</Text>
        <TextInput style={styles.user_entry}/>
        <Text style={styles.headers}>Password</Text>
        <TextInput style={styles.password_entry}/>
        <TouchableOpacity style={styles.login_bttn} onPress={() => this.LoginFunction()}><Text style={styles.bttn_text}>Login</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => this.ForgotFunction()}><Text style={styles.bttn_text}>Forgot Password</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BD9BF7',
  },
  logo: {
    fontSize: 40,
    color: 'white',
    fontFamily: 'Verdana',
  },
  user_entry: {
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  password_entry: {
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  login_bttn: {
    marginTop: 30,
    marginBottom: 10,
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
  signup_link: {
    marginTop: 2,
    fontSize:12,
  },
  headers: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    fontFamily: 'Verdana',
  },
  bttn_text: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 15,
  }
});

export default LoginPage;
