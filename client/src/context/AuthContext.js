import {createContext, useContext, useEffect, useState} from 'react';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = Cookies.get('auth-token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = (token) => {
        setIsAuthenticated(true);
        Cookies.set('auth-token', token, { expires: 7, secure: true, sameSite: 'Strict' });
    };

    const logout = () => {
        setIsAuthenticated(false);
        Cookies.remove('auth-token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};