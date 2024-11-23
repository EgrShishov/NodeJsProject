import {useEffect, useState} from "react";
import AddAppointmentModal from "./AddAppointmentModal.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import {getPatientById} from "../services/patientsService.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const generateWeekDates = () => {
    const currentDate = new Date();
    const startOfWeek = new Date(
        currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    );
    const weekDates = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(startOfWeek);
        date.setDate(startOfWeek.getDate() + i);
        weekDates.push(date);
    }

    return weekDates;
};

const generateAvailableSlots = (workHours, bookedSlots, interval = 30) => {
    const timeSlots = {};
    const weekDates = generateWeekDates();

    weekDates.forEach((date) => {
        const dayInEnglish = date.toLocaleDateString("en-US", { weekday: "long" });
        const formattedDate = date.toLocaleDateString("en-GB"); // For correct date format (dd/mm/yyyy)

        const dateParts = formattedDate.split("/");
        const isoFormattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;

        if (!workHours[dayInEnglish]) {
            return;
        }

        const slots = [];
        const start = new Date(`${isoFormattedDate}T${workHours[dayInEnglish].start}:00`);
        const end = new Date(`${isoFormattedDate}T${workHours[dayInEnglish].end}:00`);

        let current = new Date(start);
        while (current < end) {
            const timeString = current.toTimeString().slice(0, 5);
            const isBooked = bookedSlots.some(
                (slot) =>
                    slot.day === dayInEnglish &&
                    slot.time === timeString &&
                    slot.date === isoFormattedDate
            );

            if (!isBooked) {
                slots.push(timeString);
            }

            current.setMinutes(current.getMinutes() + interval);
        }

        if (slots.length > 0) {
            timeSlots[isoFormattedDate] = {
                day: dayInEnglish,
                slots,
            };
        }
    });

    return timeSlots;
};

const DoctorScheduleComponent = ({ workingHours, bookedSlots, onAppointmentBooked, doctorDetails }) => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [bookedSlotsState, setBookedSlotsState] = useState(bookedSlots);
    const [patient, setPatient] = useState(null);
    const {user} = useAuth();

    const today = new Date();
    const availableSlots = generateAvailableSlots(workingHours, bookedSlots);

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const data = await getPatientById(user._id);
                if (data) setPatient(data);
            } catch (error) {
                toast.error(`Ошибка в получении профиля пациента: ${error.message}`);
            }
        };

        if (user && user.role === 'patient') fetchPatientData();
    }, [user]);

    const handleSlotClick = (date, day, slot) => {
        const slotDate = new Date(date);

        if (slotDate < today) {
            toast.error("Нельзя выбрать прошедшую дату!");
            return;
        }

        setSelectedSlot({ day, date, slot });
        setModalOpen(true);
    };

    const handleBooking = (formData) => {
        if (selectedSlot) {
            setBookedSlotsState([
                ...bookedSlotsState,
                { day: selectedSlot.day, date: selectedSlot.date, time: selectedSlot.slot },
            ]);

            onAppointmentBooked({
                day: selectedSlot.day,
                date: selectedSlot.date,
                time: selectedSlot.slot,
                doctorId: formData.DoctorId,
                officeId: formData.OfficeId,
                serviceId: formData.ServiceId,
            });
            setModalOpen(false);
            setSelectedSlot(null);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="schedule-container">
                {Object.entries(availableSlots).map(([date, { day, slots }]) => {
                    return (
                        <div key={date} className="schedule-day">
                            <h4 className="day-title">
                                {day}, {date}
                            </h4>
                            <div className="slots-container">
                                {slots.length > 0 ? (
                                    slots.map((slot) => (
                                        <div
                                            key={`${date}-${slot}`}
                                            className={`slot ${
                                                bookedSlotsState.some(
                                                    (booked) =>
                                                        booked.date === date &&
                                                        booked.day === day &&
                                                        booked.time === slot
                                                )
                                                    ? "booked disabled"
                                                    : "available"
                                            }`}
                                            onClick={
                                                bookedSlotsState.some(
                                                    (booked) =>
                                                        booked.date === date &&
                                                        booked.day === day &&
                                                        booked.time === slot
                                                )
                                                    ? null
                                                    : () => handleSlotClick(date, day, slot)
                                            }
                                        >
                                            {slot}
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-slots">Нет свободных мест</div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {modalOpen && (
                <AddAppointmentModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleBooking}
                    day={selectedSlot?.day}
                    date={selectedSlot?.date}
                    time={selectedSlot?.slot}
                    patient={patient}
                    doctor={doctorDetails}
                />
            )}
        </>
    );
};

export default DoctorScheduleComponent;
