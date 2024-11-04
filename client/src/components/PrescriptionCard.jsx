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
            <h3>Рецепт</h3>
            <p><strong>Пациент:</strong> {PatientId.FirstName} {PatientId.LastName}</p>
            <p><strong>Доктор:</strong> {DoctorId.FirstName} {DoctorId.LastName}</p>
            <p><strong>Дата:</strong> {new Date(PrescriptionDate).toLocaleDateString()}</p>
            <p><strong>Лекарство:</strong> {Medication}</p>
            <p><strong>Дозировка:</strong> {Dosage}</p>
            <p><strong>Продолжительность:</strong> {Duration} дней</p>
        </div>
    );
};

export default PrescriptionCard;