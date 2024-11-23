import {useState} from "react";
import {toast} from "react-toastify";

const CommonProfileInfo = ({first_name, last_name, middle_name, date_of_birth, picture, email, onProfileUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [editedFirstName, setEditedFirstName] = useState(first_name);
    const [editedLastName, setEditedLastName] = useState(last_name);
    const [editedMiddleName, setEditedMiddleName] = useState(middle_name);
    const [editedDateOfBirth, setEditedDateOfBirth] = useState(date_of_birth);
    const [editedEmail, setEditedEmail] = useState(email);
    const [oldPassword, setOldPassword] = useState('')
    const [editedPassword, setEditedPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [editedPicture, setEditedPicture] = useState(picture);
    const [picFile, setPicFile] = useState(null);

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPicFile(file);
            const fileURL = URL.createObjectURL(file);
            setEditedPicture(fileURL);
        }
    };

    const uploadPicture = async (file) => {
        const formData = new FormData();
        formData.append('profile_pic', file);

        try {
            const response = await fetch('http://localhost:5000/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            if (response.ok) {
                toast.success('File uploaded successfully:', data.filePath);
                return data.filePath;
            } else {
                toast.success('Failed to upload file:', data.error);
            }
        } catch (error) {
            toast.error('Error uploading file:', error);
        }
    };

    const handleSaveChanges = async () => {
        let path = null;
        if (picFile) path = await uploadPicture(picFile);
        console.log(picFile);
        const updatedProfile = {
            first_name: editedFirstName,
            last_name: editedLastName,
            middle_name: editedMiddleName,
            date_of_birth: editedDateOfBirth,
            email: editedEmail,
            picture: path || picture
        };

        onProfileUpdate(updatedProfile);
        setIsEditing(false);
    };

    const formatter = new Intl.DateTimeFormat('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    });

    return (
        <div className="common-profile-info">
            <div className="editing-profile-btns">
                <button
                    className="change-profile-btn"
                    hidden={isEditing}
                    onClick={() => setIsEditing(!isEditing)}>
                    {'✎ Редактировать профиль'}
                </button>
            </div>

            {isEditing ? (
                <div className="profile-edit-form">
                    <div className="profile-picture">
                        <input type="file" accept="image/*" onChange={handlePictureChange} className="file-input"/>
                        <img className="profile-picture-img" src={ editedPicture || '/public/vite.svg'}
                             alt="profile_photo"/>
                    </div>

                    <div className="profile-details">
                        <div className="input-group">
                            <label className="first-name">Имя:</label>
                            <input
                                type="text"
                                className="input-field"
                                value={editedFirstName}
                                onChange={(e) => setEditedFirstName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="last-name">Фамилия:</label>
                            <input
                                type="text"
                                className="input-field"
                                value={editedLastName}
                                onChange={(e) => setEditedLastName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="middle-name">Отчество:</label>
                            <input
                                type="text"
                                className="input-field"
                                value={editedMiddleName}
                                onChange={(e) => setEditedMiddleName(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="dob">Дата рождения:</label>
                            <input
                                type="date"
                                className="input-field"
                                value={editedDateOfBirth}
                                onChange={(e) => setEditedDateOfBirth(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label className="email">Почта:</label>
                            <input
                                type="email"
                                className="input-field"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                        </div>
                        <button className="change-password-btn"
                                onClick={() => setIsEditingPassword(!isEditingPassword)}>
                            {isEditingPassword ? 'Отменить' : '✎ Сменить пароль'}
                        </button>
                        {isEditingPassword ? (
                            <>
                                <div className="input-group">
                                    <label>Старый пароль:</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Новый пароль:</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={editedPassword}
                                        onChange={(e) => setEditedPassword(e.target.value)}
                                    />
                                </div>
                                <div className="input-group">
                                    <label>Повторите пароль:</label>
                                    <input
                                        type="password"
                                        className="input-field"
                                        value={repeatedPassword}
                                        onChange={(e) => setRepeatedPassword(e.target.value)}
                                    />
                                </div>
                            </>
                        ) : (<></>)}
                    </div>

                    <div className="editing-profile-btns">
                        <button className="action-button" onClick={handleSaveChanges}>Сохранить изменения</button>
                        <button className="action-button" onClick={() => setIsEditing(!isEditing)}>Отменить</button>
                    </div>
                </div>
            ) : (
                <>
                    <img className="profile-picture" src={picture} alt="profile_photo"/>
                    <div className="profile-details">
                        <div className="first-name">Имя: {first_name}</div>
                        <div className="last-name">Фамилия: {last_name}</div>
                        <div className="middle-name">Отчество: {middle_name}</div>
                        <div className="dob">Дата рождения: {formatter.format(new Date(date_of_birth))}</div>
                        <div className="email">Адрес электронной почты: {email}</div>
                    </div>
                </>
            )}
        </div>
    );
};

CommonProfileInfo.defaultProps = {
    picture: '/public/vite.svg',
};

export default CommonProfileInfo;