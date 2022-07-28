import React, { useEffect, useState } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import AppButton from '../Components/AppButton';
import { firebase } from '../firebaseConfig/firebase';
import { errorMessage, successMessage } from '../Components/MessageAlert';
import AppInput from '../Components/AppInput';

import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = (props) => {
    const [pass, setPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const navigation = useNavigation();

    const UpdatePassword = async() => {
        if(pass == ""  || newPass == ""){
            errorMessage("Please Fill All the field");
        }
        else{   
            var user = await firebase.auth().currentUser;
            user.updatePassword(newPass).then(() => {
                if(pass == newPass){
                    errorMessage("You Current and New Password Cannot be Same");
                }
                else{
                    successMessage("Password Successfully Changed");
                    navigation.replace("Profile")
                    
                }
            }).catch((err) => {
                    errorMessage(err.toString());
            })
        }
    }

    return (
        <View>
            <View style={{alignItems: "center", margin: 70}}>
                <FontAwesome5 name="lock" size={100} />
            </View>
            <View>
                <AppInput placeholder="Current Password" secureTextEntry={true} onChangeText={(e)=>setPass(e)} name={"user-lock"} size={20} />
                <AppInput placeholder="New Password" secureTextEntry={true} onChangeText={(e)=>setNewPass(e)} name={"user-lock"} size={20} />
                <TouchableOpacity onPress={()=>navigation.navigate("Forgot Password")}>
                    <Text style={{textAlign:"right", marginRight:5}}>Forget Password?</Text>
                </TouchableOpacity>
                <AppButton title="Update Password" onPress={UpdatePassword} />
            </View>
        </View>
    );
}

export default ChangePassword;