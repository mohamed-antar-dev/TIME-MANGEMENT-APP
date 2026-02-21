import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmzwLKLGmACs2-RsPdVCBAl--5EanYI14",
  authDomain: "focus-space-fe2d1.firebaseapp.com",
  projectId: "focus-space-fe2d1",
  storageBucket: "focus-space-fe2d1.firebasestorage.app",
  messagingSenderId: "641603699902",
  appId: "1:641603699902:web:92a8c3214b9fade1264aef",
  measurementId: "G-KNQ61RGZZE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();