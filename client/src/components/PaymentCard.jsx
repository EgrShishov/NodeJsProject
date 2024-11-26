const PaymentCard = ({ payment }) => {
    return (
        <div className="payment-card">
            <div className="payment-card__header">
                <h3 className="payment-card__amount">${payment.Amount}</h3>
                <span className={`payment-card__status payment-card__status--${payment.IsFinished}`}>
                    {payment.IsFinished ? 'Finished' : 'Pending payment'}
                </span>
            </div>
            <div className="payment-card__body">
                <p><strong>Payment № </strong><i>${payment._id}</i></p>
                <p><strong>Date:</strong> {new Date(payment.PaymentDate).toLocaleDateString()}</p>
                <p>
                    <strong>Patient:</strong> {payment.PatientId?.FirstName} {payment.PatientId?.LastName} {payment.PatientId?.MiddleName}
                </p>
                <p><strong>Appointment date and
                    time:</strong> {payment.AppointmentId.AppointmentDate} at {payment.AppointmentId.AppointmentTime}
                </p>
                {/*                <p><strong>Method:</strong> {payment.Method}</p>
                <p><strong>Reference ID:</strong> {payment.ReferenceId}</p>*/}
            </div>
        </div>
    );
};

export default PaymentCard;