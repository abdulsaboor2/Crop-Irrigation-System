import React, { useEffect, useState } from 'react';
import { View, Image, Text} from 'react-native';

import AppButton from '../Components/AppButton';
import { firebase } from '../firebaseConfig/firebase';
import { errorMessage, successMessage } from '../Components/MessageAlert';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

const AppScreen = ({navigation}) => {
    const [isLoading, setIsLoading]= useState(false);

    useEffect(()=>{
        const getToken = async() => {
            setIsLoading(true);
            await AsyncStorage.getItem('token').then(user => {
            firebase.firestore().collection("Customers").doc(user).get().then((doc)=>{
                if (doc.exists) {
                    navigation.replace('Main');
                    setIsLoading(false);
                }
                else{
                    navigation.replace('Admin');
                    setIsLoading(false);
                }
            }).catch(()=>{
                errorMessage("Internet Error");
                setIsLoading(false);
            })
            })
        }
        getToken();
    }, []);

    return (
        <View style={{backgroundColor: "#ADD8E0", height:"100%"}} >
        {
            isLoading ? 
                <Spinner
                    visible={isLoading}
                    textContent={'Loading...'}
                    textStyle={{color:"white"}}
                />
            :   <></>
        }
            <View style={{marginTop:50}}>
                <Image style={{width:400,height:450}} source={require('../assets/AppImages/FrontScreenImage.png')} />
                <Text style={{textAlign:"center", fontSize: 26, fontWeight: "bold" }}>Crop Irrigation System</Text>
                <Text style={{textAlign:"center", fontSize: 16, marginTop:4}}>Some Demi Text Will Be Write There</Text>
                <Text style={{textAlign:"center", fontSize: 16}}>This is Crop Irrigation System Design to find </Text>
                <Text style={{textAlign:"center", fontSize: 16}}>Different Detection</Text>
            </View>
            <View style={{ position: "absolute", bottom: 20, width: "100%"}}>
                    <AppButton title={"Login Account"} color={"#90d000"} onPress={()=>navigation.replace("Login")} />
                    <AppButton title={"Register Account"} onPress={()=>navigation.replace("Register")} />
            </View>
        </View>
    );
}

export default AppScreen;