import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyADBq3v7EkuOsftDo846aZ5oC2ddzDjTkE",
  authDomain: "otakuverse-bc18e.firebaseapp.com",
  projectId: "otakuverse-bc18e",
  storageBucket: "otakuverse-bc18e.firebasestorage.app",
  messagingSenderId: "863820441057",
  appId: "1:863820441057:web:f5d87db483b930bc245ea0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
