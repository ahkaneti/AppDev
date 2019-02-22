/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Create Account</Text>
        <Text style={styles.headers}>First Name</Text>
        <TextInput style={styles.entry}/>
        <Text style={styles.headers}>Last Name</Text>
        <TextInput style={styles.entry}/>
        <Text style={styles.headers}>Phone Number</Text>
        <TextInput style={styles.entry}/>
        <Text style={styles.headers}>Email</Text>
        <TextInput style={styles.entry}/>
        <Text style={styles.headers}>Password</Text>
        <TextInput style={styles.entry}/>
        <TouchableOpacity style={styles.login_bttn}><Text style={styles.bttn_text}>Create</Text></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d69ef7',
  },
  logo: {
    fontSize: 40,
    color: 'white',
  },
  user_entry: {
    textAlign: 'center',
    height: 25,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  entry: {
    textAlign: 'center',
    height: 25,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  login_bttn: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 50,
    backgroundColor: '#d69ef7',
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
  },
  bttn_text: {
    fontSize: 20,
    color: 'white',
  }
});
