import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfX_YAmTgnRvA9x1InJ1p20eX9LKH4lP8",
  authDomain: "signal-clone-994dd.firebaseapp.com",
  projectId: "signal-clone-994dd",
  storageBucket: "signal-clone-994dd.appspot.com",
  messagingSenderId: "408561333535",
  appId: "1:408561333535:web:09738a3ebb9f97cb912c2a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
