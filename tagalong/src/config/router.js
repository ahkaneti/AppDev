import React, { Component } from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';

import WalkPage from '../components/WalkPage'
import LoginPage from '../components/LoginPage'
import CreatePage from '../components/CreatePage'

const TabsNav = createBottomTabNavigator({
  LoginPage: {
    screen: LoginPage,
  },
  CreatePage: {
    screen:CreatePage
  }
});

const Tabs = createAppContainer(TabsNav);

export const Tabs;
