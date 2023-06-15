// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrrsALTSphTmV_aFIY8Kjz_NLYlT8QU50",
  authDomain: "dolevip-b3db5.firebaseapp.com",
  projectId: "dolevip-b3db5",
  storageBucket: "dolevip-b3db5.appspot.com",
  messagingSenderId: "756917064075",
  appId: "1:756917064075:web:03365e857609ad9ca61f8e",
  measurementId: "G-DJKYK3MHFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Get the authentication service from the app instance
export default app; // Export the app instance if you need to access other Firebase services
