import DoctorCard from '../components/DoctorCardComponent.jsx';
import { getAllDoctors } from "../services/doctorsService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const DoctorsPage = () => {
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const navigate  = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            const profiles = await getAllDoctors();
            setDoctorProfiles(profiles);
        };

        fetchDoctors();
    }, []);

    return (
        <div>
            <h2>Эксперты медицины: </h2>
            <div className="doctors">
                <div className="doctors-list">
                    {doctorProfiles.map((doctor) => {
                        return (
                            <>
                                <DoctorCard profile={doctor}/>
                                <div className="doctor-card__actions">
                                    <button className="doctor-card__button"
                                            onClick={() => navigate(`${doctor._id}`)}>View Profile
                                    </button>
                                    <button className="doctor-card__button doctor-card__button--primary">Book
                                        Appointment
                                    </button>
                                </div>
                            </>);
                    })}
                </div>
            </div>
        </div>
    )
}

export default DoctorsPage;