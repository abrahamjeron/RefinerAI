import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBjO2o70GSFLMJ6Js9S0o7AQXyG0VhJxhg",
  authDomain: "refinerai.firebaseapp.com",
  projectId: "refinerai",
  storageBucket: "refinerai.appspot.com", // Corrected the storageBucket URL
  messagingSenderId: "699135533245",
  appId: "1:699135533245:web:0b9972190abe48177e97d4",
  measurementId: "G-GJFQJXFEG9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GithubAuthProvider();

export { auth, provider, signInWithPopup, signOut };
