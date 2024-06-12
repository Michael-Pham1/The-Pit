import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
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

const registerUserToMongo = async (username, email, uid, displayPicture, bio, created, win, lose) => {
    try {
        await axios.post('http://localhost:3100/api/register', {
            username,
            email,
            uid,
            displayPicture,
            bio,
            created,
            win,
            lose
        });
        console.log("Registered user successfully");
        sessionStorage.setItem('uid', uid);
        const uid2 = sessionStorage.getItem('uid')
        console.log("Registered users uid: ", uid2);
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
        const bio = "No Bio";
        const created = new Date();
        const win = "0";
        const lose = "0";
        const nameTemp = "GoogleUser";
        await registerUserToMongo(
            nameTemp,
            user.email,
            user.uid,
            user.photoURL,
            bio,
            created,
            win,
            lose
        );
        sessionStorage.setItem("uid", user.uid);
    } catch (error) {
        console.error("error message in signInWithGoogle", error.message);
        alert(error.message);
    }
};

const loginWithEmailAndPassword = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const user = response.user;
        sessionStorage.setItem('uid', user.uid);
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        const profilePic = "None";
        const bio = "No Bio";
        const created = new Date();
        const win = "0";
        const lose = "0";
        await registerUserToMongo(
            user.displayName = name,
            user.email,
            user.uid,
            profilePic,
            bio,
            created,
            win,
            lose
        );

    } catch (error) {
        console.error("error message in registerWithEmailAndPassword", error.message);
        alert(error.message);
    }
};

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset Email sent");
    } catch (error) {
        console.error(error.message);
        alert(error.message);
    }
};

const logOut = (auth) => {
    sessionStorage.setItem("uid", null);
    return signOut(auth);
};

export { auth, db, sendPasswordReset, registerWithEmailAndPassword, signInWithGoogle, loginWithEmailAndPassword, logOut };
