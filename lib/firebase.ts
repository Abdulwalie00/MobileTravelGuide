import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyAon-f7X0JVCYNSc3uYvhV4evIU0-_hAt0",
    authDomain: "mobiletravelguide-c1950.firebaseapp.com",
    projectId: "mobiletravelguide-c1950",
    storageBucket: "mobiletravelguide-c1950.firebasestorage.app",
    messagingSenderId: "121688331907",
    appId: "1:121688331907:web:c7722b0f3454a63f06adb6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { db, storage }; // Export both db and storage
