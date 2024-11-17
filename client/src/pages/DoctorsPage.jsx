import DoctorCard from '../components/DoctorCardComponent.jsx';
import {deleteDoctor, getAllDoctors} from "../services/doctorsService.js";
import {useEffect, useState} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
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
        console.table(profiles);
        if (filter && value) {
            if (filter === 'specializationId') {
                const filteredDoctors = profiles.filter(doctor => {
                    if (doctor.SpecializationId)
                        return doctor.SpecializationId._id === value;
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
            'FirstName': 'Имя',
            'LastName': 'Фамилия',
            'MiddleName': 'Отчество',
            'CareerStartYear': 'Стаж',
            'specializationId': 'Специализации'
        };
        const label = labels[field] || field;
        return sortOrder === 'asc' ? `${label} ▲` : `${label} ▼`;
    };

    const handleDeleteClick = async (id) => {
        await deleteDoctor(id);
        await fetchDoctors();
    };

    const filteredDoctors = doctorProfiles.filter(doctor =>
        doctor.LastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOnProfileClick = (doctorId) =>  navigate(`/doctors/${doctorId}/`);
    const handleOnEditClick = (doctorId) => navigate(`/doctors/edit-doctor/${doctorId}`);

    return (
        <div className="doctors-page">
            <h2>
                Эксперты медицины:
                {filter === 'specializationId' && specializationName && specializationName.SpecializationName ? (
                    <> {specializationName.SpecializationName} профиля </>
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
                    <option value="FirstName">{getSortLabel('FirstName')}</option>
                    <option value="LastName">{getSortLabel('LastName')}</option>
                    <option value="MiddleName">{getSortLabel('MiddleName')}</option>
                    <option value="CareerStartYear">{getSortLabel('CareerStartYear')}</option>
                    <option value="specializationId">{getSortLabel('specializationId')}</option>
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
                                        key={doctor._id}
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