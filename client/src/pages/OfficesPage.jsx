import {useEffect, useState} from "react";
import {getAllOffices} from "../services/officesService";
import OfficeComponent from "../components/OfficeComponent.jsx";

const OfficesPage = () => {
    const [ officesList, setOfficesList ] = useState([]);

    useEffect(() => {
        const fetchOffices = async () => {
            const offices = await getAllOffices();
            setOfficesList(offices);
        };

        fetchOffices();
    }, []);

    return (
        <div className="offices-page">
            <h2>Все наши офисы</h2>
            <p>We shape our clients' visions into living, breathing designs. Everything
                we do along the way reflects our commitment to lasting value.</p>
            <div className="offices-list">
                {officesList.map((office) => {
                    return (
                        <OfficeComponent key={office._id} office={office}/>
                    );
                })}
            </div>
        </div>
    );
};

export default OfficesPage;