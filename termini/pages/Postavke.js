import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity,Modal,ScrollView,Linking} from 'react-native';
import {Dimensions} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkmode,lightmode } from '../redux/actions';
import { useDispatch,useSelector } from 'react-redux';
import ResponsiveImage from 'react-native-responsive-image';

//SUTRA DODAJ BR TELEFONA U BAZU , OSIGURAJ DA USER REG RADI(ISTI MAILOVI ERROR...), POKAZI MU TKO OD NJEGOVIH BROJEVA KORSITI APP



 


export default function Complete({navigation}) {

    const openLink = (url) => {
        Linking.openURL(url) 
          .then((supported) => {
            if (!supported) {
             // console.error('Opening the link is not supported.');
            } 
          })
          .catch((err) => {
            console.error('An error occurred while opening the link:', err); 
          });
      };

    const dispatch=useDispatch()
    const theme=useSelector(state=>state.theme)

    const [modalVisible,setModalVisible]= useState(false)

    async function odjava() { 
        setModalVisible(false)
        await  AsyncStorage.setItem("@LOGGEDIN","FALSE")
        navigation.navigate("Start")
    }
 
    return( 
    <View style={{ height:"100%",
    width:"100%",
    backgroundColor:theme=="light"?"lightblue": "#0f2557",
    alignItems:"center",
    justifyContent:"center"}}>
        <TouchableOpacity onPress={()=>navigation.navigate("Home")}>
        <ResponsiveImage initHeight="50" initWidth={50} source={require("../assets/back.png")}/>
         </TouchableOpacity>
         
        <View style={styles.naslov}>
       
            <Text style={{fontSize:20,color:theme=="light"?"black":"white",fontWeight:"bold"}}>POSTAVKE</Text>
            </View> 
       
            <View style={styles.info}> 

                <TouchableOpacity style={{margin:10,backgroundColor:theme=="light"?"white":"#28559a",borderRadius:5,padding:10 ,alignItems:"center"}} onPress={()=>{setModalVisible(true)}}>
                    <View style={styles.slikatext}>
                   {theme=="light"? <Image style={styles.tinyLogo} source={require("../assets/logout.png")}/> : <Image style={styles.tinyLogo} source={require("../assets/logout-dark.png")}/>}
                        <Text style={{color:theme=="light"?"black":"white",fontWeight:"bold"}}>ODJAVI SE</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={{margin:10,backgroundColor:theme=="light"?"white":"#28559a",borderRadius:5,padding:10,alignItems:"center"}} onPress={()=>openLink("https://buy.stripe.com/14kbL89QM5nX3Go144")}>
                    <View style={styles.slikatext}>
                   {theme=="light"? <Image style={styles.tinyLogo} source={require("../assets/money.png")}/> : <Image style={styles.tinyLogo} source={require("../assets/money-dark.png")}/>}
                        <Text style={{color:theme=="light"?"black":"white",fontWeight:"bold"}}>POMOZI DEVELOPERU :)</Text>
                    </View>
                </TouchableOpacity>

                { theme=="light" && <TouchableOpacity style={{margin:10,backgroundColor:theme=="light"?"white":"#28559a",borderRadius:5,padding:10,alignItems:"center"}} onPress={()=>{ dispatch(darkmode())}}>
               {theme==="light" && <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo} source={require("../assets/light.png")}/> 
                        <Text style={{color:theme=="light"?"black":"white",fontWeight:"bold"}}>LIGHT MODE</Text>
                     </View>}
                    </TouchableOpacity>}
                  { theme=="dark" && <TouchableOpacity style={{margin:10,backgroundColor:theme=="light"?"white":"#28559a",borderRadius:5,padding:10,alignItems:"center"}} onPress={()=>{ dispatch(lightmode())}}>
                   {theme==="dark" && <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo} source={require("../assets/night-mode.png")}/> 
                        <Text style={{color:theme=="light"?"black":"white",fontWeight:"bold"}}>DARK MODE</Text>
                    </View>}
                    </TouchableOpacity>}

                
                <Modal visible={modalVisible} animationType="slide"  transparent={true}>
                    <View style={{width:"100%",height:"100%"   }}>
                        <TouchableOpacity style={{height:"80%"}} onPress={()=>setModalVisible(false)}>
                        <View style={{height:"80%"}}></View>
                        </TouchableOpacity>
                        <View style={{height:"20%",justifyContent:"center",alignItems:"center", borderTopLeftRadius:50,borderTopRightRadius:50,borderWidth:3,borderColor:theme=="light" ? "black":"white" }}>
                           
                                <View style={{alignItems:"center"}}>
                                    <Text style={{fontWeight:"bold",color:theme=="light" ? "black":"white" }}>JESI SIGURAN?</Text>
                                    <View style={{justifyContent:"center",flexDirection:"row",margin:20}}>
                                    <TouchableOpacity onPress={()=>odjava()}>
                                        <View style={{backgroundColor:"white",width:50,height:30,alignItems:"center",justifyContent:"center",margin:10,borderRadius:5}}>
                                            <Text style={{fontWeight:"bold"}}>DA</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                         <View style={{backgroundColor:"white",width:50,height:30,alignItems:"center",justifyContent:"center",margin:10,borderRadius:5}}>

                                            <Text style={{fontWeight:"bold"}}>NE</Text>
                                        </View>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                          
                        </View>
                    </View>
                </Modal>
               
              

            </View>
            

  

        
  

    </View>


      
    )
  
   }


