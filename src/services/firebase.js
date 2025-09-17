
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA41ErQ1sXo2yrjLwv70ACJYDZvthjkLJQ",
  authDomain: "fir-login-8e6a3.firebaseapp.com",
  projectId: "fir-login-8e6a3",
  storageBucket: "fir-login-8e6a3.firebasestorage.app",
  messagingSenderId: "225578314310",
  appId: "1:225578314310:web:5c620b7e1bbb209008b847",
  measurementId: "G-WQSSMMGWQM"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
   