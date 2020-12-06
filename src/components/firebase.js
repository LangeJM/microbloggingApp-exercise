import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from 'firebaseui'


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
const firebaseUi = new firebaseui.auth.AuthUI(firebase.auth());

export {microBlogDb, firebaseUi, firebaseApp, firebase}
