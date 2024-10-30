import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {Link, useNavigate} from 'react-router-dom';
import CurrentTimeComponent from "../components/CurrentTimeComponent.jsx";

const LoginPage = () => {
    const { userLogin, googleLogin, facebookLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await userLogin({ email: email, password: password });
            navigate('/home');
        } catch (error) {
            setError(`Login failed, please check your credentials: ${error.message}`);
            console.log(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
        } catch (error) {
            setError(`Google login failed: ${error.message}`);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await facebookLogin();
        } catch (error) {
            setError(`Facebook login failed: ${error.message}`);
        }
    };

    return (
        <div className="login-component">
            <CurrentTimeComponent />
            <form id="login-form" onSubmit={handleLogin}>
                <h1>С возвращением!</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="submit"
                    value="Login"
                />
            </form>

            <div className="social-login">
                <button onClick={handleGoogleLogin} className="google-login-btn">Login with Google</button>
                <button onClick={handleFacebookLogin} className="facebook-login-btn" >Login with Facebook</button>
            </div>

            <div>
                Do not have account? Then <Link to="/register">Register</Link>
            </div>
        </div>
    );
};

export default LoginPage;