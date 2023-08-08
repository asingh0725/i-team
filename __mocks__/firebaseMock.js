import { getFirestore, getStorage } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Mock Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Check if the app is already initialized to avoid duplicate initialization
let app;
try {
  // If the app is already initialized, use the existing app instance
  app = getFirestore().app;
} catch (error) {
  // If the app is not initialized, initialize it with the provided config
  import("firebase/app").then(({ initializeApp }) => {
    app = initializeApp(firebaseConfig);
  });
}

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
