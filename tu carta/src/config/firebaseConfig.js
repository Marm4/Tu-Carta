// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBy-lyFf0iVVJa2SAPKdTKL6gGp6GSDQA",
  authDomain: "tu-carta-f5121.firebaseapp.com",
  databaseURL: "https://tu-carta-f5121-default-rtdb.firebaseio.com",
  projectId: "tu-carta-f5121",
  storageBucket: "tu-carta-f5121.appspot.com",
  messagingSenderId: "749696003443",
  appId: "1:749696003443:web:05df80fb2c9fa4ff712906",
  measurementId: "G-3TG4DCM62M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export const firebaseApp = app;