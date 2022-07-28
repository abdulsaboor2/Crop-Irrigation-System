import React, { useEffect, useState } from 'react';
import {Text, TextInput, View, StyleSheet} from "react-native";

import AppButton from '../../Components/AppButton';
import ScoreTable from '../../Components/ScoreTable';
import { firebase } from '../../firebaseConfig/firebase';
import { errorMessage, successMessage } from '../../Components/MessageAlert';

import FlashMessage from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';

const ChangeScore = (props) => {
    const [waterScore, setWaterScore] = useState(0);
    const [lightScore, setLightScore] = useState(0);
    const [rainScore, setRainScore] = useState(0);
    const [humidityScore, setHumidityScore] = useState(0);
    const [tempratureScore, setTempratureScore] = useState(0);
    const [moistureScore, setMoistureScore] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();
    

    useEffect(()=>{
        getTableData();
    }, []);

    const getTableData = async() => {
        setIsLoading(true);
          firebase
            .firestore()
            .collection("Score Table")
            .doc("Scores")
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                setWaterScore(data.waterScore);
                setLightScore(data.lightScore);
                setRainScore(data.rainScore);
                setHumidityScore(data.humidityScore);
                setTempratureScore(data.tempratureScore);
                setMoistureScore(data.moistureScore);
                setIsLoading(false);
              } else {
                console.log("No such document!");
                setIsLoading(false);
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
              setIsLoading(false);
            
            });
    }

    const handleScoreTable = () => {
        setIsLoading(true);
        firebase.firestore().collection("Score Table").doc("Scores").set({
            waterScore: Number(waterScore),
            lightScore: Number(lightScore),
            rainScore: Number(rainScore),
            humidityScore: Number(humidityScore),
            tempratureScore: Number(tempratureScore),
            moistureScore: Number(moistureScore),
        }).then(() => {
            setIsLoading(false);
            navigation.goBack();
            successMessage("Table Updated");
        })
        .catch((err) => {
            successMessage(err.toString());
            setIsLoading(false);
        });
    }

    return (
        <View>
            <ScoreTable title="Water" onChangeText={(e)=>{setWaterScore(e)}} value={waterScore.toString()} />
            <ScoreTable title="Light" onChangeText={(e)=>{setLightScore(e)}} value={lightScore.toString()} />
            <ScoreTable title="Rain" onChangeText={(e)=>{setRainScore(e)}} value={rainScore.toString()} />
            <ScoreTable title="Humidity" onChangeText={(e)=>{setHumidityScore(e)}} value={humidityScore.toString()} />
            <ScoreTable title="Temprature" onChangeText={(e)=>{setTempratureScore(e)}} value={tempratureScore.toString()} />
            <ScoreTable title="Moisture" onChangeText={(e)=>{setMoistureScore(e)}} value={moistureScore.toString()} />
            
            <AppButton title={"Update Score"} onPress={handleScoreTable} />
            <FlashMessage position="top" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
})

export default ChangeScore;