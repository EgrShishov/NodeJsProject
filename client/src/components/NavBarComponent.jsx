import {Link} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const NavBarComponent = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <Link to="/home" className="logo">AgendaClinic</Link>
                    </li>
                    <li>
                        <Link to="/doctors">Doctors</Link>
                    </li>
                    <li>
                        <Link to="/specializations">Specializations</Link>
                    </li>
                    <li>
                        <Link to="/procedures">Procedures</Link>
                    </li>
                    <li>
                        <Link to="/services">Services</Link>
                    </li>
                    <li>
                        <Link to="/offices">Offices</Link>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <Link to="/profile">Profile</Link>
                            </li>

                            <li>
                                <Link to="/logout">Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>

                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default NavBarComponent;