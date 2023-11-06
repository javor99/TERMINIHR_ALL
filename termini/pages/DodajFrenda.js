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
    const[search,setSearch] = useState("")
    const[useri,setUseri]= useState([])
    const[obavijest,setObavijest]= useState("")
    const theme=useSelector(state=>state.theme)


  async function fetchFrendovi(){
    AsyncStorage.getItem("@EMAIL",(err,res)=>setEmail(res))
       
       

  }
 
  async function trazi() {
      
      console.log(search)
    fetch(URL+"/traziUsere/"+search+"/"+email).then(res=>res.json()).then(data=>setUseri(data))


  }

  async function Posalji(id) {
    obavijesti()
    setUseri(useri.map(s=>s.userid===id ? {...s,"pending":"true"}:s))
    fetch(URL+"/dodajFrenda",{method:"POST",body:JSON.stringify({email,"userid":id}),headers: {
      'Content-Type': 'application/json'
      
    }
  
  
  })
    
  }
  //sut , ovo je prihvati frenda zahtjev

  
  useEffect(()=>{
    fetchFrendovi()
  

},[])

function  obavijesti() {
  
 

  setObavijest("Zahtjev poslan")
  setTimeout(()=>{setObavijest("")},1000)

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
        <TouchableOpacity onPress={trazi}>
      { theme=="light" && <Image  style={styles.tinyLogo} source={require("../assets/search.png")}/>}
       {theme=="dark" && <Image  style={styles.tinyLogo} source={require("../assets/search-dark.png")}/>}
        </TouchableOpacity>
        </View>
        
 
    <ScrollView style={{maxHeight:"50%",backgroundColor:theme=="light"?"#e7f2ff":"#28559a",width:"80%",marginTop:20,borderColor:"gray",borderWidth:1,borderRadius:5}}>
        <View style={{height:300}}>
        {useri.length>0 ? useri.map((user,index) => {
        return (
          <View style={styles.frend} key={user.userid}>
            <Text style={{fontSize:20,color:theme=="dark"?"white":"black"}}>{user.ime} {user.prezime}</Text>
            {user.pending!="true" && user.friends!="true"&&<TouchableOpacity onPress={()=>Posalji(user.userid)}>
            <Image  style={styles.tinyLogo} source={require("../assets/add.png")}/>

            </TouchableOpacity>} 
 
            {user.pending=="true" && user.friends!="true"&&
           <Text style={{fontSize:8}}>  ZAHTJEV POSLAN</Text>
 
        }
 
{user.pending!="true" && user.friends=="true"&&
           <Image  style={styles.tinyLogo} source={require("../assets/frendovi-light.png")}/>

        } 

           
           
          </View>
        );
      }) : <Text style={{justifyContent:"center",alignItems:"center",fontSize:17,marginTop:"50%"}}></Text>}

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
    marginLeft:4
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
      borderColor:"black",
      borderWidth:1,
      height:33,
      fontSize:20
  },
  obavijest: {
    height:20,
    width:"50%",
    alignItems:"center",
    justifyContent:"center",
   
    
    }

});

