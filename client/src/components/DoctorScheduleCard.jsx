const DoctorScheduleCard = ({
    slot,
    handleUpdateSlotStatus,
}) => {
    const { appointment_id, appointment_date, appointment_time, last_name, first_name, middle_name, is_approved, country, city, street, street_number, phone_number } = slot;

    return (
        <div className="schedule-card">
            <div className="schedule-details">
                <span className="schedule-date">Date: {appointment_date}</span>
                <span className="schedule-time">Time: {appointment_time}</span>
                <span className="patient-name">Patient data: {last_name} {first_name} {middle_name}</span>
                <span className="office">Office location: {country} {city}, {street} {street_number}, Phone: {phone_number}</span>
            </div>
            <div className="schedule-status">
                <button className="status-button" onClick={() => handleUpdateSlotStatus(appointment_id, is_approved)}>
                    {!is_approved ? "Approve" : "Cancel"}
                </button>
            </div>
        </div>
    );
};

export default DoctorScheduleCard;