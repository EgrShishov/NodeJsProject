const CommonProfileInfo = ({first_name, last_name, middle_name, date_of_birth, picture}) => {
    return (
        <div className="common-profile-info">
            <img className="profile-picture" src={picture} alt="ProfileComponent"/>
            <div className="profile-details">
                <div className="first-name">Имя: {first_name}</div>
                <div className="last-name">Фамилия: {last_name}</div>
                <div className="middle-name">Отчество: {middle_name}</div>
                <div className="dob">Дата рождения: {date_of_birth}</div>
            </div>
        </div>
    );
};

CommonProfileInfo.defaultProps = {
    picture: '/public/vite.svg',
};

export default CommonProfileInfo;