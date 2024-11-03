import {useEffect, useState} from "react";
import {getAppointments} from "../services/appointmentsService";
import AppointmentCard from "../components/AppointmentCard";

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const data = await getAppointments();
        if (data) setAppointments(data);
    };

    return (
        <div className="appointments-list">
            {appointments ? (
                appointments.map((appointment) => {
                    return (
                        <AppointmentCard
                            key={appointment._id} a
                            ppointment={appointment}
                        />
                    )
                })
            ) : (
                <div>Loading appointments...</div>
            )}
        </div>
    );
};

export default AppointmentsPage;