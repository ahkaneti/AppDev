import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

class Button extends Component {
  render() {
    return(
      <TouchableOpacity style={styles.submitter}><Text style={styles.label}>Create</Text></TouchableOpacity>
      // <Button
      // style={styles.submitter}
      // onPress={this.submitInfo}
      // title="Create"
      // />
    );
  }
}
const styles = StyleSheet.create({
  submitter: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white',
    width: 100,
    height: 50,
    backgroundColor: '#CEA2AC',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  }

});

export default Button;
