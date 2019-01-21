import * as React from 'react';
import {
  createBottomTabNavigator,
  SafeAreaView,
  withNavigation,
  NavigationActions,
  StackActions,} from 'react-navigation';
import type {
  NavigationScreenProp,
  NavigationState,
  NavigationStateRoute,
  NavigationEventSubscription,
} from 'react-navigation';
import HomeScreen from '../views/Home'
import AreaScreen from '../views/Area'
import CenterButton from '../components/CenterButton'
import LoginScreen from '../components/Login'
// import MapScreen from '../components/Map'

type MyNavScreenProps = {
  navigation: NavigationScreenProp<NavigationState>,
  banner: React.Node,
};

type BackButtonProps = {
  navigation: NavigationScreenProp<NavigationStateRoute>,
};

_navigateBack = () => {
    this.props.navigation.goBack(null);
  };
}

let StackNavigator = createStackNavigator({
  Login:{
    screen: LoginScreen,
  },
  // For each screen that you can navigate to, create a new entry like this:
  //Map: {
    // `Login` is a React component that will be the main content of the screen.
  //  screen: MapScreen,	
//  },				
},{
    initialRouteName: 'Login'
});

export default StackNavigator

