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
                            key={spec._id}
                            onClick={() => navigate(`/doctors?filter=specializationId&value=${spec._id}`)}
                             className="specialization-item">
                            <p>{spec.SpecializationName}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SpecializationPage;