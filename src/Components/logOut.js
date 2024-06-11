import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logOut } from "./firebase";
import "./Login.css";

const LogOutNav = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut(auth).then(() => {
            navigate("/");
            console.log("User signed out");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    return (
        <button id='logOut' onClick={handleLogOut}>Log Out</button>
    );
};

export default LogOutNav;
