import {useEffect, useState} from "react";
import {getServices} from "../services/servicesService.js";

const ProcedureCard = ({ id, name, description, cost, serviceName, serviceId, handlePurchase, handleDelete, handleEdit, role }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editName, setEditName] = useState(name);
    const [editDescription, setEditDescription] = useState(description);
    const [editCost, setEditCost] = useState(cost);
    const [editService, setEditService] = useState(serviceId);

    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getServices();
            if (data) setServices(data);
        };

        fetchServices();
    }, []);

    const handleSave = async () => {
        await handleEdit(id, { procedure_name: editName, description: editDescription, procedure_cost: editCost, service_id: editService });
        setIsEdit(false);
    };

    const handleCancel = () => {
        setEditName(name);
        setEditDescription(description);
        setEditCost(cost);
        setEditService(serviceName)
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
                        <div className="input-group">
                            <span className="procedure-card__description">Сервис:</span>
                            <select
                                className="input-field"
                                value={editService} // Set the currently selected value
                                onChange={(e) => setEditService(e.target.value)}
                            >
                                <option value={serviceId}>{serviceName || "Select a service"}</option>
                                {services &&
                                    services.map((service) => (
                                        <option key={service.service_id} value={service.service_id}>
                                            {service.service_name}
                                        </option>
                                    ))}
                            </select>
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
                        <p className="doctor-card__description">{serviceName}</p>
                        <div className="procedure-card__actions">
                            {role === 'patient' &&
                                <button className="procedure-card__button"
                                        onClick={() => handlePurchase(id)}>Записаться</button>
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