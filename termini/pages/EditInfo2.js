import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity} from 'react-native';
import {Dimensions} from 'react-native';
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import React, { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import SelectDropdown from 'react-native-select-dropdown'
import {URL} from "@env"
import { useDispatch, useSelector } from 'react-redux';
import { NEWEdit } from "../redux/actions";


 

export default function Start({route,navigation}) {


  
   
  const sportovi=["nogomet","kosarka","rukomet","stolni tenis"]
  const tipovi=["privatni","javni"]
  const grupe=["KURAC","fuca","palac"]

 const dispatch=useDispatch()  
 const[grupni,setGrupni] = useState(false) 
 const[grad,setGrad]=useState("")
 const[mjesto,setMjesto]=useState("")
 const[datum,setDatum]=useState("")
 const[vrijeme,setVrijeme]=useState("")
 const[tip,setTip]=useState("privatni")
 const[opis,setOpis]=useState("")
 const[grupa,setGrupa]=useState("")
 const[sport,setSport]=useState("nogomet")
 const[brojLjudi,setBrojLjudi]=useState("")
 const[status,setStatus]=useState("ongoing")
 const[email,setEmail]=useState("")
 const[err,setErr]=useState("") 
 const theme = useSelector(state=>state.theme)


 useEffect(()=>{setGrad(navigation.state.params.grad)
    setMjesto(navigation.state.params.mjesto)
    setVrijeme(navigation.state.params.vrijeme)
    setDatum(navigation.state.params.datum)
    setBrojLjudi(navigation.state.params.brojLjudi)
    setSport(navigation.state.params.sport)
    setTip(navigation.state.params.tip)
        console.log()

    },[])
   AsyncStorage.getItem("@EMAIL",(err,res)=>setEmail(res))
    async function createTermin() {
        fetch (URL+"/getBr/"+navigation.state.params.eventInfo.eventid).then(res=>{return res.json()}).then(br=>{

            if(brojLjudi<br){
                setErr("Novi broj ljudi mora bit veci od trenutacnog broja ljudi koji sudjeluju u terminu")
                }
        
                else{
        
              console.log(grad,mjesto,datum,vrijeme,email,tip,opis,sport,brojLjudi,status)
                fetch(URL+"/editInfo",{method:"POST",body:JSON.stringify({grad,mjesto,datum,vrijeme,email,tip,opis,sport,brojLjudi,status,"eventid":navigation.state.params.eventInfo.eventid}),headers: {
                    'Content-Type': 'application/json'
                    
                  }
                
                
                })}

                dispatch(NEWEdit())

    

                navigation.navigate("DetaljiOrg",{"id":navigation.state.params.eventInfo.eventid})                  

        })


       
          
    } 
  
  return (
    <View style={{ flexDirection:'column', 
    backgroundColor: theme=="light" ? "lightblue" : "#0f2557",
    alignItems:"center",
    justifyContent:"center",
    height:"100%"}}> 
    <TouchableOpacity onPress={()=>navigation.navigate("EditInfo",{eventInfo:navigation.state.params.eventInfo})}>
        <Image style={styles.tinyLogo} source={require("../assets/back.png")}/>
        </TouchableOpacity>
        
        <ScrollView style={styles.scroll}>
            <View style={styles.scroll2}>

            

        <View style={{padding:10}}>
        <Text style={{color:theme=="dark"?"white":"black"}}> BROJ LJUDI</Text>
            <TextInput style={styles.input} value={brojLjudi} onChangeText={(brojLjudi)=>
            {
                setBrojLjudi(brojLjudi)
            
            }}/>
        </View>
        
        <View style={{padding:10}}>
        <Text style={{color:theme=="dark"?"white":"black"}}> SPORT</Text>
            <SelectDropdown
    buttonStyle={styles.box}
    rowTextStyle={{color:"black"}}
    buttonTextStyle={{color:"black"}}
    defaultButtonText={navigation.state.params.sport.toLowerCase()}
    dropdownStyle={styles.box2}
	data={sportovi}
	onSelect={(selectedItem, index) => {
		
        setSport(selectedItem)
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

        

        <View style={{padding:10}}>
        <Text style={{color:theme=="dark"?"white":"black"}}> TIP</Text>
            <SelectDropdown
    buttonStyle={styles.box}
    rowTextStyle={{color:"black"}}
    buttonTextStyle={{color:"black"}}
    defaultButtonText={navigation.state.params.tip}
    dropdownStyle={styles.box2}
	data={tipovi}
	onSelect={(selectedItem, index) => {
        if(selectedItem==="grupni")
            setGrupni(true)
        else
            setGrupni(false)

        setTip(selectedItem)
		
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
        

       
        

        </View>
        <View style={{paddingHorizontal:30}}>
        <Text style={{color:"red"}}>{err}</Text> 
        </View>
       
        </ScrollView>

        <TouchableOpacity onPress={createTermin}>
        <View style={styles.button}>
            <Text style={{fontWeight:"bold"}}>POTVRDI</Text>
        </View>
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
    justifyContent:"flex-start",
    padding:8
    

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

