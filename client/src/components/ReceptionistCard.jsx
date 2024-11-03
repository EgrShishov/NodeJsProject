const ReceptionistCard = ({ profile, onDeleteClick, onEditClick }) => {
    return (
        <div className="receptionist-card">
            <img src={profile.ProfilePicture}/>
            <p>{profile.FirstName}</p>
            <p>{profile.MiddleName}</p>
            <p>{profile.LastName}</p>
            <p>{profile.DateOfBirth}</p>
            <div className="receptionist-card__actions">
                <button className="action-button" onClick={onEditClick}>Редактировать</button>
                <button className="action-button" onClick={onDeleteClick}>Удалить</button>
            </div>
        </div>
    );
};

export default ReceptionistCard;