import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from "react-native";

const ServicesBox = (props) => {
    return (
        <TouchableOpacity style={{color:"black"}} onPress={props.onPress}>
            <View style={styles.serviceBoxContainer}>
                <Image style={styles.setImage} source={props.source} />
                <View style={{justifyContent: "center"}}>
                    <Text style={styles.boxText}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    serviceBoxContainer: {
        margin: 10,
        marginBottom: 0,
        marginTop: 8,
        padding: 11,
        width: "94%",
        borderRadius: 5,
        backgroundColor: "#ffffff",
        flexDirection: 'row'
    },
    setImage: {
        width: 70,
        height: 70
    },
    boxText: {
        fontSize: 17,
        marginLeft: 25,
    }
})

export default ServicesBox;