import { Link } from "react-router-dom";

const AppointmentsList = ({ appointments }) => (
    <div>
        <h3>Предыдущие посещения: </h3>
        {appointments.length > 0 ? (
            <ul>
                {appointments.map((appointment) => (
                    <li key={appointment.appointment_id}>
                        {new Date(appointment.appointment_date).toLocaleDateString()} - {appointment.doctors_last_name} at {appointment.office_number}
                    </li>
                ))}
            </ul>
        ) : (
            <p>Нет истории предыдущих посещений.</p>
        )}
    </div>
);

const ResultsList = ({ results }) => (
    <div>
        <h3>Предыдущие заключения врача\ей</h3>
        {results.length > 0 ? (
            <ul>
                {results.map((result) => (
                    <li key={result.id} className="result-item">
                        <div className="result-date">{new Date(result.date).toLocaleDateString()}</div>
                        <div className="result-details">
                            <strong>Заключение:</strong> {result.conclusion}<br />
                            <strong>Жалобы:</strong> {result.complaints}<br />
                            <strong>Рекомендации:</strong> {result.recommendations}<br />
                            <strong>Врач:</strong> <Link to={`/doctors/${result.doctor_id}`}>{result.doctors_name}</Link>
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p>Не найдено предыдущих результатов.</p>
        )}
    </div>
);

const PaymentsHistory = ({ payments }) => (
    <div>
        <h3>История платежей: </h3>
        {payments.length > 0 ? (
            <ul>
                {payments.map((payment) => (
                    <li key={payment.id}>
                        {new Date(payment.payment_date).toLocaleDateString()} - ${payment.amount} (Invoice #{payment.invoice_id})
                    </li>
                ))}
            </ul>
        ) : (
            <p>Нет предыдущих платежей.</p>
        )}
    </div>
);

const InvoicesList = ({ invoices }) => (
    <div>
        <h3>Счета</h3>
        {invoices.length > 0 ? (
            <ul>
                {invoices.map((invoice) => (
                    <li key={invoice.invoice_id}>
                        Invoice #{invoice.invoice_id} - ${invoice.amount} оплатить до: {new Date(invoice.dueDate).toLocaleDateString()}
                    </li>
                ))}
            </ul>
        ) : (
            <p>Нет активных счетов.</p>
        )}
    </div>
);

const PatientHistory = ({ profileData, appointments, results, payments, invoices }) => {
    return (
        <div className="patient-history">
            <h2>Личная карточка пациента</h2>

            <hr />
            <AppointmentsList appointments={appointments} />
            <hr />
            <ResultsList results={results} />
            <hr />
            <PaymentsHistory payments={payments} />
            <hr />
            <InvoicesList invoices={invoices} />
        </div>
    );
};

export default PatientHistory;
