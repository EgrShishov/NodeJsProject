const PrescriptionCard = ({prescription}) => {
    const {
        patients_name,
        doctors_name,
        prescription_date,
        medication,
        dosage,
        duration,
    } = prescription;
    console.log(prescription);

    return (
        <div className="prescription-card">
            <h3>Название препарата: <i>{medication}</i></h3>
            <p>Пациент: {patients_name}</p>
            <p>Доктор: {doctors_name}</p>
            <div className="details">
                <span>Дозировка и предписание: {dosage}</span>
                <span>Продолжительность: {duration} дней</span>
                <span>Дата выдачи рецепта: {new Date(prescription_date).toLocaleDateString()}</span>
            </div>
        </div>
    );
};

export default PrescriptionCard;