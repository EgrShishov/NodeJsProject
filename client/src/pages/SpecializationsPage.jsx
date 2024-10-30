import {useEffect, useState} from "react";
import {getAllSpecializations} from "../services/specializationsService";

const SpecializationPage = () => {
    const [ specializations, setSpecializations ] = useState([]);

    useEffect(() => {
        const fetchSpecializations = async () => {
            const data = await getAllSpecializations();
            console.log(data);
            setSpecializations(data);
        };

        fetchSpecializations();
    }, []);

    return (
        <>
            <div className="specializations">
                {specializations.map((spec) => {
                    return (
                        <div key={spec._id} className="specialization-item">
                            <p>{spec.SpecializationName}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default SpecializationPage;