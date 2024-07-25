import React from 'react';


function SignUp() {
    return (
        <div className="form-container sign-up-container">
            <form action="#" method="post">
                <h1>Create Account</h1>
                <div className="social-container">
                    <a href="#" className="social" aria-label="Sign up with Facebook">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="social" aria-label="Sign up with Google">
                        <i className="fab fa-google-plus-g"></i>
                    </a>
                    <a href="#" className="social" aria-label="Sign up with LinkedIn">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
                <span>or register with your email address to join us.</span>
                <input type="text" placeholder="Name" aria-label="Name" required />
                <input type="email" placeholder="Email" aria-label="Email" required />
                <input type="password" placeholder="Password" aria-label="Password" required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
