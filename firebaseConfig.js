// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmoXg1kHXQ77WHt1tfzm4JtWufr451xXc",
  authDomain: "reactnativeauth-a5226.firebaseapp.com",
  projectId: "reactnativeauth-a5226",
  storageBucket: "reactnativeauth-a5226.appspot.com",
  messagingSenderId: "635527038457",
  appId: "1:635527038457:web:147444bec60324c0d46928"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);