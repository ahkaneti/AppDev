/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements

import React, { Component } from 'react';
import {Text, View} from 'react-native';
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

const Tabs = createBottomTabNavigator({
  WalkPage: {
    screen: WalkPage,
  },
  WebPage: {
    screen: WebPage,
  },
  BoxPage: {
    screen: BoxPage,
  },
  ProfilePage: {
    screen: ProfilePage,
  },
  FriendsPage: {
    screen: FriendsPage,
  },
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
