import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBH2VyuGRRyJGt2rBKnVPCgOnWVDkLGP2Q",
    authDomain: "pronto-2020.firebaseapp.com",
    databaseURL: "https://pronto-2020.firebaseio.com",
    projectId: "pronto-2020",
    storageBucket: "pronto-2020.appspot.com",
    messagingSenderId: "169118528141",
    appId: "1:169118528141:web:461488bb88b8dd5347e8c4",
    measurementId: "G-EVN4Z9BT84"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
    this.storage = app.storage();
  }

  /* Auth API for signing in*/
  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');
}

const storage = Firebase.storage();

export { storage }
export default Firebase;
