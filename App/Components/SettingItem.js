import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const SettingItem = (props) => {
    return (
        <TouchableOpacity style={styles.itemContainer} onPress={props.onPress}>
            <FontAwesome5 style={styles.icon} name={props.IconName} size={20} />
            <Text style={styles.text}>{props.title}</Text>
            <View style={{flexDirection:'column'}}>
                <MaterialIcons style={styles.arrowIcon} name="keyboard-arrow-right" size={25} color="gray" />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: "#fff",
   },
   icon:{
        width: "14%",
        marginLeft: 15,
   },
   text:{
    width: "72%",
    fontSize: 17,
   },
    arrowIcon:{
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
        textAlign: "center"
    }
})

export default SettingItem;