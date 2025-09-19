import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-1L8Twg3SgBEbgDoCboHqs58yrTKgv5M",
  authDomain: "login-system-44c95.firebaseapp.com",
  projectId: "login-system-44c95",
  storageBucket: "login-system-44c95.firebasestorage.app",
  messagingSenderId: "110322430057",
  appId: "1:110322430057:web:8d5cde051ff5d212a472f8",
  measurementId: "G-JRD0JRYJW3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
