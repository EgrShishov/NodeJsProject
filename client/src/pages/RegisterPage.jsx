import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import CurrentTimeComponent from "../components/CurrentTimeComponent.jsx";

const RegisterPage = () => {
    const { userRegister } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [birthdayDate, setBirthdayDate] = useState(new Date().now);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [isFading, setIsFading] = useState(false);

    const navigate = useNavigate();

    const handleNextStep = () => {
        setIsFading(true);
        setTimeout(() => {
            setStep(step + 1);
            setIsFading(false);
        }, 400);
    };

    const handlePrevStep = () => {
        setIsFading(true);
        setTimeout(() => {
            setStep(step - 1);
            setIsFading(false);
        }, 400);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const registerData = {
                email: email,
                password: password,
                first_name: firstName,
                last_name: lastName,
                middle_name: middleName,
                birthday_date: birthdayDate
            };

            const registerResult = await userRegister(registerData);
            if (registerResult) navigate('/login');
            else navigate('/register');
        } catch (error) {
            setError(`Register failed, please check your credentials: ${error.message}`);
            console.log(error);
        }
    };

    // validation will be added later
    const validateForm = (e) => {
        e.preventDefault();
    }

    const is_password_coincide = () => {
        return confirm_password === password;
    }

    return (
        <div className="register-component">
            <CurrentTimeComponent />
            <div className="register-wrapper">
                {step === 1 && (
                    <h2 className={`register-title step-content ${isFading ? "fade-out" : "fade-in"}`}>
                        Добро пожаловать в семью!</h2>
                )}
                {step === 2 && (
                    <h2 className={`register-title step-content ${isFading ? "fade-out" : "fade-in"}`}>
                        Почти готово!</h2>
                )}
                {step === 3 && (
                    <h2 className={`register-title step-content ${isFading ? "fade-out" : "fade-in"}`}>
                        Осталось придумать пароль...</h2>
                )}
                <form id="register-form" onSubmit={handleRegister}>
                    {step === 1 && (
                        <div className={`step-content ${isFading ? "fade-out" : "fade-in"}`}>
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Введите имя"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Введите фамилию"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            <input
                                className="input-field"
                                type="text"
                                placeholder="Введите отчество"
                                value={middleName}
                                onChange={(e) => setMiddleName(e.target.value)}
                            />
                            <button
                                type="button"
                                disabled={firstName === '' || lastName === '' || middleName === ''}
                                className="next-btn"
                                onClick={handleNextStep}
                            >Далее</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className={`step-content ${isFading ? "fade-out" : "fade-in"}`}>
                            <input
                                className="input-field"
                                type="date"
                                placeholder="Введите дату рождения"
                                value={birthdayDate}
                                onChange={(e) => setBirthdayDate(e.target.value)}
                                required
                            />
                            <input
                                className="input-field"
                                type="email"
                                placeholder="Введите свой адрес электронной почты"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="step-buttons">
                                <button type="button" className="prev-btn" onClick={handlePrevStep}>Назад</button>
                                <button
                                    type="button"
                                    disabled={birthdayDate === '' || email === ''}
                                    className="next-btn"
                                    onClick={handleNextStep}
                                >Далее</button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className={`step-content ${isFading ? "fade-out" : "fade-in"}`}>
                            <input
                                className="input-field"
                                type="password"
                                placeholder="Введите пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input
                                className="input-field"
                                type="password"
                                placeholder="Повторите пароль"
                                value={confirm_password}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <div className="step-buttons">
                                <button type="button" className="prev-btn" onClick={handlePrevStep}>Назад</button>
                                <button
                                    type="submit"
                                    disabled={password === '' || confirm_password === '' || !is_password_coincide()}
                                    className="submit-btn"
                                >Зарегистрироваться</button>
                            </div>
                        </div>
                    )}
                </form>
                <div className="login-link">
                    Уже есть аккаунт? <Link to="/login">Войди в него</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;