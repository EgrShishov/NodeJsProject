const PatientActions = ({
                            onMyAppointments,
                            onMyResults,
                            onMyPrescriptions,
                            onMyInvoices,
                            onMyPayments
                        }) => {
    return (
        <div className="patients-actions">
            <button className="action-button" onClick={onMyAppointments}>Мои консультации</button>
            <button className="action-button" onClick={onMyResults}>Мои результаты</button>
            <button className="action-button" onClick={onMyPrescriptions}>Мои рецепты</button>
            <button className="action-button" onClick={onMyInvoices}>Мои счета</button>
            <button className="action-button" onClick={onMyPayments}>Мои платежи</button>
        </div>
    );
};

export default PatientActions;