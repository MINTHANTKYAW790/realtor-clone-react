// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC67XZ03bgcpZYEIvOQopbj2-4lSjr5o3c",
    authDomain: "realtor-clone-react-2f7ba.firebaseapp.com",
    projectId: "realtor-clone-react-2f7ba",
    storageBucket: "realtor-clone-react-2f7ba.appspot.com",
    messagingSenderId: "350434570801",
    appId: "1:350434570801:web:3efcaa0a75d7768fbf9b10",
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
