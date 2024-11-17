import {toast} from "react-toastify";

const ResultCard = ({ result }) => {
    const { PatientId, DoctorId, Complaints, Recommendations, Conclusion, DocumentId } = result;

    const handleDownload = () => {
        if (!DocumentId) {
            toast.error('Документ отсутствует для загрузки.');
            return;
        }

        fetch(`/documents/${DocumentId}/download`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    toast.error('Ошибка при загрузке файла.');
                }
                return response.blob();
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `result_${DocumentId}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            })
            .catch((error) => {
                toast.error(`Ошибка загрузки PDF: ${error}`);
            });
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
                    <button onClick={handleDownload} className="download-btn">Скачать PDF</button>
                </div>
            </div>
        </>
    );
};

export default ResultCard;
