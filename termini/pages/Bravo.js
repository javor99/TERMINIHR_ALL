import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ScrollView, TextInput } from 'react-native-gesture-handler'; 
import SelectDropdown from 'react-native-select-dropdown'
import CalendarPicker from 'react-native-calendar-picker';
var mydate = require('current-date'); 
import {URL} from "@env"
import { useSelector } from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';

const gradovi = ["ZAGREB","SPLIT","VARAĐDIN","VUKOVAR","OMIŠ"]
 

export default function Start({navigation}) {


    
  const theme=useSelector(state=>state.theme)
 


  return (
    <View style={{ flexDirection:'column',
    backgroundColor: theme=="light" ? "lightblue" : "#0f2557",
    alignItems:"center",
    justifyContent:"center",
    height:"100%"}}>
    
        
    <ResponsiveImage initHeight={200} initWidth="200"  style={styles.tinyLogo} source={require("../assets/confetti.png")}/> 
    <ResponsiveImage initHeight={200} initWidth="200" style={styles.tinyLogo} source={require("../assets/confetti(1).png")}/> 
    <View style={{margin:10}}>
        <Text style={{color:theme=="dark"?"white":"black",fontSize:20}}>Termin uspješno kreiran!</Text>
    </View>

    <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate("Home")}>
        <Text style={styles.buttonText}>ZAVRŠI</Text>
      </TouchableOpacity>
       
    </View>
  );
}  
 
const styles = StyleSheet.create({ 
  
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    
    marginTop:10,
    margin:10
  },
  input :{
      
      
      borderWidth:1,
      borderRadius:5,
      borderColor:"black",
      
      backgroundColor:"white",
      width:300,
      height:30,
      paddingLeft:10
      

  },
  opis :{
      
      
    borderWidth:1,
    borderRadius:5,
    borderColor:"black",
    
    backgroundColor:"white",
    width:300,
    height:150,
    alignItems:"flex-start",
    justifyContent:"flex-start"
    

},
  krug:{
    backgroundColor:"white",
    borderRadius:150,
    borderWidth:1,
    borderColor:"white",
    width:300,
    height:300,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:40
  },
  scroll:{
      width:"100%",
     
      maxHeight:"75%"

  },
  scroll2:{
      width:"100%",
      alignItems:"center",
      justifyContent:"center",
     
      height:"100%"
  },
  button:{
      height:30,
      width:300,
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:"white",
      borderRadius:5,
      marginTop:10,
  },
  box2:{backgroundColor:"white",
    borderRadius:5
},
box:{backgroundColor:"white",
borderRadius:5
}, buttonContainer: {
    marginTop:20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderColor:"white",
    borderWidth:2,
    width:"50%",
    borderWidth:1,
    
  },
  buttonText: {
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    fontSize:18,
    fontWeight:"bold"
  },


});

