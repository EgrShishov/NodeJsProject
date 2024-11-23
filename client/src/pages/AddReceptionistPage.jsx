import {createReceptionist} from "../services/receptionistsService.js";
import {toast, ToastContainer} from "react-toastify";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AddReceptionistPage = () => {

    const [formValid, setFormValid] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(new Date());

    const navigate = useNavigate();

    const handleAddReceptionist = async (e) => {
        e.preventDefault();

        try {
            const formData = {
                firstName,
                lastName,
                middleName,
                email,
                dateOfBirth
            };

            console.log(formData);

            const response = await createReceptionist(formData);
            if (response) {
                toast.success(`Регистратор успешно создан!`);
                navigate('/receptionists')
            }
        } catch (error) {
            toast.error(`Ошибка при создании регистратора: ${error.message}`);
        }
    };

    return (
        <div className="add-receptionist-page">
            <ToastContainer/>
            <form
                className="add-receptionist-form"
                onSubmit={handleAddReceptionist}
            >
                <h2>Создать аккаунт регистратора</h2>

                <div className="form-field">
                    <label>Фамилия регистратора:</label><br/>
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Имя регистратора:</label><br/>
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Отчество регистратора:</label><br/>
                    <input
                        type="text"
                        name="middleName"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Дата рождения:</label><br/>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>

                <div className="form-field">
                    <label>Адрес электронной почты:</label><br/>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <input type="submit"
                       value="Создать регистратора"></input>
                <button onClick={() => navigate('/receptionists')}>Вернутся назад</button>
            </form>
        </div>
    );
};

export default AddReceptionistPage;