const DoctorScheduleCard = ({
    slot,
    handleUpdateSlotStatus,
}) => {
    const { _id, AppointmentDate, AppointmentTime, FirstName, LastName, MiddleName, IsApproved } = slot;

    return (
        <div className="schedule-card">
            <div className="schedule-details">
                <span className="schedule-date">{AppointmentDate}</span>
                <span className="schedule-time">{AppointmentTime}</span>
                <span className="patient-name">{LastName} {FirstName} {MiddleName}</span>
            </div>
            <div className="schedule-status">
                <button className="status-button" onClick={() => handleUpdateSlotStatus(_id)}>
                    {!IsApproved ? "Approve" : "Cancel"}
                </button>
            </div>
        </div>
    );
};

export default DoctorScheduleCard;