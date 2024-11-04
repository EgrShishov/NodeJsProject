import {useEffect, useState} from "react";
import {getAppointments, getPatientAppointments} from "../services/appointmentsService";
import AppointmentCard from "../components/AppointmentCard";
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import app from "../App.jsx";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const {patientId} = useParams();
    const navigate = useNavigate();

    const fetchAppointments = async () => {
        try {
            setError(null);

            if (patientId) {
                const data = await getPatientAppointments(patientId);
                if (data) setAppointments(data);
            } else {
                const data = await getAppointments();
                if (data) setAppointments(data)
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleNewAppointment = () => navigate('/doctors/');

    return (
        <div className="appointments-list">
            {error && <div className="error">{error}</div>}
            {appointments ? (
                appointments.length === 0 ? (
                        <div>
                            <div>Нет назначенных консультаций</div>
                            <button
                                onClick={handleNewAppointment}
                                className="action-button"
                            >Назначить консультацию</button>
                        </div>
                    ) : (
                    appointments.map((appointment) => {
                            return (
                                <AppointmentCard
                                    key={appointment._id} a
                                    ppointment={appointment}
                                />
                            )
                        }))
            ) : (
                <div>Загрузка консультаций...</div>
            )}
        </div>
    );
};

export default AppointmentsPage;