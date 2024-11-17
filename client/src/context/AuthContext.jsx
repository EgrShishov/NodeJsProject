import { createContext, useContext, useEffect, useState } from 'react';
import {register, logout, login, google, facebook, profile, refresh} from "../services/authService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const profileData = await profile();
                setUser(profileData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Fetching profile failed:", error);
                try {
                    await refresh();
                    const profileData = await profile();
                    setUser(profileData);
                    setIsAuthenticated(true);
                } catch (refreshError) {
                    setIsAuthenticated(false);
                    navigate('/login');
                }
            }
        };

        fetchUserProfile();
    }, []); // удаляется isAuthenticated если перезайти на страницу, из-за который fetch profile упадет

    const loginAction = async (userData) => {
        try {
            await login(userData);
            setIsAuthenticated(true);
            const profileData = await profile();
            setUser(profileData);
        } catch (error) {
            console.error(`Error occurred in login action: ${error}`);
            navigate('/home');
        }
    };

    const googleLogin = async () => {
        try {
            google();
            const profileData = await profile();
            if (profileData) {
                setUser(profileData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Google login failed:', error);
            navigate('/login');
        }
    }

    const facebookLogin = async () => {
        try {
            facebook();
            const profileData = await profile();
            if (profileData) {
                setUser(profileData);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Facebook login failed:', error);
            navigate('/login');
        }
    }

    const userRegister = async (userData) => {
        try {
            await register(userData);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            navigate('/login');
        }
    }

    const userLogout = async () => {
        try {
/*
            await logout();
*/
            setIsAuthenticated(false);
            navigate('/home');
        } catch (error) {
            console.error(`Logout error: ${error}`);
            navigate('/home');
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            user,
            userLogin: loginAction,
            googleLogin,
            facebookLogin,
            userRegister,
            userLogout,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);