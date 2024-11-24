const PaymentCard = ({ payment }) => {
    return (
        <div className="payment-card">
            <div className="payment-card__header">
                <h3 className="payment-card__amount">${payment.amount}</h3>
                <span className={`payment-card__status payment-card__status--${payment.status.toLowerCase()}`}>
                    {payment.status}
                </span>
            </div>
            <div className="payment-card__body">
                <p><strong>Date:</strong> {new Date(payment.payment_date).toLocaleDateString()}</p>
                <p><strong>Method:</strong> {payment.methos}</p>
                <p><strong>Reference ID:</strong> {payment.refrence_id}</p>
            </div>
        </div>
    );
};

export default PaymentCard;