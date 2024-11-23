import {useEffect, useState} from "react";
import CommonProfileInfo from "./CommonProfileInfo.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const DoctorCard = ({ profile, onProfileClick, onEditClick, onDeleteClick }) => {
    const [ name, setName ] = useState('');
    const [ experience, setExperience ] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        setName(`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`);

        const currentYear = new Date().getFullYear();
        const experience = currentYear - profile.CareerStartYear;

        console.log(profile);
        setExperience(experience);
    }, []);

    return (
        <div className="doctor-card">
            <img className="doctor-card__image" src={profile.UserId?.urlPhoto} alt={`${name}'s profile`}/>
            <div className="doctor-card__info">
                <h3 className="doctor-card__name">{name}</h3>
                <p className="doctor-card__specialization">{profile.SpecializationId?.SpecializationName}</p>
                <p className="doctor-card__experience">{experience} лет опыта</p>
                <p className="doctor-card__experience">Email для связи: {profile.UserId.email}</p>
            </div>
            <div className="doctor-card__actions">
                <button className="doctor-card__button"
                        onClick={() => onProfileClick(profile._id)}>Профиль
                </button>
                {user && user.role.includes('receptionist') ? (
                    <div className="doctor-card__actions">
                        <button onClick={() => onEditClick(profile._id)}>Редактировать</button>
                        <button onClick={() => onDeleteClick(profile._id)}>Удалить</button>
                    </div>
                ) : (<></>)}
            </div>
        </div>
    );
};


export default DoctorCard;