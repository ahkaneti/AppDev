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
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      password: '',
    };
  }
  RegisterFunction() {
    return fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          phone_number: this.state.phone_number,
          password: this.state.password })
    })
    .then((response) => response.json())
    .then((responseData) => {
        console.log(responseData)
    });
  }
  GoToAuth() {
    this.props.navigation.navigate('AuthentificationPage');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Create Account</Text>
        <Text style={styles.headers}>First Name</Text>
        <TextInput
          style={styles.entry}
          onSubmitEditing={(first_name) => this.setState({first_name})}
        />
        <Text style={styles.headers}>Last Name</Text>
        <TextInput
          style={styles.entry}
          onSubmitEditing={(last_name) => this.setState({last_name})}
        />
        <Text style={styles.headers}>Phone Number</Text>
        <TextInput
          style={styles.entry}
          autoCapitalize={'none'}
          autoCorrect={false}
          keyboardType={'numeric'}
          onSubmitEditing={(phone_number) => this.setState({phone_number})}
        />
        <Text style={styles.headers}>Email</Text>
        <TextInput
          style={styles.entry}
          autoCapitalize={'none'}
          keyboardType={'email-address'}
          autoCorrect={false}
          onSubmitEditing={(email) => this.setState({email})}
        />
        <Text style={styles.headers}>Password</Text>
        <TextInput
          style={styles.entry}
          autoCapitalize={'none'}
          onSubmitEditing={(password) => this.setState({password})}
        />
        <TouchableOpacity style={styles.login_bttn}
          onPress = {() => {
            this.RegisterFunction()
            this.GoToAuth()
          }}>
          <Text style={styles.bttn_text}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CC51A3',
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
    backgroundColor: '#CEA2AC',
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
export default CreatePage;
