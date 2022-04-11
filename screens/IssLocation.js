import axios from 'axios';
import React, { Component } from 'react';
import { Text, View ,ImageBackground,SafeAreaView,StyleSheet, Alert,Image} from 'react-native';

import MapView ,{Marker} from 'react-native-maps'

export default class IssLocationScreen extends Component {

    constructor(){
        super();
            this.state={
                location:{}
            }
        }
    

    componentDidMount(){
        this.getISSLocation();
    }

    getISSLocation=()=>{
     
        axios.
        get("https://api.wheretheiss.at/v1/satellites/25544").then(response=>{
            this.setState({location:response.data})
        })

        .catch(error=>{
            Alert.alert(error.message)
        })


    }
    render() {

        if(Object.keys(this.state.location).length==0){
            return(
                <View
                style={{
                    flex:1,
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    <Text> Loading..</Text>
                </View>
            )
        }
        else{
        return (
            <View style={styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <ImageBackground source={require('../assets/bg.png')} style={styles.backgroundImage}>
                <View style={styles.titlecontainer}>
                    <Text style={styles.titleText}>ISS Location</Text>
                </View>

                < View style={styles.mapContainer}>
                  <MapView
                  style={styles.map}

                  region={{
                      latitude:this.state.location.latitude,
                      longitude:this.state.location.longitude,
                      latitudeDelta: 100,
                      longitudeDelta: 100,
                  }}>

                      <Marker

                      coordinate={{latitude:this.state.location.longitude,longitude:this.state.location.longitude}}>

                    <Image source={require("../assests/iss_icon.png")} style={{height:50,width:50}}/>
                    </Marker>
                  </MapView>

                  

                </View>
                </ImageBackground>
                
            </View>
        )
    }
}
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },

    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    titlecontainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },

    mapContainer:{

        flex:0.6
    },

    map:{
        width:"100%",
        height:"100%"
    }
})


