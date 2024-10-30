import {useEffect, useState} from "react";

const PatientCard = ({ profile  }) => {
    const [ name, setName ] = useState('');

    useEffect(() => {
        setName(`${profile.FirstName} ${profile.MiddleName} ${profile.LastName}`);
    }, []);

    return (
        <div key={profile._id} className="patient-card">
            <div className="patient-card__image">
                <img src={profile.ProfilePicture} alt={`${name}'s profile`}/>
            </div>
            <div className="patient-card__info">
                <h3 className="patient-card__name">{name}</h3>
                <p className="patient-card__date_of_birth">{profile.DateOfBirth}</p>
            </div>
        </div>
    );
};

export default PatientCard;