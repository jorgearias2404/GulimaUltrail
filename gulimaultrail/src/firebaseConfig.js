// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCUIeigFl9nnklmZ0zeXKD-RjM6NCRbDAA", // Reemplaza con tu API key real
  authDomain: "gulimaultrail2025.firebaseapp.com",
  databaseURL: "https://gulimaultrail2025-default-rtdb.firebaseio.com",
  projectId: "gulimaultrail2025",
  storageBucket: "gulimaultrail2025.firebasestorage.app",
  appId: "1:987617979068:web:41b41d6ff8d3272c093eb9", // Reemplaza con tu App ID real
  messagingSenderId: "G-XGZ8WLTV9K" // Número del proyecto
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };