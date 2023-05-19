import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "learnapp-9b571.firebaseapp.com",
  projectId: "learnapp-9b571",
  storageBucket: "learnapp-9b571.appspot.com",
  messagingSenderId: "813193038435",
  appId: "1:813193038435:web:76245f6c53bddff0360656",
  measurementId: "G-G8VY86FGK8"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth()