import React, { useState } from 'react';
import '../style.css';
import SignIn from '../components/AuthForms/SignIn';
import SignUp from '../components/AuthForms/SignUp';

function AuthContainer() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className={`container ${!isSignIn ? 'right-panel-active' : ''}`} id="container">
            {/* Sign Up Form */}
            <div className={`form-container sign-up-container ${!isSignIn ? 'active' : ''}`}>
                <SignUp />
            </div>

            {/* Sign In Form */}
            <div className={`form-container sign-in-container ${isSignIn ? 'active' : ''}`}>
                <SignIn />
            </div>

            {/* Overlay Container */}
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Begin Your Journey</h1>
                        <p>Login to access your information and stay engaged.</p>
                        <button className="ghost" id="signIn" onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Nice to Meet You!</h1>
                        <p>Get started by entering your details and explore.</p>
                        <button className="ghost" id="signUp" onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthContainer;
