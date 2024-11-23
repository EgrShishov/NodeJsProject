const ReceptionistCard = ({ profile, onDeleteClick, onEditClick }) => {

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <div className="receptionist-card">
            <img src={profile.UserId?.urlPhoto} alt={`profile_pic`}/>
            <p><strong>Фамилия:</strong> {profile.LastName}</p>
            <p><strong>Имя:</strong> {profile.FirstName}</p>
            <p><strong>Отчество:</strong> {profile.MiddleName}</p>
            <p><strong><i>Дата рождения:</i></strong> {formatter.format(new Date(profile.DateOfBirth))}</p>
            <div className="receptionist-card__actions">
                <button className="action-button" onClick={onEditClick}>Редактировать</button>
                <button className="action-button" onClick={onDeleteClick}>Удалить</button>
            </div>
        </div>
    );
};

export default ReceptionistCard;