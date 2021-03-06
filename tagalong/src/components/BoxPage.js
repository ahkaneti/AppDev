import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion, Alert, Modal} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder-reborn';
import SocketIOClient from 'socket.io-client';


type Props = {};
//API Key for the google maps API
const GOOGLE_MAPS_APIKEY = 'AIzaSyCSFIWbcI5EGJtJSrFXh-4WfrtgzdICDFg';
//Variable keeps track if the walk has started
var started = false;
var polygonArray = [];
//Holds the generated walking path so we can verify that a user is following the path
//Keeps track of when Delta/Zoom needs to change
var changeDelta = false;
var point = {lat:41.881832, lng: -87.623177};
var inside = require('point-in-polygon');

var firstname = "FIRST_NAME";

class BoxPage extends Component{
  constructor(props){
    super(props);

    firstname = fetch('https://bradleyramos-login-boiler-plate-2.glitch.me/secure/profile?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnJhZGxleXJhbW9zQHlhaG9vLmNvbSJ9LCJpYXQiOjE1NTE1MTA1MDh9.WOYEa9xFWED0izLb29taasorMokfUJmyBpRUDD-7D-Y', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        }).then((response) => response.json())
        .then((responseJson)=> {
          return responseJson.first_name;
        })
        .catch((error)=> {
          console.error(error);
        });

    //Setting initial variables
    this.state = {
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
      Showme: false,
      poPosition: {latitude: 0, longitude: 0}
    };

    //Setting up socket
    this.socket = SocketIOClient("https://bradleyramos-login-boiler-plate-2.glitch.me");

    //Let the server know who got connected
    const msg = {
      name: firstname,
      message: "Connected.",
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnJhZGxleUB5YWhvbzExMjEyMi5jb20ifSwiaWF0IjoxNTUxMDY0MjU5fQ.RvupOADEiP9yw-3O0Iivbsq9R1qdx1mfT41BLuxIJhc"
    };
    this.socket.emit('shareUser', msg);

    //On data receive
    this.socket.on('status', (data) => {
        console.log(data.msg);
        if ((data.msg == global.OUT_OF_PATH_ALERT) || (data.msg == global.OUT_OF_WEB_ALERT) || (data.msg == global.OUT_OF_BOX_ALERT))
        {
          Alert.alert("Alert", data.name + " " + data.msg + "\nlatitude: " + data.latitude + "\nlongitude: " + data.longitude);
        }
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
        name: firstname,
        message: "Initial location - BoxPage",
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
      //Updating latitude and longitude
      const loc = {
        name: firstname,
        message: "Updating current location - BoxPage",
        latitude: lat,
        longitude: long
      }
      this.socket.emit('shareLocation', loc)

      this.setState({userPosition: newpos})
      _isInPolygon = (newpos, polygonArray) => {

        let x = point.latitude
        let y = point.longitude

        let inside = false
        for (let i = 0, j = polygonArray.length - 1; i < polygonArray.length; j = i++) {
          let xLat = polygonArray[i].latitude
          let yLat = polygonArray[i].longitude
          let xLon = polygonArray[j].latitude
          let yLon = polygonArray[j].longitude

          let intersect = ((yLat > y) !== (yLon > y)) && (x < (xLon - xLat) * (y - yLat) / (yLon - yLat) + xLat)
          if (intersect) inside = !inside
        }
    return inside
  }
  if(inside){

  }
  else
  {
    //Sending alert
    const message = {
      name: firstname,
      msg: global.OUT_OF_BOX_ALERT,
      latitude: lat,
      longitude: long
    };
    this.socket.emit('message', message);
  }
 },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 0, distanceFilter: 1});


    }

    clearFunction(){
      var temp = [];
      this.setState({polygonArray: temp});
    }
    polygonFunction(e){
      var temp = this.state.polygonArray.concat(e);
      this.setState({polygonArray: temp});
    }
    modalFunction(){
     this.setState({Showme: true})
   }
   closeFunction(){
    this.setState({Showme: false})
    this.setState({poPosition: {latitude:42.05081, longitude: -87.67614}})
  }




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
    let showme = this.state.Showme;
    let poPosition = this.state.poPosition;
    console.disableYellowBox = true;

    return (
      //Setting up the map view
      <View style={styles.container}>
      <MapView style={styles.map} initialRegion={this.state.Region} loadingEnabled showUserLocation followUserLocation onPress={(e) => this.polygonFunction(e.nativeEvent.coordinate)}>
        <MapView.Polygon coordinates={polygonArray}
                         fillColor="rgba(189, 155, 247, 0.5)"
                         strokeColor="rgba(0,0,0,0.5)"
                         strokeWidth={2}/>
        <MapView.Marker coordinate= {poPosition} title={"Friend's position"}>
          <View style={styles.radius}>
            <View style={styles.locationMarker}/>
          </View>
        </MapView.Marker>
      </MapView>
      <TouchableOpacity style={styles.clearbttn} onPress={()=> this.clearFunction()}>
        <Text style={styles.cleartext}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.startbttn} onPress={()=> this.modalFunction()}>
        <Text style={styles.starttext}>Start</Text>
      </TouchableOpacity>
      <Modal visible={this.state.Showme}
              backdrop={true}
              style={styles.modal}
              transparent={true}>
          <View style={styles.addPage}>
          <Text style={styles.title}>Add Friend</Text>
          <TouchableOpacity style={styles.FriendsTop} onPress={()=> this.closeFunction()}><Text style={styles.FriendsText}>John Wick</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends} onPress={()=> this.closeFunction()}><Text style={styles.FriendsText}>Kieran Bondy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends} onPress={()=> this.closeFunction()}><Text style={styles.FriendsText}>Aaron Kaneti</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends} onPress={()=> this.closeFunction()}><Text style={styles.FriendsText}>Bradley Ramos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends} onPress={()=> this.closeFunction()}><Text style={styles.FriendsText}>Can Turkay</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends} onPress={()=> this.closeFunction()}><Text style={styles.FriendsText}>Ka Wong</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.FriendsBottom}><Text style={styles.title}></Text></TouchableOpacity>
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
  clearbttn:{
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
    alignItems:'center',
    justifyContent:'center',
    width: 40,
    height: 40,
    backgroundColor: '#BD9BF7',
    borderRadius: 25,
    shadowColor: 'rgba(0,0,0, .9)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1,
  },
  cleartext:{
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',

  },
  startbttn:{
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
  starttext:{
    textAlign: 'center',
    fontFamily: 'Verdana',
    color: 'white',
    fontSize: 20,

  },
  locationMarker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: 'red'
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,112,0,.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,112,0,.3)',
    alignItems: 'center',
    justifyContent: 'center',
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
export default BoxPage;
