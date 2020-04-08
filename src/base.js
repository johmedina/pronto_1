import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBH2VyuGRRyJGt2rBKnVPCgOnWVDkLGP2Q",
    authDomain: "pronto-2020.firebaseapp.com",
    databaseURL: "https://pronto-2020.firebaseio.com",
    projectId: "pronto-2020",
    storageBucket: "pronto-2020.appspot.com",
    messagingSenderId: "169118528141",
    appId: "1:169118528141:web:461488bb88b8dd5347e8c4",
    measurementId: "G-EVN4Z9BT84"
}

// Initialize Firebase
const app = firebase.initializeApp(config);
firebase.analytics();
const base = Rebase.createClass(app.database())

export {base}
