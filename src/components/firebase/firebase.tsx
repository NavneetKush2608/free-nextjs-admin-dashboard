// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeoqVd-hB84IwdJjFYuVBFk0bz5ngDwPg",
  authDomain: "airwatch-48b0e.firebaseapp.com",
  projectId: "airwatch-48b0e",
  storageBucket: "airwatch-48b0e.appspot.com",
  messagingSenderId: "998560344282",
  appId: "1:998560344282:web:0854d868f68c625c2a5de3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
export default app;