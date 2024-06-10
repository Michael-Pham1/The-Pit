import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Reset() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // TODO *************

    return (
        <div className="login">
            <div className="login_box">
                <input
                    type="text"
                    className="reset__textBox"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail Address"
                />
                <button
                    style={{ marginTop: "20px" }}
                    className="reset__btn"
                // TODO *************
                >
                    Send password reset email
                </button>
                <div style={{ marginTop: "20px" }}>
                    Don't have an account? <Link to="/register">Register</Link> now.
                </div>
            </div>
        </div>
    );
}

export default Reset;