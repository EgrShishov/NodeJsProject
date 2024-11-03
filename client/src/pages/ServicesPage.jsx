import {useEffect, useState} from "react";
import {getServices} from "../services/servicesService.js"
import ServiceListComponent from "../components/ServiceListComponent.jsx";

const ServicesPage = () => {
    const [ serviceList, setServiceList ] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const services = await getServices();
            setServiceList(services);
        };

        fetchServices();
    }, []);

    return (
        <div className="services-page">
            <h2>Available Services</h2>
            <ServiceListComponent services={serviceList}/>
        </div>
    );
};

export default ServicesPage;