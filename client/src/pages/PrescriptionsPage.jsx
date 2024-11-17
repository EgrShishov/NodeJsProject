import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllPrescriptions, getPatientPrescriptions} from "../services/prescriptionsService.js";
import PrescriptionCard from "../components/PrescriptionCard.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const PrescriptionPage = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const {patientId} = useParams();

    const fetchPrescriptions = async (patientId) => {
        try {
            if (patientId) {
                const data = await getPatientPrescriptions(patientId);
                if (data) setPrescriptions(data);
            } else {
                const data = await getAllPrescriptions();
                if (data) setPrescriptions(data);
            }
        } catch (error) {
            toast.error(`Ошибка получения рецептов: ${error.message}`)
        }
    };

    useEffect(() => {
        fetchPrescriptions(patientId);
    }, []);

    return (
        <div className="prescriptions-page">
            <ToastContainer />
            <h2>Ваши рецепты: </h2>
            <div className="prescriptions-list">
                {prescriptions ? (
                    prescriptions.length > 0 ? (
                        prescriptions.map((pres) => {
                            return (
                                <PrescriptionCard key={pres._id} prescription={pres}/>
                            )
                        })
                    ) : (
                        <p>
                            У вас пока нет назначенных рецептов
                        </p>
                    )
                ) : (
                    <div className="loader"></div>
                )}
            </div>
        </div>
    );
};

export default PrescriptionPage;