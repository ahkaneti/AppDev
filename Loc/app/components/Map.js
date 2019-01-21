/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//Import statements
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput,TouchableOpacity} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geocoder from 'react-native-geocoder-reborn';
//
type Props = {};
const GEOLOCATION_SETTINGS = { enableHighAccuracy: true,
                              distanceFilter: 1,
                              maximumAge: 1000 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyCSFIWbcI5EGJtJSrFXh-4WfrtgzdICDFg';
const border = [];


export default class App extends Component<Props> {
constructor(props){
  super(props);
  this.state = {text: 'Useless Placeholder',
                desc:'oh no',
                patharr:null,
                borderarr:[],
                started:false,
                mkrloc:{latitude: 41.912912, longitude: -87.649223},
                loc:{latitude: 41.912912, longitude: -87.649223},
                curr:{latitude: 41.881832, longitude: -87.623177}};
}
//Getting Initial Location
componentDidMount(){
  navigator.geolocation.getCurrentPosition((position) => {this.setState({curr:position.coords})});
}
//Dragging Marker
onDragMarker(e){
  console.log('hello');
  this.setState({loc:e.nativeEvent.coordinate,
                mkrloc:e.nativeEvent.coordinate});
  Geocoder.geocodePosition({lat: e.nativeEvent.coordinate.latitude,
                            lng: e.nativeEvent.coordinate.longitude}).then(res=> {this.setState({text:JSON.stringify(res[0].formattedAddress)})});
}
//Lookup Button
onPress(text){
  Geocoder.geocodeAddress(text).then(res=>{this.setState({loc: text,
                                                          mkrloc:{latitude:res[0].position.lat, longitude:res[0].position.lng}})});
}

onPress2(arr){
  for(let i = 0; i<arr.length-1; i++){
    if(i==0){
      border.push({latitude:arr[i].latitude+.0005,longitude:arr[i].longitude+.0003})
    }
    let latch = ((arr[i].latitude - arr[i+1].latitude)/180)+.0005;
    let lngch = ((arr[i].longitude - arr[i+1].longitude)/180)+.0005;
    let ratio = latch/lngch;
    border.push({latitude:arr[i].latitude+lngch,longitude:arr[i].longitude+latch});
  }
 for(let i = arr.length-1; i>0; i--){
    i = i - 1;
    let latch = ((arr[i].latitude - arr[i+1].latitude)/180)+.0005;
    let lngch = ((arr[i].longitude - arr[i+1].longitude)/180)+.0005;
    border.push({latitude:arr[i].latitude-lngch,longitude:arr[i].longitude-latch});
  }

this.setState({borderarr:border,started:true});

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
    //Initialize
    let desc = this.state.desc;
    let loc = this.state.loc;
    let curr = this.state.curr;
    let text = this.state.text;
    let mkrloc = this.state.mkrloc;
    let patharr = this.state.patharr;
    let borderarr = this.state.borderarr;
    let started = this.state.started;
    if(started){
    var id = navigator.geolocation.watchPosition((position) => {this.setState({curr:position.coords}), this._isInPolygon(position.coords,this.state.borderarr)});
  };
    return (
      <MapView style={styles.map}
        initialRegion={{
          latitude: curr.latitude,
          longitude: curr.longitude,
          latitudeDelta: .06,
          longitudeDelta: .06,
          }}
        showsUserLocation = {true}
        >
        <TouchableOpacity
          style={styles.enterbttn}
          onPress={()=>this.onPress(this.state.text)}
        />
        <TouchableOpacity
          style={styles.startbttn}
          onPress={()=>this.onPress2(this.state.patharr)}
        />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          />
        <MapView.Polygon
          coordinates={borderarr}
          />
          <MapViewDirections
              origin={curr}
              mode='walking'
              destination={loc}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={2}
              strokeColor="#e699ff"
              onReady={(result) => {this.setState({patharr:result.coordinates})}}
            />
          <MapView.Marker
            coordinate= {mkrloc}
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
  enterbttn: {
    //position: 'absolute',
    left:250,
    top: 105,
    height: 40,
    width: 40,
    backgroundColor: '#FFFFFF',
    //alignItems: 'center',
  },
  startbttn: {
    //position: 'absolute',
    left:300,
    top: 65,
    height: 40,
    width: 40,
    backgroundColor: '#000000',
    //alignItems: 'center',
  },
  input: {
    left: 10,
    height: 40,
    width: 200,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    top:25,
  },

});
