import firebase from "firebase/app";
import "firebase/storage";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBH2VyuGRRyJGt2rBKnVPCgOnWVDkLGP2Q",
    authDomain: "pronto-2020.firebaseapp.com",
    databaseURL: "https://pronto-2020.firebaseio.com",
    projectId: "pronto-2020",
    storageBucket: "pronto-2020.appspot.com",
    messagingSenderId: "169118528141",
    appId: "1:169118528141:web:461488bb88b8dd5347e8c4",
    measurementId: "G-EVN4Z9BT84"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();

export { storage, db, auth, firebase as default };