import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity,ScrollView} from 'react-native';
import {Dimensions} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { TextInput } from 'react-native-gesture-handler';
import {URL} from "@env"
import { useSelector } from 'react-redux';

 


export default function Start({navigation}) {
    const[email,setEmail] = useState("")
    const[frendovi,setFrendovi]= useState([])
    const[obavijest,setObavijest] = useState([])
    const [search,setSearch]=useState("")
    const theme=useSelector(state=>state.theme)
    const[searchRes,setSearchRes]=useState([])


  async function fetchFrendovi(){
    AsyncStorage.getItem("@EMAIL",(err,res)=>{fetchaj(res);console.log(res)})
       
       

  }

   function obavijestiDodo(name,surname) {

    setObavijest(name+" "+ surname +" i ti ste sada prijatelji!")
    setTimeout(()=>{setObavijest("")},1000)
     

   }

   function obavijestiMako() {
    setObavijest("Zahtjev obrisan")
    setTimeout(()=>{setObavijest("")},1000)


   }

  async function fetchaj(emailProp) {
      setEmail(emailProp)
      console.log(emailProp)
    fetch(URL+"/userReqs/"+emailProp).then(res=>res.json()).then(data=>{setFrendovi(data);console.log(data);setSearchRes(data)})


  }
  //sut , ovo je prihvati frenda zahtjev
  async function DodajGa(friendshipid,name,surname) {
    obavijestiDodo(name,surname)
    setFrendovi(frendovi.filter(frend=>frend.friendshipid!=friendshipid))
    setSearchRes(frendovi.filter(frend=>frend.friendshipid!=friendshipid))
    fetch(URL+"/potvrdiFrenda",{method:"POST",body:JSON.stringify({email,friendshipid}),headers: {
      'Content-Type': 'application/json'
      
    }
   
   
  })  
}  

 async function  MakniReq(friendshipid) {
   obavijestiMako()
  setFrendovi(frendovi.filter(frend=>frend.friendshipid!=friendshipid))
  setSearchRes(frendovi.filter(frend=>frend.friendshipid!=friendshipid))
   console.log("maknireq")
  fetch(URL+"/makniReq",{method:"POST",body:JSON.stringify({email,friendshipid}),headers: {
    'Content-Type': 'application/json'
    
  }


})




 }

 
  
  

  useEffect(()=>{
      fetchFrendovi()
    

  },[])
  
  function searchFunc() {
    if(search=="")
      setSearchRes(frendovi)
    
    else{
      if(search.trim().split(" ").length==1){
        setSearchRes(frendovi.filter(frend=>frend.ime.startsWith(search) || frend.prezime.startsWith(search)))
      
      }
      else {
        console.log(search.split(" ")[1])
        setSearchRes(frendovi.filter(frend=>{
          
          for(let i=0;i<search.split(" ").length;i++){
            if(frend.ime.startsWith(search.split(" ")[i]) || frend.prezime.startsWith(search.split(" ")[i]) )
              return true
          }
  
          return false
  
  
        }))
      }
    }
  
  }  

  
 
   

  return (
    <View style={{ flexDirection:'column',
    backgroundColor: theme=="light" ? "lightblue" : "#0f2557",
    alignItems:"center",
    justifyContent:"center",
    height:"100%"}}>
        <View style={styles.obavijest}>

{obavijest.length>0 ? <Text style={{color:"green"}}> {obavijest}</Text> : null}

</View>
    <TouchableOpacity onPress={()=>navigation.navigate("Prijatelji")}>
        <Image style={styles.tinyLogo} source={require("../assets/back.png")}/>
        </TouchableOpacity>

        <View style={styles.search}>
        <TextInput style={{  width:Dimensions.get("window").width/1.2,
       borderColor: theme=="light"?"black":"white",
      borderWidth:theme=="light"?1:2,
      height:33,
      fontSize:20,
    color:theme=="dark"?"white":"black"}}  value={search}
        onChangeText={search => setSearch(search)}/>
        <TouchableOpacity onPress={()=>searchFunc()}>
        { theme=="light" && <Image  style={styles.tinyLogo} source={require("../assets/search.png")}/>}
       {theme=="dark" && <Image  style={styles.tinyLogo} source={require("../assets/search-dark.png")}/>}
        </TouchableOpacity>
        </View>
 
    <ScrollView style={{maxHeight:"50%",backgroundColor:theme=="light"?"#e7f2ff":"#28559a",width:"80%",marginTop:20,borderColor:"gray",borderWidth:1,borderRadius:5}}>
        <View style={{height:300}}>
        {frendovi.length>0 ? searchRes.map((frend,index) => {
        return (
          <View style={styles.frend} key={frend.ime+frend.prezime}>
            <Text style={{fontSize:20,color:theme=="dark"?"white":"black"}}>{frend.ime} {frend.prezime}</Text>
            <TouchableOpacity onPress={()=>DodajGa(frend.friendshipid,frend.ime,frend.prezime)}>
           { theme=="light" &&<Image  style={styles.tinyLogo} source={require("../assets/done.png")}/>}
           {theme=="dark"&& <Image  style={styles.tinyLogo} source={require("../assets/green-done.png")}/>}

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>MakniReq(frend.friendshipid)}>
          {theme=="light" &&  <Image  style={styles.tinyLogo} source={require("../assets/close.png")}/>}
          {theme=="dark" &&  <Image  style={styles.tinyLogo2} source={require("../assets/no.png")}/>}

            </TouchableOpacity>
           
          </View>
        );
      }) : <View style={{justifyContent:"center",alignItems:"center",}}><Text style={{fontSize:17,marginTop:"50%",color:theme=="dark"?"white":"black"}}>Nemas zahtjeva za prijateljstvo</Text></View>}

        </View>
    </ScrollView>
        
       
   
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    backgroundColor: 'lightblue',
    alignItems:"center",
    justifyContent:"center",
    height:"100%"

  },
  tinyLogo: {
    width:40,
    height:40,
    marginLeft:2
  },
 
  frend:{
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    marginTop:5
  }
  ,
  search:{
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"row",
      marginTop:20,
     
      
  },
  searchbar:{
      width:Dimensions.get("window").width/1.2,
      borderColor:"back",
      borderWidth:1,
      height:33,
      fontSize:20
  },
  obavijest: {
    height:20,
    width:"100%",
    alignItems:"center",
    justifyContent:"center",
   
    
    },
    tinyLogo2:{
      width:25,
      height:25,
      marginLeft:8
    }

});

