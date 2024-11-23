import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import CurrentTimeComponent from "../components/CurrentTimeComponent.jsx";
import {toast, ToastContainer} from "react-toastify";

const LoginPage = () => {
    const { userLogin, googleLogin, facebookLogin } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const error = await userLogin({ email: email, password: password });
            if (error) toast.error(`Произошла ошибка во время авторизации: ${error}`);
        } catch (error) {
            toast.error(`Произошла ошибка: ${error.message}`);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
        } catch (error) {
            toast.error(`Произошла ошибка во время авторизации: ${error.message}`);
        }
    };

    const handleFacebookLogin = async () => {
        try {
            await facebookLogin();
        } catch (error) {
            toast.error(`Произошла ошибка: ${error.message}`);
        }
    };

    return (
        <div className="login-component">
            <ToastContainer />
            <CurrentTimeComponent />
            <div className="login-wrapper">
                <form className="login-form" onSubmit={handleLogin}>
                    <h1 className="login-title">С возвращением!</h1>
                    <input
                        type="email"
                        placeholder="Электронная почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-btn">Войти</button>
                </form>

                <div className="social-login">
                    <button
                        onClick={handleGoogleLogin}
                        className="gsi-material-button">
                        <div className="gsi-material-button-state"></div>
                        <div className="gsi-material-button-content-wrapper">
                            <div className="gsi-material-button-icon">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"
                                     xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                                    <path fill="#EA4335"
                                          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                    <path fill="#4285F4"
                                          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                    <path fill="#FBBC05"
                                          d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                    <path fill="#34A853"
                                          d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                    <path fill="none" d="M0 0h48v48H0z"></path>
                                </svg>
                            </div>
                            <span className="gsi-material-button-contents">Продолжить с аккаунтом Google</span>
                            <span style={{display: "none"}}>Продолжить с аккаунтом Google</span>
                        </div>
                    </button>
                    <div
                        className="fb-login-button"
                        onClick={handleFacebookLogin}
                        data-width="fit-content"
                        data-size=""
                        data-button-type=""
                        data-layout=""
                        data-auto-logout-link="false"
                        data-use-continue-as="false">
                    </div>
                </div>

                <div className="register-link">
                    Нет аккаунта? <Link to="/register" className="register-link-text">Зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;