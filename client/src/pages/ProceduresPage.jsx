import {useEffect, useState} from "react";
import {getAllProcedures} from "../services/proceduresService";
import ProcedureCard from "../components/ProcedureComponent.jsx";

const ProceduresPages = () => {
    const [ proceduresList, setProceduresList ] = useState([]);

    useEffect(() => {
        const fetchProcedures = async () => {
            const procedures = await getAllProcedures();
            setProceduresList(procedures);
        };

        fetchProcedures();
    }, []);

    return (
        <div>
            <h2>Процедуры, которые мы предлогаем: </h2>
            <div className="procedures">
                <div className="procedures-list">
                    {proceduresList.map((procedure) => {
                        return (
                            <ProcedureCard
                                id={procedure.__id}
                                name={procedure.ProcedureName	}
                                description={procedure.Description}
                                cost={procedure.ProcedureCost}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProceduresPages;