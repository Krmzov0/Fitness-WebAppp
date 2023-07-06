import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBXKp04t_fcfrJEFSHQR02eKPceohY2nYk",
    authDomain: "startup-e254a.firebaseapp.com",
    projectId: "startup-e254a",
    storageBucket: "startup-e254a.appspot.com",
    messagingSenderId: "42247706918",
    appId: "1:42247706918:web:45e7f6eec58598d54209e7",
    measurementId: "G-12WY87FXTJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
