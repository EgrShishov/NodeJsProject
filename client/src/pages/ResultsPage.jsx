import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAllResults, getResultsByPatient} from "../services/resultsService.js";
import ResultCard from "../components/ResultCard.jsx";

const ResultsPage = () => {
    const [result, setResults] = useState([]);
    const [error, setError] = useState(null);
    const {patientId} = useParams();

    const fetchResults = async (patientId) => {
        try {
            setError(null);

            if (patientId) {
                const data = await getResultsByPatient(patientId);
                if (data) setResults(data);
                setError('There are no results');
            } else {
                const data = await getAllResults();
                if (data) setResults(data);
                setError('There are no results');
            }
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        fetchResults(patientId);
    }, [])

    const handleDownloadPDF = async (resultId) => {
        // todo downloading pdf
    };

    return (
        <div className="results-page">
            {error && (<div className="error">{error}</div>)}
            <div className="results-list">
                {result ? (
                    result.length > 0 ? (
                        result.map((res) => {
                            return (
                                <ResultCard key={res._id} result={res}/>
                            )
                        })
                    ) : (
                        <div>У вас пока нет результатов обследований</div>
                        )
                ) : (
                    <div>Загружаем данные...</div>
                )}
            </div>
        </div>
    );
};

export default ResultsPage;