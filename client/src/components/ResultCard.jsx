const ResultCard = ({ result }) => {
    const { PatientId, DoctorId, Complaints, Recommendations, Conclusion, DocumentId } = result;

    const handleShow = () => {
        // Логика для просмотра результата (например, открытие модального окна)
        console.log('Просмотр результата:', result);
    };

    const handleDownload = () => {
        fetch(`/documents/${DocumentId}/download`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/pdf',
            },
        })
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `result_${DocumentId}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            })
            .catch((error) => console.error('Ошибка загрузки PDF:', error));
    };

    return (
        <div className="result-card">
            <h3>Карточка медицинского заключения и результатов обследования</h3>
            <p><strong>Пациент:</strong> {PatientId}</p>
            <p><strong>Доктор:</strong> {DoctorId}</p>
            <p><strong>Жалобы:</strong> {Complaints}</p>
            <p><strong>Рекомендации:</strong> {Recommendations}</p>
            <p><strong>Заключение:</strong> {Conclusion}</p>

            <div className="actions">
                <button onClick={handleShow}>Просмотр</button>
                <button onClick={handleDownload}>Скачать PDF</button>
            </div>
        </div>
    );
};

export default ResultCard;