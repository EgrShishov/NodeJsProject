const PrescriptionCard = ({prescription}) => {
    const {
        PatientId,
        DoctorId,
        PrescriptionDate,
        Medication,
        Dosage,
        Duration,
    } = prescription;


    return (
        <div className="prescription-card">
            <h3>Название препарата: <i>{Medication}</i></h3>
            <p>Пациент: {PatientId.FirstName} {PatientId.MiddleName} {PatientId.LastName}</p>
            <p>Доктор: {DoctorId.FirstName} {DoctorId.MiddleName} {DoctorId.LastName}</p>
            <div className="details">
                <span>Дозировка и предписание: {Dosage}</span>
                <span>Продолжительность: {Duration} дней</span>
                <span>Дата выдачи рецепта: {new Date(PrescriptionDate).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default PrescriptionCard;