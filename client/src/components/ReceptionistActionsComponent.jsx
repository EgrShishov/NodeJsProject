const ReceptionistActions = ({ onCreateAppointment, onViewReceptionists, onViewPatients, onManageOffices, onManageProcedures }) => {
    return (
        <div className="receptionist-actions">
            <button onClick={onCreateAppointment}>Create Appointment</button>
            <button onClick={onViewReceptionists}>View Receptionists</button>
            <button onClick={onViewPatients}>View Patients</button>
            <button onClick={onManageOffices}>Manage Offices</button>
            <button onClick={onManageProcedures}>Manage Procedures</button>
        </div>
    );
};

export default ReceptionistActions;