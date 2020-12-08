import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from 'firebaseui'
import 'firebase/storage';


const config = {
  apiKey: "***REMOVED***",
  authDomain: "microblogging-app-jml.firebaseapp.com",
  projectId: "microblogging-app-jml",
  storageBucket: "microblogging-app-jml.appspot.com",
  messagingSenderId: "299746603400",
  appId: "1:299746603400:web:ca95cdbb73fffd0da64a3d",
  measurementId: "G-LPWELE39KE"
};

const firebaseApp = firebase.initializeApp(config);
const microBlogDb = firebaseApp.firestore();
const firebaseAuth = firebase.auth();
const firebaseUi = new firebaseui.auth.AuthUI(firebaseAuth);
const firebaseStorage = firebase.storage();


export {firebaseAuth, microBlogDb, firebaseUi, firebaseApp, firebaseStorage, firebase}
