import {useEffect, useState} from "react";
import CommonProfileInfo from "./CommonProfileInfo.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const DoctorCard = ({ profile, onProfileClick, onEditClick, onDeleteClick }) => {
    const [ name, setName ] = useState('');
    const [ experience, setExperience ] = useState(0);
    const { user } = useAuth();

    useEffect(() => {
        setName(`${profile.first_name} ${profile.middle_name} ${profile.last_name}`);

        const currentYear = new Date().getFullYear();
        const experience = currentYear - profile.career_start_year;

        console.log(profile);
        setExperience(experience);
    }, []);

    return (
        <div className="doctor-card">
            <img className="doctor-card__image" src={profile.photo_url} alt={`${name}'s profile`}/>
            <div className="doctor-card__info">
                <h3 className="doctor-card__name">{name}</h3>
                <p className="doctor-card__specialization">{profile.specialization_name}</p>
                <p className="doctor-card__experience">{experience} лет опыта</p>
                <p className="doctor-card__experience">Email для связи: {profile.email}</p>
            </div>
            <div className="doctor-card__actions">
                <button className="doctor-card__button"
                        onClick={() => onProfileClick(profile.doctor_id)}>Профиль
                </button>
                {user && user.role.includes('receptionist') ? (
                    <div className="doctor-card__actions">
                        <button onClick={() => onEditClick(profile.doctor_id)}>Редактировать</button>
                        <button onClick={() => onDeleteClick(profile.doctor_id)}>Удалить</button>
                    </div>
                ) : (<></>)}
            </div>
        </div>
    );
};


export default DoctorCard;