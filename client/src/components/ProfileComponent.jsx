import CommonProfileInfo from "./CommonProfileInfo";
import {useAuth} from "../context/AuthContext";
import {profile} from "../services/authService";
import {useEffect, useState} from "react";

const ProfileComponent = () => {
    const [ profileData, setProfile ] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await profile();
            setProfile(data);
            console.log(data);
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile">
            {profileData ? (
                <CommonProfileInfo
                    first_name={profileData.FirstName}
                    last_name={profileData.LastName}
                    middle_name={profileData.MiddleName}
                    date_of_birth={profileData.DateOfBirth} />
            ) : (
                <p>Loading profile info</p>
            )}
        </div>
    );
};

export default ProfileComponent;