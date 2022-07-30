import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCKbsazH8T5vMuuHH8khTAvrGQxCJudqeA",
    authDomain: "crop-irrigation-system.firebaseapp.com",
    projectId: "crop-irrigation-system",
    storageBucket: "crop-irrigation-system.appspot.com",
    messagingSenderId: "14173826254",
    appId: "1:14173826254:web:6f08af7dd2732e9072349f",
    measurementId: "G-RMSLMPZ3R9"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}else {
    firebase.app(); // if already initialized, use that one
}

export {firebase}
