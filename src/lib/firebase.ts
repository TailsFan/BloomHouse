import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTU0OyTet69QyYeUoxfST9yZFYIi9FA2k",
  authDomain: "studio-9788913521-ea51e.firebaseapp.com",
  projectId: "studio-9788913521-ea51e",
  storageBucket: "studio-9788913521-ea51e.appspot.com",
  messagingSenderId: "857815780659",
  appId: "1:857815780659:web:b527817d4cd6747bcf0246"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
