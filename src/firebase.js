import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDYGsUVTfyMJK8rogmb3r4Ng5hD65IQH64",
    authDomain: "quiz-4caaf.firebaseapp.com",
    projectId: "quiz-4caaf",
    storageBucket: "quiz-4caaf.appspot.com",
    messagingSenderId: "1082015479018",
    appId: "1:1082015479018:web:9c04ff724084c82080d393",
    measurementId: "G-6ECYP7F27F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };