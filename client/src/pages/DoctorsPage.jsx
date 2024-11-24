import DoctorCard from '../components/DoctorCardComponent.jsx';
import {deleteDoctor, getAllDoctors} from "../services/doctorsService.js";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import {getSpecializationById} from "../services/specializationsService.js";

const DoctorsPage = () => {
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc'); // Default is ascending
    const [specializationName, setSpecializationName] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const filter = queryParams.get('filter');
    const value = queryParams.get('value');

    useEffect(() => {
        fetchDoctors();
    }, [filter, value]);

    const fetchDoctors = async () => {
        const profiles = await getAllDoctors();
        if (filter && value) {
            if (filter === 'specialization_id') {
                const filteredDoctors = profiles.filter(doctor => {
                    if (doctor.specialization_id)
                        return doctor.specialization_id === value;
                });
                setDoctorProfiles(filteredDoctors);
                const specName = await getSpecializationById(value);
                if (specName) setSpecializationName(specName)
            } else {
                setDoctorProfiles(profiles);
            }
        } else {
            setDoctorProfiles(profiles);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field) => {
        const newSortOrder = (field === sortField && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);

        const sortedDoctors = [...doctorProfiles].sort((a, b) => {
            if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setDoctorProfiles(sortedDoctors);
    };

    const getSortLabel = (field) => {
        const labels = {
            'first_name': 'Имя',
            'last_name': 'Фамилия',
            'middle_mame': 'Отчество',
            'career_start_year': 'Стаж',
            'specialization_id': 'Специализации'
        };
        const label = labels[field] || field;
        return sortOrder === 'asc' ? `${label} ▲` : `${label} ▼`;
    };

    const handleDeleteClick = async (id) => {
        await deleteDoctor(id);
        await fetchDoctors();
    };

    const filteredDoctors = doctorProfiles.filter(doctor =>
        doctor.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doctor.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doctor.middle_name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOnProfileClick = (doctorId) =>  navigate(`/doctors/${doctorId}/`);
    const handleOnEditClick = (doctorId) => navigate(`/doctors/edit-doctor/${doctorId}`);

    return (
        <div className="doctors-page">
            <h2>
                Эксперты медицины:
                {filter === 'specialization_id' && specializationName ? (
                    <> {specializationName} профиля </>
                ) : (
                    <></>
                )}
            </h2>

            <div className="doctors-search-bar">
                <input
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                    <option value="">Сортировка</option>
                    <option value="first_name">{getSortLabel('first_name')}</option>
                    <option value="last_name">{getSortLabel('last_name')}</option>
                    <option value="middle_name">{getSortLabel('middle_name')}</option>
                    <option value="career_start_year">{getSortLabel('career_start_year')}</option>
                    <option value="specialization_id">{getSortLabel('specialization_id')}</option>
                </select>
                {user && user.role.includes('receptionist') ? (
                    <button onClick={() => navigate('add')}>Добавить врача</button>
                ) : (<></>)}
            </div>

            <div className="doctors">
                    {filteredDoctors.length > 0 ? (
                        <div className="doctors-list">
                            {filteredDoctors.map((doctor) => {
                                return (
                                    <DoctorCard
                                        key={doctor.doctor_id}
                                        profile={doctor}
                                        onProfileClick={handleOnProfileClick}
                                        onEditClick={handleOnEditClick}
                                        onDeleteClick={handleDeleteClick}
                                    />
                                );})}
                        </div>) : (
                            <div className="not-found-profiles-action">
                                <h2>Ничего не найдено</h2>
                                {filter ? (
                                    <button
                                        className="action-button"
                                        onClick={() => navigate('/doctors')}
                                    >
                                        Показать всех врачей</button>
                                    ) : (<></>)}
                            </div>
                    )}
            </div>
        </div>
    )
}

export default DoctorsPage;