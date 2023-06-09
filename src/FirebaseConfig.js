/* import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
 */

import { initializeApp } from 'firebase/app';

/*const config= {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};*/

const firebaseConfig = {
  apiKey: "AIzaSyCzVUJLjqVVllIREtA6U6cSoELZe6fMDXU",
  authDomain: "fir-recipes-c99a9.firebaseapp.com",
  projectId: "fir-recipes-c99a9",
  storageBucket: "fir-recipes-c99a9.appspot.com",
  messagingSenderId: "43554139626",
  appId: "1:43554139626:web:387cf413a6dd0bf3379693",
  measurementId: "G-8JZ7LTCVTM"
};

/*const firebaseConfig = {
  apiKey: "AIzaSyDUfyKvcKEsn4CSHCqf_goY_uiyMabxkuk",
  authDomain: "nissan-emea-nissan-emea-poc.firebaseapp.com",
  projectId: "nissan-emea-nissan-emea-poc",
  storageBucket: "nissan-emea-nissan-emea-poc.appspot.com",
  messagingSenderId: "664030411126",
  appId: "1:664030411126:web:09ed37b70476c5eacaa257"
};*/

/*if(!firebase.app.length) {
  firebase.initializeApp(config);
}*/

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;