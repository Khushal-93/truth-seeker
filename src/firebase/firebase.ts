// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQ8XF6N_NfPHtgW0ZUSYX1lrRfznQJ_80",
  authDomain: "deepguard-41a7d.firebaseapp.com",
  projectId: "deepguard-41a7d",
  storageBucket: "deepguard-41a7d.firebasestorage.app",
  messagingSenderId: "562970883464",
  appId: "1:562970883464:web:076567fe936da7be87f63d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);