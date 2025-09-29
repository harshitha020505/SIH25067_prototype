// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBezRJCYmAxK7C9jH4PPXsF3RisytD9KFU",
    authDomain: "fra-atlas-qr.firebaseapp.com",
    projectId: "fra-atlas-qr",
    storageBucket: "fra-atlas-qr.firebasestorage.app",
    messagingSenderId: "383425701953",
    appId: "1:383425701953:web:56e78482cc7efa25bb3ec0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };