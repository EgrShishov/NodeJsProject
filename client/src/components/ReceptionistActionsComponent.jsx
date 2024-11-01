const ReceptionistActions = ({ onCreateAppointment,
                                 onViewReceptionists,
                                 onViewPatients,
                                 onManageOffices,
                                 onManageProcedures,
                                 onViewPayments }) => {
    return (
        <div className="receptionist-actions">
            <button className="action-button" onClick={onCreateAppointment}>Назначить консультацию</button>
            <button className="action-button" onClick={onViewReceptionists}>Просмотреть регистраторов</button>
            <button className="action-button" onClick={onViewPayments}>Просмотреть платежи</button>
            <button className="action-button" onClick={onViewPatients}>Просмотреть пациентов</button>
            <button className="action-button" onClick={onManageOffices}>Управление оффисами</button>
            <button className="action-button" onClick={onManageProcedures}>Управление процедурами</button>
        </div>
    );
};

export default ReceptionistActions;