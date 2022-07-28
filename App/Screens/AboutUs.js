import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const AboutUs = (props) => {
    return (
        <View>
                <Image source={require("../assets/AppImages/Aboutus.jpg")} />
            <View style={styles.textContainer}>
                <Text style={styles.setText}>
                    Crop Irrigation System might be the most distinctive IOT App we've come across. It is a design 
                    By a Group of Individual Develper.
                </Text>
                <Text style={styles.setText}>
                    Why are they a distinctive App presence?
                </Text>
                <Text style={styles.setText}>
                    Because their page takes parallax scrolling to the next level. The snowy effects, bold colors, 
                    and quirky visuals create a truly captivating experience.
                </Text>
                <Text style={styles.setText}>
                    "Tell a story and testify to the richness of one of our most precious resources".
                </Text>
                <Text style={styles.setText}>
                    No problem - the page also features useful links to her social media pages, as well as her online shop.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    Container: {
        backgroundColor: "#fff",
    },
    textContainer:{
        paddingTop:35,
        padding: 15,
    },
    setText: {
        fontWeight:"bold",
        textAlign:"center",
        fontSize: 16,
        marginBottom:5,
    }
})

export default AboutUs;