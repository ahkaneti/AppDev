import * as React from 'react';
import {
  createStackNavigator,
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
//import CenterButton from '../components/CenterButton'
import LoginScreen from './app/components/Login'
import MapScreen from './app/components/Map'

//type MyNavScreenProps = {
  //navigation: NavigationScreenProp<NavigationState>,
 // banner: React.Node,
//};

//type BackButtonProps = {
//  navigation: NavigationScreenProp<NavigationStateRoute>,
//};

//_navigateBack = () => {
  //  this.props.navigation.goBack(null);
  
//}

let StackNavigator = createStackNavigator({
    Login:{
      screen: LoginScreen,
    },
    Maps:{
	path: 'Maps',
	screen: MapScreen,
    }
},
					  // { initialRoutename: 'login'}
);

export default StackNavigator

