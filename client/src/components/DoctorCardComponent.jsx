import {useEffect, useState} from "react";

const DoctorCard = ({ profile  }) => {
    const [ name, setName ] = useState('');
    const [ experience, setExperience ] = useState(0);

    useEffect(() => {
        setName(`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`);

        const currentYear = new Date().getFullYear();
        const experience = currentYear - profile.CareerStartYear;

        setExperience(experience);
    }, []);

    return (
        <div className="doctor-card">
            <div className="doctor-card__image">
                <img src={profile.ProfilePicture} alt={`${name}'s profile`}/>
            </div>
            <div className="doctor-card__info">
                <h3 className="doctor-card__name">{name}</h3>
                <p className="doctor-card__specialization">{profile.SpecializationName}</p>
                <p className="doctor-card__experience">{experience} years of experience</p>
            </div>
        </div>
    );
};

export default DoctorCard;