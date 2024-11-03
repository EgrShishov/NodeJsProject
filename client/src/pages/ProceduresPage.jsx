import {useEffect, useState} from "react";
import {createProcedure, getAllProcedures} from "../services/proceduresService";
import ProcedureCard from "../components/ProcedureComponent.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import AddProcedureForm from "../components/AddProcedureForm.jsx";

const ProceduresPages = () => {
    const [ proceduresList, setProceduresList ] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [formOpened, toggleFormOpened] = useState(false);
    const {user} = useAuth();

    useEffect(() => {
        fetchProcedures();
    }, []);

    const fetchProcedures = async () => {
        const procedures = await getAllProcedures();
        setProceduresList(procedures);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSort = (field) => {
        setSortField(field);
        const sortedProcedures = [...proceduresList].sort((a, b) => {
            if (a[field] < b[field]) return -1;
            if (a[field] > b[field]) return 1;
            return 0;
        });
        setProceduresList(sortedProcedures);
    };

    const toggleForm = () => toggleFormOpened(!formOpened);

    const handleProcedureDelete = async (id) => {
        await deleteProcedure(id);
        fetchProcedures();
    };

    const filteredProcedures = proceduresList.filter(procedure =>
        procedure.ProcedureName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddProcedure = async (newProcedure) => {
        const response = await createProcedure(newProcedure);
        if (response) {
            fetchProcedures();
        }
        toggleForm();
    }

    const handlePurchase = (procedureId) => {

    };

    return (
        <div className="procedures-page">
            <h2>Процедуры, которые мы предлагаем: </h2>

            <div className="procedures-search-bar">
                <input
                    type="text"
                    placeholder="Поиск по названию"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                <select onChange={(e) => handleSort(e.target.value)} value={sortField}>
                    <option value="">Сортировка</option>
                    <option value="name">Название</option>
                    <option value="cost">Стоимость</option>
                </select>
                {user.role === 'receptionist' && (
                    <button onClick={toggleForm}>Добавить процедуру</button>
                )}
            </div>

            {formOpened && (
                <AddProcedureForm onSubmit={handleAddProcedure}/>
            )}

            <div className="procedures">
                <div className="procedures-list">
                    {filteredProcedures.map((procedure) => {
                        return (
                            <ProcedureCard
                                id={procedure._id}
                                key={procedure._id}
                                name={procedure.ProcedureName}
                                description={procedure.Description}
                                cost={procedure.ProcedureCost}
                                handlePurchase={handlePurchase}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProceduresPages;