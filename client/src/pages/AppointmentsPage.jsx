import { useEffect, useState } from "react";
import { getAppointments, getPatientAppointments } from "../services/appointmentsService";
import AppointmentCard from "../components/AppointmentCard";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {useAuth} from "../context/AuthContext.jsx";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const {patientId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const fetchAppointments = async () => {
        try {
            let data;
            if (user && user.role === "patient") {
                data = await getPatientAppointments(patientId);
            } else {
                data = await getAppointments();
            }
            if (data) {
                setAppointments(data);
                setFilteredAppointments(data);
            } else {
                toast.error(`Неизвестная ошибка в получении консультаций`);
            }
        } catch (error) {
            toast.error(`Произошла ошибка в получении ваших встреч: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleNewAppointment = () => navigate("/doctors/");

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = appointments.filter((appointment) =>
            appointment.title.toLowerCase().includes(term) ||
            appointment.date.includes(term)
        );
        setFilteredAppointments(filtered);
    };

    const handleDateFilter = (e) => {
        const selectedDate = e.target.value;
        const filtered = appointments.filter((appointment) => appointment.date === selectedDate);
        setFilteredAppointments(filtered);
    };

    return (
        <div className="appointments-page">
            <h2>
                {user.role === "receptionist" ? "Ближайшие встречи" : "Ваши назначенные встречи:"}
            </h2>
            <ToastContainer />
            <div className="filter-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Поиск встреч..."
                    className="search-bar"
                />
                <input
                    type="date"
                    onChange={handleDateFilter}
                    className="date-filter"
                />
            </div>
            <div className="appointments-list">
                {filteredAppointments ? (
                    filteredAppointments.length === 0 ? (
                        <div className="empty-state">
                            <div>Нет назначенных консультаций</div>
                            {user.role === "patient" && (
                                <button
                                    onClick={handleNewAppointment}
                                    className="action-button"
                                >
                                    Назначить консультацию
                                </button>
                            )}
                        </div>
                    ) : (
                        filteredAppointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment._id}
                                appointment={appointment}
                            />
                        ))
                    )
                ) : (
                    <div className="loader"></div>
                )}
            </div>
        </div>
    );
};

export default AppointmentsPage;
