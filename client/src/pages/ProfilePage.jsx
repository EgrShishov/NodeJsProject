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
import {getDoctorsSchedule} from "../services/appointmentsService.js";
import DoctorsPersonalScheduleComponent from "../components/DoctorsPersonalScheduleComponent.jsx";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfilePage = () => {
    const [profileData, setProfile] = useState(null);
    const [scheduleOpened, setScheduleOpened] = useState(false);
    const [resultsModalOpened, setResultsModalOpened] = useState(false);
    const [prescriptionsModalOpened, setPrescriptionsModalOpened] = useState(false);
    const [scheduleSlots, setScheduleSlots] = useState([]);
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchProfile = async () => {
        try {
            const data = await profile();
            if (data) setProfile(data);
            else toast.error(`Ошибка в получении данных о профиле`);
        } catch (error) {
            toast.error(`Ошибка в получении данных о профиле: ${error.message}`);
            navigate('/login');
        }
    };

    const fetchScheduleSlots = async (doctorId) => {
        try {
            const data = await getDoctorsSchedule(doctorId);
            setScheduleSlots(data);
            console.log(data);
        } catch (error) {
            toast.error(`${error.message}`);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (profileData) fetchScheduleSlots(profileData._id);
    }, [scheduleOpened]);

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
            const response = await createPrescription(data);
            console.log(response);
            if (response) {
                closePrescriptionModal();
                toast.success('Рецепт успешно добавлен!');
            }
        } catch (error){
            toast.error(`Рецепт не добавлен. Возникла ошибка: ${error.message}`);
        }
    }

    const handleAddingResults = async (data) => {
        try {
            const response = await createResult(data);
            if (response) {
                toast.success(`Результаты успешно добавлены!.`);
                closeResultsModal();
            }
        } catch (error) {
            toast.error(`Результаты не добавлены. Возникла ошибка: ${error.message}`);
        }
    }

    return (
        <div className="profile-page">
            <ToastContainer />
            {prescriptionsModalOpened &&  <AddPrescriptionModal
                    isOpen={prescriptionsModalOpened}
                    onClose={closePrescriptionModal}
                    onSubmit={handleAddingPrescription}
                    doctor={profileData}
            />}
            {resultsModalOpened && <AddResultsModal
                isOpen={resultsModalOpened}
                onClose={closeResultsModal}
                onSubmit={handleAddingResults}
            />}
            <ProfileComponent profileData={profileData} setProfileData={setProfile}/>
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
                    {scheduleOpened && <DoctorsPersonalScheduleComponent initialSlots={scheduleSlots}/>}
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