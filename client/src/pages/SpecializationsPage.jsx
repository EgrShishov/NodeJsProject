import {useEffect, useState} from "react";
import {getAllSpecializations} from "../services/specializationsService";
import {useNavigate} from "react-router-dom";

const SpecializationPage = () => {
    const [ specializations, setSpecializations ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpecializations = async () => {
            const data = await getAllSpecializations();
            console.log(data);
            setSpecializations(data);
        };

        fetchSpecializations();
    }, []);

    return (
        <div className="specializations-page">
            <h2>Наши врачи обладают следующими специализациями: </h2>
            <div className="specializations">
                {specializations.map((spec) => {
                    return (
                        <div
                            key={spec.specialization_id}
                            onClick={() => navigate(`/doctors?filter=specialization_id&value=${spec.specialization_id}`)}
                             className="specialization-item">
                            <p>{spec.specialization_name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SpecializationPage;