import {useEffect, useState} from "react";
import {getDoctorById} from "../services/doctorsService.js";
import DoctorCard from "../components/DoctorCardComponent.jsx";
import DoctorScheduleComponent from "../components/DoctorScheduleComponent.jsx";
import {useParams} from "react-router-dom";

const DoctorDetailsPage = () => {
    const [ doctorProfile, setDoctorProfile ] = useState(null);
    const doctorsId  = useParams();

    useEffect(() => {
        const fetchDoctorProfile = async () => {
            const profile = await getDoctorById(doctorsId.id);
            setDoctorProfile(profile);
        };

        fetchDoctorProfile();
    }, [doctorsId]);

    return (
        <div className="doctor-details">
            { doctorProfile ? (
                <>
                    <DoctorCard profile={doctorProfile}/>
                </>
            ) : (
                <p>Loading doctor profile...</p>
            )}
        </div>
    );
};

export default DoctorDetailsPage;