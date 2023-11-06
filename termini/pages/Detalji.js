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

import { checkPermission } from 'react-native-contacts';
import { darkmode,lightmode,NEW } from '../redux/actions';
import { useDispatch,useSelector } from 'react-redux';
//SUTRA DODAJ BR TELEFONA U BAZU , OSIGURAJ DA USER REG RADI(ISTI MAILOVI ERROR...), POKAZI MU TKO OD NJEGOVIH BROJEVA KORSITI APP



 


export default function Complete({navigation}) {

  
    const dispatch=useDispatch()
    const [pridruzen,setPridruzen] = useState(false)
    const theme = useSelector(state=>state.theme)
    const [eventInfo,setEventInfo] = useState({})
    const [sudionici,setSudionici] = useState([])
    

    useEffect(()=>{
        console.log("PARAMETRI");
        console.log(navigation.state.params)
        fetchaj(navigation.state.params.id)
     
    },[])

    async function fetchaj(id) {
        fetch(URL+"/detalji/"+id+"/"+navigation.state.params.email).then(res=>res.json()).then(data=>{setSudionici(data.sudionici);console.log(data.sudionici);setEventInfo(data.eventInfo);checkPridruzen(data.sudionici)})
        
    }

    function checkPridruzen(suds) {
        if(suds.filter((s)=>s.email==navigation.state.params.email).length>0){
            setPridruzen(true)
            setSudionici(suds.filter((s)=>s.email!=navigation.state.params.email))
        }
            
            
    }

    async function gumb(){ 
        if(pridruzen){
            console.log(navigation.state.params.email)
            setPridruzen(false)
            setEventInfo({...eventInfo,"br":parseInt(eventInfo.br)-1}) 
            await fetch(URL+"/unJoinEvent",{method:"POST",body:JSON.stringify({"email":navigation.state.params.email,"id":eventInfo.eventid}),headers: {
                'Content-Type': 'application/json'
                
              }
            
            
            })
            
           
        }



        else{
            setPridruzen(true)
            setEventInfo({...eventInfo,"br":parseInt(eventInfo.br)+1})
            console.log(eventInfo)
            await fetch(URL+"/joinEvent",{method:"POST",body:JSON.stringify({"email":navigation.state.params.email,"id":eventInfo.eventid}),headers: {
                'Content-Type': 'application/json'
                
              }
            
            
            })
           
        }

    }
 
    async function posaljiZahtjev(userid) {
        
        setSudionici(sudionici.map(s=>s.userid===userid ? {...s,"pending":"true"}:s))

        fetch(URL+"/dodajFrenda",{method:"POST",body:JSON.stringify({"email":navigation.state.params.email,userid}),headers: {
            'Content-Type': 'application/json'
            
          }
        
        
        })
    }
   

    return(
    <View style={{ height:"100%",
    width:"100%", 
    backgroundColor:theme=="light"?"lightblue":"#0f2557",
    alignItems:"center",
    paddingVertical:30,
    justifyContent:"center"}}>
        <TouchableOpacity onPress={()=>{navigation.navigate("Home");dispatch(NEW())}}>
         <Image style={styles.back} source={require("../assets/back.png")}/> 
         </TouchableOpacity>
         <View style={{width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row"}}> 
              <Image style={styles.tinyLogo} source={require("../assets/city.png")}/> 
            <Text style={{fontSize:20,color:theme=="light"?"black":"white",fontWeight:theme=="light"?"":"bold",textTransform:"uppercase"}}> {eventInfo.grad} </Text>
            </View>        
            <View style={styles.naslov}>
                <Text style={{fontSize:18 ,color:theme=="light"?"black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.sport}</Text>
                </View>
            <View style={{flexDirection:"row",justifyContent:"center",width:"80%",backgroundColor:theme=="light"?"white":"#28559a",borderRadius:5,padding:3}}>
                <View style={styles.pola}> 
                    <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo} source={require("../assets/when.png")}/> 
                    <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.vrijeme}</Text>
                    </View> 
                    <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo} source={require("../assets/where.png")}/> 
                    <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.mjesto}</Text>
                    </View> 
                    <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo} source={require("../assets/event.png")}/> 
                   {eventInfo.datum && <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.datum.split(",")[0].split("/")[1]+"."+eventInfo.datum.split(",")[0].split("/")[0]+"."+eventInfo.datum.split(",")[0].split("/")[2]}</Text>}
                    </View>
                </View>
                <View style={styles.pola}>
                <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo2} source={require("../assets/organizer.png")}/> 
                    <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.ime+" "+eventInfo.prezime}</Text>
                    </View>
                    <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo2} source={require("../assets/ljudi.png")}/> 
                    <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.br+"/"+eventInfo.kolkoljudi}</Text>
                    </View>
                    {eventInfo.tip=="privatni" ?  <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo2} source={require("../assets/private.png")}/> 
                    <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.tip}</Text>
                    </View>:null}
                    {eventInfo.tip=="javni" ?  <View style={styles.slikatext}>
                    <Image style={styles.tinyLogo2} source={require("../assets/public.png")}/> 
                    <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{eventInfo.tip}</Text>
                    </View>:null}
                </View>

            </View>
            <Text style={{color:theme=="light" ? "black":"white",marginTop:"3%",fontSize:18,fontWeight:theme=="light"?"":"bold"}}>SUDIONICI</Text>
            <ScrollView style={{maxHeight:"20%",backgroundColor:theme=="light"?"white":"#28559a",width:"80%",marginTop:"3%",borderColor:"gray",borderWidth:1,borderRadius:5}}>
                
                <View style={styles.frendovi}>
                
                    {sudionici.map((kompa)=>{return <View style={styles.frend} key={kompa.userid}>
                        {kompa.frend=="true" && theme=="dark" && <Image style={styles.tinyLogo} source={require("../assets/frendovi.png")}/> }
                        {kompa.frend=="true" && theme=="light" && <Image style={styles.tinyLogo} source={require("../assets/frendovi-light.png")}/> }
                        <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>{kompa.ime+" "+kompa.prezime}</Text>
                        {kompa.frend==="false" && kompa.pending!="true"&& theme=="light" ?<TouchableOpacity onPress={()=>{posaljiZahtjev(kompa.userid)}}><Image style={styles.tinyLogo} source={require("../assets/add.png")}/></TouchableOpacity>   : null}
                        {kompa.frend==="false" && kompa.pending!="true"&& theme=="dark" ?<TouchableOpacity onPress={()=>{posaljiZahtjev(kompa.userid)}}><Image style={styles.tinyLogo} source={require("../assets/add-dark.png")}/></TouchableOpacity>   : null}
                        {kompa.frend==="false" && kompa.pending=="true" ?<Text style={{color:theme=="light" ? "black":"white",fontSize:10}}> ZAHTJEV POSLAN</Text>: null} 
                         </View>})}

                    {pridruzen && <View style={styles.frend}>
                    {theme=="light" && <Image style={styles.tinyLogo} source={require("../assets/ja.png")}/>}
                        {theme=="dark" && <Image style={styles.tinyLogo} source={require("../assets/ja-dark.png")}/>}
                        <Text style={{color:theme=="light" ? "black":"white",fontWeight:theme=="light"?"":"bold"}}>JA</Text>
                        
                        </View>}
                </View>
            </ScrollView>
            <Text style={{color:theme=="light" ? "black":"white",marginTop:"2%",fontSize:18,fontWeight:theme=="light"?"":"bold"}}>OPIS</Text>
            <ScrollView
  style={{
    height: Dimensions.get('window').height/1000, // 20% of the screen height
    width: Dimensions.get('window').width * 0.8, // 80% of the screen width
    backgroundColor: theme == 'light' ? 'white' : '#28559a',
    marginTop: "2%",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight:100
  }}
