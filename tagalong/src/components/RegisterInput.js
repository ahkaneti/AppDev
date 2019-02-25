import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

class RegisterInput extends Component {
  render() {
    return(
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.label}>First Name</Text>
      <TextInput style={styles.entry}/>
        <Text style={styles.label}>Last Name</Text>
      <TextInput style={styles.entry}/>
        <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.entry}/>
        <Text style={styles.label}>Email</Text>
      <TextInput style={styles.entry}/>
        <Text style={styles.label}>Password</Text>
      <TextInput style={styles.entry}/>
    );
  }
}
const styles = StyleSheet.create({
  label: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
  },
  header: {
    fontSize: 40,
    color: 'white',
  },
  entry: {
    textAlign: 'center',
    height: 25,
    width: 240,
    backgroundColor: 'white',
    borderRadius: 25,
  },

});

export default RegisterInput;
