import {useEffect, useState} from "react";
import CommonProfileInfo from "./CommonProfileInfo.jsx";
import {useAuth} from "../context/AuthContext.jsx";

const DoctorCard = ({ profile, onProfileClick, onEditClick, onDeleteClick }) => {
    const [ name, setName ] = useState('');
    const [ experience, setExperience ] = useState(0);
    const {user} = useAuth();

    useEffect(() => {
        setName(`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`);

        const currentYear = new Date().getFullYear();
        const experience = currentYear - profile.CareerStartYear;

        setExperience(experience);
    }, []);

    return (
        <div className="doctor-card">
 {/*           <div className="doctor-card__image">
                <img src='/public/vite.svg' alt={`${name}'s profile`}/>
            </div>*/}
            <div className="doctor-card__info">
                <h3 className="doctor-card__name">{name}</h3>
                <p className="doctor-card__specialization">{profile.SpecializationName}</p>
                <p className="doctor-card__experience">{experience} years of experience</p>
            </div>
            <div className="doctor-card__actions">
                <button className="doctor-card__button"
                        onClick={() => onProfileClick(profile._id)}>Профиль
                </button>
                <button className="doctor-card__button doctor-card__button--primary">Назначить консультацию
                </button>
                {user.role.includes('receptionist') ? (
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