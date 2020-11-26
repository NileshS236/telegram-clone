import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxpR5W5NgqMrx-I2dvrXO6ML9CVl3r8yI",
  authDomain: "telegram-clone-32a3d.firebaseapp.com",
  databaseURL: "https://telegram-clone-32a3d.firebaseio.com",
  projectId: "telegram-clone-32a3d",
  storageBucket: "telegram-clone-32a3d.appspot.com",
  messagingSenderId: "72849850695",
  appId: "1:72849850695:web:64789b3bd37dc8069a4c62",
  measurementId: "G-SGS46MFCJY",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
