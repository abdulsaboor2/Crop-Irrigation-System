import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';

import AppButton from '../Components/AppButton';
import AppInput from '../Components/AppInput';
import { errorMessage, successMessage } from '../Components/MessageAlert';
import { firebase } from '../firebaseConfig/firebase';

import { FontAwesome5 } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
    const [fullname, setFullname]= useState("");
    const [email, setEmail]= useState("");
    const [pass, setPass]= useState("");
    const [cpass, setCPass]= useState("");

    const [isLoading, setIsLoading] = useState(false);

    const handleRegisterUser = async() =>{
        setIsLoading(true);
        if(fullname == "" && email == "" && pass == "" && cpass == ""){
            setIsLoading(false)
            errorMessage("Please filled all Field")
        }
        else if(fullname == "" || email == "" || pass == "" || cpass == ""){
            if(fullname == ""){
                setIsLoading(false);
                errorMessage("Fullname does not Empty")
            }
            else if(email == ""){
                setIsLoading(false);
                errorMessage("Email does not Empty")
            }
            else if(pass == ""){
                setIsLoading(false);
                errorMessage("Password does not Empty")
            }
            else if(cpass == ""){
                setIsLoading(false);
                errorMessage("Confirm Password does not Empty")
            }
        }
        else if(pass != cpass){
            setIsLoading(false);
            errorMessage("Password does not Match")
        }
        else{
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, pass).then((response) => {
                    const uid = response.user.uid;
                    const data = {
                    id: uid,
                    email,
                    fullname,
                    };
                    firebase.firestore().collection("Customers").doc(uid).set(data).then(() => {
                        successMessage("Account Successfully Registered");
                        setIsLoading(false);
                        navigation.navigate("Login")
                    })
                    .catch((err) => {
                        successMessage(err.toString());
                        setIsLoading(false);
                    });
                })
                .catch((err) => {
                    errorMessage(err.toString());
                    setIsLoading(false);
                });
            } catch (err) {
                errorMessage(err.toString());
                setIsLoading(false);
            }
            setIsLoading(false);
        }
    }

    const handleBtnLoading = () => {
        return (isLoading ? <ActivityIndicator style={{paddingLeft:155}} size="large" color="#00ff00" /> : "Register")
    }

    return (
        <View>
            <ScrollView>
                <View style={styles.logoContainer}>
                    <FontAwesome5 style={styles.LogoIcons} name="users" size={100} color="black" />
                    <Text style={styles.logoText}> Register</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <AppInput onChangeText={(e)=>setFullname(e)} placeholder={"Full Name"} name={"user-alt"} size={20} />
                    <AppInput onChangeText={(e)=>setEmail(e)} keyboardType='email-address' placeholder={"Email"} name={"mail-bulk"} size={20} />
                    <AppInput onChangeText={(e)=>setPass(e)} secureTextEntry={true} placeholder={"Password"} name={"user-lock"} size={18} />
                    <AppInput onChangeText={(e)=>setCPass(e)} secureTextEntry={true} placeholder={"Confirm Password"} name={"user-lock"} size={18} />
                </View>
                <AppButton title={handleBtnLoading()} onPress={handleRegisterUser} />
                <TouchableOpacity onPress={()=>navigation.navigate("Login")}>
                    <Text style={{textAlign:"center", marginTop:15}}>Already Have an Account</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    logoContainer:{
        marginTop:100,
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