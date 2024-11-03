import {useEffect, useState} from "react";
import PatientCard from "../components/PatientCardComponent.jsx";
import {deletePatient, getAllPatients} from "../services/patientsService.js";
import {useNavigate} from "react-router-dom";

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const navigate = useNavigate();

    const fetchPatients = async () => {
        const patients = await getAllPatients();
        setPatients(patients);
    };

    useEffect(() => {
        fetchPatients();
    }, []);

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

    const handlePatientEdit = (patientId) => navigate(`edit/${patientId}`);
    const handleViewProfile = (patientId) => navigate(`${patientId}`);

    return (
        <div className="patients-page">
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
                            <PatientCard
                                key={patient._id}
                                profile={patient}
                                onDeleteClick={handlePatientDelete}
                                onEditClick={handlePatientEdit}
                                onViewProfileClick={handleViewProfile}
                            />
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