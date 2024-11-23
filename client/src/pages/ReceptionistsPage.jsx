import {useEffect, useState} from "react";
import {deleteReceptionist, getAllReceptionists} from "../services/receptionistsService.js";
import ReceptionistCard from "../components/ReceptionistCard.jsx";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const ReceptionistsPage = () => {
    const [receptionists, setReceptionists] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();
    const {user} = useAuth();

    const fetchReceptionists = async () => {
        const data = await getAllReceptionists();
        if (data) setReceptionists(data);
    }

    useEffect(() => {
        fetchReceptionists();
    }, []);

    const handleOnDelete = async (receptionistId) => {
        const response = await deleteReceptionist(receptionistId);
        if (response) await fetchReceptionists();
    };

    const handleOnEdit = (receptionistId) => navigate(`/${receptionistId}`);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredReceptionists = receptionists.filter(receptionist =>
        receptionist.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            receptionist.FirstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                receptionist.MiddleName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="receptionists-page">
            <h2>Список всех регистраторов клиник</h2>

            <div className="receptionists-search-bar">
                <input
                    className="input-field"
                    type="text"
                    placeholder="Поиск по имени"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {user && user.role.includes('receptionist') ? (
                    <button className="add-receptionist-button" onClick={() => navigate('add')}>Добавить регистратора</button>
                ) : (<></>)}
            </div>

            {filteredReceptionists.length > 0 ? (
                <div className="receptionists-list">
                    {filteredReceptionists.map((receptionist) => {
                        return (<ReceptionistCard
                                key={receptionist._id}
                                profile={receptionist}
                                onDeleteClick={handleOnDelete}
                                onEditClick={handleOnEdit}
                            />
                        )
                    })}
                </div>
            ) : (
                <div className="not-found-profiles-action">
                    <h2>Ничего не найдено</h2>
                </div>
            )}
        </div>
    );
};

export default ReceptionistsPage;