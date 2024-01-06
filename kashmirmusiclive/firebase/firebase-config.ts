import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import {
  initializeFirestore,
  persistentLocalCache,
  getFirestore,
  Firestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// Initialize Firebase
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Authentication
const auth = getAuth();

// Initialize Firestore if it hasn't already been initialized
let db: Firestore;
try {
  db = getFirestore(app);
} catch (e) {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache(/*settings*/ {}),
  });
}

// Analytics
const analytics: Analytics | null =
  app.name && typeof window !== "undefined" ? getAnalytics(app) : null;

export { app, auth, db, analytics };
