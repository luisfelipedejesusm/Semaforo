import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import firebase from "firebase";

import './styles/app.css';


const db = firebase.initializeApp({
    apiKey: "AIzaSyAHEO56uqrszPv_hMrnnswG9W5JoCbnIIE",
    authDomain: "willy-d2082.firebaseapp.com",
    databaseURL: "https://willy-d2082-default-rtdb.firebaseio.com",
    projectId: "willy-d2082",
    storageBucket: "willy-d2082.appspot.com",
    messagingSenderId: "118177210997",
    appId: "1:118177210997:web:1bbb12ef98859b61404e3c",
    measurementId: "G-MM2H9QHGM5"
  });


  export default db;

ReactDOM.render(<App />, document.querySelector('.app-container'));