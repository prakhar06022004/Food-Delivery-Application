import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "food-delivery-app-c69ec.firebaseapp.com",
  projectId: "food-delivery-app-c69ec",
  storageBucket: "food-delivery-app-c69ec.firebasestorage.app",
  messagingSenderId: "777585424632",
  appId: "1:777585424632:web:27d403b152b66fa2a8630d",
  measurementId: "G-R18EEYRTJG",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth };