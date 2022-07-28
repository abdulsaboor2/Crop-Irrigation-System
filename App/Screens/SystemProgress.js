import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import AppButton from '../Components/AppButton';

import ProgressMeter from '../Components/ProgressMeter';
import { firebase } from '../firebaseConfig/firebase';

import Spinner from 'react-native-loading-spinner-overlay';

const SystemProgress = (props) => {
    let {water, light, rain, hum, temp, moisture} = "";

    const [btn, setBtn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [result, setResult] = useState(""); 
    const [color, setColor] = useState("#87CEEB");
    const { point, title } = props.route.params;

    useEffect(()=>{
        const getScores = async() => {
            await firebase.firestore().collection("Score Table").doc("Scores").get().then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    water = data.waterScore;
                    light = data.lightScore;
                    rain = data.rainScore;
                    hum = data.humidityScore;
                    temp = data.tempratureScore; 
                    moisture = data.moistureScore;
                }
              }).then(()=>{
                HandleProgress();
              }).catch((error) => {
                setIsLoading(false);
              });
            }
            getScores();
    },[]);

    const HandleProgress = () => {
        if(title == "Water"){
            if(point >= water){
              setResult("Water is flowing");
              setColor("red");
              setBtn(true);
            }
            else{
                setResult("You don't need to worry about water");
                setColor("#87CEEB");
            }
        }
        else if(title == "Rain"){
            if(point >= rain){
                setResult("Raining");  
                setColor("red");
                setBtn(true);
            }
            else{
                setResult("You don't need to worry about Rain");
                setColor("#87CEEB");
            }
        }
        else if(title == "Light"){
            if(point >= light){
                setResult("Open the Bulb");  
                setColor("red");
                setBtn(true);
            }
            else{
                setResult("You don't need to worry about Light");
            }
        }
        else if(title == "Moisture"){
            if(point >= moisture){
                setResult("Moisturing");
                setColor("red");
                setBtn(true);
            }
            else{
                setResult("You don't need to worry about Moistur");
                setColor("#87CEEB");
            }
        }
        else if(title == "Temperature"){
            if(point >= temp){
                setResult("Temperature is increased");
                setColor("red");
                setBtn(true);
            }
            else{
                setResult("You don't need to worry about Temperature");
                setColor("#87CEEB");
            }
        }
        else if(title == "Humidity"){
            if(point >= hum){
                setResult("Humidity High");  
                setColor("red");
                setBtn(true);
            }
            else{
                setResult("You don't need to worry about Humidity");
                setColor("#87CEEB");
            }
        }
        else{            
            setResult("Something Went Wrong to Proceed");
        }
        setIsLoading(false);
    }

    return (
        <View>
        {isLoading ?
        <Text>
            <Spinner
                visible={true}
                textContent={'Loading...'}
                textStyle={{color:"green"}}
            />
        </Text> : <Text></Text>
        }
            <ProgressMeter title={title} point={point} color={color} />
            <View style={{alignSelf:"center", backgroundColor:"#fff", padding: 10, marginBottom:15, borderRadius:7}}>
                <Text style={{textAlign:"center", fontSize: 18, fontWeight:"bold", color: color == "red" ? "red" : "#000"}}>{result}</Text>
            </View>
            <View>
            <Text>{!isLoading && btn ?"true":"false"}</Text>
                <AppButton title={"Turn ON"} color={"green"} onPress={()=>{setBtn(true)}} />
                <AppButton title={"Turn OFF"} color={"red"} onPress={()=>{setBtn(false)}} />
            </View>
        </View>
    );
}

export default SystemProgress;