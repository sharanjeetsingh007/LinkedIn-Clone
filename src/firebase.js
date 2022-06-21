import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_BUCKET,
    messagingSenderId: process.env.REACT_APP_SENDER,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURE
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore();
const auth = firebase.auth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);


export { db, auth, provider, storage };