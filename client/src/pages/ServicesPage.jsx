import {useEffect, useState} from "react";
import {activateService, getServices, inactivateService} from "../services/servicesService.js"
import ServiceListComponent from "../components/ServiceListComponent.jsx";
import {toast} from "react-toastify";
import {useAuth} from "../context/AuthContext.jsx";

const ServicesPage = () => {
    const [serviceList, setServiceList] = useState([]);
    const {user} = useAuth();

    const fetchServices = async () => {
        const services = await getServices();
        setServiceList(services);
        console.log(services);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleChangeStatus = async (id, isActive) => {
        console.log(id, isActive);
        try {
            if (isActive) {
                const response = await inactivateService(id);
                if (response) await fetchServices();
            } else {
                const response = await activateService(id);
                if (response) await fetchServices();
            }
        } catch (error){
            toast.error(`Ошибка при обновлении статуса сервиса: ${error.message}`);
        }
    };

    return (
        <div className="services-page">
            <h2>Available Services</h2>
            <ServiceListComponent services={serviceList} changeStatus={handleChangeStatus} role={user ? user.role : null}/>
        </div>
    );
};

export default ServicesPage;