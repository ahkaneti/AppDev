/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder-reborn';
import SocketIOClient from 'socket.io-client';



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


class WalkPage extends Component<Props> {

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

  //Setting up socket
  this.socket = SocketIOClient("https://luminous-magic-1.glitch.me");

  //Let the server know who got connected
  const msg = {
    username: "username",
    message: "Connected.",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnJhZGxleUB5YWhvbzExMjEyMi5jb20ifSwiaWF0IjoxNTUxMDY0MjU5fQ.RvupOADEiP9yw-3O0Iivbsq9R1qdx1mfT41BLuxIJhc"
  };
  this.socket.emit('shareUser', msg);
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
          this.setState({text: "You have left the path"});
          //Sending alert
          const message = {
            name: "username",
            msg: "Alert - Out of Path",
            latitude: lat,
            longitude: long
          };
          this.socket.emit('message', message);
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
    let Showme = this.state.Showme;
    return (
      //Setting up the map view
      <View style={styles.container}>
      <MapView style={styles.map} initialRegion={this.state.Region} loadingEnabled showUserLocation followUserLocation>
          {/*Search bar for entering destination location*/}


        {/*Generating Poly line for user to follow*/}
        <MapViewDirections
          origin={directionPos}
          mode='walking'
          destination={destinationPos}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#BD9BF7"
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
      <View style={styles.searchcontainer}>
        <TextInput style={styles.input}
                   onChangeText={(text) => this.setState({text})}
                   value={this.state.text}/>
        {/*Button for entering desitination location*/}
        <TouchableOpacity style={styles.enterbttn} onPress={()=>this.onPress(this.state.text)}>
          <Image source={require('../../images/search.png')} style={{width: 32.5, height: 22.5,}}/>
        </TouchableOpacity>
      </View>
      {/*Button for user to start their walk*/}
      <TouchableOpacity style={styles.startbttn} onPress={()=>this.onPress2(this.state.directionArray,this.state.userPosition)}>
        <Text style={styles.starttext}>Start</Text>
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchcontainer: {
    position:'relative',
    flexDirection: 'row',
  },
  enterbttn: {
    marginTop: 10,
    marginLeft: 10,
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#BD9BF7',
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  },
  searchimg:{
    height: 40,
    width: 40,
  },
  startbttn: {
    marginTop: 600,
    marginBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 30,
    backgroundColor: '#BD9BF7',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  },
  starttext: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 20,
  },
  input: {
    marginTop: 10,
    marginLeft: 10,
    height: 40,
    width: 300,
    backgroundColor: 'rgba(255,255,255,.9)',
    borderColor: 'gray',
    borderWidth: 1,

  },
  locationMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,112,255,.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,112,255,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navitigationContainter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export default WalkPage;
