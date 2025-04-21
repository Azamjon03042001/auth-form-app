// конфигурация Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK_LSTLWFteDdkAT0klgwje6O3D5QP-D4",
  authDomain: "portfolio-auth-2c467.firebaseapp.com",
  projectId: "portfolio-auth-2c467",
  appId: "1:233943051148:web:60255b07af50ebe25ac4a9",
  storageBucket: "portfolio-auth-2c467.appspot.com",
  messagingSenderId: "233943051148",
  measurementId: "G-KEG03C8J78",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
