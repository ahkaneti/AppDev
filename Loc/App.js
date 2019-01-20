/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity, Image} from 'react-native';
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
let started = false;

export default class App extends Component<Props> {

constructor(props){
  super(props);
  //Setting initial variables
  this.state = {
    toggle:false,
    initialPosition: {
      latitude: 0,
      longitude:0,
      latitudeDelta:0,
      longitudeDelta: 0,
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
  //Using geolocation to get current position
  navigator.geolocation.getCurrentPosition((position) => {
    var lat = position.coords.latitude
    var long = position.coords.longitude
    //Setting the inital region
    var initialRegion = {
      latitude: lat,
      longitude: long,
      latitudeDelta: .04,
      longitudeDelta: .04
    }
    //Setting the states of initial position and user position
    this.setState({initialPosition: initialRegion})
    this.setState({markerPosition: initialRegion})
      });

this.watchID = navigator.geolocation.watchPosition((position) => {
  var lat = position.coords.latitude
  var long = position.coords.longitude
  var latdelta = .01
  var londelta = .01
  if(started==true){
    latdelta = .06
    londelta = .06
  }

  var lastRegion = {
    latitude: lat,
    longitude: long,
    latitudeDelta: latdelta,
    longitudeDelta: londelta
  }

  this.setState({initialPosition: lastRegion})
  this.setState({markerPosition: lastRegion})
  })
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
  this.setState({started: true})
  if(Math.sqrt(Math.pow((arr[0].latitude-markerPosition.latitude),2)+Math.pow((arr[0].longitude-markerPosition.longitude),2))<.0005){
    this.setState({text:'Within Radius'})
  }


  /*for(let i = 0; i<arr.length-1; i++){
    let finlat = arr[i].latitude + .0005;
    let finlong = arr[i].longitude + .0005;
    if((arr[i].latitude - arr[i+1].latitude) > 0)
    {
      finlong = finlong-.001;
    }

    border.push({latitude:finlat,longitude:finlong});
  }
  for(let i = arr.length-1; i>0; i--){
    let finlat = arr[i].latitude - .0005;
    let finlong = arr[i].longitude - .0005;
    if((arr[i].latitude - arr[i-1].latitude) < 0)
    {
      finlong = finlong+.001;
    }

    border.push({latitude:finlat,longitude:finlong});
  }

this.setState({borderarr:border,started:true});
*/
}


_isInPolygon(position, area){
  let x = position.latitude
  let y = position.longitude

  let inside = false
  for (let i = 0, j = area.length - 1; i < area.length; j = i++) {
    let xLat = area[i].latitude
    let yLat = area[i].longitude
    let xLon = area[j].latitude
    let yLon = area[j].longitude

    let intersect = ((yLat > y) !== (yLon > y)) && (x < (xLon - xLat) * (y - yLat) / (yLon - yLat) + xLat)
    if (intersect) inside = !inside
  }
  if(inside){
    this.setState({text:'success'});
  }
  else{
    this.setState({text:'fail'});
  }
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

    return (
      //Setting up the map view
      <MapView style={styles.map} region={this.state.initialPosition}>
        <View style={styles.searchcontainer}>
          {/*Search bar for entering destination location*/}
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          {/*Button for entering desitination location*/}
          <TouchableOpacity style={styles.enterbttn} onPress={()=>this.onPress(this.state.text)}/>
          {/*Button for user to start their walk*/}
          <TouchableOpacity style={styles.startbttn} onPress={()=>this.onPress2(this.state.patharr,this.state.markerPosition)}/>
        </View>
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
        {renderIf(this.state.toggle)(<TouchableOpacity style={styles.walkbttn}/>)}
        {renderIf(this.state.toggle)(<TouchableOpacity style={styles.webbttn}/>)}
        {renderIf(this.state.toggle)(<TouchableOpacity style={styles.areabttn}/>)}
        {renderIf(this.state.toggle)(<TouchableOpacity style={styles.profbttn}/>)}
        <TouchableOpacity style={styles.menubttn} onPress={()=>this.menuPress(this.state.toggle)}/>
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
    marginLeft: 10,
    marginTop: 70,
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
  },
  input: {
    marginLeft: 10,
    marginTop: 70,
    height: 40,
    width: 225,
    backgroundColor: 'rgba(255,255,255,.3)',
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
  menubttn: {
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
    position: 'absolute',
    bottom: 50,
    left:165,
  },
  walkbttn: {
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
    position: 'absolute',
    bottom: 110,
    left:130,
  },
  webbttn: {
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
    position: 'absolute',
    bottom: 110,
    left:200,
  },
  areabttn:{
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
    position: 'absolute',
    bottom: 50,
    left:100,
  },
  profbttn:{
    height: 40,
    width: 40,
    backgroundColor: '#e699ff',
    position: 'absolute',
    bottom: 50,
    left:230,
  },
  navitigationContainter: {
    flexDirection: 'column',
    alignItems: 'center',
  }


});
