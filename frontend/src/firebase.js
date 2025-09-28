// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCCqzaCvHJfH5Jbv77T0Q3V3J6FFRX1P98",
  authDomain: "sih-25067-protoype.firebaseapp.com",
  projectId: "sih-25067-protoype",
  storageBucket: "sih-25067-protoype.firebasestorage.app",
  messagingSenderId: "1049885205453",
  appId: "1:1049885205453:web:f0077159a02d7747da1a84",
  measurementId: "G-N5N1HHHVL9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication module
export const auth = getAuth(app);
