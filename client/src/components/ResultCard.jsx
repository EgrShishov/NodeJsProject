import {toast} from "react-toastify";

const ResultCard = ({ result }) => {
    const { patients_name, doctors_name, recommendations, complaints, conclusion, document_id } = result;

    console.log(result);
    const handleDownload = async (document_id) => {
        if (!document_id) {
            toast.error('Документ отсутствует для загрузки.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/documents/download/${document_id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/pdf'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                toast.error('Error downloading file');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `result_${document_id}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            toast.error(`Failed to download document: ${error.message}.`);
        }
    };

    return (
        <>
            <div className="result-card">
                <h3>Медицинское заключение</h3>
                <p>
                    <strong>Пациент:</strong> {patients_name}
                </p>
                <p>
                    <strong>Доктор:</strong> {doctors_name}
                </p>
                <p><strong>Жалобы:</strong> {complaints || 'Нет данных'}</p>
                <p><strong>Рекомендации:</strong> {recommendations || 'Нет данных'}</p>
                <p><strong>Заключение:</strong> {conclusion || 'Нет данных'}</p>
                <div className="actions">
                    <button onClick={() => handleDownload(document_id)} className="download-btn">Скачать PDF</button>
                </div>
            </div>
        </>
    );
};

export default ResultCard;
