import firebase from 'firebase';

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


export default microBlogDb;