import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import AppButton from '../../Components/AppButton';
import UserListItem from '../../Components/UserListItem';
import { firebase } from '../../firebaseConfig/firebase';

import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const Users = (props) => {
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [internetCheck, setInternetCheck] = useState(0);

    useEffect(()=>{
        getAllUser();
    }, [internetCheck]);

    const getAllUser = async() => {
        setIsLoading(true);
        try{
            await firebase.firestore().collection('Customers').get().then((docs)=>{
            if (docs.empty) {
                console.log('No matching documents.');
                setIsLoading(false)
            }
                setUser([])
                docs.forEach(doc => {
                    var data = doc.data();
                    setUser(arr => [...arr , data]);
                });
                setIsLoading(false);
        })
        setIsLoading(false); 
        }
        catch(err){
            console.log(err)
            setIsLoading(false);
        }
    }

    return (
        <View>
            <View style={{marginBottom: 10, flexDirection: "row"}}>
                <View style={{width:"49%"}}>
                    <AppButton title={"Add New User"} onPress={()=>navigation.navigate("Add User")}/>
                </View>
                <View style={{width:"49%"}}>
                    <AppButton color="#2DC449" title={" Edit Crop Score Table"} onPress={()=>navigation.navigate("Change Score")} />
                </View>
            </View>
            <View style={{flexDirection: 'row-reverse'}}>
                <TouchableOpacity onPress={() => setInternetCheck(internetCheck + 1)} style={{ marginBottom:5, marginRight:10, marginTop:-10, borderRadius:5, padding:7, backgroundColor:"lightgray"}}>
                    <FontAwesome name="refresh" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{flexDirection:"column"}}>
                    <View style={{borderWidth:2, borderBottomWidth:1, borderColor:'black', height:35, flexDirection: 'row'}}>
                        <Text style={{fontSize: 17, borderRightWidth: 1, textAlignVertical:"center", textAlign:"center", width: 30,fontWeight:"bold"}}>Sr.</Text>
                        <Text style={{fontSize: 16, borderRightWidth: 1, textAlignVertical:"center", textAlign:"center", width: 102, fontWeight:"bold"}}>Full Name</Text>
                        <Text style={{fontSize: 16, borderRightWidth: 1, textAlignVertical:"center", textAlign:"center", width: 185, fontWeight:"bold"}}>Email Address</Text>                        
                        <Text style={{fontSize: 14, textAlignVertical:"center", fontWeight:"bold"}}>Action</Text>    
                    </View>
                {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> :
                    user.map((data, i) => (
                        <UserListItem name={data.fullname} count={i + 1} key={data.id} id={data.id} email={data.email} />  
                    ))
                }
                </View>
            </ScrollView>
        </View>

    );
}

export default Users;