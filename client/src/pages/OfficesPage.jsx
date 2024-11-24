import {useEffect, useState} from "react";
import {getAllOffices} from "../services/officesService";
import OfficeComponent from "../components/OfficeComponent.jsx";
import {MapContainer, TileLayer} from "react-leaflet";
import { toast, ToastContainer } from "react-toastify";

const OfficesPage = () => {
    const [ officesList, setOfficesList ] = useState([]);
    const [ position, setPosition ] = useState({
        latitude: 53.5359,
        longitude: 27.3400
    });
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const fetchOffices = async () => {
            const offices = await getAllOffices();
            if (offices) setOfficesList(offices);
            else setError()
        };
        fetchOffices();
    }, []);

    useEffect(() => {
        if (error !== null) toast.error(`Произошла ошибка: ${error}`);
    }, [error]);

    const handleMapError = () => {
        toast.error("Не удалось загрузить карту. Проверьте подключение.");
    };

    return (
        <div className="offices-page">
            <h2>Места, где вы можете стать полностью здоровыми!</h2>
            <p>
                Мы возвращаем к здоровой жизни наших клиентов. Поэтому всё, что мы
                делаем, отражает наше стремление к созданию долговечной ценности.
                Именно поэтому количество наших офисов по стране стремительно
                растет и приближается к отметке 200+.
            </p>
            <div className="offices-content">
                {officesList ? (
                    <div className="offices-list">
                        {officesList.map((office) => (
                            <OfficeComponent key={office._id} office={office}/>
                        ))}
                    </div>
                ) : (<div className="loader"></div>)}

                <div className="map-container">
                <ToastContainer />
                {position ? (
                    <MapContainer
                        onTileError={handleMapError}
                        center={[position.latitude, position.longitude]}
                        zoom={13}
                        style={{height: '100%', width: '100%'}}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                    </MapContainer>
                ) : (<div className="loader"></div>)}
                </div>
            </div>
        </div>
    );
};

export default OfficesPage;