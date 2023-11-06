import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Image, ActionSheetIOS, TouchableOpacity,Dimensions} from 'react-native';
import { useSelector } from 'react-redux';
export default function DetaljiBox({dog,navigation,vrsta}) {
    const theme=useSelector(state=>state.theme)
    const [email,setEmail] = useState("")

    async function setajMail() {
      AsyncStorage.getItem("@EMAIL",(err,res)=>{setEmail(res)})
    }

    useEffect(()=>{

      setajMail()

    },[])
    function detalji(dog) {
        let id = dog.eventid
        navigation.navigate("Detalji",{id,"email":email})
      }

      function detaljiSudj(dog) {
        let id = dog.eventid
        navigation.navigate("DetaljiSudj",{id,"email":email})
      }

      function detaljiOrg(dog) {
        let id = dog.eventid
        navigation.navigate("DetaljiOrg",{id,"email":email})
      }


    function detaljiPov(dog) {
      let id = dog.eventid
      navigation.navigate("DetaljiPovijest",{id,"email":email})
    }


    return   <View style={{width:Dimensions.get("window").width/1.2,
    height:Dimensions.get("window").height/3.5,
    backgroundColor:theme=="light"? "#D5E7FD":"#28559a",
    borderColor:"black",
    borderWidth:0,
    borderRadius:10,
    marginVertical:10,
    }} key={dog.eventid}>
        
                  <View style={styles.naslov}>
                  {dog.sport=="NOGOMET" && theme=="light" &&<Image style={styles.tinyLogoNaslov} source={require("../assets/nogomet.png")}/> }
                  {dog.sport=="NOGOMET" && theme=="dark" &&<Image style={styles.tinyLogoNaslov} source={require("../assets/nogomet-dark.png")}/> }
                  {dog.sport=="RUKOMET"&&theme=="light" && <Image style={styles.tinyLogoNaslov} source={require("../assets/rukomet.png")}/> }
                  {dog.sport=="RUKOMET"&&theme=="dark" && <Image style={styles.tinyLogoNaslov} source={require("../assets/rukomet-dark.png")}/> }
                  {dog.sport=="KOSARKA"&& theme=="light"&& <Image style={styles.tinyLogoNaslov} source={require("../assets/kosarka.png")}/> }
                  {dog.sport=="KOSARKA"&& theme=="dark"&& <Image style={styles.tinyLogoNaslov} source={require("../assets/kosarka-dark.png")}/> }
                  {dog.sport=="STOLNI TENIS"&&theme=="light"&&<Image style={styles.tinyLogoNaslov} source={require("../assets/stolnitenis.png")}/> }
                  {dog.sport=="STOLNI TENIS"&&theme=="dark"&&<Image style={styles.tinyLogoNaslov} source={require("../assets/stolni-dark.png")}/> }
                  <Text style={{fontSize:Dimensions.get("screen").height/60,color: theme=="light"? "black" :"white",fontWeight:"bold"}}> {dog.sport}</Text>
                  </View>
                  <View style={styles.grad}>
                  <Image style={styles.tinyGrad} source={require("../assets/city.png")}/>
                  <Text style={{fontSize:Dimensions.get("window").height/60,color: theme=="light"? "black" :"white",fontWeight:theme=="light"? "":"bold",textTransform:"uppercase"}}>  {dog.grad}</Text>
                    </View>
                  <View style={styles.ostalo}>
                  
                  <View style={styles.pola}>
                  <View style={styles.both}>
                  { theme=="light" && <Image style={styles.tinyLogo} source={require("../assets/organizer.png")}/> }
                  { theme=="dark" && <Image style={styles.tinyLogo} source={require("../assets/organizer-dark.png")}/> }
                  <Text style={{margin:5,fontSize:Dimensions.get("screen").height/70,color: theme=="light"? "black" :"white",fontWeight:theme=="light"? "":"bold"}}>  {dog.ime+" "+dog.prezime}</Text>
                  </View>
                  <View style={styles.both}>
                  { theme=="light" && <Image style={styles.tinyLogo} source={require("../assets/event.png")}/> }
                  { theme=="dark" && <Image style={styles.tinyLogo} source={require("../assets/event-dark.png")}/> }
                  
                  <Text style={{margin:5,margin:5,fontSize:Dimensions.get("screen").height/70,color: theme=="light"? "black" :"white",fontWeight:theme=="light"? "":"bold"}}>  {dog.datum.split(",")[0].split("/")[1]+"."+dog.datum.split(",")[0].split("/")[0]+"."+dog.datum.split(",")[0].split("/")[2]}</Text>
                  </View>
                  <View style={styles.both}>
                  { theme=="light" && <Image style={styles.tinyLogo} source={require("../assets/when.png")}/> }
                  { theme=="dark" && <Image style={styles.tinyLogo} source={require("../assets/when-dark.png")}/> }
                  

                  <Text style={{margin:5,margin:5,fontSize:Dimensions.get("screen").height/70,color: theme=="light"? "black" :"white",fontWeight:theme=="light"? "":"bold"}}>  {dog.vrijeme.slice(0,5)}</Text>
                  </View>
                  
                  <View style={styles.both}>
                  { theme=="light" && <Image style={styles.tinyLogo} source={require("../assets/where.png")}/> }
                  { theme=="dark" && <Image style={styles.tinyLogo} source={require("../assets/where-dark.png")}/> }
                  
                  <Text style={{margin:5,margin:5,fontSize:Dimensions.get("screen").height/70,color: theme=="light"? "black" :"white",fontWeight:theme=="light"? "":"bold"}}>  {dog.mjesto}</Text>
                  </View>
                  </View>
                  <View style={styles.pola2}>
                  <View style={styles.desno}>
                  { theme=="light" && <Image style={styles.tinyLogo2} source={require("../assets/ljudi.png")}/> }
                  { theme=="dark" && <Image style={styles.tinyLogo2} source={require("../assets/grupa.png")}/> }
                  <Text style={{margin:5,color: theme=="light"? "black" :"white" ,fontWeight:"bold"}}> {dog.br+"/"+dog.kolkoljudi}</Text>
                  </View></View>
                  </View>
                  <View style={styles.gumb}>
                  <TouchableOpacity style={{  backgroundColor: theme=="light"?"white":"#3778c2",
     height:"80%",
     width:"60%",
     marginLeft:"20%",
    marginTop:"-4%",

    
     borderTopLeftRadius:10,
     borderTopRightRadius:10,
     justifyContent:"center",
     alignItems:"center"}} onPress={()=>
            {if(vrsta=="home")
             detalji(dog) 
             else if (vrsta=="org")
             detaljiOrg(dog)
             else if(vrsta=="sudj")
             detaljiSudj(dog)
             else if(vrsta=="pov")
             detaljiPov(dog)
     }}>
                      <View >
                         <Text style={{fontWeight:"bold",color:theme=="light"?"black":"white"}}>DETALJI</Text>
                      </View>
                  </TouchableOpacity>
                  </View>
                  </View>
  }


  const styles = StyleSheet.create({
    baby:{
      width:Dimensions.get("window").width/1.2,
      height:Dimensions.get("window").height/3
    },
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tinyLogo: {
      width:"8%",
      height:"100%"
    },
    tinyLogoNaslov: {
        width:"8%",
        height:"110%",
        marginRight:3
      },
    tinyLogo2: {
        width:Dimensions.get("window").height/15,
        height:"30%"
    },
    header :{
        width:"100%",
        height:"11%",
        borderBottomColor:"white",
        borderBottomWidth:2,
        flexDirection:"row",
        paddingBottom:17,
        paddingHorizontal:20,
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
    grad :{
      
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row"
      

    },
    tinyGrad:{
      width:20,
      height:20,
      
    }

    ,
    boxText:{
        margin:5
    },
    naslov:{
      flexDirection:"row",
      padding:5,
     
      width:Dimensions.get("window").width/1.2,
      justifyContent:"center",
      height:"15%",
      alignItems:"center"
     
    },
    both:{
        flexDirection:"row",
        marginTop:"2%",
      
        
        width:Dimensions.get("window").width/1.2,
        
    },
    gumb:{
     
      
      height:"15%",
     
      
      width:Dimensions.get("window").width/1.2,
     
      
      
      
  
      
      
      
     
    },
    pola:{
        width:"50%",
        height:"100%",
        paddingLeft:10,
       
        justifyContent:"center",
       
       
  },
  pola2:{
      width:"50%",
      height:"100%",
      
      alignItems:"center",
      justifyContent:"center",
      
  },
  ostalo:{
      width:"100%",
      flexDirection:"row",
      height:"70%",
      
  },
  desno:{
    
    justifyContent:"center",alignItems:"center",
    height:"100%"
}
  
   
  
  });