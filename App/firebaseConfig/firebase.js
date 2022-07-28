import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyA38Z2-fiYBUal9xgx1cH0xmEV46bxAZEU",
    authDomain: "fyp-project-3b8d2.firebaseapp.com",
    databaseURL: "https://fyp-project-3b8d2-default-rtdb.firebaseio.com",
    projectId: "fyp-project-3b8d2",
    storageBucket: "fyp-project-3b8d2.appspot.com",
    messagingSenderId: "331535948268",
    appId: "1:331535948268:web:44d18d0736421f869608c9",
    measurementId: "G-H8JH8DDPNP",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}

export {firebase}
