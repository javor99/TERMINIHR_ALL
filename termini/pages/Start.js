import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Start({ navigation }) {
  async function clear() {
    try {
      AsyncStorage.clear();
    } catch (error) {}
  }

  React.useEffect(() => {
    clear();
    vidi();
  }, []);

  async function vidi() {
    AsyncStorage.getItem("@LOGGEDIN").then((res, err) => {
      if (res === "TRUE") navigation.navigate("Home");
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.krug}>
        <Image style={styles.tinyLogo} source={require("../assets/terminihr-logo.png")} />
      </View>
      <TouchableOpacity onPress={() => { navigation.navigate("Signup"); }}>
        <View style={styles.login}>
          <Text style={{ fontWeight: "300", color: "black", fontSize: Dimensions.get("window").width * 0.06 }}>
            REGISTRACIJA
          </Text>
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
    width: Dimensions.get("window").width * 0.64,
    height: Dimensions.get("window").height * 0.3,
  },
  login: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 9,
    borderColor: "white", 
    padding: Dimensions.get("window").width * 0.03,
    justifyContent: 'center',
    alignItems: "center",
    margin: Dimensions.get("window").height * 0.02,
    backgroundColor: "white",
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.08,
  },
  krug: {
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width * 0.2,
    borderWidth: 1,
    borderColor: "white",
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 0.8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Dimensions.get("window").height * 0.04,
  },
});
