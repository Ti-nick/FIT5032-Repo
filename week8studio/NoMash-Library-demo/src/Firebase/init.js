// src/firebase/init.js
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDgYzjToGjhvoskO_OUtYk7sajMj1a84mU",
  authDomain: "week7-nick.firebaseapp.com",
  projectId: "week7-nick",
  storageBucket: "week7-nick.firebasestorage.app",
  messagingSenderId: "1035049370601",
  appId: "1:1035049370601:web:db974c979390286cacc178"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
auth.useDeviceLanguage()
const db = getFirestore(app)

export default db;