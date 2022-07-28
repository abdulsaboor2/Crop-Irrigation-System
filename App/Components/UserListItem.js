import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { firebase } from '../firebaseConfig/firebase';

const UserListItem = (props) => {

    const handleDelete = () => {
        const uid = props.id;
       
        firebase.firestore().collection("Customers").doc(uid).delete().then(() => {
            alert("Document successfully deleted!");
        }).catch((error) => {
            alert("User Not Found: ", error);
        });   
    }

    return (
        <View style={{borderWidth:2, borderBottomWidth:1, borderColor:'black', height:35,flexDirection: 'row',backgroundColor: props.count % 2 == 0 ? "White": "lightgray"}}>
            <Text style={{fontSize: 14, borderRightWidth: 1, textAlignVertical:"center",textAlign:"center", width: 30,fontWeight:"bold"}}>{props.count}</Text>
            <Text style={{fontSize: 14, borderRightWidth: 1, textAlignVertical:"center",textAlign:"center", width: 102}}>{props.name}</Text>
            <Text style={{fontSize: 14, borderRightWidth: 1, textAlignVertical:"center", textAlign:"center", width: 185}}>{props.email}</Text>
            <TouchableOpacity onPress={handleDelete}>
                <Text style={{color:"red", fontSize: 13, paddingTop: 9, fontWeight:"bold"}}>Delete</Text>
            </TouchableOpacity>
        </View>

    );
}

export default UserListItem;