import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthContext.jsx";

const PatientCard = ({ profile, onEditClick, onDeleteClick, onViewProfileClick }) => {
    const [ name, setName ] = useState('');
    const {user} = useAuth();

    useEffect(() => {
        setName(`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`);
    }, []);

    return (
        <div className="patient-card">
            <div className="patient-card__image">
                <img src={profile.ProfilePicture} alt={`${name}'s profile`}/>
            </div>
            <div className="patient-card__info">
                <h3 className="patient-card__name">{name}</h3>
                <p className="patient-card__date_of_birth">{profile.DateOfBirth}</p>
            </div>
            {user.role === 'receptionist' && (
                <div className="patient-card__actions">
                    <button onClick={() => onEditClick(profile._id)} className="action-button">Редактировать</button>
                    <button onClick={() => onDeleteClick(profile._id)} className="action-button">Удалить</button>
                    <button onClick={() => onViewProfileClick(profile._id)} className="action-button">Просмотр профиля</button>
                </div>
            )}
        </div>
    );
};

export default PatientCard;