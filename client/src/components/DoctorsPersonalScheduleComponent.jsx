import {useState, useMemo} from "react";
import DoctorScheduleCard from "./DoctorScheduleCard.jsx";
import {approveAppointment, cancelAppointment} from "../services/appointmentsService.js";
import { toast } from "react-toastify";
import {formatISO} from "date-fns";

const DoctorsPersonalScheduleComponent = ({ initialSlots }) => {
    const [slots, setSlots] = useState(initialSlots);

    const today = useMemo(() => formatISO(new Date(), {representation: 'date'}), []);
    const upcomingSlots = useMemo(
        () => slots?.filter((slot) => formatISO(new Date(slot.appointment_date), {representation: 'date'}) === today) || [],
        [slots, today]
    );

    console.log(slots);
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
                    slot.appointment_id === id ? { ...slot, is_approved: !isApproved } : slot
                )
            );
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="doctor-schedule-component">
            <h2>Ваши встречи:</h2>
            <div className="schedule-list">
                {upcomingSlots ? (
                    upcomingSlots.length > 0 ? (
                        upcomingSlots.map((slot) => (
                            <DoctorScheduleCard
                                key={slot.appointment_id}
                                slot={slot}
                                handleUpdateSlotStatus={handleUpdateSlotStatus}
                            />
                        ))
                    ) : (
                        <p>Нет доступных расписаний для вас.</p>
                    )
                ) : (
                    <div className="loader">Загрузка встреч</div>
                )}
            </div>
        </div>
    );
};

export default DoctorsPersonalScheduleComponent;
