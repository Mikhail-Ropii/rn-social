import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc_k6htdZA_FJnxr91kTDhLcI2LKkqvlY",
  authDomain: "rn-social-dd584.firebaseapp.com",
  projectId: "rn-social-dd584",
  storageBucket: "rn-social-dd584.appspot.com",
  messagingSenderId: "773501439875",
  appId: "1:773501439875:web:3170cacbdc33fd3c1b30b6",
  measurementId: "G-4DJSQQ2FY8",
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
