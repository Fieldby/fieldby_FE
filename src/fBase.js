// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6-FoXJgmC1fkaeGkhvCaPkyeJPOtLTio",
  authDomain: "fieldby-web.firebaseapp.com",
  databaseURL:
    "https://fieldby-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fieldby-web",
  storageBucket: "fieldby-web.appspot.com",
  messagingSenderId: "513070035696",
  appId: "1:513070035696:web:213b83777dc425df830835",
  measurementId: "G-MGB1RD8ZEF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const realtimeDbService = getDatabase(app);
export const storageService = getStorage(app);
