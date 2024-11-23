import {useState, useMemo, useEffect} from "react";
import DoctorScheduleCard from "./DoctorScheduleCard.jsx";
import {approveAppointment, cancelAppointment} from "../services/appointmentsService.js";
import { toast } from "react-toastify";

const DoctorsPersonalScheduleComponent = ({ initialSlots }) => {
    const [slots, setSlots] = useState(initialSlots);
    const [view, setView] = useState("upcoming");

    const today = useMemo(() => new Date(), []);
    const upcomingSlots = useMemo(
        () => slots?.filter((slot) => new Date(slot.date) >= today) || [],
        [slots, today]
    );

    const allSlots = useMemo(() => slots || [], [slots]);

    const displayedSlots = useMemo(
        () => (view === "upcoming" ? upcomingSlots : allSlots),
        [view, upcomingSlots, allSlots]
    );

    const handleUpdateSlotStatus = async (id, isApproved) => {
        try {
            console.log(slots);
            if (isApproved) {
                await cancelAppointment(id);
                toast.success("Appointment canceled successfully!");
            } else {
                await approveAppointment(id);
                toast.success("Appointment approved successfully!");
            }
            setSlots((prevSlots) =>
                prevSlots.map((slot) =>
                    slot._id === id ? { ...slot, IsApproved: !isApproved } : slot
                )
            );
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="doctor-schedule-component">
            <h2>Встречи на сегодня:</h2>

            <div className="view-toggle">
                <button
                    onClick={() => setView("upcoming")}
                    className={`toggle-button ${view === "upcoming" ? "active" : ""}`}
                    aria-pressed={view === "upcoming"}
                >
                    Ближайшее
                </button>
                <button
                    onClick={() => setView("all")}
                    className={`toggle-button ${view === "all" ? "active" : ""}`}
                    aria-pressed={view === "all"}
                >
                    Все расписание
                </button>
            </div>

            <div className="schedule-list">
                {slots ? (
                    displayedSlots.length > 0 ? (
                        displayedSlots.map((slot) => (
                            <DoctorScheduleCard
                                key={slot.id}
                                slot={slot}
                                handleUpdateSlotStatus={handleUpdateSlotStatus}
                            />
                        ))
                    ) : (
                        <p>Нет доступных расписаний для вас.</p>
                    )
                ) : (
                    <div className="loader"></div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPersonalScheduleComponent;
