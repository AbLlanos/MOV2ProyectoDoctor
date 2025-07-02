// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrqVKySejrYf6BTeY7LHpIuGdQa1x2ZMs",
  authDomain: "fir-5113d.firebaseapp.com",
  databaseURL: "https://fir-5113d-default-rtdb.firebaseio.com",
  projectId: "fir-5113d",
  storageBucket: "fir-5113d.firebasestorage.app",
  messagingSenderId: "98981681143",
  appId: "1:98981681143:web:2528287486e71e86c580f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db =  getDatabase(app);