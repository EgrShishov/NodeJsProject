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
                    first_name={profileData.first_name}
                    last_name={profileData.last_name}
                    middle_name={profileData.middle_name}
                    date_of_birth={profileData.date_of_birth}
                    picture={profileData.photo_url}
                    email={profileData.email}
                    onProfileUpdate={handleUpdateProfile}
                    />
            ) : (
                <div className="loader"></div>
            )}
        </div>
    );
};

export default ProfileComponent;