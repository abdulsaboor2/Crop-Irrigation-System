import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ContactUs = (props) => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize:25, fontWeight:"bold"}}>Our Developers</Text>
            <View style={{flexDirection:"row", width:"100%", marginTop:5, borderWidth:2, padding:5}}>
                <Image style={styles.setImage} source={require("../assets/AppImages/default.png")} />    
                <View style={{marginTop:53, marginLeft:5,}}>
                    <Text style={styles.setText}>Abdul Saboor</Text>
                    <Text style={styles.setText}>absaboor019@gmail.com</Text>
                </View>
            </View>

            <View style={{flexDirection:"row", width:"100%", borderWidth:2, marginTop:5, padding:5}}>
                <Image style={styles.setImage} source={require("../assets/AppImages/default.png")} />    
                <View style={{marginTop:53, marginLeft:5,}}>
                    <Text style={styles.setText}>Unaiza Sajid</Text>
                    <Text style={styles.setText}>unaizasajid@gmail.com</Text>
                </View>
            </View>
            
            <View style={{flexDirection:"row", width:"100%", borderWidth:2, marginTop:5, paddingBottom:5}}>
                <Image style={styles.setImage} source={require("../assets/AppImages/default.png")} />    
                <View style={{marginTop:53, marginLeft:5,}}>
                    <Text style={styles.setText}>Zain Shahid</Text>
                    <Text style={styles.setText}>Zain Shahid@gmail.com</Text>
                </View>
            </View>

            <View style={{flexDirection:"row", marginTop:20,alignContent:"center"}}>
                <View style={{flexDirection:"column", margin:20,marginTop:25,alignContent:"center"}}>
                    <Text style={{fontSize:18, fontWeight:"bold"}}>Follow On</Text>
                </View>
                <TouchableOpacity>
                    <Image style={[styles.setImage, {width:55, height:52}]} source={require("../assets/AppImages/facebook.jpg")} />
                </TouchableOpacity>
            
                <TouchableOpacity>
                    <Image style={[styles.setImage, {width:50, height:52,marginLeft:15}]} source={require("../assets/AppImages/instagram.png")} />
                </TouchableOpacity>
                
                <TouchableOpacity>
                    <Image style={[styles.setImage, {width:65, height:55,marginLeft:10}]} source={require("../assets/AppImages/twitter.jpg")} />
                </TouchableOpacity>    
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding:10,
      },
    setImage:{
        marginTop:10,
        width:100,
        height:100,
        borderRadius: 150,
    },
    setText:{
        fontSize:15,
        fontWeight: "bold",
    }
})

export default ContactUs;