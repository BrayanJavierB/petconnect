// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXQzvVZWNXuD4_UgmH2mlb9NGtGlwAn3M",
  authDomain: "petconnect-dafa1.firebaseapp.com",
  projectId: "petconnect-dafa1",
  storageBucket: "petconnect-dafa1.appspot.com",
  messagingSenderId: "778152125977",
  appId: "1:778152125977:web:13fb6408bfae5f6f76ac88"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

export { db, auth };
export default appFirebase;