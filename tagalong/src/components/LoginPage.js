/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, AsyncStorage, Text, KeyboardAvoidingView, TextInput, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { saveUserToken } from '../redux/actions';
import { MyContext } from '../redux/provider';

type Props = {};
class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.loginAsync = this.loginAsync.bind(this);
  };

  LoginFunction(saveToken) {
    console.log(this.state);
    return fetch('https://bradleyramos-login-boiler-plate-2.glitch.me/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.token == undefined) {
          console.log('true, display error now');
          let errorStr = '';
          for (let err of responseJson.errors) {
            errorStr += `${err.message}\n`;
          }
          alert(errorStr);
          return;
        }
        this.loginAsync(saveToken, responseJson.token);
      })
      .catch((error) => {
        console.error(error);
      });


    // .then(function(response) => {
    //   this.props.saveUserToken(response.json().token);
    //   console.log(response.json().token);
    //   console.log(this.props.getUserToken);
    //   });
  };
  ForgotFunction() {
    this.props.navigation.navigate('ForgotPasswordPage');
  };
  handleEmailChange(text) {
    this.setState({ email: text });
  };

  handlePasswordChange(text) {
    this.setState({ password: text });
  };

  loginAsync = async (saveToken, token) => {
    saveToken(token)
      .then(() => {
        global.token = token;
        this.props.navigation.navigate('Tabs');
      })
      .catch(() => {
        this.props.navigation.navigate('ForgotPasswordPage');
      })
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">

          <Text style={styles.logo}>Login</Text>
          <Text style={styles.headers}>Email</Text>
          <TextInput style={styles.user_entry} onChangeText={this.handleEmailChange} value={this.state.email} />
          <Text style={styles.headers}>Password</Text>
          <TextInput style={styles.password_entry} secureTextEntry={true} password={true} onChangeText={this.handlePasswordChange} value={this.state.password} />
          <MyContext.Consumer>
            {context => ((
              <TouchableOpacity style={styles.login_bttn} onPress={() => {
                this.LoginFunction(context.saveToken);
                this.props.navigation.navigate('Tabs');
              }}>
              <Text style={styles.bttn_text}>Login</Text>
              </TouchableOpacity>
            ))}
          </MyContext.Consumer>
          <TouchableOpacity onPress={() => this.ForgotFunction()}><Text style={styles.bttn_text}>Forgot your password?</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CreatePage')}><Text style={styles.bttn_text}>{"Don't have an account?"}</Text></TouchableOpacity>
      </KeyboardAvoidingView>
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
    fontFamily: 'Verdana',
  },
  user_entry: {
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  password_entry: {
    textAlign: 'center',
    height: 30,
    width: 240,
    backgroundColor: 'white',

    borderRadius: 25,
  },
  login_bttn: {
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
  signup_link: {
    marginTop: 2,
    fontSize: 12,
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
    padding:10,
  }
});

// const mapStateToProps = state => ({
//     token: state.token,
// });


// const mapDispatchToProps = dispatch => ({
//     saveUserToken: () => dispatch(saveUserToken()),
// });
//
// export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export default LoginPage;
