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

import WalkPage from './app/components/WalkPage';
import LoginPage from './app/components/LoginPage';
import CreatePage from './app/components/CreatePage';
import WebPage from './app/components/WebPage';
import CreateLoginPage from './app/components/CreateLoginPage';
import ForgotPasswordPage from './app/components/ForgotPasswordPage';
import AuthentificationPage from './app/components/AuthentificationPage';
import BoxPage from './app/components/BoxPage'
import ProfilePage from './app/components/ProfilePage'
import FriendsPage from './app/components/FriendsPage'

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
  }
  })

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
});

const App = createAppContainer(Nav);

export default App;
