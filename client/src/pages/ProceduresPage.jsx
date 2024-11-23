import {useEffect, useState} from "react";
import {createProcedure, deleteProcedure, editProcedure, getAllProcedures} from "../services/proceduresService";
import ProcedureCard from "../components/ProcedureComponent.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import AddProcedureForm from "../components/AddProcedureForm.jsx";
import {toast} from "react-toastify";
import ReactPaginate from "react-paginate";

const ProceduresPages = () => {
    const [proceduresList, setProceduresList] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [formOpened, toggleFormOpened] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(4);

    const {user} = useAuth();

    useEffect(() => {
        fetchProcedures();
    }, []);

    const fetchProcedures = async () => {
        const procedures = await getAllProcedures();
        if (procedures) setProceduresList(procedures);
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
        try {
            const response = await deleteProcedure(id);
            await fetchProcedures();
        } catch (error) {
            toast.error(`Ошибка в удалении процедуры: ${error.message}`);
        }
    };

    const filteredProcedures = proceduresList.filter(procedure =>
        procedure.ProcedureName.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleAddProcedure = async (newProcedure) => {
        const response = await createProcedure(newProcedure);
        await fetchProcedures();
        toggleForm();
    }

    const handlePurchase = async (procedureId) => {
        try {
            // TODO
        } catch (error) {
            toast.error(`Ошибка в заказе процедуры: ${error.message}`);
        }
    };

    const handleEdit = async (id, data) => {
        console.log(id, data);
        try {
            const response = await editProcedure(id, data);
            if (response) {
                await fetchProcedures();
            }
        } catch (error) {
            toast.error(`Ошибка редактирования процедуры: ${error.message}`);
        }
    };

    const pageCount = Math.ceil(filteredProcedures.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const currentProcedures = filteredProcedures.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (event) => {
        setCurrentPage(event.selected);
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
                {user && user.role === 'receptionist' && (
                    <button onClick={toggleForm}>Добавить процедуру</button>
                )}
            </div>

            {formOpened && (
                <AddProcedureForm onSubmit={handleAddProcedure}/>
            )}

            <div className="procedures">
                <div className="procedures-list">
                    {currentProcedures.length > 0 ? (
                        currentProcedures.map((procedure) => {
                                return (
                                    <ProcedureCard
                                        id={procedure._id}
                                        key={procedure._id}
                                        name={procedure.ProcedureName}
                                        description={procedure.Description}
                                        cost={procedure.ProcedureCost}
                                        handlePurchase={handlePurchase}
                                        handleDelete={handleProcedureDelete}
                                        handleEdit={handleEdit}
                                        role={user?.role}
                                    />
                                );
                            })
                    ) : (
                        <div className="not-found-profiles-action">
                            <h2>Ничего не найдено</h2>
                        </div>
                    )}
                </div>
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

export default ProceduresPages;