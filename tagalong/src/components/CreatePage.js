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
class CreatePage extends Component{
  constructor(props){
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      password: ''
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handlePhoneNumberChange = this.handlePhoneNumberChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  };

  RegisterFunction(){
    console.log(this.state);
    this.props.navigation.navigate('AuthentificationPage');
    return fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          phone_number: this.state.phone_number,
          email: this.state.email,
          password: this.state.password,
        }),
    });
  };

  handleFirstNameChange(text){
    this.setState({first_name: text});
    console.log(text);
  };
  handleLastNameChange(text){
    this.setState({last_name: text});
  };
  handlePhoneNumberChange(text){
    this.setState({phone_number: text});
  };
  handleEmailChange(text){
    this.setState({email: text});
  };
  handlePasswordChange(text){
    this.setState({password: text});
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Create Account</Text>
        <Text style={styles.headers}>First Name</Text>
        <TextInput
          style={styles.entry}
          value={this.state.first_name}
          onChangeText={this.handleFirstNameChange}
        />
        <Text style={styles.headers}>Last Name</Text>
        <TextInput
          style={styles.entry}
          value={this.state.last_name}
          onChangeText={this.handleLastNameChange}
        />
        <Text style={styles.headers}>Phone Number</Text>
        <TextInput
          style={styles.entry}
          keyboardType= {'number-pad'}
          value={this.state.phone_number}
          onChangeText={this.handlePhoneNumberChange}
        />
        <Text style={styles.headers}>Email</Text>
        <TextInput
          style={styles.entry}
          keyboardType= {'email-address'}
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <Text style={styles.headers}>Password</Text>
        <TextInput
          style={styles.entry}
          secureTextEntry={true}
          password={true}
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
        />
        <TouchableOpacity style={styles.login_bttn} onPress = {()=>this.RegisterFunction()}><Text style={styles.bttn_text}>Create</Text></TouchableOpacity>
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
  },
  user_entry: {
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  entry: {
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  login_bttn: {
    marginTop: 30,
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
export default CreatePage;
