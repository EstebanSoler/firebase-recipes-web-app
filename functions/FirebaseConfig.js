const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./key.json");

const FIREBASE_STORAGE_BUCKET = "fir-recipes-c99a9.appspot.com";

const apiFirebaseOptions = {
  ...functions.config().firebase,
  credential: admin.credential.applicationDefault(),
  projectId: "fir-recipes-c99a9",
};

//admin.initializeApp(apiFirebaseOptions);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };

firestore.settings(settings);

const storageBucket = admin.storage().bucket(FIREBASE_STORAGE_BUCKET);
const auth = admin.auth();

module.exports = { functions, auth, firestore, storageBucket, admin };

