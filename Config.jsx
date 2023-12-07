// Config.jsx
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAVEACyHYT1ptYbYukvBAwiJkMWRUj_ev0",
    authDomain: "santa-a56f6.firebaseapp.com",
    projectId: "santa-a56f6",
    storageBucket: "santa-a56f6.appspot.com",
    messagingSenderId: "123080345343",
    appId: "1:123080345343:web:5930d8282c1589b22b6eca",
    measurementId: "G-292VFY1T2Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

