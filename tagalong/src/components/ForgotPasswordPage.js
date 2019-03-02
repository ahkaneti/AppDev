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

  ChangePasswordFunction(){
    console.log(this.state);
    return fetch('https://bradleyramos-login-boiler-plate-2.glitch.me/api/users/changePassword', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          changeEmail: this.state.emailText,
          changePassword: this.state.passwordText,
        }),
        }).then((response) => response.json())
        .then((responseJson)=> {
            this.props.navigation.navigate('LoginPage');
        })
        .catch((error)=> {
          console.error(error);
        });
      };

  BackFunction(){
    this.props.navigation.navigate('LoginPage');
  };

  render(){
    let emailText = this.state.emailText;
    let passwordText = this.state.passwordText;
    return(
      <View style={styles.container}>
        <TouchableOpacity style={styles.back} onPress={()=>this.BackFunction()}>
        <Image source={require('../../images/back.png')} style={{width: 32.5, height: 22.5,}}/>
        </TouchableOpacity>
        <Text style={styles.title}> Forgot Password </Text>
        <Text style={styles.emailText}>Email</Text>
        <TextInput
          style={styles.inputEmail}
          onChangeText={(text) => this.setState({emailText: text})}
          value={this.state.changeEmail}
        />
        <Text style={styles.passwordText}>New Password</Text>
        <TextInput
          style={styles.inputPassword}
          onChangeText={(text) => this.setState({passwordText: text})}
          value={this.state.changePassword}
        />
        <TouchableOpacity style={styles.enter_bttn} onPress={()=>this.ChangePasswordFunction()}>
          <Text style={styles.bttn_text}>Enter</Text>
        </TouchableOpacity>
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
  enter_bttn: {
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    backgroundColor: '#AF8CEA',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  },
  bttn_text: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 15,
  },
  back: {
    width: 50,
    height: 50,
    position:'absolute',
    left: 15,
    top: 35,
  },
})

export default ForgotPasswordPage;
