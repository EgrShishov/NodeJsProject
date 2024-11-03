const ProcedureCard = ({ id, name, description, cost, handlePurchase }) => {
    return (
        <div className="procedure-card">
            <div className="procedure-card__info">
                <h3 className="procedure-card__name">{name}</h3>
                <p className="procedure-card__cost">${cost}</p>
                <p className="doctor-card__description">{description}</p>
            </div>
            <div className="procedure-card__actions">
                <button className="procedure-card__button" onClick={() => handlePurchase(id)}>Записаться</button>
            </div>
        </div>
    );
};

export default ProcedureCard;