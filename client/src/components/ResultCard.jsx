import {toast} from "react-toastify";

const ResultCard = ({ result }) => {
    const { PatientId, DoctorId, Complaints, Recommendations, Conclusion, DocumentId } = result;

    const handleDownload = async (documentId) => {
        if (!DocumentId) {
            toast.error('Документ отсутствует для загрузки.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/documents/download/${documentId}`, {
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
            link.setAttribute('download', `result_${documentId}.pdf`);
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
                    <strong>Пациент:</strong> {PatientId ? `${PatientId.FirstName} ${PatientId.MiddleName} ${PatientId.LastName}` : 'Неизвестно'}
                </p>
                <p>
                    <strong>Доктор:</strong> {DoctorId ? `${DoctorId.FirstName} ${DoctorId.MiddleName} ${DoctorId.LastName}` : 'Неизвестно'}
                </p>
                <p><strong>Жалобы:</strong> {Complaints || 'Нет данных'}</p>
                <p><strong>Рекомендации:</strong> {Recommendations || 'Нет данных'}</p>
                <p><strong>Заключение:</strong> {Conclusion || 'Нет данных'}</p>
                <div className="actions">
                    <button onClick={() => handleDownload(DocumentId._id)} className="download-btn">Скачать PDF</button>
                </div>
            </div>
        </>
    );
};

export default ResultCard;
