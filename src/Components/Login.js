import React, { useEffect, useState } from "react";
import Image from "../Images/bg.jpg"

import { Link, useNavigate } from "react-router-dom";
import {
    auth,
    loginWithEmailAndPassword,
    signInWithGoogle
} from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    // TODO *************


    useEffect(() => {
        if (loading) return;
        if (user) navigate("/Home");
    }, [user, loading]);

    return (
        <div className="login">
            <div className="login_box">
                <input
                    type="text"
                    className="login_einput"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <input
                    type="password"
                    className="login_pinput"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button
                    className="login_btn"
                    // TODO *************
                    onClick={() => loginWithEmailAndPassword(email, password)}
                >
                    Login
                </button>
                <button
                    className="login_btn login_googlebtn"
                    // TODO *************
                    onClick={signInWithGoogle}
                >
                    <div>
                        Login with Google
                        <img
                            src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png"
                            alt=""
                        />
                    </div>
                </button>
                <div className="extra_options">
                    <div>
                        <Link to="/reset">Forgot Password</Link>
                    </div>
                    <div>
                        Don't have an account? <Link to="/register">Register</Link> now.
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Login;