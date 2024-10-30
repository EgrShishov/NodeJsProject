import {useEffect, useState} from "react";
import {getAllProcedures} from "../services/proceduresService";
import ProcedureCard from "../components/ProcedureComponent.jsx";

const ProceduresPages = () => {
    const [ proceduresList, setProceduresList ] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');

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

    const handleProcedureDelete = async (id) => {
        await deleteProcedure(id);
        fetchProcedures();
    };

    const filteredProcedures = proceduresList.filter(procedure =>
        procedure.ProcedureName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
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
                <button>Добавить процедуру</button>
            </div>

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
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProceduresPages;