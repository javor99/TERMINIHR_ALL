import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "@env";

const EmailForm = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [err, setErr] = useState('');

  useEffect(() => {
    setErr('');
  }, []);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("@EMAIL", email);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSendEmail = async () => {
    try {
      setEmailSent(true);
      fetch(URL + "/sendEmail", {
        method: "POST",
        body: JSON.stringify({ email: email }),
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      saveData();
      handleSendEmail();
      navigation.navigate("VerifyCode");
    } else {
      setErr("Invalid mail format");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>{err.length > 0 ? err : ""}</Text>
      <Text style={styles.label}>EMAIL</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter your email"
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
        <Text style={styles.buttonText}>POTVRDI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Dimensions.get("window").width * 0.05, 
    backgroundColor: "lightblue",
  },
  label: { 
    fontSize: Dimensions.get("window").width * 0.06,
    marginTop: Dimensions.get("window").width * 0.05,
    marginBottom: Dimensions.get("window").width * 0.05,
    color: "black",
    fontWeight: "200", 
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
    marginTop: Dimensions.get("window").width * 0.06,
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
    fontSize: Dimensions.get("window").width * 0.045,
  },
});

export default EmailForm;
   