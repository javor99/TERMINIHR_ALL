import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Contacts from 'expo-contacts';
import Welcome from './Welcome';
import {URL} from "@env"
//SUTRA DODAJ BR TELEFONA U BAZU , OSIGURAJ DA USER REG RADI(ISTI MAILOVI ERROR...), POKAZI MU TKO OD NJEGOVIH BROJEVA KORSITI APP



export default function Complete2({navigation}) { 

    const[kontakti,setKontakti]=useState([])
      const[dodo,setDodo] = useState([])
      const[email,setEmail]= useState("")

      async function welcome() { 

        await AsyncStorage.setItem("@LOGGEDIN","TRUE")
        navigation.navigate("Home") 


      }
    

    useEffect(() => {
        
    try{

        (async () => {
                
      let newDodo=[]  
    
      newDodo.push(false)
      console.log(newDodo) 
      setKontakti([])
      setDodo(newDodo)
          const { status } = await Contacts.requestPermissionsAsync();
          if (status === 'granted') {
            AsyncStorage.getItem("@EMAIL",(err,res)=>setEmail(res))
            const { data } = await Contacts.getContactsAsync({
              fields: [Contacts.Fields.PhoneNumbers],
        
            });
      
            if (data.length > 0) {
                console.log(data[0].phoneNumbers[0].digits)
                console.log(data[1].phoneNumbers[0].digits)
              
              
                for(let i =0;i<data.length;i++) {
                  if(data[0].phoneNumbers[0].digits){
                        if(data[i].phoneNumbers) {
                    if(data[i].phoneNumbers[0].digits.startsWith("+385")){
                        //console.log("0"+data[i].phoneNumbers[0].digits.substring(4))
                        vidiJelIma("0"+data[i].phoneNumbers[0].digits.substring(4))
                    }
                     
                    else {
                          //console.log(data[i].phoneNumbers[0].digits)
                          vidiJelIma(data[i].phoneNumbers[0].digits)
                      
                    }
                    
                } }
            } 
                
            }
          }
        })()
      }
      catch(err){
        console.log("bmk")

      };
      }, []);

       
      async function vidiJelIma(broj) {
        try{
          fetch(URL+"/userSaBrojem/"+broj).then(res=>{return res.json()}).then(data=>{
            if(data.ime){
              console.log(data.ime)
              
            setKontakti((kontakti)=>[...kontakti,{"ime":data.ime,"prezime":data.prezime,"id":data.userid}])}
          })
        }

        catch(err) {

        }
          

      }  
        
          
    async function saljiZahtjev(br) {
      try{
      console.log(dodo)
      let id=kontakti[br].id
      fetch(URL+"/dodajFrenda",{method:"POST",
      headers: {
        'Content-Type': 'application/json'},
        body:JSON.stringify({email,"userid":id})
    
    })
      let newDodo=[...dodo]
      newDodo[br]=true
      
      setDodo(newDodo)}

      catch(error) {

      }
      

    }
     

      
   

  return (
    <View style={styles.container}>
        <View style={styles.pola}>
          <View style={styles.frend}>
        <Text style={{fontSize:20}}>DODAJ PRIJATELJE KOJI VEC KORISTE APLIKACIJU</Text>
        </View>
        <ScrollView style={styles.scroll}>
    <View style={styles.contacts}>
      
    {kontakti.length>0 ? kontakti.map((kontakt,index) => {
        return (
          <View style={styles.frend} key={index.toString()}>
            <Text style={{fontSize:20}}>{kontakt.ime} {kontakt.prezime}</Text>
            <TouchableOpacity onPress={()=>saljiZahtjev(index)}>
            {!dodo[index] && <Image  style={styles.tinyLogo} source={require("../assets/add.png")}/> }
            
            </TouchableOpacity>
            {dodo[index] && <Image  style={styles.tinyLogo} source={require("../assets/done.png")}/> }
          </View>
        );
      }) : <Text style={{justifyContent:"center",alignItems:"center",fontSize:17,marginTop:"50%"}}>Nitko od tvojih prijatelja ne koristi aplikaciju :(</Text>}
    </View>
        </ScrollView>
        <TouchableOpacity onPress={()=>{welcome()}}>
        <View style={styles.zavrsi}>
          <Text style={{fontSize:20}}>ZAVRŠI</Text>
        </View>
      </TouchableOpacity>
      
      </View>
     
      
    </View>
      

      
    
  )
   }


const styles = StyleSheet.create({
  frend:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    margin:10,
    
    
  },
  container: {
      backgroundColor:"lightblue",
    flex: 1,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width:30,
    height:30,
    marginLeft:10
    
  },
box :{
      
      flexDirection:"row",
      borderWidth:1,
      borderRadius:8,
      borderColor:"black",
      padding:8,
      justifyContent:'center',
      alignItems:"center",
      margin:15,
      width:300,
      color:"black",
      fontSize:20,
     
      

  },
  x:{
      width:30,
      height:30,
      marginLeft:10

  },
  sportovi:{
      flexDirection:"row",
      justifyContent:"center",
      alignItems:"center",
      margin:10,
      backgroundColor:"lightblue",
      borderRadius:7,
      height:40,
      width:200,
      borderColor:"black",
      borderWidth:1
      
  },
  text:{
    fontSize:20,
    color:"black",
    fontWeight:"300"
    
  },
  pola:{
      height:"90%",
      
      marginTop:0,
     
      width:"88%",
      justifyContent:"center",
      alignItems:"center"
      
      
  },
  pola2:{
    height:"50%",
    marginTop:0,

    
    
},
cool:{
    fontSize:20,
    fontWeight:"300",

    color:"black",
    
},
zavrsi:{

  justifyContent:"center",
  alignItems:"center",
  margin:10,
  backgroundColor:"white",
  borderRadius:7,
  height:50,
  width:Dimensions.get("window").width/1.3,
  borderColor:"white",
  borderWidth:1
  
},
scroll:{
    backgroundColor:"white",
    maxHeight:"50%",
    width:"80%",
    marginTop:20,
    borderColor:"white",
    borderWidth:1,
    borderRadius:20,
    marginBottom:"7%"
    
},
contacts:{
    justifyContent:"center",
    alignItems:"center",
   
}

});

