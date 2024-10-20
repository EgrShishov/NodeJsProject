import { createContext, useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const login = (userData) => {
        if (isAuthenticated) {
            setUser(userData);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
      <UserContext.Provider value={[ user, login, logout ]}>
          {children}
      </UserContext.Provider>
    );
};