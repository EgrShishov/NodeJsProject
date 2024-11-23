import {useState} from "react";

const ProcedureCard = ({ id, name, description, cost, handlePurchase, handleDelete, handleEdit, role }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editDescription, setEditDescription] = useState(description);
    const [editCost, setEditCost] = useState(cost);

    const handleSave = async () => {
        await handleEdit(id, { ProcedureName: editName, Description: editDescription, ProcedureCost: editCost });
        setIsEdit(false);
    };

    const handleCancel = () => {
        setEditName(name);
        setEditDescription(description);
        setEditCost(cost);
        setIsEdit(false);
    };

    return (
        <div className="procedure-card">
            <div className="procedure-card__info">
                {isEdit ? (
                    <div className="procedure-card__edit">
                        <div className="input-group">
                            <span className="procedure-card__name">Название:</span>
                            <input
                                type="text"
                                className="input-field"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <span className="doctor-card__description">Описание:</span>
                            <input
                                type="text"
                                className="input-field"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <span className="procedure-card__cost">Стоимость:</span>
                            <input
                                type="number"
                                className="input-field"
                                value={editCost}
                                onChange={(e) => setEditCost(e.target.value)}
                            />
                        </div>
                        <div className="procedure-card__actions">
                            <button onClick={handleSave}>Сохранить</button>
                            <button onClick={handleCancel}>Отмена</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="procedure-card__name">{name}</h3>
                        <p className="procedure-card__cost">${cost}</p>
                        <p className="doctor-card__description">{description}</p>
                        <div className="procedure-card__actions">
                            {role === 'patient' &&
                                <button className="procedure-card__button" onClick={() => handlePurchase(id)}>Записаться</button>
                            }
                            {role === 'receptionist' && (
                                <>
                                    <button className="procedure-card__button" onClick={() => setIsEdit(true)}>Редактировать
                                    </button>
                                    <button className="procedure-card__button" onClick={() => handleDelete(id)}>Удалить
                                    </button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProcedureCard;