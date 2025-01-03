import CommonProfileInfo from "./CommonProfileInfo.jsx";

const ProfileComponent = ({ profileData }) => {
    return (
        <div className="profile">
            {profileData ? (
                <CommonProfileInfo
                    first_name={profileData.FirstName}
                    last_name={profileData.LastName}
                    middle_name={profileData.MiddleName}
                    date_of_birth={profileData.DateOfBirth} />
            ) : (
                <p>Загружаем информацию о профиле...</p>
            )}
        </div>
    );
};

export default ProfileComponent;