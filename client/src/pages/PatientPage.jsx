import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPatientById} from "../services/patientsService.js";
import PatientCard from "../components/PatientCardComponent.jsx";

const PatientPage = () => {
    const { id } = useParams();
    const [profileData, setProfileDate] = useState(null);

    useEffect(() => {
        const fetchProfileData = async (profileId) => {
            const data = await getPatientById(profileId);
            if (data) setProfileDate(data);
        }

        fetchProfileData(id);
    }, []);

    return (
        <div className="patient-page">
            <PatientCard
                profile={profileData}
            />
        </div>
    )
};

export default PatientPage;