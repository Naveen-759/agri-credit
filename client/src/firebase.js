// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqzX088OPgRzxsM6mUZSGRgg6DOBsjG-E",
  authDomain: "farmers-assistant-c46d8.firebaseapp.com",
  projectId: "farmers-assistant-c46d8",
  storageBucket: "farmers-assistant-c46d8.appspot.com",
  messagingSenderId: "15171032542",
  appId: "1:15171032542:web:b65166e78a070a824ff94f",
  measurementId: "G-G2BHE5025J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
