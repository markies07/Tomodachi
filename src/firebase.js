// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBey89HbD7Ng5k7ueo-h6l_o1_RwQjXa0E",
    authDomain: "tomodachi-305bb.firebaseapp.com",
    projectId: "tomodachi-305bb",
    storageBucket: "tomodachi-305bb.firebasestorage.app",
    messagingSenderId: "39432359898",
    appId: "1:39432359898:web:a9eedc688a2b3b3ed23ae3",
    measurementId: "G-QLERSSRRC5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage};