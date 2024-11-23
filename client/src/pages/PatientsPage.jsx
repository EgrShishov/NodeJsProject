import {useEffect, useState} from "react";
import PatientCard from "../components/PatientCardComponent.jsx";
import {deletePatient, getAllPatients, getDoctorsPatients} from "../services/patientsService.js";
import {useNavigate, useParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {useAuth} from "../context/AuthContext.jsx";

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(6);

    const [isNewPatientModalOpened, setNewPatientModalOpened] = useState(false);

    const navigate = useNavigate();
    const {doctorId} = useParams();
    const {user} = useAuth();

    const fetchPatients = async () => {
        if (user && user.role === 'doctor'){
            const patients = await getDoctorsPatients(user._id);
            if (patients) setPatients(patients);
        } else {
            const patients = await getAllPatients();
            if (patients) setPatients(patients);
        }
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
        await fetchPatients();
    };

    const filteredPatients = patients.filter(patient =>
        patient.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            patient.FirstName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handlePatientEdit = (patientId) => navigate(`/patients/${patientId}/edit`);
    const handleViewProfile = (patientId) => navigate(`/patients/${patientId}`);

    const pageCount = Math.ceil(filteredPatients.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const currentPatients = filteredPatients.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event) => {
        setCurrentPage(event.selected);
    };

    return (
        <div className="patients-page">
            {doctorId ? (
                <h2>Список ваших пациентов: </h2>
            ) : (
                <h2>Список пациентов клиники: </h2>
            )}

            <div className="patients-search-bar">
                <input
                    type="text"
                    placeholder="Поиск пациента..."
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                    <option value="">Сортировка</option>
                    <option value="name">Имя</option>
                    <option value="cost">Возраст</option>
                </select>
                <button onClick={() => setNewPatientModalOpened(!isNewPatientModalOpened)}>Добавить Пациента</button>
            </div>

            <div className="patients">
                {currentPatients ? (
                    currentPatients.length > 0 ? (
                        currentPatients.map((patient) => {
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
                        <h3>Не найдено ни одного пациента :(</h3>
                    )
                ) : (
                    <div className="loader"></div>
                )}
            </div>

            <ReactPaginate
                previousLabel={"← Назад"}
                nextLabel={"Далее →"}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                pageClassName={"pagination_page"}
            />
        </div>
    );
};

export default PatientsPage;