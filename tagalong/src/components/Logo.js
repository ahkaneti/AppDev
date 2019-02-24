/* This is an example of how we should format our front-end components */
import React, { Component } from 'react';
// Probably don't need to import all of these, but depending on what's in the
// component, it can't hurt.
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

class Logo extends Component {
  render() {
    return (
      <Text style={styles.title}>
        <Text style={styles.span1}>tag</Text>
        <Text style={styles.span2}>along</Text>
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  title: {
    // padding:'5%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  span1: {
    color: '#ffffff',
    fontSize: 30,
  },
  span2: {
    color: '#4C157C',
    fontSize: 30,
  },
});

// *****Important*****
export default Logo;
