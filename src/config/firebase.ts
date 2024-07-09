import {API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID} from '@env'

// Import the functions you need from the SDKs you need
import {FirebaseApp, initializeApp} from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
};

console.log("Valor de configuracion", firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
if (app) {
    console.log('Firebase initialized successfully');
} else {
    console.log('Firebase initialization failed');
}

const database = getFirestore(app);
if (database) {
    console.log('Firestore initialized correctly');
} else {
    console.log('Firestore initialization failed');
}

const storage = getStorage(app);

if (storage) {
    console.log('storage initialized correctly');
} else {
    console.log('storage initialization failed');
}

const authentication = getAuth(app);
if (authentication) {
    console.log('Authentication initialized correctly');
} else {
    console.log('Authentication initialization failed');
}

export {database, storage, authentication};