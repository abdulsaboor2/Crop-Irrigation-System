import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const ScoreTable = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>{props.title}</Text>
            <TextInput style={styles.textInput} keyboardType="numeric"
            placeholder={props.title} value={props.value} onChangeText={props.onChangeText} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: "row",
        marginTop:15,
    },
    textStyle: {
        fontSize:20,
    },
    textInput:{
        borderColor:'lightgray', 
        borderWidth:2, 
        padding:5,
        paddingLeft:10, 
        backgroundColor:"white",
        fontSize: 17,
        width:"65%",
        position: "absolute",
        right: 10,
        marginTop: 5,
    },
});

export default ScoreTable;