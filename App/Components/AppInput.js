import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';

const AppInput = (props) => {
    return (
        <View style={styles.box}>
            <FontAwesome5 style={styles.icon} name={props.name} size={props.size} color={props.color} />
            <TextInput
                style={styles.input}
                value={props.value}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry} />
        </View>
    );
}

export default AppInput;

const styles = StyleSheet.create({
    box:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:15
    },
    icon: {
        marginRight:5,
    },
    input: {
        paddingLeft:10,
        height: 43, 
        width: "90%", 
        fontSize: 16, 
        backgroundColor: "#D3D3DF",
    },
})