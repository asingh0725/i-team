import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJ2eE9BiUjTr-PtewX_12kyk_dDH58URY",
  authDomain: "share-a-bite-815b4.firebaseapp.com",
  projectId: "share-a-bite-815b4",
  storageBucket: "share-a-bite-815b4.appspot.com",
  messagingSenderId: "1071459145310",
  appId: "1:1071459145310:web:f952d76df636a485f006cf",
  measurementId: "G-C11Z43X2Y8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export const auth = getAuth(app);
export { db, storage };
