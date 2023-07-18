import firebaseApp from "./FirebaseConfig";

import { getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail as sendResetMail,
  onAuthStateChanged,
  GoogleAuthProvider ,
  signInWithPopup,
} from "firebase/auth";

//const auth = getAuth(firebaseApp);
const auth = firebaseApp.auth;

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = ()=> {
  return signOut(auth);
};

const sendPasswordResetEmail = (email) => {
  return sendResetMail(auth,email);
};

const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  return signInWithPopup(auth, provider);
};

const subscribeToAuthChanges = (handleAuthChange) => {
  onAuthStateChanged(auth, user => {
    handleAuthChange(user);
  })
};

const FirebaseAuthService = {
  registerUser,
  loginUser,
  logoutUser,
  loginWithGoogle,
  sendPasswordResetEmail,
  subscribeToAuthChanges,
};

export default FirebaseAuthService;
