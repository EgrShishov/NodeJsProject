import DoctorCard from '../components/DoctorCardComponent.jsx';
import {deleteDoctor, getAllDoctors} from "../services/doctorsService.js";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const DoctorsPage = () => {
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const {user} = useAuth();
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

    const handleDeleteClick = async (id) => {
        await deleteDoctor(id);
        await fetchDoctors();
    };

    const filteredDoctors = doctorProfiles.filter(doctor =>
        doctor.LastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOnProfileClick = (doctorId) =>  navigate(`/${doctorId}/`);
    const handleOnEditClick = (doctorId) => navigate(`/edit-doctor/${doctorId}`);

    return (
        <div className="doctors-page">
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
                {user && user.role.includes('receptionist') ? (
                    <button onClick={() => navigate('add')}>Добавить врача</button>
                ) : (<></>)}
            </div>

            <div className="doctors">
                <div className="doctors-list">
                    {filteredDoctors.map((doctor) => {
                        return (
                            <DoctorCard
                                key={doctor._id}
                                profile={doctor}
                                onProfileClick={handleOnProfileClick}
                                onEditClick={handleOnEditClick}
                                onDeleteClick={handleDeleteClick}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default DoctorsPage;