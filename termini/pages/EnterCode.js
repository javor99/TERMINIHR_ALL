import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "@env";

const EnterCode = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [wrongCode, setWrongCode] = useState(false);

  useEffect(() => {}, []);

  const handleSubmit = async () => {
    const email = await AsyncStorage.getItem("@EMAIL");
    const user = { email, code }; 

    console.log(code);
    console.log(user);

    fetch(URL + "/verifyCode", {
      method: "POST",
      body: JSON.stringify(user), 
      headers: {
        'Content-Type': 'application/json', 
      },
    }).then((res) => { 
      if (res.status === 401) setWrongCode(true);
      else if (res.status === 202) navigation.navigate("Home");
      else navigation.navigate("Welcome");
    }); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Text style={styles.error}>{wrongCode && "Krivi kod!"}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Image style={styles.tinyLogo} source={require("../assets/back.png")} />
        </TouchableOpacity>
        <Text style={styles.label}>Kod ti je poslan na mail.</Text>
        <Text style={styles.label}>Upisi ga tako da te mozemo autentificirati.</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCode(text)}
          placeholder="Kod"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.buttonText}>POTVRDI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: Dimensions.get("window").width * 0.06,
    fontWeight: "bold",
    color: "red",
    marginBottom: Dimensions.get("window").width * 0.03,
  },
  tinyLogo: {
    width: Dimensions.get("window").width * 0.08,
    height: Dimensions.get("window").width * 0.08,
    marginBottom: Dimensions.get("window").width * 0.04,
    marginTop: Dimensions.get("window").width * 0.04,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Dimensions.get("window").width * 0.05,
    backgroundColor: "lightblue",
  },
  label: {
    fontSize: Dimensions.get("window").width * 0.04,
    marginBottom: Dimensions.get("window").width * 0.03,
    color: "black",
  },
  input: {
    width: "100%",
    padding: Dimensions.get("window").width * 0.03,
    marginBottom: Dimensions.get("window").width * 0.06,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    color: "black",
  },
  buttonContainer: {
    marginTop: Dimensions.get("window").width * 0.001,
    backgroundColor: "white",
    padding: Dimensions.get("window").width * 0.03,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 2,
    width: "50%",
    borderWidth: 1,
  },
  buttonText: {
    color: "black",
    fontWeight: "300",
    textAlign: "center",
    fontSize: Dimensions.get("window").width * 0.036,
  },
  container2: { 
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Dimensions.get("window").width * 0.05,
    backgroundColor: "lightblue",
    width: "100%",
    marginBottom: Dimensions.get("window").width * 0.1,
  },
});

export default EnterCode;
