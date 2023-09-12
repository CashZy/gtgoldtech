// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBDdyX4yPHdHhc9T2xNGufM5qBiVGmEpMA",
  authDomain: "gtgold-2c60a.firebaseapp.com",
  projectId: "gtgold-2c60a",
  storageBucket: "gtgold-2c60a.appspot.com",
  messagingSenderId: "946171523210",
  appId: "1:946171523210:web:3dbf04c06ca1c48744fd73",
  measurementId: "G-91RPZP3K2E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Get the authentication service from the app instance
export default app; // Export the app instance if you need to access other Firebase services
