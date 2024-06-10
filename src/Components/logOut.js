import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, logOut } from "./firebase";

const LogOutNav = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            console.error("Error signing out: ", error);
        });
    };

    return (
        <button onClick={handleLogOut}>Log Out</button>
    );
};

export default LogOutNav;
