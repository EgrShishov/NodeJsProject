import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import HomePage from './pages/HomePage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Navbar from './components/NavBarComponent.jsx';
import RegisterPage from "./pages/RegisterPage.jsx";
import DoctorsPage from './pages/DoctorsPage.jsx';
import ProceduresPages from "./pages/ProceduresPage.jsx";
import DoctorDetailsPage from "./pages/DoctorDetailsPage.jsx";
import ProcedureDetailsPage from "./pages/ProcedureDetailsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import OfficesPage from "./pages/OfficesPage.jsx";
import './App.css';
import AboutUsPage from "./pages/AboutUsPage.jsx";
import ReceptionistsPage from "./pages/ReceptionistsPage.jsx";
import PatientsPage from "./pages/PatientsPage.jsx";
import PrescriptionPage from "./pages/PrescriptionsPage.jsx";
import SpecializationPage from "./pages/SpecializationsPage.jsx";
import ForbiddenPage from "./pages/ForbiddenPage.jsx";
import AppointmentsPage from "./pages/AppointmentsPage.jsx";
import PaymentsPage from "./pages/PaymentsPage.jsx";
import FooterComponent from "./components/FooterComponent.jsx";
import AddDoctorPage from "./pages/AddDoctorPage.jsx";
import PatientPage from "./pages/PatientPage.jsx";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />}/>
                    <Route path="/doctors" element={
                        <RequireRole allowedRoles={["receptionist"]}>
                            <DoctorsPage />
                        </RequireRole>
                    }/>
                    <Route path="/doctors/:id" element={<DoctorDetailsPage />} />
                    <Route path="/doctors/add" element={<AddDoctorPage />} />
                    <Route path="/procedures" element={<ProceduresPages />} />
                    <Route path="/procedures/:id" element={<ProcedureDetailsPage />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/offices" element={<OfficesPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path="/forbidden" element={<ForbiddenPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/receptionists" element={
                        <RequireRole allowedRoles={["receptionist"]}>
                            <ReceptionistsPage />
                        </RequireRole>
                    }/>
                    <Route path="/patients" element={
                        <RequireRole allowedRoles={["doctor", "receptionist"]}>
                            <PatientsPage />
                        </RequireRole>
                    }/>
                    <Route path="/patients/:id" element={
                        <RequireRole allowedRoles={["doctor", "receptionist"]}>
                            <PatientPage />
                        </RequireRole>
                    }>
                    </Route>
                    <Route path="/prescriptions" element={
                        <RequireRole allowedRoles={["doctor"]}>
                            <PrescriptionPage />
                        </RequireRole>
                    }/>
                    <Route path="/appointments" element={
                        <RequireRole allowedRoles={["doctor", "patient", "receptionist"]}>
                            <AppointmentsPage />
                        </RequireRole>
                    }/>
                    <Route path="/payments" element={
                        <RequireRole allowedRoles={["receptionist"]}>
                            <PaymentsPage />
                        </RequireRole>
                    }>
                    </Route>
                    <Route path="/specializations" element={<SpecializationPage />}></Route>
                </Routes>
            </AuthProvider>
            <FooterComponent/>
        </Router>
    );
}

function RequireRole({ allowedRoles, children }) {
    const { user, isAuthenticated } = useAuth();

    if (!user) return <div>Loading...</div>;
    return user && allowedRoles.includes(user.role) ? children : <Navigate to="/forbidden" replace />
}

export default App;
