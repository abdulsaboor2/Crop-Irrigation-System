import React, {useState} from 'react';
import { View, TextInput } from 'react-native';

import AppButton from '../Components/AppButton';
import {firebase} from "../firebaseConfig/firebase";
import { errorMessage, successMessage } from '../Components/MessageAlert';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const ForgotPassword = (props) => {
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

    const handleForgotPassword = () => {
        if (email == "") {
            errorMessage("Please Enter Your Email");
        } else {
          firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
              navigation.goBack();
              successMessage("Reset Link Sended to your email.");
            })
            .catch((error) => {
                errorMessage(error.toString());
            });
        }
      };

    return (
        <View style={{marginTop: 110}}>
            <View style={{ alignItems: "center" }}>
              <MaterialCommunityIcons name="email-outline" size={150} color="black" />
            </View>
            <View style={{marginTop:85, marginLeft:10, marginRight:10, borderColor: "lightgray", borderWidth:1}}>
                <TextInput
                    style={{backgroundColor:"#fff",padding:5}}
                    placeholder="Email"
                    placeholderTextColor={"#c4c3cb"}
                    keyboardType="email-address"
                    onChangeText={(e) => {
                        setEmail(e);
                    }}
                />
            </View>
        <AppButton title="Reset Password" onPress={handleForgotPassword} />
        </View>
    );
}

export default ForgotPassword;