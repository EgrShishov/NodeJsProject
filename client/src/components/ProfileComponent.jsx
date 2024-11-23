import CommonProfileInfo from "./CommonProfileInfo.jsx";
import {updateProfileInfo} from "../services/authService.js";
import {toast} from "react-toastify";

const ProfileComponent = ({ profileData, setProfileData }) => {

    const handleUpdateProfile = async (data) => {
        try {
            const updatedProfile = await updateProfileInfo(data);
            setProfileData(updatedProfile);
            toast.success("Профиль успешно обновлён.");
        } catch (error) {
            toast.error(`Ошибка в обновлении информации: ${error.message}`);
        }
    };

    return (
        <div className="profile">
            {profileData ? (
                <CommonProfileInfo
                    first_name={profileData.FirstName}
                    last_name={profileData.LastName}
                    middle_name={profileData.MiddleName}
                    date_of_birth={profileData.DateOfBirth}
                    picture={profileData.UserId.urlPhoto}
                    email={profileData.UserId.email}
                    onProfileUpdate={handleUpdateProfile}
                    />
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
};

export default ProfileComponent;