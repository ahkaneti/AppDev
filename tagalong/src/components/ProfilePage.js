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
      avatar: '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',
    }};

  componentDidMount() {
    console.log(this.state);
    fetch(`https://bradleyramos-login-boiler-plate-2.glitch.me/secure/profile?secret_token=${global.token}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        }).then((response) => response.json())
        .then((responseJson)=> {
            this.setState({firstnameText: responseJson.first_name});
            this.setState({lastnameText: responseJson.last_name});
            this.setState({emailText: responseJson.email});
            this.setState({phoneText: responseJson.phone_number});
            if (responseJson.image_url) {
              this.setState({avatar: responseJson.image_url});
            }
        })
        .catch((error)=> {
          console.error(error);
        });
  };

  loadAvatarFunction(image) {
    this.setState({avatar: image});
  }

  uploadAvatarFunction() {
    return fetch(`https://bradleyramos-login-boiler-plate-2.glitch.me/secure/uploadAvatar?secret_token=${global.token}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.emailText,
          image: this.state.avatar,
        }),
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
    global.token = '';
    this.props.navigation.navigate('CreateLoginPage');
  };


  render(){
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.edit}><Image style={{width: 40, height: 40}} source={require('../../images/gear.png')}/></TouchableOpacity>
        <Image style={styles.profile} source={{uri: `data:image/gif;base64,${this.state.avatar}`}}/>
        <Text style={styles.name}>{`${this.state.firstnameText} ${this.state.lastnameText}`}</Text>
        <Text style={styles.email}>{this.state.emailText}</Text>
        <Text style={styles.phone}>{this.state.phoneText}</Text>
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
    borderRadius: 100
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
