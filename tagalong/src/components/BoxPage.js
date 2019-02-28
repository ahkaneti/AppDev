import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder-reborn';
import GeoFencing from 'react-native-geo-fencing';


type Props = {};
type Props = {};
//API Key for the google maps API
const GOOGLE_MAPS_APIKEY = 'AIzaSyCSFIWbcI5EGJtJSrFXh-4WfrtgzdICDFg';
//Variable keeps track if the walk has started
var started = false;
var temparray = [];
var clicked = false;
//Holds the generated walking path so we can verify that a user is following the path
//Keeps track of when Delta/Zoom needs to change
var changeDelta = false;
class BoxPage extends Component{
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
      polygonArray: [],
      //The position of the user
      userPosition: {
        latitude:0,
        longitude:0,
      },
    };

    //Setting up socket
    /*
    this.socket = SocketIOClient("https://bradleyramos-login-boiler-plate.glitch.me");

    //Let the server know who got connected
    const msg = {
      username: "username",
      message: "Connected."
    };
    this.socket.emit('message', msg);

    //On data receive
    this.socket.on('send', (data) => {
      for (let content of data)
      {
        console.log(content);
      }
    });*/
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
      //Sending lattitude and longitude
      const loc = {
        username: "username",
        message: "Sending current location.",
        lattitude: lat,
        longitude: long
      };
      //this.socket.emit('location', loc);

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
      GeoFencing.containsLocation({latitude:41.881832,longitude:-87.623177}, polygonArray)
        .then(() => clearFunction())
        .catch(() => console.log('point is NOT within polygon'))
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 0, distanceFilter: 1});


    }

    clearFunction(){
      var temp = [];
      this.setState({polygonArray: temp});
      clicked = true;
    }
    polygonFunction(e){
      if(clicked){
        clicked = false;
      }
      else{
      var temp = this.state.polygonArray.concat(e);
      this.setState({polygonArray: temp});
    }
    }



  //Dragging Marker and updating the position


  //Look up location Button $


  componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchId);
    }

  render(){
    let destinationPos = this.state.destinationPos;
    let text = this.state.text;
    let directionArray = this.state.directionArray;
    let userPosition = this.state.userPosition;
    let directionPos = this.state.directionPos;
    let polygonArray = this.state.polygonArray;
    return (
      //Setting up the map view
      <MapView style={styles.map} initialRegion={this.state.Region} loadingEnabled showUserLocation followUserLocation onPress={(e) => this.polygonFunction(e.nativeEvent.coordinate)}>
      <MapView.Polygon
      coordinates={polygonArray}
                    fillColor="rgba(189, 155, 247, 0.5)"
                    strokeColor="rgba(0,0,0,0.5)"
                    strokeWidth={2}
                    />
      <TouchableOpacity style={styles.clearbttn} onPress={()=> this.clearFunction()}/>
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  clearbttn:{
      marginTop: 510,
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
  }


});
export default BoxPage;
