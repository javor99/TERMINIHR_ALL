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
const gradovi = ["ZAGREB","SPLIT","VARAĐDIN","VUKOVAR","OMIŠ"]


export default function Start({navigation}) {


    
  
  const sati=["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24"]
  const minute=["00","05","10","15","20","25","30","35","40","45","50","55"]
  const theme=useSelector(state=>state.theme)
  
  const[todayDate,setTodayDate]= useState("") 

  const[izabro,setIzabro]=useState(false)

  const[err,setErr]=useState(false)
 const[grad,setGrad]=useState("")
 const[dgra,setDgra]=useState("")
 const[mjesto,setMjesto]=useState("")
 const[datum,setDatum]=useState(mydate("date"))
 const[vrijeme,setVrijeme]=useState("18:20")
 const[sat,setSat]=useState("18")
 const [minuta,setMinuta]=useState("20")
    
useEffect(()=>{ 

  console.log(mydate("date")),setTodayDate(mydate("date"))},[])

  return (
    <View style={{ flexDirection:'column',
    backgroundColor: theme=="light" ? "lightblue" : "#0f2557",
    alignItems:"center",
    justifyContent:"center",
    height:"100%"}}>
    <TouchableOpacity onPress={()=>navigation.navigate("Termini")}>
        <Image style={styles.tinyLogo} source={require("../assets/back.png")}/>
        </TouchableOpacity>
        
        <ScrollView style={styles.scroll}>
            <View style={styles.scroll2}>
        <View>
            <Text style={{color:theme=="dark"?"white":"black"}}> GRAD</Text>
            <TextInput style={styles.input} value={grad}  onChangeText={grad=>{
              setGrad(grad)
              setIzabro(false)
              console.log(dgra)
             
              
              setDgra(gradovi.filter(gr=>gr.startsWith(grad.toUpperCase()))[0])
              }}/>
              
              {(grad.length>0 && !izabro && dgra!=undefined )? <TouchableOpacity onPress={()=>{console.log(dgra);setIzabro(true);setGrad(dgra)}}>
            <View style={{backgroundColor:"white",borderWidth:1,paddingLeft:10}}>
               <View>
                 <Text>{dgra}</Text>
                 </View>
              
            </View>
            </TouchableOpacity>:""}
           
        </View>

        <View style={{padding:10}}>
        <Text style={{color:theme=="dark"?"white":"black"}}> MJESTO</Text>
            <TextInput style={styles.input}  value={mjesto} onChangeText={mjesto=>setMjesto(mjesto)}/>
        </View>
        <View style={{padding:10,alignItems:"center"}}>
        <Text style={{color:theme=="dark"?"white":"black",marginBottom:10}}> VRIJEME</Text>
        <Text style={{color:theme=="dark"?"white":"black",margin:5}}> SATI</Text>
            <SelectDropdown
    buttonStyle={styles.box}
    rowTextStyle={{color:"black"}}
    buttonTextStyle={{color:"black"}}
    defaultButtonText={"18"}
    dropdownStyle={styles.box2}
	data={sati}
	onSelect={(selectedItem, index) => {
    setVrijeme(selectedItem+":"+minuta)
        setSat(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
<Text style={{color:theme=="dark"?"white":"black",margin:5}}> MINUTE</Text>
<SelectDropdown
    buttonStyle={styles.box}
    rowTextStyle={{color:"black"}}
    buttonTextStyle={{color:"black"}}
    defaultButtonText={"20"}
    dropdownStyle={styles.box2}
	data={minute}
	onSelect={(selectedItem, index) => {
        setVrijeme(sat+":"+selectedItem)
        
        setMinuta(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
        </View>
        <View style={{padding:10 ,justifyContent:"center",alignItems:"center"}}>
        <Text style={{color:theme=="dark"?"white":"black"}}> DATUM</Text>
            <View style={{marginTop:10}}>
            <CalendarPicker textStyle={{color:theme=="dark"?"white":"black"}} disabledDatesTextStyle={{color:"gray"}} selectedStartDate={todayDate} disabledDates={(date)=>{if(date<new Date(todayDate.split("-")[0],todayDate.split("-")[1]-1,todayDate.split("-")[2]) ) return true}} selectedDayColor="#e7f2ff" onDateChange={(date)=>setDatum(date)}/>
            </View>
        </View>
       
         
 

 
        </View> 
        </ScrollView>

        <TouchableOpacity onPress={()=>{
          console.log(datum,"vrijeme",vrijeme); 
          if(mjesto=="")
            setErr("Definiraj mjesto!")
          else if(izabro)navigation.navigate("NapraviTermin2",{grad,mjesto,datum,vrijeme}) 
          else 
          setErr("Izaberi grad!");}}>
        <View style={styles.button}>
            <Text style={{fontWeight:"bold"}}>DALJE</Text>
        </View>
        </TouchableOpacity>
        <View style={{margin:5}}><Text style={{color:"red"}}>{err}</Text></View>
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
    width:Dimensions.get("window").width/8,
    height:Dimensions.get("window").height/17,
    marginTop:10
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
}


});

