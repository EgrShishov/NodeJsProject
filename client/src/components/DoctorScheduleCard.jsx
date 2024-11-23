const DoctorScheduleCard = ({
    slot,
    handleUpdateSlotStatus,
}) => {
    const { _id, AppointmentDate, AppointmentTime, PatientId, OfficeId, ServiceId, IsApproved } = slot;

    return (
        <div className="schedule-card">
            <div className="schedule-details">
                <span className="schedule-date">Date: {AppointmentDate}</span>
                <span className="schedule-time">Time: {AppointmentTime}</span>
                <span className="patient-name">Patient data: {PatientId.LastName} {PatientId.FirstName} {PatientId.MiddleName}</span>
                <span className="office">Office location: {OfficeId.Country} {OfficeId.City}, {OfficeId.Street} {OfficeId.StreetNumber}, Phone: {OfficeId.PhoneNumber}</span>
                <span className="service">Service: {ServiceId.ServiceName}</span>
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