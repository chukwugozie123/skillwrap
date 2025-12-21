// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD72LZIxThK-KdAe9yW5PAXci8xUF-qcHw",
  authDomain: "skillwrap-8d1e1.firebaseapp.com",
  projectId: "skillwrap-8d1e1",
  storageBucket: "skillwrap-8d1e1.firebasestorage.app", // check note below 👇
  messagingSenderId: "942413019045",
  appId: "1:942413019045:web:4e30dd9214e2b66d339a4c",
  measurementId: "G-3D5BGEBXM8",
};

// ✅ Prevents reinitializing Firebase during Next.js hot reload
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Exports you’ll use everywhere else
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;




