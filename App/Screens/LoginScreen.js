import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import AppButton from '../Components/AppButton';
import AppInput from '../Components/AppInput';
import { errorMessage, successMessage } from '../Components/MessageAlert';
import {firebase} from '../firebaseConfig/firebase';

import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail]= useState("");
    const [pass, setPass]= useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async() => {
      setIsLoading(true);
      if(email == "" && pass == ""){
        setIsLoading(false);
        errorMessage("Please Enter Email and Password");
      }
      else if(email == "" || pass == ""){
        if(email == ""){
          setIsLoading(false);
          errorMessage("Email is Required");
        }
        else{
          setIsLoading(false);
          errorMessage("Password is Required");
        }
      }
      else {
        setIsLoading(true);
        try {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then((response) => {
              const uid = response.user.uid;
              const user = firebase.firestore().collection("Customers").doc(uid).get();
              const admin = firebase.firestore().collection("Admin").doc(uid).get();
  
              user.then((doc) => {
                  if (doc.exists) {
                    AsyncStorage.setItem("token", uid);
                    setIsLoading(false);
                    navigation.replace("Main");
                  }
                  else{
                    admin.then((doc) => {
                      if (doc.exists) {
                        AsyncStorage.setItem("token", uid);
                        setIsLoading(false);
                        successMessage("User Succesfully Login")
                        navigation.replace("Admin");
                      }
                      else{
                        errorMessage("User does not exist anymore.");
                        setIsLoading(false);
                      }
                    })
                  }
                })
                .catch((error) => {
                  errorMessage(error.toString());
                  setIsLoading(false);
                })
                .catch((error) => {
                  errorMessage(error.toString());
                  setIsLoading(false);
                });
            })
            .catch((error) => {
              errorMessage(error.toString());
              setIsLoading(false);
            });
        } catch (error) {
          errorMessage(error.toString());
          setIsLoading(false);
        }      
      }
    }

  const handleBtnLoading = () => {
    return (
      isLoading ?
        <ActivityIndicator style={{paddingLeft:155}} size="large" color="#00ff00" /> : "Login"
    );
  }

  return (
      <View style={styles.container}>
          <View style={styles.logoContainer}>
            <FontAwesome5 style={styles.LogoIcons} name="user-lock" size={100} color="black" />
            <Text style={styles.logoText}> Login</Text>
          </View>
          <View style={styles.textInputContainer}>
              <AppInput onChangeText={(e)=>setEmail(e)} keyboardType='email-address' placeholder={"Email"} name={"user-alt"} size={25} />
              <AppInput onChangeText={(e)=>setPass(e)} secureTextEntry={true} placeholder={"Password"} name={"lock"} size={25} />
              <TouchableOpacity onPress={()=>navigation.navigate("Forgot Password")}>
                <Text style={{textAlign:"right", marginRight:5}}>Forget Password?</Text>
              </TouchableOpacity>
          </View>
          <AppButton title={handleBtnLoading()} onPress={handleLogin} />
          <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
              <Text style={{textAlign:"center", marginTop:15}}>Create new Account?</Text>
          </TouchableOpacity>
      </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer:{
    flexDirection: "column",
  },
  LogoIcons:{
    textAlign: "center",
  },
  logoText: {
    fontSize: 35,
    textAlign: "center"
    
  },
  textInputContainer: {
    marginTop: 30,
  },
})