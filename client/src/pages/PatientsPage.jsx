import {useEffect, useState} from "react";
import PatientCard from "../components/PatientCardComponent.jsx";
import {deletePatient, getAllPatients} from "../services/patientsService.js";

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const patients = await getAllPatients();
        setPatients(patients);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field) => {
        setSortField(field);
        const sortedPatients = [...patients].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setPatients(sortedPatients);
    };

    const handlePatientDelete = async (id) => {
        await deletePatient(id);
        fetchPatients();
    };

    const filteredPatients = patients.filter(patient =>
        patient.LastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Список пациентов клиники: </h2>

            <div className="patients-search-bar">
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                    <option value="">Сортировка</option>
                    <option value="name">Имя</option>
                    <option value="cost">Возраст</option>
                </select>
                <button>Добавить Пациента</button>
            </div>

            <div className="patients">
                {filteredPatients ? (
                    filteredPatients.map((patient) => {
                        return (
                            <PatientCard profile={patient}></PatientCard>
                        );
                    })
                ) : (
                    <p>Loading patients...</p>
                )}
            </div>
        </div>
    );
};

export default PatientsPage;