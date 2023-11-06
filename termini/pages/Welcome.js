import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Image style={styles.tinyLogo} source={require("../assets/connect.png")} />
      <Text style={styles.welcome}>Welcome!</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Complete")}>
        <View style={styles.profile}>
          <Text style={{ fontWeight: "300", color: "black", fontSize: Dimensions.get("window").width * 0.05 }}>
            UREDI PROFIL
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
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.37,
  },
  profile: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "white",
    padding: Dimensions.get("window").width * 0.03,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: Dimensions.get("window").height * 0.05,
    width: Dimensions.get("window").width * 0.8,
  },
  welcome: {
    fontWeight: "bold",
    fontSize: Dimensions.get("window").width * 0.1,
    marginTop: Dimensions.get("window").height * 0.05,
    color: "lightblue",
  },
});
