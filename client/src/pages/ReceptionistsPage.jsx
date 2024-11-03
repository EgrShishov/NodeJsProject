import {useEffect, useState} from "react";
import {deleteReceptionist, getAllReceptionists} from "../services/receptionistsService.js";
import ReceptionistCard from "../components/ReceptionistCard.jsx";
import {useNavigate} from "react-router-dom";

const ReceptionistsPage = () => {
    const [receptionists, setReceptionists] = useState([]);
    const navigate = useNavigate();

    const fetchReceptionists = async () => {
        const data = await getAllReceptionists();
        if (data) setReceptionists(data);
    }

    useEffect(() => {
        fetchReceptionists();
    }, []);

    const handleOnDelete = async (receptionistId) => {
        const response = await deleteReceptionist(receptionistId);
        if (response) fetchReceptionists();
    };

    const handleOnEdit = (receptionistId) => navigate(`/${receptionistId}`);

    return (
        <div className="receptionists-page">
            <h2>Список всех регистраторов</h2>
            <div className="receptionists">
                {receptionists ? (
                    <div className="receptionists-list">
                        {receptionists.map((receptionist) => {
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
                    <div>Загружаем регистраторов...</div>
                )}
            </div>
        </div>
    );
};

export default ReceptionistsPage;