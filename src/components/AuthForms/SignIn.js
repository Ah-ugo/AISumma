import React from 'react';

function SignIn() {
    return (
        <div className="form-container sign-in-container">
            <form action="#" method="post">
                <h1>Sign In</h1>
                <div className="social-container">
                    <a href="#" className="social" aria-label="Sign in with Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social" aria-label="Sign in with Google">
                        <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social" aria-label="Sign in with LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <span>or access your account</span>
                <input type="email" placeholder="Email" aria-label="Email" required />
                <input type="password" placeholder="Password" aria-label="Password" required />
                <a href="#" aria-label="Forgot your password?">Forgot your password?</a>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;

