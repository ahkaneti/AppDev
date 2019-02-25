import React, { Component } from 'react';
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
    // paddingTop:'1%',
    paddingBottom:'10%',
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

export default Logo;
