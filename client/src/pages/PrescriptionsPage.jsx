import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllPrescriptions, getPatientPrescriptions} from "../services/prescriptionsService.js";
import PrescriptionCard from "../components/PrescriptionCard.jsx";

const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState(null);
    const {patientId} = useParams();

    const fetchPrescriptions = async (patientId) => {
        try {
            setError(null);
            if (patientId) {
                const data = await getPatientPrescriptions(patientId);
                if (data) setPrescriptions(data);
            } else {
                const data = await getAllPrescriptions();
                if (data) setPrescriptions(data);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchPrescriptions(patientId);
    }, []);

    return (
        <div className="prescriptions-page">
            <h2>Ваши рецепты: </h2>
            {error ?? (<div className="error">{error}</div>)}
            {prescriptions ? (
                prescriptions.length > 0 ? (
                    prescriptions.map((pres) => {
                        return (
                            <PrescriptionCard key={pres._id} prescription={pres}/>
                        )
                    })
                ) : (
                    <div>
                        У вас пока нет назначенных рецептов
                    </div>
                )
            ) : (
                <div>Загружаем рецепты...</div>
            )}
        </div>
    );
};

export default PrescriptionPage;