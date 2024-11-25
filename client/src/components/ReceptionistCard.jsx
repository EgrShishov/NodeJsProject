const ReceptionistCard = ({ profile, onDeleteClick, onEditClick }) => {

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    console.log(profile);

    return (
        <div className="receptionist-card">
            <img src={profile.photo_url} alt={`profile_pic`}/>
            <p><strong>Фамилия:</strong> {profile.last_name}</p>
            <p><strong>Имя:</strong> {profile.first_name}</p>
            <p><strong>Отчество:</strong> {profile.middle_name}</p>
            <p><strong><i>Дата рождения:</i></strong> {formatter.format(new Date(profile.date_of_birth))}</p>
            <div className="receptionist-card__actions">
                <button className="action-button" onClick={() => onEditClick(profile.receptionist_id)}>Редактировать</button>
                <button className="action-button" onClick={() => onDeleteClick(profile.receptionist_id)}>Удалить</button>
            </div>
        </div>
    );
};

export default ReceptionistCard;