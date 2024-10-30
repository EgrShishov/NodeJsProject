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
        <div>
            <div className="offices-list">
                {officesList.map((office) => {
                    return (
                        <OfficeComponent office={office}/>
                    );
                })}
            </div>
        </div>
    );
};

export default OfficesPage;