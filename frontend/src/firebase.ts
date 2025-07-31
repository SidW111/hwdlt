import { initializeApp } from "firebase/app";

import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwyAvRAJopQZeWUMXhshMqdzCoGF1DtE8",
  authDomain: "notes-app-ad042.firebaseapp.com",
  projectId: "notes-app-ad042",
  storageBucket: "notes-app-ad042.firebasestorage.app",
  messagingSenderId: "934533579565",
  appId: "1:934533579565:web:afde9af3c8c377604449a4",
  measurementId: "G-SVJV13J7LZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();