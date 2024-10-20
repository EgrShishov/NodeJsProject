import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import Navbar from './components/Navbar';
import { UserProvider } from './context/UserContext';
import { AuthProvider } from './context/AuthContext';
import './App.css'

function App() {
    return (
        <Router>
            <AuthProvider>
                <UserProvider>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/login" element={<LoginPage />} />
                    </Routes>
                </UserProvider>
            </AuthProvider>
        </Router>
    );
}

export default App
