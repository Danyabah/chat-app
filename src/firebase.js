import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDtUZ1yRYaSXwuHZ0e-dv9i_iVAHUwx6Xg",
  authDomain: "chat-by-danya.firebaseapp.com",
  projectId: "chat-by-danya",
  storageBucket: "chat-by-danya.appspot.com",
  messagingSenderId: "253606642285",
  appId: "1:253606642285:web:2a8ee951325e5aa7c17564",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
