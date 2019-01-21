/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import {AppRegistry, TouchableOpacity, TextInput} from 'react-native';
import type {
  NavigationScreenProp,
  NavigationState,
  NavigationStateRoute,
  NavigationEventSubscription,
} from 'react-navigation';

import {
  createStackNavigator,
  SafeAreaView,
  withNavigation,
  NavigationActions,
  StackActions,
} from 'react-navigation';

type MyNavScreenProps = {
  navigation: NavigationScreenProp<NavigationState>,
  banner: React.Node,
};

export default class MyLoginScreen extends Component<MyNavScreenProps>{
    render(){
	const {navigation } = this.props;
	return(
	  <Login navigation={navigation}/>
	);
    }
}

class Login extends Component<MyNavProps> {
  constructor(props) {
    super(props);
    this.state = { 
      firstName: 'first',
      lastName: 'last',
      email:'test@test.com',
      phone:'phone',
      password:'pass',
      loginUsername: '',
      loginPassword: '',
    };
  }
    
  // This function checks if the login is in the database
  // and logs them in if they are otherwise give an error
  submitInfo = () => {
    // fetch('http://localhost:8000/api/users/create', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     firstName: 'yourValue',
    //     password: 'yourOtherValue',
    //   }),
      // });
      return this.props.navigation.dispatch(
          StackActions.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({
                      routeName: 'Maps',
                      params: { name: 'test' },
                  }),
              ],
          })
      )
  }
  render() {
      return (
	<View style={styles.container}>
	      
        <View style={styles.button}>
          <Text style={styles.title}>Register</Text>
          <View style={styles.textBox}>
            <Text>First Name: </Text>
            <TextInput
              style={{height: 20, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={(firstName) => this.setState({firstName})}
              value={this.state.text}
            />
          </View>
          <View style={styles.textBox}>
            <Text>Last Name: </Text>
            <TextInput
              style={{height: 20, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={(lastName) => this.setState({lastName})}
              value={this.state.text}
            />
          </View>
          <View style={styles.textBox}>
            <Text>Email Address: </Text>
            <TextInput
              style={{height: 20, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={(email) => this.setState({email})}
              value={this.state.text}
            />
            </View>
          <View style={styles.textBox}>
            <Text>Phone Number: </Text>
            <TextInput
              style={{height: 20, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={(phone) => this.setState({phone})}
              value={this.state.text}
            />
          </View>
          <View style={styles.textBox}>
            <Text>Password: </Text>
            <TextInput
              style={{height: 20, borderColor: 'gray', borderWidth: 1}}
              onSubmitEditing={(password) => this.setState({password})}
              value={this.state.text}
            />
          </View>
        </View>
        <View style={styles.otherButton}>
          <View style={styles.textBox}>
            <Text>Username: </Text>
              <TextInput
                style={{height: 20, borderColor: 'gray', borderWidth: 1}}
                onSubmitEditing={(password) => this.setState({loginUsername})}
                value={this.state.text}
              />
              </View>
              <View style={styles.textBox}>
                <Text>Password: </Text>
                <TextInput
                  style={{height: 20, borderColor: 'gray', borderWidth: 1}}
                  onSubmitEditing={(password) => this.setState({loginPassword})}
                  value={this.state.text}
                />
              </View>

	      <Button
                onPress={this.submitInfo}
                title="Login"
              />
         </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },
  header: {
    flex: 1,
    color: '#ffffff',
    textAlign: 'center',
    backgroundColor: '#93278f',
    maxHeight: '10%',
    minWidth: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 15,
    paddingTop:'8%',
    paddingBottom:'8%',
  },
  span1: {
    color: '#ffffff',
    fontSize: 30,
  },
  span2: {
    color: '#4C157C',
    fontSize: 30,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#9E005D',
    color: "#ffffff",
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  otherButton: {
    flex:1,
    alignSelf: 'center',
    backgroundColor: '#662D91',
    color: "#ffffff",
    minWidth: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textBox: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-around',
  },
});
