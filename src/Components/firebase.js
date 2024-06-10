// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import axios from 'axios';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from 'firebase/auth';

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where
} from 'firebase/firestore';
import { Navigate } from 'react-router-dom';


const firebaseConfig = {
    apiKey: "AIzaSyDy0sxwgTZ32dxnJUNEtRwDT9Yr8i5oDvM",
    authDomain: "thepit-e095b.firebaseapp.com",
    projectId: "thepit-e095b",
    storageBucket: "thepit-e095b.appspot.com",
    messagingSenderId: "211104345389",
    appId: "1:211104345389:web:fa4a29b8bad97bcdddf7a4",
    measurementId: "G-PGZKGHFNKT"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();


const registerUserToMongo = async (name, email, uid, displayPicture) => {

    try {
        // console.log(name, email, uid, displayPicture);
        // console.log("about to enter wait");
        await axios.post('https://the-pit-backend.vercel.app/api/register', {
            name,
            email,
            uid,
            displayPicture
        });
        console.log("Registered user successfully");
    } catch (err) {
        console.error("This is the error is the rutg", err);
    }
};


const signInWithGoogle = async () => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        const user = response.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        await registerUserToMongo(
            user.displayName,
            user.email,
            user.uid,
            user.photoURL
        );
    } catch (error) {
        console.error("error message in signInWithGoogle", error.message);
        alert(error.message);
    }
};

const loginWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error.message);
        alert(error.message);

    };

};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        const profilePic = "None"
        await registerUserToMongo(
            user.displayName = name,
            user.email,
            user.uid,
            profilePic
        );
    } catch (error) {
        console.error("error message in registerWithEmailAndPassword", error.message);
        alert(error.message);
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset Email sent");

    } catch (error) {
        console.error(error.message);
        alert(error.message);

    };

};


const logOut = () => {
    signOut(auth);
};





export { auth, db, sendPasswordReset, registerWithEmailAndPassword, signInWithGoogle, loginWithEmailAndPassword, logOut };

