const CommonProfileInfo = ({first_name, last_name, middle_name, date_of_birth, picture}) => {
    return (
        <div className="common-profile-info">
            <img className="profile-picture" src={picture} alt="ProfileComponent"/>
            <div className="profile-info">
                <div className="first-name">First Name: {first_name}</div>
                <div className="last-name">Last Name: {last_name}</div>
                <div className="middle-name">Middle Name: {middle_name}</div>
                <div className="dob">Date of Birth: {date_of_birth}</div>
            </div>
        </div>
    );
};

CommonProfileInfo.defaultProps = {
    picture: '/public/vite.svg',
};

export default CommonProfileInfo;