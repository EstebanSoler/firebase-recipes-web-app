import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { getFirestore } from 'firebase/firestore/lite';
import { getStorage } from 'firebase/storage';

/*const config= {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};*/

const config = {
  apiKey: "AIzaSyCzVUJLjqVVllIREtA6U6cSoELZe6fMDXU",
  authDomain: "fir-recipes-c99a9.firebaseapp.com",
  projectId: "fir-recipes-c99a9",
  storageBucket: "fir-recipes-c99a9.appspot.com",
  messagingSenderId: "43554139626",
  appId: "1:43554139626:web:387cf413a6dd0bf3379693",
  measurementId: "G-8JZ7LTCVTM"
};

const firebaseApp = initializeApp(config);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const firebaseConfig = {
  auth,
  firestore,
  storage,
};

//export default firebaseApp;

export default firebaseConfig;