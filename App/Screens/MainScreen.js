import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Platform, SafeAreaView, ScrollView, StatusBar } from 'react-native';

import ServicesBox from '../Components/ServicesBox';
import AppButton from '../Components/AppButton';

import AsyncStorage from '@react-native-async-storage/async-storage';


const MainScreen = ({navigation}) => {

    const [useToken, setUseToken] = useState("");
    const [score, setScore] = useState("")
    
    useEffect(()=>{

        const getToken = async() => {
            const tokens = await AsyncStorage.getItem("token");
            setUseToken(tokens);
        }
        getToken();
        handleSensorScore();
    }, []);

    const handleSensorScore = () => {
        let getScore = 26;
        setScore(getScore);
    }

    const handleNavigation = (p, t) => {
        navigation.navigate("Progress", {point: p, title: t})
    }

    return (
        <View>
            <StatusBar backgroundColor="#61dafb" />
            <ServicesBox title={"Water"} onPress={()=>handleNavigation(score ? score: 0, "Water")} source={require("../assets/AppImages/water.jpg")} />
            <ServicesBox title={"Light"} onPress={()=>handleNavigation(20, "Light")} source={require("../assets/AppImages/light.jpg")} />
            <ServicesBox title={"Rain"} onPress={()=>handleNavigation(40, "Rain")} source={require("../assets/AppImages/rain.png")} />
            <ServicesBox title={"Moisture"} onPress={()=>handleNavigation(9, "Moisture")} source={require("../assets/AppImages/moisture.jpg")} />
            <ServicesBox title={"Temperature"} onPress={()=>handleNavigation(20, "Temperature")} source={require("../assets/AppImages/temprature.jpg")} />
            <ServicesBox title={"Humidity"} onPress={()=>handleNavigation(10, "Humidity")} source={require("../assets/AppImages/hum.jpg")} />         
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width:"100%",
        marginTop: 50,
    },
    addressContainer:{
        padding: 13,
        paddingBottom: 6,
        paddingTop: 5,
        width:'100%',
        flexDirection: 'row',
        backgroundColor:"#ffffff",
        justifyContent:"space-between"
    },
    addressText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 10,
        textAlign: "justify",
    },
    iconContainer:{
        flexDirection:'column',
        justifyContent: "center",
    },
    imageSlider: {
        width: "100%",
        marginTop: 5,
    }
});

export default MainScreen;