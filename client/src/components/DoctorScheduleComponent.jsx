import { useEffect, useState } from "react";
import { getDoctorsSchedule } from "../services/appointmentsService.js";

const DoctorScheduleComponent = ({ doctorId }) => {
    const [ slots, setSlots ] = useState([]);

    useEffect(() => {
        const fetchSchedule = async (doctorId) => {
            const scheduleData = await getDoctorsSchedule(doctorId);
            if (scheduleData) {
                setSlots(scheduleData);
            }
        };

        fetchSchedule(doctorId);
    }, []);

    return (
        <div className="schedule-element">
            { slots ? (
                slots.map((slot) => {
                  return (
                      <div className="schedule-slot">
                        <div className="shedule-slot__date">{ slot.date }</div>
                        <div className="shedule-slot__time">{ slot.time }</div>
                      </div>
                  );
                })
            ) : (
                <div className="no-schedule-slots">
                    There are no available slots
                </div>
            )};
        </div>
    );
};

export default DoctorScheduleComponent;