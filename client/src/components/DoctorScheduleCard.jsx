const DoctorScheduleCard = ({
    slot,
    handleUpdateSlotStatus,
}) => {
    const { _id, AppointmentDate, AppointmentTime, patients_last_name, patients_first_name, patients_middle_name, service_name, office, IsApproved } = slot;

    return (
        <div className="schedule-card">
            <div className="schedule-details">
                <span className="schedule-date">Date: {AppointmentDate}</span>
                <span className="schedule-time">Time: {AppointmentTime}</span>
                <span className="patient-name">Patient data:  {patients_last_name} {patients_first_name} {patients_middle_name}</span>
                <span className="office">Office location: {office.country} {office.city}, {office.street} {office.street_number}, Phone: {office.phone_number}</span>
                <span className="service">Service: {service_name}</span>
            </div>
            <div className="schedule-status">
                <button className="status-button" onClick={() => handleUpdateSlotStatus(_id, IsApproved)}>
                    {!IsApproved ? "Approve" : "Cancel"}
                </button>
            </div>
        </div>
    );
};

export default DoctorScheduleCard;