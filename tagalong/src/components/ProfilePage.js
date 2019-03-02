import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Image, TouchableOpacity} from 'react-native';

type Props = {};

let dict;

class ProfilePage extends Component{
  constructor(props){
    super(props);
    this.state={
      firstnameText: '',
      lastnameText: '',
      emailText: '',
      phoneText: '',
    }};

  componentDidMount() {
    console.log(this.state);
    return fetch(`https://bradleyramos-login-boiler-plate-2.glitch.me/profile?secret_token=${global.token}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson)=> {
            this.setState({firstnameText: responseJson.first_name});
            this.setState({lastnameText: responseJson.last_name})
            this.setState({emailText: responseJson.email})
            this.setState({phoneText: responseJson.phone_number})
        })
        .catch((error)=> {
          console.error(error);
        });
  }

  SignOutFunction(){
    this.props.navigation.navigate('CreateLoginPage');
  };


  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.edit}><Image style={{width: 40, height: 40}} source={require('../../images/gear.png')}/></TouchableOpacity>
        <Image style={styles.profile} source={require('../../images/Profileimg.png')}/>
        <Text style={styles.name}>Bradley Ramos</Text>
        <Text style={styles.email}>bradleyramos@yahoo.com</Text>
        <Text style={styles.phone}>224-545-8491</Text>
        <TouchableOpacity onPress = {()=>this.SignOutFunction()} style={styles.signOut}><Text style={styles.signOutText}>Sign Out</Text></TouchableOpacity>
      </View>
      );
  }
}
const styles = StyleSheet.create({
  name: {
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'black',
    fontSize: 40,
  },
  email: {
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'black',
    fontSize: 20,
  },
  phone: {
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'black',
    fontSize: 20,
  },
  signOut: {
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
  signOutText: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
  },
  profile: {
    width: 200,
    height: 200,
  },
  edit: {
    alignSelf: 'flex-end',
    marginRight: 7.5,
    marginTop: 37.5,
    alignItems:'center',
    justifyContent:'center',
    width: 40,
    height: 40,
    backgroundColor: '#BD9BF7',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  }

});

export default ProfilePage;
