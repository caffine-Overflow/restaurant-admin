import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyCis-4ZpDx3BqWmoGsbkNETHnU2YFkXszI",
  authDomain: "restaurant-app-1e6ad.firebaseapp.com",
  databaseURL: "https://restaurant-app-1e6ad-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-1e6ad",
  storageBucket: "restaurant-app-1e6ad.appspot.com",
  messagingSenderId: "1023110465113",
  appId: "1:1023110465113:web:8b52ab93e6696b26ae5348",
  measurementId: "G-EJ65K78371",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Make sure db is properly initialized
const storage = getStorage(app);

export { app, auth, db, storage };
