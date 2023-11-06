import { StatusBar } from 'expo-status-bar';
import { RefreshControl, StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity,Platform} from 'react-native';
import {Dimensions} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {URL} from "@env"
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import DetaljiBox from '../components/DetaljiBox';
import ResponsiveImage from 'react-native-responsive-image';







export default function Home({navigation}) {
  
    const theme = useSelector(state=>state.theme)
    const ruta = useSelector(state=>state.ruta)
    const [email,setEmail] = useState();
    const[eventi,setEventi]= useState([])
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
          console.log("MOJ EMAIL JE "+email)
          AsyncStorage.getItem("@EMAIL",(err,res)=>{fetchajFeed(res)})
          setRefreshing(false);
        }, 2000);
      }, []);
       
     
  
    
     

 

    useEffect(()=>{
        vidi()

           
                   
      console.log("kricna")
      console.log(URL)
        
     
    
      },[])


    useEffect(()=>{
      vidi()
       
                 
    console.log("kricna from theme")

      
   
  
    },[ruta])
    
      async function vidi() {
        
       // AsyncStorage.getItem("@LOGIN").then((res,err)=>{if(res==="true") navigation.navigate("Home")})
       AsyncStorage.getItem("@EMAIL",(err,res)=>{fetchajFeed(res);setEmail(res);console.log("MOJ EMAIL JE "+ res)})
      

       
      }
     
    
   async function fetchajFeed(email) { 

    console.log("FETCHAM FFED ZA MAIL "+email)

fetch(URL+"/feed/"+email).then(res=>res.json()).then(data=>{setEventi(data);console.log(data)})
   }

  return (
    <View style={ {flex: 1, backgroundColor: theme=="light" ? "white":'black',alignItems: 'center', justifyContent: 'center',}}>
        <View style={styles.header}>
          
        <TouchableOpacity onPress={()=>{navigation.navigate("Prijatelji")}}>
            <View style={styles.friends}> 
            {theme=="light" ? <ResponsiveImage style={styles.tinyLogo} initHeight="30" initWidth="30" source={require("../assets/friends.png")}/> : <ResponsiveImage initHeight="30" initWidth="30" style={styles.tinyLogo} source={require("../assets/friend.png")}/>  }
            
            <Text style={{fontWeight:"bold", color: theme=="light"?  "black" : "white",marginLeft:"2%"}}>PRIJATELJI</Text>
            
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{navigation.navigate("Termini")}}>
            <View style={styles.friends}>
            {theme=="light" ? <ResponsiveImage initHeight={30} initWidth="30" style={styles.tinyLogo} source={require("../assets/calendar.png")}/> : <ResponsiveImage initHeight={30} initWidth="30" style={styles.tinyLogo} source={require("../assets/schedule.png")}/>  }
                <Text style={{fontWeight:"bold", color: theme=="light"?  "black" : "white",marginLeft:"2%"}}>TERMINI</Text>
             
             </View>
             </TouchableOpacity>

            <TouchableOpacity  onPress={()=>{navigation.navigate("Postavke")}}>
            <View style={styles.friends}> 
           {theme=="light" ? <ResponsiveImage initHeight={30} initWidth="30" style={styles.tinyLogo} source={require("../assets/options.png")}/> : <ResponsiveImage initHeight={30} initWidth="30" style={styles.tinyLogo} source={require("../assets/postavke-dark.png")}/>  }
            <Text style={{fontWeight:"bold", color: theme=="light"?  "black" : "white",marginLeft:"2%"}}>POSTAVKE</Text>
            
            </View>
            </TouchableOpacity>

            </View>  
             
              
            
            <ScrollView style={ {backgroundColor:theme=="light" ? "#e7f2ff" : "#0f2557", width:"100%"}}  refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme=="light"? "black":"white"}/>
        } >
                <View style={styles.actualFeed}>
                  {eventi.length==0 && <View style={{justifyContent:"center",height:Dimensions.get("window").height/2,width:Dimensions.get("window").width,alignItems:"center"}}>
                  <ResponsiveImage source={require("../assets/baby_Yoda.png")}  initWidth="184" initHeight="160"/>
                  <View style={{padding:10}}>
                    <Text style={{color: theme=="light"? "black" :"white",fontSize:15,marginTop:10}}>Pojavio se misteriozni Baby Yoda! On iščekuje nove termine s tobom...</Text>
                    </View>
                    </View>}

                    
                {eventi.map((dog)=>{return <DetaljiBox key={dog.eventid} navigation={navigation} dog={dog} vrsta="home"/> })}
                
                </View>
            </ScrollView>

       
      
 
      

    </View>
  );
}

const styles = StyleSheet.create({
  baby:{
    width: Dimensions.get("window").width/1.2,
    height:Dimensions.get("window").height/3
  },
  babyAndroid:{
    width: Dimensions.get("window").width/1.2,
    height:Dimensions.get("window").height/3
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  }, 

    
  header :{  
      width:"100%",
      height:"13%",
      borderBottomColor:"white", 
      borderBottomWidth:2,
      flexDirection:"row",
      paddingBottom:"3%",
      paddingHorizontal:"4%",
      justifyContent:"space-between",
      alignItems:"flex-end"
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

