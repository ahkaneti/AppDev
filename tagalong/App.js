/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements
<<<<<<< HEAD
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
=======
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder-reborn';
import Logo from './src/components/Logo'; // Import component from another file


//API set up and variables
type Props = {};
//API Key for the google maps API
const GOOGLE_MAPS_APIKEY = 'AIzaSyCSFIWbcI5EGJtJSrFXh-4WfrtgzdICDFg';
//Variable keeps track if the walk has started
var started = false;
//Holds the generated walking path so we can verify that a user is following the path
var directionArrayay = [];
//Keeps track of when Delta/Zoom needs to change
var changeDelta = false;


export default class App extends Component<Props> {

constructor(props){
  super(props);
  //Setting initial variables
  this.state = {
    //The coordinates of where your direction path starts, changes until with you location until you click start
    directionPos: {latitude: 0, longitude:0},
    //Text for the search bar
    text: 'Enter Destination',
    //Array of points of the walking path to be passed to the check function
    directionArray:[],
    //The coordinate of your destination
    destinationPos:{latitude: 0, longitude:0},
    //The region of the map that should be focused on
    Region: null,
    //The position of the user
    userPosition: {
      latitude:0,
      longitude:0,
    },
  };
}

watchID = null

//Getting Initial Location
componentDidMount(){
  //Requesting user authorization of location
  navigator.geolocation.requestAuthorization();
  //Getting the initial position
  navigator.geolocation.getCurrentPosition((position) => {
    //User current location
    var lat = position.coords.latitude
    var long = position.coords.longitude
    //Updated region
    var lastRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: .007,
      longitudeDelta: .007,
    }
    //updating the user position and region
    this.setState({Region: lastRegion, directionPos:{latitude: lat, longitude:long}, destinationPos:{latitude: lat + .001, longitude:long + .001}})
  });
  //Updating user position as they move
  this.watchID = navigator.geolocation.watchPosition((position) => {
    //User current location
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var inpath = false;
    var newpos = {
      latitude: lat,
      longitude: long,
    }

    this.setState({userPosition: newpos})

    if(started==true){
      for(var i=0; i<pathArray.length; i++){
        if(Math.sqrt(Math.pow((pathArray[i].latitude-lat),2)+Math.pow((pathArray[i].longitude-long),2))<.0001){
          inpath = true;
        }}
        if(inpath){
          this.setState({text: "You are on path"})
        }
        else{
          this.setState({text: "You have left the path"})
        }
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: .1,
        longitudeDelta: .1,
      }
      if(changeDelta){
      this.setState({Region: lastRegion});
      changeDelta = false;
    }
    }
    else{
      this.setState({directionPos: newpos})
    }

    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 5000, maximumAge: 0, distanceFilter: 1});
  }


//Dragging Marker and updating the position
onDragMarker(e){
  console.log('hello');
  this.setState({destinationPos:e.nativeEvent.coordinate});
  //Getting the address of the new location for Display
  Geocoder.geocodePosition({lat: e.nativeEvent.coordinate.latitude,
                            lng: e.nativeEvent.coordinate.longitude}).then(res=> {this.setState({text:JSON.stringify(res[0].formattedAddress)})});
}


//Look up location Button $
onPress(text){
  //Converting Adress into lat and long and changing the text in search bar
  Geocoder.geocodeAddress(text).then(res=>{this.setState({destinationPos: text,
                                                          destinationPos:{latitude:res[0].position.lat,
                                                               longitude:res[0].position.lng}})});
}


//Start walk button
onPress2(arr,userPosition){
  started = true;
  pathArray = arr;
  changeDelta = false;
}

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    //Initializing variables
    let destinationPos = this.state.destinationPos;
    let text = this.state.text;
    let directionArray = this.state.directionArray;
    let userPosition = this.state.userPosition;
    let directionPos = this.state.directionPos;
    return (

      //Setting up the map view
      <MapView style={styles.map} initialRegion={this.state.Region} loadingEnabled showUserLocation followUserLocation>
        <View style={styles.header}>
          <Logo></Logo>
          <View style={styles.searchcontainer}>
            {/*Search bar for entering destination location*/}
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
            {/*Button for entering desitination location*/}
            <TouchableOpacity style={styles.enterbttn} onPress={()=>this.onPress(this.state.text)}/>
          </View>
        </View>
          {/*Button for user to start their walk*/}
          <TouchableOpacity style={styles.startbttn} onPress={()=>this.onPress2(this.state.directionArray,this.state.userPosition)}/>

        {/*Generating Poly line for user to follow*/}
        <MapViewDirections
          origin={directionPos}
          mode='walking'
          destination={destinationPos}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#e699ff"
          onReady={(result) => {this.setState({directionArray:result.coordinates})}}
        />
        {/*User location*/}
        <MapView.Marker coordinate= {userPosition} title={"yo position"}>
          <View style={styles.radius}>
            <View style={styles.locationMarker}/>
          </View>
        </MapView.Marker>
        {/*Location of the destination*/}
        <MapView.Marker
          coordinate= {destinationPos}
          title={"Destination"}
          draggable
          onDragEnd={(e) => this.onDragMarker(e)}
        />
      </MapView>
    );
>>>>>>> d8c6212e6d54719a09f5888da3f3ebf84a3cea77
  }
  })

<<<<<<< HEAD
const Nav = createStackNavigator({
=======
const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '8%',
  },
  searchcontainer: {
    position:'relative',
    flexDirection: 'row',
>>>>>>> d8c6212e6d54719a09f5888da3f3ebf84a3cea77

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
