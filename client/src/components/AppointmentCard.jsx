const AppointmentCard = ({ appointment }) => {
    const formattedDate = new Date(appointment.appointment_date).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className={`appointment-card ${appointment.is_approved ? 'approved' : ''}`}>
            <h2><i>Appointment Details</i></h2>
            <p><strong>Date and Time:</strong> {formattedDate} at {appointment.appointment_time}</p>
            <p><strong>Doctor:</strong> {appointment.doctors_last_name} {appointment.doctors_first_name} {appointment.doctors_middle_name}</p>
            <p><strong>Patient:</strong> {appointment.patients_last_name} {appointment.patients_first_name} {appointment.patients_middle_name}</p>
            <p><strong>Approvement status:</strong> <i>{appointment.is_approved? 'Approved' : 'Canceled/Pending'}</i></p>
        </div>
    );
}

export default AppointmentCard;