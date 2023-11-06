import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "@env";
import SelectDropdown from "react-native-select-dropdown";
import ResponsiveImage from 'react-native-responsive-image';



export default function Complete({ navigation }) {
  const [ime, setIme] = useState("");
  const [prezime, setPrezime] = useState("");
  const [brTelefona, setBrojTelefona] = useState("");
  const [datumRod, setDatumRod] = useState("");
  const [err, setErr] = useState("");

  async function handleDalje() {
    if (ime === "" || prezime === "" || brTelefona === "") {
      setErr("Sva polja moraju biti popunjena!");
      return;
    } else {
      setErr("");
    }
    AsyncStorage.getItem("@EMAIL", (err, res) => salji(res));
  }

  async function salji(email) {
    console.log(email + " EMAIL JE KORSITEN ZA REGISTRACIJU");
    fetch(URL + "/regUser", {
      method: "POST",
      body: JSON.stringify({ email, ime, prezime, brTelefona, datumRod }),
      headers: {
        "Content-Type": "application/json", 
      }, 
    }) 
      .then((res) => {
        if (res.status === 200) {
          saveData(); 
          navigation.navigate("Complete2"); 
        }
        return res.json();
      })
      .then((data) => {
        if (data.err) setErr(data.err);
      });
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("@LOGIN", "true");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>

      <View>
      <ResponsiveImage initHeight={70} initWidth={70} style={{marginBottom:10}}  source={require("../assets/user.png")}/> 

      </View>
      <View style={styles.pola}>
        <View>
          <Text style={styles.cool}>Ime</Text>
          <TextInput
            value={ime}
            onChangeText={(ime) => setIme(ime)}
            style={styles.box}
            placeholder="Ivor"
          />
        </View>
        <View>
          <Text style={styles.cool}>Prezime</Text>
          <TextInput
            style={styles.box}
            placeholder="Baričević"
            value={prezime}
            onChangeText={(prezime) => setPrezime(prezime)}
          />
        </View>
        <View>
          <Text style={styles.cool}>Broj telefona</Text>
          <TextInput
            style={styles.box}
            placeholder="0989194158"
            value={brTelefona}
            onChangeText={(brTelefona) => setBrojTelefona(brTelefona)}
          />
        </View>
        
        <TouchableOpacity onPress={handleDalje}>
          <View style={styles.zavrsi}>
            <Text style={styles.text}>DALJE</Text>
          </View>
        </TouchableOpacity>
        
        <Text style={{ color: "red" }}>{err.length > 0 ? err : ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.15,
    marginTop: Dimensions.get("window").width * 0.033,
  },
  box: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    padding: Dimensions.get("window").width * 0.02,
    justifyContent: "center",
    alignItems: "center",
    margin: Dimensions.get("window").width * 0.04,
    width: Dimensions.get("window").width * 0.8,
    color: "black",
    fontSize: Dimensions.get("window").width * 0.05,
  },
  cool: {
    fontSize: Dimensions.get("window").width * 0.05,
    fontWeight: "300",
    color: "black",
    marginLeft:"10%"
  },
  zavrsi: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: Dimensions.get("window").width * 0.03,
    borderRadius: 7,
    height: Dimensions.get("window").width * 0.15,
    width: Dimensions.get("window").width * 0.8,
    borderColor: "black",
    borderWidth: 1,
  },
  text: {
    fontSize: Dimensions.get("window").width * 0.05,
    color: "black",
    fontWeight: "300",
  },
  pola: {
    height: Dimensions.get("window").height/1.8,
    marginTop: 0,
    borderColor:"lightblue",
    borderWidth:2,
    backgroundColor: "#e7f2ff",
    width: "88%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius:10,
    marginBottom:"40%"
  },
});
