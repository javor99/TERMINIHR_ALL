 
import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity,Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {URL} from "@env"
import { useDispatch, useSelector } from "react-redux";

import { Dimensions } from "react-native";
import { NEWEdit } from "../redux/actions";

const EmailForm = ({ navigation }) => {
  
    const dispatch=useDispatch() 
    const[opis,setOpis] = useState("")
    const theme=useSelector(state=>state.theme)

  useEffect(()=>{ 

    console.log(navigation.state.params.opis)
    console.log(navigation.state.params.eventid)
    console.log(navigation.state.params.id)
    setOpis(navigation.state.params.opis)
    
  },[])     

  
  async function promijeniOpis() {
    var eventid=navigation.state.params.eventid
    fetch(URL+"/editOpis",{method:"POST", body:JSON.stringify({eventid,opis}) ,headers: {
      'Content-Type': 'application/json'
      
    }})
    dispatch(NEWEdit())

    

    navigation.navigate("DetaljiOrg",{"id":navigation.state.params.eventid})

  }
 

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme=="light"?"lightblue":"#0f2557",
    }}>
       <TouchableOpacity style={{width:50,alignItems:"center",marginBottom:10}} onPress={()=>{navigation.navigate("DetaljiOrg",{"id":navigation.state.params.eventid})}}>
        <Image style={styles.tinyLogo} source={require("../assets/back.png")}/>
        </TouchableOpacity>
        <TextInput
        editable
        multiline
        numberOfLines={4}
        maxLength={300}
        value={opis}
        onChangeText={(opis=>setOpis(opis))}
        
        style={styles.opis}
      />

      <TouchableOpacity style={styles.buttonContainer} onPress={()=>promijeniOpis()}>
        <Text style={styles.buttonText}>POTVRDI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'lightblue',
  },
  label: {
    fontSize: 25,
    marginBottom: 10,
    marginTop:10,
    color:"black",
    fontWeight:"200",
    
    marginBottom:30

  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    color:"black",
    
  },
  buttonContainer: {
    marginTop:20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
    borderColor:"white",
    borderWidth:2,
    width:"50%",
    borderWidth:1,
    marginBottom:150,
  }, 
  buttonText: {
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    fontSize:18,
    fontWeight:"bold"
  },
  tinyLogo:{
      height:30,
      width:30, 
    
  },
  opis :{
      
      
    borderWidth:1,
    borderRadius:5,
    borderColor:"black",
    
    backgroundColor:"white",
    width:300,
    height:150,
    alignItems:"flex-start",
    justifyContent:"flex-start",
    padding:8
    

},
});

export default EmailForm;
