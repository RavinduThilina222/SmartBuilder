// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_JG6WStro-mdl5Tw3VB7Rfspd7rmoQfg",
  authDomain: "smartbuilder-41425.firebaseapp.com",
  projectId: "smartbuilder-41425",
  storageBucket: "smartbuilder-41425.firebasestorage.app",
  messagingSenderId: "910151364776",
  appId: "1:910151364776:web:09b084891b9b8a38f8929d",
  measurementId: "G-Y02MRZ22W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);