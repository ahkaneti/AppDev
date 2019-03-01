/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements

import React, { Component } from 'react';
import {Text, View, Image} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import WalkPage from './src/components/WalkPage';
import LoginPage from './src/components/LoginPage';
import CreatePage from './src/components/CreatePage';
import WebPage from './src/components/WebPage';
import CreateLoginPage from './src/components/CreateLoginPage';
import ForgotPasswordPage from './src/components/ForgotPasswordPage';
import AuthentificationPage from './src/components/AuthentificationPage';
import BoxPage from './src/components/BoxPage';
import ProfilePage from './src/components/ProfilePage';
import FriendsPage from './src/components/FriendsPage';

const client = axios.create({
  baseURL: 'http://bradleyramos-login-boiler-plate.glitch.me',
  responseType: 'json'
});

const Tabs = createBottomTabNavigator({
  WalkPage: {
    screen: WalkPage,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={require('./images/Walk.png')} style={{width: 55, height: 55,}}/>
      )
  }
  },
  WebPage: {
    screen: WebPage,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={require('./images/Web.png')} style={{width: 40, height: 40,}}/>
      )
  }
  },
  BoxPage: {
    screen: BoxPage,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={require('./images/Box.png')} style={{width: 65, height: 65,}}/>
      )
  }
  },

  FriendsPage: {
    screen: FriendsPage,
    navigationOptions: {
    tabBarIcon: ({tintColor}) => (
      <Image source={require('./images/Friends.png')} style={{width: 45, height: 45,}}/>
      )
  }},
  ProfilePage: {
    screen: ProfilePage,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Image source={require('./images/Profile.png')} style={{width: 47.5, height: 47.5,}}/>
        )
    }
  }},
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: 'blue',
      inactiveTintColor: 'red',
    }

});
const Nav = createStackNavigator({
  CreateLoginPage: {
    screen: CreateLoginPage,
  },
  LoginPage: {
    screen:LoginPage,
  },
  CreatePage: {
    screen:CreatePage,
  },
  ForgotPasswordPage: {
    screen: ForgotPasswordPage,
  },
  Tabs: {
    screen: Tabs,
  },
  AuthentificationPage: {
    screen: AuthentificationPage,
  },
},
{
  headerMode: 'none',
  defaultNavigationOptions: {
    headerVisible: false,
  }
  });

const App = createAppContainer(Nav);

export default App;
