import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAJzmgw3pLFIdoyBgeNU-T-Io9wgo2ApuM",
  authDomain: "sign-in-f47eb.firebaseapp.com",
  databaseURL: "https://sign-in-f47eb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sign-in-f47eb",
  storageBucket: "sign-in-f47eb.firebasestorage.app",
  messagingSenderId: "606964441040",
  appId: "1:606964441040:web:56d9995ce030915fb023d5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getDatabase(app);
