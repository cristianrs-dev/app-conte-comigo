import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6La-DP5JrxzxsAL-2VOCL2xr4I6iFB3A",
  authDomain: "conte-comigo-a3a67.firebaseapp.com",
  projectId: "conte-comigo-a3a67",
  storageBucket: "conte-comigo-a3a67.firebasestorage.app",
  messagingSenderId: "795235615155",
  appId: "1:795235615155:web:470acddad3ef1af9f4cbc6",
  measurementId: "G-8L87WRGTR8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
