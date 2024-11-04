import ProfileComponent from '../components/ProfileComponent.jsx';
import {useAuth} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {profile} from "../services/authService.js";
import ReceptionistActions from "../components/ReceptionistActionsComponent.jsx";
import PatientActions from "../components/PatientActions.jsx";
import DoctorActions from "../components/DoctorActionsComponent.jsx";
import {useNavigate} from "react-router-dom";
import AddPrescriptionModal from "../components/AddPrescriptionModal.jsx";
import {createPrescription} from "../services/prescriptionsService.js";
import {createResult} from "../services/resultsService.js";
import AddResultsModal from "../components/AddResultsModal.jsx";
import DoctorScheduleComponent from "../components/DoctorScheduleComponent.jsx";
import {getDoctorsSchedule} from "../services/appointmentsService.js";

const ProfilePage = () => {
    const [profileData, setProfile] = useState(null);
    const [scheduleOpened, setScheduleOpened] = useState(false);
    const [resultsModalOpened, setResultsModalOpened] = useState(false);
    const [prescriptionsModalOpened, setPrescriptionsModalOpened] = useState(false);
    const [scheduleSlots, setScheduleSlots] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchProfile = async () => {
        try {
            setError(null);
            const data = await profile();
            if (data) setProfile(data);
            else setError('Error in fetching profile data');
        } catch (error) {
            setError(error.message);
            navigate('/login');
        }
    };

    const fetchScheduleSlots = async () => {
        try {
            setError(null);
            const data = await getDoctorsSchedule();
            if (data) setScheduleSlots(data);
            else setError('Error in fetching doctors slots');
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchScheduleSlots()
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
    const handleMyAppointments = () => navigate(`/appointments/${profileData._id}`);
    const handleMyResults = () => navigate(`/results/${profileData._id}`);
    const handleMyPrescriptions = () => navigate(`/prescriptions/${profileData._id}`);
    const handleMyInvoices = () => navigate(`/invoices/${profileData._id}`);
    const handleMyPayments = () => navigate(`/payments/${profileData._id}`);

    //doctors actions
    const handleMyPatients = () => navigate(`/doctors/${profileData._id}/patients`);
    const handleAddPrescription = () => openPrescriptionModal();
    const handleViewSchedule = () => setScheduleOpened(!scheduleOpened);
    const handleAddResults = () => openResultsModal();

    const openPrescriptionModal = () => setPrescriptionsModalOpened(true);
    const closePrescriptionModal = () => setPrescriptionsModalOpened(false);

    const openResultsModal = () => setResultsModalOpened(true);
    const closeResultsModal = () => setResultsModalOpened(false);

    const handleAddingPrescription = async (data) => {
        try {
            setError(null);
            const response = await createPrescription(data);
            if (response) {
                closePrescriptionModal();
            }
        } catch (error){
            setError(error.message);
        }
    }

    const handleAddingResults = async (data) => {
        try {
            setError(null);
            await createResult(data);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="profile-page">
            {error && <div className="error">{error}</div>}
            {prescriptionsModalOpened &&  <AddPrescriptionModal
                    isOpen={prescriptionsModalOpened}
                    onClose={closePrescriptionModal}
                    onSubmit={handleAddPrescription}
                    doctor={profileData}
            />}
            {resultsModalOpened && <AddResultsModal
                isOpen={resultsModalOpened}
                onClose={closeResultsModal}
                onSubmit={handleAddResults}
            />}
            <ProfileComponent profileData={profileData}/>
            {user && user.role === 'receptionist' && (
                <ReceptionistActions onCreateAppointment={handleOnCreateAppointment}
                onViewReceptionists={handleOnViewReceptionists}
                onViewPatients={handleOnViewPatients}
                onManageOffices={handleOnManageOffices}
                onManageProcedures={handleOnManageProcedures}
                onViewPayments={handleOnViewPayments}/>
            )}
            {user && user.role === 'doctor' && (
                <>
                    <DoctorActions
                        onViewPatients={handleMyPatients}
                        onAddPrescription={handleAddPrescription}
                        onViewSchedule={handleViewSchedule}
                        onAddResults={handleAddResults}
                    />
                    {scheduleOpened && <DoctorScheduleComponent slots={scheduleSlots}/>}
                </>
            )}
            {user && user.role === 'patient' && (
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