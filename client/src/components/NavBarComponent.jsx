import {Link} from "react-router-dom";

const NavBarComponent = () => {
    return (
        <div className="navbar">
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
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

                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavBarComponent;