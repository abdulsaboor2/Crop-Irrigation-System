import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

const AppButton = (props) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={props.onPress} >
            <Text style={[styles.Btn, {backgroundColor:props.color != null ? props.color : "#61dafb"}]} >{props.title}</Text>
        </TouchableOpacity>
    );
}

export default AppButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop:10, 
        margin: 5,
        width: "97%",     
    },
    Btn: {
        backgroundColor: "#3897f1",
        borderRadius: 15,
        height: 47,
        width: "100%",
        textAlign: "center",
        fontSize:20,
        color: "white",
        padding:10,
    },
})