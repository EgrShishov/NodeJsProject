import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getPatientById} from "../services/patientsService.js";
import PatientCard from "../components/PatientCardComponent.jsx";
import PatientHistory from "../components/PatientHistoryComponent.jsx";

const PatientPage = () => {
    const { id } = useParams();
    const [profileData, setProfileDate] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async (id) => {
            try {
                setError(null);
                const data = await getPatientById(id);
                console.log(data);
                setProfileDate(data);
            } catch (error) {
                setError(error.message);
            }
        }

        fetchProfileData(id);
    }, [id]);

    return (
        <div className="patient-page">
            {error && (<div className="error">{error}</div>)}
            {profileData ? (
                <PatientCard
                    profile={profileData}
                />
                ) : (
                    <div>Загружаем данные профиля...</div>
                )
            }
            {}
            <PatientHistory
                profile={profileData}
                appointments={{}}
                results={{}}
                payments={{}}
                invoices={{}}
            />
        </div>
    )
};

export default PatientPage;