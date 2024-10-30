import {useAuth} from "../context/AuthContext.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const { userRegister } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [birthdayDate, setBirthdayDate] = useState(new Date().now);

    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    return (
        <div className="register-component">
            <form id="register-form" onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Enter your middle name"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <input
                    type="date"
                    placeholder="Enter your birthday date"
                    value={birthdayDate}
                    onChange={(e) => setBirthdayDate(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input type="submit" value="login"/>
            </form>
            <div>
                Already have account? <Link to="/login">Login</Link>
            </div>
        </div>
    );
};

export default RegisterPage;