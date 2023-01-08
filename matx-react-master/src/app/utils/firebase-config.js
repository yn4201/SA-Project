import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyAGHAvpJq-REnXAqv9td33bzMHvC_f_B4c",
    authDomain: "sa-project-613df.firebaseapp.com",
    databaseURL: "https://sa-project-613df-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "sa-project-613df",
    storageBucket: "sa-project-613df.appspot.com",
    messagingSenderId: "52224290883",
    appId: "1:52224290883:web:01fbfaa2d88e86c453e4f6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);