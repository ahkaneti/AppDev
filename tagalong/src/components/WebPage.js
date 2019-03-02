/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements
import React, {Component} from 'react';
<<<<<<< HEAD
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion, Modal} from 'react-native';
=======
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion, Alert} from 'react-native';
>>>>>>> 135f7b5e02088ea41e310c96cabacb73166fd422
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


class WebPage extends Component<Props> {

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
    Showme: false,
  };


  //Setting up socket
  this.socket = SocketIOClient("https://luminous-magic-1.glitch.me");

  //Let the server know who got connected
  const msg = {
    name: "username",
    message: "Connected.",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnJhZGxleUB5YWhvbzExMjEyMi5jb20ifSwiaWF0IjoxNTUxMDY0MjU5fQ.RvupOADEiP9yw-3O0Iivbsq9R1qdx1mfT41BLuxIJhc"
  };
  this.socket.emit('shareUser', msg);
  this.web = {};
  //On data receive
  this.socket.on('status', (data) => {
      console.log(data.msg);
      if (data.msg == "Alert - Out of path" OR data.msg == "Alert - Out of designated area" )
      {
        Alert.alert("Alert", data.name + " " + data.msg + "\nlatitude: " + data.latitude + "\nlongitude: " + data.longitude);
      }
    });
  this.socket.on('newUser', (data) => {
      this.web[data.first_name] = [data.latitude, data.longitude];
      console.log(data.first_name, this.web);
  });
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

    //Sending initial latitude and longitude
    const loc = {
      name: "username",
      message: "Initial location - WebPage",
      latitude: lat,
      longitude: long
    }
    this.socket.emit('shareLocation', loc)

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

    //Sending latitude and longitude
    const loc = {
      name: "username",
      message: "Update current location - WebPage",
      latitude: lat,
      longitude: long
    }
    this.socket.emit('shareLocation', loc)

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


  modalFunction(){
    this.setState({Showme: true})
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
    console.disableYellowBox = true;
    let Showme = this.state.Showme;
    return (
      //Setting up the map view
      <View style={styles.container}>
      <MapView style={styles.map} initialRegion={this.state.Region} loadingEnabled showUserLocation followUserLocation>
          {/*Button for entering desitination location*/}
        {/*User location*/}
        <MapView.Marker coordinate= {userPosition} title={"yo position"}>
          <View style={styles.radius}>
            <View style={styles.locationMarker}/>
          </View>
        </MapView.Marker>
      </MapView>
      <TouchableOpacity style={styles.startbttn} onPress={()=> this.modalFunction()}>
        <Text style={styles.starttext}>Start</Text>
      </TouchableOpacity>
      <Modal visible={this.state.Showme}
              backdrop={true}
              style={styles.modal}
              transparent={true}>
          <View style={styles.addPage}>
          <Text style={styles.title}>Add Friends to Web</Text>
          <TouchableOpacity style={styles.FriendsTop}><Text style={styles.FriendsText}>John Wick</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}>Kieran Bondy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}>Aaron Kaneti</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}>Bradley Ramos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}>Can Turkay</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}>Ka Wong</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.FriendsBottom}><Text style={styles.title}>Start Web</Text></TouchableOpacity>



          </View>
      </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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
  startbttn:{
    marginTop: 500,
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
  starttext:{
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 20,

  },
  addPage:{
    backgroundColor: 'white',
    marginTop: 175,
    marginLeft: 75,
    width: 230,
    height: 400,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: .25,
    borderColor: 'black',
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  },
  modal:{
    alignItems: 'center',
    width:200,
    height:400,
    justifyContent: 'center',
    borderRadius: Platform.OS === 'ios' ? 30:0,
    shadowRadius: 10,
  },
  title: {
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: '#BD9BF7',
    fontSize: 20,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  FriendsTop: {
    width:230,
    height: 40,
    alignItems:'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    borderTopWidth: 1,
    borderTopColor: 'gray',

  },
  Friends: {
    width:230,
    height: 40,
    alignItems:'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',

  },
  FriendsBottom: {
    width:230,
    height: 40,
    alignItems:'center',
    justifyContent: 'center',

  },
  FriendsText: {
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: '#BD9BF7',
    fontSize: 20,
  },


});
export default WebPage;
