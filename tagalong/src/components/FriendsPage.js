import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

type Props = {};

class FriendsPage extends Component{
  constructor(props){
    super(props);

    this.state = {
      text: 'Enter email users email'
    }
  }

  render(){
    let text = this.state.text;
    return(
      <View style={styles.container}>
        <Text style={styles.title}>Add Friend</Text>
        <TextInput style={styles.input}
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text}/>
        <TouchableOpacity style={styles.add}><Text style={styles.addText}>Add Friend</Text></TouchableOpacity>
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {

    fontFamily: 'Verdana',
    color: '#BD9BF7',
    fontSize: 40,
  },
  input: {
    marginTop: 40,
    height: 40,
    width: 210,
    backgroundColor: 'rgba(255,255,255,.9)',
    borderColor: 'gray',
    borderWidth: 1,
  },
  add:{
    marginTop: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 30,
    backgroundColor: '#BD9BF7',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  },
  addText: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 20,
  },
});


export default FriendsPage;
