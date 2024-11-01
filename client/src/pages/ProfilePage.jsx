import ProfileComponent from '../components/ProfileComponent.jsx';
import {useAuth} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {profile} from "../services/authService.js";
import ReceptionistActions from "../components/ReceptionistActionsComponent.jsx";
import PatientActions from "../components/PatientActions.jsx";
import DoctorActions from "../components/DoctorActionsComponent.jsx";
import {useNavigate} from "react-router-dom";

const ProfilePage = () => {
    const [ profileData, setProfile ] = useState(null);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await profile();
            setProfile(data);
            console.log(data);
        };

        fetchProfile();
    }, []);

    //receptionists actions
    const handleOnCreateAppointment = () => navigate('/appointments/add');
    const handleOnViewReceptionists = () => navigate('/receptionists/');
    const handleOnViewPatients = () => navigate('/patients/');
    const handleOnManageOffices = () => navigate('/offices/');
    const handleOnManageProcedures = () => navigate('/procedures/');
    const handleOnViewPayments = () => navigate('/payments/');

    //patients actions
    const handleMyAppointments = () => navigate(`/appointments/${user._id}`);
    const handleMyResults = () => navigate(`/results/${user._id}`);
    const handleMyPrescriptions = () => navigate(`/prescriptions/${user._id}`);
    const handleMyInvoices = () => navigate(`/invoices/${user._id}`);
    const handleMyPayments = () => navigate(`/payments/${user._id}`);

    //doctors actions
    const handleMyPatients = () => navigate(`/doctors/${user._id}/patients`);

    return (
        <div className="profile-page">
            <ProfileComponent profileData={profileData}/>
            {user.role === 'receptionist' && (
                <ReceptionistActions onCreateAppointment={handleOnCreateAppointment}
                onViewReceptionists={handleOnViewReceptionists}
                onViewPatients={handleOnViewPatients}
                onManageOffices={handleOnManageOffices}
                onManageProcedures={handleOnManageProcedures}
                onViewPayments={handleOnViewPayments}/>
            )}
            {user.role === 'doctor' && (
                <DoctorActions />
            )}
            {user.role === 'patient' && (
                <PatientActions
                onMyAppointments={handleMyAppointments}
                onMyResults={handleMyResults}
                onMyPrescriptions={handleMyPrescriptions}
                onMyInvoices={handleMyInvoices}
                onMyPayments={handleMyPayments}
                />
            )}
        </div>
    );
};

export default ProfilePage;