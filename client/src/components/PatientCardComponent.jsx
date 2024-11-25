import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const PatientCard = ({ profile, onEditClick, onDeleteClick, onViewProfileClick }) => {
    const [name, setName] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (user && user.role === 'doctor') {
            setName(profile.patients_name);
        } else setName(`${profile.first_name} ${profile.middle_name || ''} ${profile.last_name}`);
    }, []);

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <div className="patient-card">
            <div className="patient-card__image">
                <img src={profile.photo_url} alt={`${name}'s profile`}/>
            </div>
            <div className="patient-card__info">
                <h3 className="patient-card__name">{name}</h3>
                <p className="patient-card__date_of_birth">{formatter.format(new Date(profile.date_of_birth))}</p>
            </div>
            {user.role === 'receptionist'
                || user.role === 'doctor' && (
                <div className="patient-card__actions">
                    {user.role === 'receptionist' && (
                        <>
                            <button onClick={() => onEditClick(profile.patient_id)} className="action-button">Редактировать
                            </button>
                            <button onClick={() => onDeleteClick(profile.patient_id)} className="action-button">Удалить
                            </button>
                        </>
                    )}
                    <button onClick={() => onViewProfileClick(profile.patient_id)} className="action-button">Просмотр профиля
                    </button>
                </div>
            )}
        </div>
    );
};

export default PatientCard;