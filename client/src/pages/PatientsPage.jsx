import {useEffect, useState} from "react";
import PatientCard from "../components/PatientCardComponent.jsx";
import {getAllPatients} from "../services/patientsService.js";

const PatientsPage = () => {
    const [ patients, setPatients ] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            const patients = await getAllPatients();
            setPatients(patients);
        };

        fetchPatients();
    }, []);

    return (
        <div className="patients">
            {patients ? (
                <>
                    {patients.map((patient) => {
                        return (
                            <PatientCard profile={patient}></PatientCard>
                        );
                    })}
                </>
            ) : (
                <p>Loading patients...</p>
            )}
        </div>
    );
};

export default PatientsPage;