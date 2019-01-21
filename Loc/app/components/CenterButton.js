import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import ProfileScreen from '../views/Profile'
import WalkScreen from '../views/Walk'
import AreaScreen from '../views/Area'
import HomeScreen from '../views/Home'
import SettingsScreen from '../views/Settings'
import React, {Component} from 'react';
import { Animated, Easing } from 'react-native';

class CenterButton extends Component{
    constructor(props){
        super(props);    
        this.topLeftValue = new Animated.Value(0); // for the small button        
        this.topCenterValue = new Animated.Value(0);
        this.topRightValue = new Animated.Value(0);
        this.animatedValue = new Animated.Value(0); // for the add button
      }

    handleButtonPress = () => {
        // this.animate(1);
    }



    render(){
        return(
    //     <View style={{flex: 1,flexDirection: 'row', alignItems:"stretch", justifyContent:"center"}}>
    //     <Animated.View>
    //         <TouchableOpacity
    //             hitSlop={{
    //                 top: 20,
    //                 bottom: 20,
    //                 left: 20,
    //                 right: 20,
    //             }}
    //             >
    //             <Animated.View
    //             >
    //             </Animated.View>
    //             </TouchableOpacity>
    //     </Animated.View>
    //         <View>
    //             <TouchableOpacity         
    //             hitSlop={{
    //                 top: 20,
    //                 bottom: 20,
    //                 left: 20,
    //                 right: 20,
    //             }}
    //             onPress={this.handleButtonPress}>
    //             <Image style={styles.homebutton} source={require('../images/homebutton.png')}/>
    //             </TouchableOpacity>
    //         </View>
    // </View>

          <View>


            <View style={styles.buttonsContainer}>
              {<TouchableOpacity style={styles.profilebutton}>
                <Image style={styles.menubutton}
                  source={require('../images/profileimg.png')}/>
              </TouchableOpacity>}

              {<TouchableOpacity style={styles.webbutton}>
                <Image style={styles.menubutton}
                  source={require('../images/webbutton.png')}/>
              </TouchableOpacity>}

              {<TouchableOpacity style={styles.walkbutton}>
                <Image style={styles.menubutton}
                  source={require('../images/walkbutton.png')}/>
              </TouchableOpacity>}

              {<TouchableOpacity style={styles.areabutton} onPress={() => this.props.navigation.navigate('Area')}>
                <Image style={styles.menubutton}
                  source={require('../images/areabutton.png')}/>
              </TouchableOpacity>}

              <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={styles.homebutton}>
                <Image style={styles.menubutton}
                  source={require('../images/homebutton.png')}/>
              </TouchableOpacity>
              
            </View>
          </View>
        );
    }
}
const styles = StyleSheet.create({
    backgroundContainer: {
      zIndex: 1,
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',
    },
    background: {
      bottom: 0,
      left:0,
      width:375,
      height:900,
  
    },
    buttonsContainer: {
      zIndex: 2,
    },
    profilebutton: {
      resizeMode: 'contain',
      width: 25,
      height: 25,
      zIndex:9,
      position: 'absolute',
      bottom: 85,
      left:210,
    },
    webbutton: {
      width: 25,
      height: 25,
      zIndex:9,
      position: 'absolute',
      bottom: 145,
      left:180,
    },
    walkbutton: {
      width: 25,
      height: 25,
      zIndex:9,
      position: 'absolute',
      bottom: 145,
      left:100,
    },
    areabutton: {
      width: 25,
      height: 25,
      zIndex:9,
      position: 'absolute',
      bottom: 85,
      left:75,
    },
    homebutton: {
      width: 25,
      height: 25,
      zIndex:10,
      position: 'absolute',
      bottom: 85,
      left:145,
    },
    menubutton: {
      width:70,
      height:70,
    }
  });
export default CenterButton;
// export default CenterButton
    // Settings: { 
    //     screen: SettingsScreen,
    //     navigationOptions:{
    //     tabBarIcon: (          <Image style={styles.menubutton}
    //         source={require('../images/profileimg.png')}/>)
    //     }
    // },
    // Profile: { screen: ProfileScreen,
    //     navigationOptions:{
    //         tabBarIcon: (          <Image style={styles.profilebutton}
    //         source={require('../images/profileimg.png')}/>)
    //     }},
    // Walkbutton: { screen: WalkScreen,
    //     navigationOptions:{
    //         tabBarIcon: (          <Image style={styles.walkbutton}
    //         source={require('../images/walkbutton.png')}/>)
    //     } },
    // Areabutton: {screen: AreaScreen,
    //     navigationOptions:{
    //         tabBarIcon: (          <Image style={styles.areabutton}
    //         source={require('../images/areabutton.png')}/>)
    //     }},
    // Homebutton: { screen: HomeScreen,
    //     navigationOptions:{
    //         tabBarIcon: (          <Image style={styles.homebutton}
    //         source={require('../images/homebutton.png')}/>)
    //     }}

    // }
