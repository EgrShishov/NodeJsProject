const AppointmentCard = ({ appointment }) => {
    const formattedDate = new Date(appointment.AppointmentDate).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const formattedTime = new Date(appointment.AppointmentTime).toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className={`appointment-card ${appointment.IsApproved ? 'approved' : ''}`}>
            <h3>Appointment Details</h3>
            <p><strong>ID:</strong> {appointment._id}</p>
            <p><strong>Date:</strong> {formattedDate}</p>
            <p><strong>Time:</strong> {formattedTime}</p>
            <p><strong>Doctor:</strong> {appointment.DoctorId.LastName} {appointment.DoctorId.FirstName}</p>
            <p><strong>Patient:</strong> {appointment.PatientId.LastName} {appointment.PatientId.FirstName}</p>
        </div>
    );
}

export default AppointmentCard;