/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image, AnimatedRegion, Alert, Modal} from 'react-native';
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
var lineArray = [];
//Keeps track of when Delta/Zoom needs to change
var changeDelta = false;
var op = 0.0;
var norrisLat = 42.053420;
var norrisLong = -87.672748;
var firstname = "FIRST_NAME";
var friends = [];
var web = {};

class WebPage extends Component<Props> {

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

  friends = ["friend1", "friend2"];
  /*console.log(fetch('https://bradleyramos-login-boiler-plate-2.glitch.me/secure/getFriends?secret_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiYnJhZGxleXJhbW9zQHlhaG9vLmNvbSJ9LCJpYXQiOjE1NTE1MTA1MDh9.WOYEa9xFWED0izLb29taasorMokfUJmyBpRUDD-7D-Y', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
      .then((responseJson)=> {
        return responseJson[0].Friend;
      })
      .catch((error)=> {
        console.error(error);
      }));*/

  console.log(friends);

  var inc = 0;
  var step = 0.00002;
  friends.forEach(function(friend) {
    web[friend] = [norrisLat + (inc - 2)*step, norrisLong + (inc - 2)*step];
    inc = inc + 1;
  });
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
    destinationPos2:{latitude: 0, longitude:0},
    //The region of the map that should be focused on
    Region: null,
    //The position of the user
    userPosition: {
      latitude:0,
      longitude:0,
    },
     Showme: false,
     onePosition: {latitude:42.05081, longitude: -87.67614},
     twoPosition: {latitude:0,longitude:0},
     thirdPosition: {latitude:0,longitude:0},
     fourthPosition: {latitude:0,longitude:0},
     fifthPosition: {latitude:0,longitude:0},

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
      if ((data.msg == "Alert - Out of path") || (data.msg == "Alert - Out of designated area" ) || (data.msg == "Alert - Out of web"))
      {
        Alert.alert("Alert", data.name + " " + data.msg + "\nlatitude: " + data.latitude + "\nlongitude: " + data.longitude);
      }
    });
  this.socket.on('newUser', (data) => {
      //web[data.first_name] = [data.latitude, data.longitude];
      console.log(data.first_name, web);
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
      message: "Initial location - WebPage",
      latitude: lat,
      longitude: long
    }
    this.socket.emit('shareLocation', loc)

    //updating the user position and region
    this.setState({Region: lastRegion, directionPos:{latitude: lat, longitude:long},destinationPos:{latitude: lat + .0009, longitude:long + .0012},destinationPos2:{latitude: lat, longitude:long + .0015}})


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
      name: firstname,
      message: "Update current location - WebPage",
      latitude: lat,
      longitude: long
    }
    this.socket.emit('shareLocation', loc)

    this.setState({userPosition: newpos})

    /*web.forEach(function(friend){
      if ((friend[0] - newpos["latitude"])^2 + (friend[0] - newpos["longitude"])^2 >= 0.0005){

          this.setState({text: "You have left the path"})

          //Sending alert
          const message = {
            name: firstname,
            msg: "Alert - Out of web",
            latitude: lat,
            longitude: long
          };
          this.socket.emit('message', message);
      };
    });*/

    if(started==true){
      for(var friend in web){
        if(Math.sqrt(Math.pow((this.web[friend][0]-lat),2)+Math.pow((this.web[friend][1]-long),2))<.0005){
          inpath = true;
        }}
        if(inpath){
          this.setState({text: "You are on path"})
        }
        else{
          this.setState({text: "You have left the path"})

          //Sending alert
          const message = {
            name: firstname,
            msg: "Alert - Out of web",
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



//Look up location Button $


componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  modalFunction(){
     this.setState({Showme: true})
   }
   closeFunction(){
    this.setState({Showme: false})
    op = 1.0
    lineArray = [this.state.userPosition,this.state.destinationPos, this.state.destinationPos2, this.state.userPosition]
  }
  render() {
    //Initializing variables
    let destinationPos = this.state.destinationPos;
    let destinationPos2 = this.state.destinationPos2;
    let text = this.state.text;
    let directionArray = this.state.directionArray;
    let userPosition = this.state.userPosition;
    let directionPos = this.state.directionPos;
    let Showme = this.state.Showme;
    let onePosition= this.state.onePosition;
    let twoPosition= this.state.onePosition;
    let thirdPosition= this.state.onePosition;
    let fourthPosition= this.state.onePosition;
    let fifthPosition= this.state.onePosition;
    console.disableYellowBox = true;
    return (
      <View style={styles.container}>
      <MapView style={styles.map} initialRegion={this.state.Region} loadingEnabled showUserLocation followUserLocation >
        <MapView.Polyline
        coordinates = {lineArray}
        lineDashPattern={[5, 15]}/>

        <MapView.Marker coordinate= {userPosition} title={"your position"}>
          <View style={styles.radius}>
            <View style={styles.locationMarker}/>
          </View>
        </MapView.Marker>
        {/*Location of the destination*/}
        <MapView.Marker
          coordinate= {destinationPos}
          title={"Friend"}
          opacity={op}
        >
        <View style={styles.radius}>
          <View style={styles.locationMarkerfriend}/>
        </View>
        </MapView.Marker>
        <MapView.Marker
          coordinate= {destinationPos2}
          title={"Friend"}
          opacity={op}
        >
        <View style={styles.radius}>
          <View style={styles.locationMarkerfriend}/>
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
          <Text style={styles.title}>Add Friend</Text>
          <TouchableOpacity style={styles.FriendsTop}><Text style={styles.FriendsText}>John Wick</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}>Kieran Bondy</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText} >Aaron Kaneti</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText} >Bradley Ramos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText} >Can Turkay</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText} >Ka Wong</Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.Friends}><Text style={styles.FriendsText}></Text></TouchableOpacity>
          <TouchableOpacity style={styles.FriendsBottom}><Text style={styles.title} onPress={()=> this.closeFunction()}>Start Tracking</Text></TouchableOpacity>
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
  searchcontainer: {
    position:'relative',
    flexDirection: 'row',

  },
  enterbttn: {
    marginLeft: 10,
    marginTop: 70,
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',

  },
  startbttn: {

    alignSelf: 'baseline',
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
  },
  input: {
    marginLeft: 10,
    marginTop: 70,
    height: 40,
    width: 300,
    backgroundColor: 'rgba(255,255,255,.5)',
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
    backgroundColor: 'rgba(0,122,255,.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,150,255,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationMarkerfriend: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#BD9BF7'
  },
  radiusfriend: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(150,0,255,.1)',
    borderWidth: 1,
    borderColor: 'rgba(150,0,255,.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navitigationContainter: {
    flexDirection: 'column',
    alignItems: 'center',
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