>
  {/* Your ScrollView content goes here */}

            <View style={styles.opis}><Text style={{color:theme=="light" ? "black":"white"}}>{eventInfo.opis}</Text></View>
            </ScrollView>
            
            <TouchableOpacity onPress={()=>gumb()} style={{backgroundColor:theme=="light"?"white" : "#3778c2",marginTop:"5%",width:Dimensions.get("window").width/1.4,alignItems:"center",justifyContent:"center",padding:10,borderRadius:5}}>
               {!pridruzen && <Text style={{fontWeight:"bold",color:theme=="light" ? "black":"white"}}>PRIDRUŽI SE</Text>}
               {pridruzen && <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                   <Text style={{fontWeight:"bold",color:theme=="light" ? "black":"white"}}>PRIDRUŽEN</Text>
                   <Image style={styles.mark} source={require("../assets/green-done.png")}/> 
                   
                   </View>}
            </TouchableOpacity>
 
  
 
         
  

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
        marginRight:4
    },
    back:{
        width:30,
        height:30,
        
        marginBottom:10
    }, 
    tinyLogo2:{ 
        width:30,
        height:30,
        marginLeft:"10%"
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
      margin:7,
      
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
  info:{flexDirection:"row",justifyContent:"center",width:"80%",borderRadius:5,padding:3},
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
  },
  opis:{
      alignItems:"center",
      padding:4
  },
  mark:{
      width:18,
      height:12,
      marginLeft:5,
      marginBottom:3
  }
 

});

