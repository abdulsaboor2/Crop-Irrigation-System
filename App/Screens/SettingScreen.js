import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import SettingItem from '../Components/SettingItem';
import { firebase } from '../firebaseConfig/firebase';
import { errorMessage, successMessage } from '../Components/MessageAlert';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function SettingScreen(props) {
    const navigation = useNavigation();
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [admin, setAdmin] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    useEffect(()=>{
        handlerLoading();
        ProfileData();
    },[])

    let userToken;
    const ProfileData=async() => {
        setIsLoading(true);
        userToken = await AsyncStorage.getItem("token");

        const user = firebase.firestore().collection("Customers").doc(userToken).get();
        const admin = firebase.firestore().collection("Admin").doc(userToken).get();
        user.then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                setFullname(data.fullname);
                setEmail(data.email);
                setIsLoading(false);
            }
            else{
              admin.then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setFullname(data.fullname);
                    setEmail(data.email);
                    setAdmin(data.admin);
                    setIsLoading(false);
                }
                else{
                  errorMessage("No such document!");
                  setIsLoading(false);
                }
              })
            }
          }).catch((error) => {
              console.log("Error getting document:", error);
              setIsLoading(false);
            });
        };

    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            successMessage('Logout Succesfully')
            AsyncStorage.removeItem('token');
            navigation.replace("Login")
        }).catch((err)=>{
            errorMessage(err);
        });
    }

    const handlerLoading = () => {
        return (isLoading ? <ActivityIndicator style={{flexDirection: "row", justifyContent:"center", alignItems:"center", alignSelf:"center", textAlign: "center"}} size="large" color="#000" /> : "")    
    }

    return (
        <View>
        <StatusBar backgroundColor="#61dafb" />
            <View style= {styles.profileContainer}>
                <View style={{alignSelf:"center", margin:25, marginBottom:15}}>
                    <Image style={styles.setImage} source={require("../assets/AppImages/logo.jpg")} />
                </View>
                <View style={styles.profileTextContainer}>
                {
                    isLoading ? handlerLoading() :     
                        admin!="" ?
                        <>
                            <Text style={[styles.profileText, {fontWeight: "bold"}]}>{fullname}</Text>
                            <Text style={styles.profileText}>{email}</Text>
                            <Text style={[styles.profileText, {fontWeight: "bold"}]}>{admin}</Text>
                        </>
                        :
                        <>
                            <Text style={[styles.profileText, {fontWeight: "bold"}]}>{fullname}</Text>
                            <Text style={styles.profileText}>{email}</Text>
                        </>
                }
                </View>
            </View>
            <ScrollView>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>General</Text>
                    <SettingItem title={"Change Password"} IconName={"user-lock"} onPress={()=>navigation.navigate("Change Password")} />
                    <SettingItem title={"About us"} IconName={"info-circle"} onPress={()=>navigation.navigate("About Us")} />
                    <SettingItem title={"Contact us"} IconName={"phone-alt"} onPress={()=>navigation.navigate("Contact Us")} />
                    <SettingItem title={"Logout"} IconName={"power-off"} onPress={handleLogout} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        padding: 15,
        paddingTop: 0,
        backgroundColor: "#61dafb",
        flexDirection: 'column',
    },
    profileTextContainer: {
        flexDirection: "column",
        textAlign: "center"
    },
    profileText: {
       fontSize: 18,
       textAlign: "center"
    },
    profileImageContainer: {
        flexDirection: "column",
    },
    setImage: {
        width: 135,
        height: 100,
        borderRadius:5,
    },
    itemContainer: {
        marginTop: 10,
    },
    itemText: {
        marginLeft: 20,
        fontSize: 18,
        marginBottom: 10,
    }
})

export default SettingScreen;