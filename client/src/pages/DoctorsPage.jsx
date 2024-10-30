import DoctorCard from '../components/DoctorCardComponent.jsx';
import {deleteDoctor, getAllDoctors} from "../services/doctorsService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const DoctorsPage = () => {
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        const profiles = await getAllDoctors();
        setDoctorProfiles(profiles);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field) => {
        setSortField(field);
        const sortedDoctors = [...doctorProfiles].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setDoctorProfiles(sortedDoctors);
    };

    const handleDeleteDoctor = async (id) => {
        await deleteDoctor(id);
        await fetchDoctors();
    };

    const filteredDoctors = doctorProfiles.filter(doctor =>
        doctor.LastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <h2>Эксперты медицины: </h2>

            <div className="doctors-search-bar">
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                    <option value="">Сортировка</option>
                    <option value="name">Имя</option>
                    <option value="experience">Стаж</option>
                </select>
                <button>Добавить врача</button>
            </div>

            <div className="doctors">
                <div className="doctors-list">
                    {filteredDoctors.map((doctor) => {
                        return (
                            <>
                                <DoctorCard key={doctor._id} profile={doctor} />
                                <div className="doctor-card__actions">
                                    <button className="doctor-card__button"
                                            onClick={() => navigate(`${doctor._id}`)}>View Profile
                                    </button>
                                    <button className="doctor-card__button doctor-card__button--primary">Book
                                        Appointment
                                    </button>
                                    <div className="doctor-card__actions">
                                        <button onClick={() => navigate(`/edit-doctor/${doctor._id}`)}>Редактировать</button>
                                        <button onClick={() => handleDeleteDoctor(doctor._id)}>Удалить</button>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default DoctorsPage;