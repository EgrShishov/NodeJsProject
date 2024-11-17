import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllResults, getResultsByPatient } from '../services/resultsService.js';
import ResultCard from '../components/ResultCard.jsx';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResultsPage = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { patientId } = useParams();

    const fetchResults = async () => {
        setLoading(true);
        try {
            let data;
            if (patientId) {
                data = await getResultsByPatient(patientId);
            } else {
                data = await getAllResults();
            }

            if (data && data.length > 0) {
                setResults(data);
            } else {
                toast.warn('У вас пока нет результатов обследований.');
            }
        } catch (error) {
            toast.error(`Ошибка в получении результатов: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
    }, [patientId]);

    return (
        <div className="results-page">
            <ToastContainer />
            <h2>Результаты обследований</h2>
            {loading ? (
                <div className="loader">Загрузка...</div>
            ) : (
                <div className="results-list">
                    {results.length > 0 ? (
                        results.map((res) => (
                            <ResultCard key={res._id} result={res}/>
                        ))
                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultsPage
