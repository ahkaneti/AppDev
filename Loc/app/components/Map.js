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
import renderIf from 'render-if';


//API set up and variables
type Props = {};
const GEOLOCATION_SETTINGS = { enableHighAccuracy: true,
                              distanceFilter: 1,
                              maximumAge: 1000 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyCSFIWbcI5EGJtJSrFXh-4WfrtgzdICDFg';
const border = [];
var started = false;
var patharray = [];
export default class App extends Component<Props> {

constructor(props){
  super(props);
  //Setting initial variables
  this.state = {
    directionPosition: null,
    started:false,
    toggle:false,
    initialPosition: {
      latitude: 0,
      longitude:0,
      latitudeDelta:.6,
      longitudeDelta: .6,
    },
    markerPosition: {
      latitude:0,
      longitude:0,
    },
    text: 'Enter Destination',
                desc:'oh no',
                patharr:null,
                borderarr:[],
                started:false,
                loc:{latitude: 41.912912, longitude: -87.649223},};
}


watchID = null

menuPress(tog){
  this.setState({toggle:!tog})
}

//Getting Initial Location
componentDidMount(){
  navigator.geolocation.requestAuthorization();
  navigator.geolocation.getCurrentPosition((position) => {

      var lat = position.coords.latitude
      var long = position.coords.longitude
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: .6,
        longitudeDelta: .6
      }
      this.setState({initialPosition: lastRegion, directionPosition:{latitude: lat, longitude:long}})
    })
  this.watchID = navigator.geolocation.watchPosition((position) => {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    var latdelta
    var londelta
    var inpath = false;
    var newpos = {
      latitude: lat,
      longitude: long,
    }

    this.setState({markerPosition: newpos})

    if(started==true){
      for(var i=0; i<patharray.length; i++){
        if(Math.sqrt(Math.pow((patharray[i].latitude-lat),2)+Math.pow((patharray[i].longitude-long),2))<.0005){
          inpath = true;
        }}
        if(inpath){
          this.setState({text: "You are on path"})
        }
        else{
          this.setState({text: "You have left the path"})
        }
      latdelta = .01
      londelta = .01
      var lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: latdelta,
        longitudeDelta: londelta
      }
      this.setState({initialPosition: lastRegion})
    }
    else{
      this.setState({directionPosition: newpos})
    }

    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: false, timeout: 5000, maximumAge: 0, distanceFilter: 1});
  }


//Dragging Marker and updating the position
onDragMarker(e){
  console.log('hello');
  this.setState({loc:e.nativeEvent.coordinate});
  //Getting the address of the new location for Display
  Geocoder.geocodePosition({lat: e.nativeEvent.coordinate.latitude,
                            lng: e.nativeEvent.coordinate.longitude}).then(res=> {this.setState({text:JSON.stringify(res[0].formattedAddress)})});
}


//Look up location Button $
onPress(text){
  //Converting Adress into lat and long and changing the text in search bar
  Geocoder.geocodeAddress(text).then(res=>{this.setState({loc: text,
                                                          loc:{latitude:res[0].position.lat,
                                                               longitude:res[0].position.lng}})});
}


//Start walk button
onPress2(arr,markerPosition){
  started = true;
  patharray = arr;
}

componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    //Initializing variables
    let desc = this.state.desc;
    let loc = this.state.loc;
    let text = this.state.text;
    let patharr = this.state.patharr;
    let borderarr = this.state.borderarr;
    let started = this.state.started;
    let markerPosition = this.state.markerPosition;
    let toggle = this.state.toggle;
    let directionPosition = this.state.directionPosition;
    return (
      //Setting up the map view
      <MapView style={styles.map} region={this.state.initialPosition} loadingEnabled showUserLocation followUserLocation>

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
          {/*Button for user to start their walk*/}
          <TouchableOpacity style={styles.startbttn} onPress={()=>this.onPress2(this.state.patharr,this.state.markerPosition)}/>

        {/*Generating Poly line for user to follow*/}
        <MapViewDirections
          origin={markerPosition}
          mode='walking'
          destination={loc}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={2}
          strokeColor="#e699ff"
          onReady={(result) => {this.setState({patharr:result.coordinates})}}
        />
        {/*User location*/}
        <MapView.Marker coordinate= {markerPosition} title={"yo position"}>
          <View style={styles.radius}>
            <View style={styles.locationMarker}/>
          </View>
        </MapView.Marker>
        {/*Location of the destination*/}
        <MapView.Marker
          coordinate= {loc}
          title={"title"}
          description={desc}
          draggable
          onDragEnd={(e) => this.onDragMarker(e)}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
