import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDj83xiVnmXMSUmkisMrBjXij39Rm6k-S0",
    authDomain: "messenger-react-clone.firebaseapp.com",
    databaseURL: "https://messenger-react-clone.firebaseio.com",
    projectId: "messenger-react-clone",
    storageBucket: "messenger-react-clone.appspot.com",
    messagingSenderId: "297261441377",
    appId: "1:297261441377:web:121e0431ecc78bb229a520",
    measurementId: "G-Q2JPTSHDHB"
});

const db = firebaseApp.firestore();

export default db;

