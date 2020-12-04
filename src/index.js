import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import firebase from 'firebase';

// const config = {
//    apiKey: "***REMOVED***",
//    authDomain: "typecode-76g33.firebaseapp.com",
//    databaseURL: "https://typecode-76g33.firebaseio.com",
//    projectId: "typecode-76g33",
//    storageBucket: "",
//    messagingSenderId: "547432956432"
// };

// firebase.initializeApp(config);


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
