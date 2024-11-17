import {useState} from "react";
import DoctorScheduleCard from "./DoctorScheduleCard.jsx";
import {approveAppointment} from "../services/appointmentsService.js";

const DoctorsPersonalScheduleComponent = () => {
    const [view, setView] = useState('upcoming');
    const [slots, setSlots] = useState([]);

    // Get today's date for filtering upcoming slots
    const today = new Date();

    // Filter slots based on the selected view
    const upcomingSlots = slots.filter(slot => new Date(slot.date) >= today);
    const allSlots = slots;

    const displayedSlots = view === 'upcoming' ? upcomingSlots : allSlots;

    const handleUpdateSlotStatus = async (id) => {
        const response = await approveAppointment(id); // cancelAppointment(id);
    };

    return (
        <div className="doctor-schedule-component">
            <h2>Встречи на сегодня: </h2>

            <div className="view-toggle">
                <button
                    onClick={() => setView('upcoming')}
                    className={`toggle-button ${view === 'upcoming' ? 'active' : ''}`}>
                    Ближайшее
                </button>
                <button
                    onClick={() => setView('all')}
                    className={`toggle-button ${view === 'all' ? 'active' : ''}`}>
                    Все расписание
                </button>
            </div>

            <div className="schedule-list">
                {displayedSlots.length > 0 ? (
                    displayedSlots.map((slot, index) => (
                        <DoctorScheduleCard
                            key={index}
                            slot={slot}
                            handleUpdateSlotStatus={handleUpdateSlotStatus}
                        />
                    ))
                ) : (
                    <p>Нет доступных расписаний для вас.</p>
                )}
            </div>
        </div>
    );
};

export default DoctorsPersonalScheduleComponent;