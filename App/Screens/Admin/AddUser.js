import React, {useState} from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';

import AppInput from '../../Components/AppInput';
import AppButton from '../../Components/AppButton';
import { errorMessage, successMessage } from '../../Components/MessageAlert';
import { firebase } from '../../firebaseConfig/firebase';

import FlashMessage from "react-native-flash-message";
import {useNavigation} from '@react-navigation/native';


const AddUser = (props) => {
    const [fullname, setFullname]= useState("");
    const [email, setEmail]= useState("");
    const [pass, setPass]= useState("123456");
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);

    const handleAddUser = async() =>{
        setIsLoading(true);
        
        if(fullname == "" || email == ""){
            if(fullname == ""){
                setIsLoading(false);
                errorMessage("Fullname does not Empty")
            }
            else if(email == ""){
                setIsLoading(false);
                errorMessage("Email does not Empty")
            }
        }
        else{
            try{
                await firebase.auth().createUserWithEmailAndPassword(email, pass).then((response) => {
                    const uid = response.user.uid;
                    const data = {
                    id: uid,
                    email: email.toLowerCase(),
                    fullname,
                    };
                    firebase.firestore().collection("Customers").doc(uid).set(data).then(() => {
                        setIsLoading(false);
                        navigation.goBack();
                        successMessage("User Successfully Added");
                    })
                    .catch((err) => {
                        errorMessage(err.toString());
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
        return (isLoading ? <ActivityIndicator style={{paddingLeft:155}} size="large" color="#00ff00" /> : "Add User")
    }

    return (
        <View>
            <View style={styles.textInputContainer}>
                <AppInput onChangeText={(e)=>setFullname(e)} placeholder={"Full Name"} name={"user"} size={25} />
                <AppInput onChangeText={(e)=>setEmail(e)} keyboardType='email-address' placeholder={"Email"} name={"mail-bulk"} size={20} />
                <AppInput onChangeText={(e)=>setPass(e)} secureTextEntry={true} placeholder={"Password"} name={"user-lock"} size={18} />
            </View>
            <AppButton title={handleBtnLoading()} onPress={handleAddUser} />
            <FlashMessage position="top" />
        </View>
    );
}

const styles = StyleSheet.create({
      textInputContainer: {
        marginTop: 30,
      },
})

export default AddUser;