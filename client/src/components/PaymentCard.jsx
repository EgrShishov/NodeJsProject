const PaymentCard = ({ payment }) => {
    return (
        <div className="payment-card">
            <div className="payment-card__header">
                <h3 className="payment-card__amount">${payment.Amount}</h3>
                <span className={`payment-card__status payment-card__status--${payment.Status.toLowerCase()}`}>
                    {payment.Status}
                </span>
            </div>
            <div className="payment-card__body">
                <p><strong>Date:</strong> {new Date(payment.Date).toLocaleDateString()}</p>
                <p><strong>Method:</strong> {payment.Method}</p>
                <p><strong>Reference ID:</strong> {payment.ReferenceId}</p>
            </div>
        </div>
    );
};

export default PaymentCard;