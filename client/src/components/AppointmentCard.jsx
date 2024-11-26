const AppointmentCard = ({ appointment }) => {
    const formattedDate = new Date(appointment.AppointmentDate).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    console.log(appointment);
    return (
        <div className={`appointment-card ${appointment.IsApproved ? 'approved' : ''}`}>
            <h2><i>Appointment Details</i></h2>
            <p><strong>Date and Time:</strong> {formattedDate} at {appointment.AppointmentTime}</p>
            <p><strong>Doctor:</strong> {appointment.DoctorId?.LastName} {appointment.DoctorId?.FirstName} {appointment.DoctorId?.MiddleName}</p>
            <p><strong>Patient:</strong> {appointment.PatientId.LastName} {appointment.PatientId.FirstName} {appointment.PatientId.MiddleName}</p>
            <p><strong>Approvement status:</strong> <i>{appointment.IsApproved? 'Approved' : 'Canceled/Pending'}</i></p>
        </div>
    );
}

export default AppointmentCard;