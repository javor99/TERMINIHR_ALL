import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity,ScrollView} from 'react-native';
import {Dimensions} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from "@env"
import { useSelector } from 'react-redux';
import DetaljiBox from '../components/DetaljiBox';

//SUTRA DODAJ BR TELEFONA U BAZU , OSIGURAJ DA USER REG RADI(ISTI MAILOVI ERROR...), POKAZI MU TKO OD NJEGOVIH BROJEVA KORSITI APP


 

  

export default function Complete({navigation}) {

    const[sudjelujem,setSudjelujem] = useState(true)
    const [eventiSudj,setEventiSudj] = useState([])
    const [eventiOrg,setEventiOrg] = useState([])
    const theme=useSelector(state=>state.theme) 
 
    useEffect(()=>{
        AsyncStorage.getItem("@EMAIL",(err,res)=>fetchaj(res))  
    },[]) 


    async function fetchaj(email) {
        fetch(URL+"/terminiUKojimaSamSudjelovao/"+email).then(res=>res.json()).then(data=>setEventiSudj(data))
        fetch(URL+"/terminiKojeOrganiziramProsli/"+email).then(res=>res.json()).then(data=>setEventiOrg(data))
    }


    return(
        <View style={{   height:"100%",
        width:"100%",
        backgroundColor:theme=="light"?"lightblue":"black"}}>

    <View style={styles.header}>
        
        <View style={styles.other}>
            <TouchableOpacity style={{width:50,alignItems:"center"}} onPress={()=>{navigation.navigate("Termini")}}>
        <Image style={styles.tinyLogo} source={require("../assets/back.png")}/>
        </TouchableOpacity>
            
            <TouchableOpacity onPress={()=>{setSudjelujem(true)}}>
            <View style={sudjelujem ? {backgroundColor:theme=="dark"?"#3175bd":"#71b6ff",
        margin:"2%", 
        borderRadius:5, 
        padding:10} : styles.neodabran}>
                    <Text style={{fontWeight:"bold"}}>TERMINI U KOJIMA SAM SUDJELOVAO</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{setSudjelujem(false)}}>
            <View style={!sudjelujem ? {backgroundColor:theme=="dark"?"#3175bd":"#71b6ff",
        margin:"2%",
        borderRadius:5,
        padding:10} : styles.neodabran}>
                    <Text style={{fontWeight:"bold"}}>TERMINI KOJE SAM ORGANIZIRAO</Text>
                </View>
            </TouchableOpacity>
        </View>

    </View>

    
    <ScrollView style={{  backgroundColor:theme=="light"?"#e7f2ff":"#19416b",
        width:"100%",
        }}>
 {!sudjelujem && <View style={styles.actualFeed}>
     

                
 {eventiOrg.map((dog)=>{return <DetaljiBox key={dog.eventid} navigation={navigation} dog={dog} vrsta="pov"/> })}
                    
                
                </View>}
 

  


                {sudjelujem && <View style={styles.actualFeed}>
                

                
                {eventiSudj.map((dog)=>{return <DetaljiBox key={dog.eventid} navigation={navigation} dog={dog} vrsta="pov"/> })}
                    
                
                </View>}

                
            </ScrollView>

        
  

    </View>


      
    )
  
   }


const styles = StyleSheet.create({

    container:{
        height:"100%",
        width:"100%",
        backgroundColor:"lightblue"
    },
    header:{
        width:"100%",
        height:"21%",
        flexDirection:"row",
        borderBottomColor:"white",
        borderBottomWidth:3,
        borderBottomLeftRadius:100,
        borderBottomRightRadius:100,
        marginTop: Platform.OS=="android" ? 30: 0
        
        
        
        
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
        height:30
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
  
        
       
    },
    detalji:{
          backgroundColor:"white",
         height:"80%",
         width:"60%",
         marginLeft:"20%",
         marginTop:"2%",
         borderTopLeftRadius:10,
         borderTopRightRadius:10,
         justifyContent:"center",
         alignItems:"center"
         
      
        
        
        
  
        
    },
    boxText:{
        margin:5
    },
    naslov:{
      flexDirection:"row",
      padding:5,
      
      width:Dimensions.get("window").width/1.2,
      justifyContent:"center",
      height:"15%",
     
    },
    both:{
        flexDirection:"row",
        marginTop:10,
      
        
        width:Dimensions.get("window").width/1.2,
        
    },
    gumb:{
     
      
      height:"15%",
     
      
      width:Dimensions.get("window").width/1.2,
     
      
      
      
  
      
      
      
     
    },
    pola:{
        width:"50%",
        height:"100%",
        paddingLeft:10
       
  },
  pola2:{
      width:"50%",
      height:"100%",
      
      alignItems:"center",
      justifyContent:"center"
  },
  ostalo:{
      width:"100%",
      flexDirection:"row",
      height:"70%"
  }
   
 

});