const styles = StyleSheet.create({

    slikatext:{
        flexDirection:"row",
        alignItems:"center",
        margin:5
    },

    container:{
        height:"100%",
        width:"100%",
        backgroundColor:"lightblue",
        alignItems:"center",
        justifyContent:"center"
    },
    header:{
        width:"100%",
        height:"21%",
        flexDirection:"row",
        borderBottomColor:"white",
        borderBottomWidth:3,
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100
        
        
        
        
    },
    back:{
        width:"10%",
      
        height:"100%",
        alignItems:"flex-end",
        justifyContent:"center"
    },
    other: {
        width:"100%",
        height:"100%",
       
        alignItems:"center",
        justifyContent:"flex-end",
        
    },
    tinyLogo:{
        width:30,
        height:30,
        marginRight:2
    },
    odabran:{
        backgroundColor:"#D5E7FD",
        margin:"2%",
        borderRadius:5,
        padding:10
    
    },
    neodabran:{
        backgroundColor:"white",
        margin:"2%",
        borderRadius:5,
        padding:10
    
    },
    feed:{
        backgroundColor:"#e7f2ff",
        width:"100%",
        
    },
    actualFeed:{
        justifyContent:"center",
        alignItems:"center",
        padding:10
        
        
  
    },
    headerText:{
        fontWeight:"bold",
        color:"black",
        marginLeft:10
    },
    friends:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    box:{
        width:Dimensions.get("window").width/1.2,
        height:Dimensions.get("window").height/4,
        backgroundColor:"#D5E7FD",
        borderColor:"black",
        borderWidth:0,
        borderRadius:10,
        marginVertical:10,
        
        justifyContent:"center",
        alignItems:"center"
    },
    detalji:{
        borderColor:"#F5F5F5",
        borderWidth:1,
        width:140,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F5F5FF",
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        height:20
        
        
  
        
    },
    boxText:{
        margin:5
    },
    naslov:{
      justifyContent:"center",
      margin:20,
      
    },
    both:{
        flexDirection:"row",
        marginTop:10,
        
        width:Dimensions.get("window").width/1.2,
        
    },
    gumb:{
      flexDirection:"row",
      marginTop:10,
      
      width:Dimensions.get("window").width/1.2,
      justifyContent:"center",
     
    }
  ,
  
  pola:{
      
      width:"50%"
  },
  frendovi:{
      justifyContent:"center",
     
      alignItems:"center"
      
    

  },
  frend:{
      justifyContent:"center",
      alignItems:"center",
      width:"70%",
      
      margin:5,
      height:25,
      flexDirection:"row"
  }
 

});

