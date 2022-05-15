import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBE7qDRDviJtWdwpiexYMWzF7xpyUBAhH4",
//   authDomain: "forumfeed-83986.firebaseapp.com",
//   projectId: "forumfeed-83986",
//   storageBucket: "forumfeed-83986.appspot.com",
//   messagingSenderId: "930854614593",
//   appId: "1:930854614593:web:f97b3b8685ff69465f78c0",
//   measurementId: "G-JLFQYXLHWZ"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);