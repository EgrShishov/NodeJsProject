const ServiceList = ({ services, changeStatus, role }) => {
    return (
        <div className="service-list">
            {services.map(service => (
                <div key={service.service_id} className={`service-item ${service.is_active ? "active" : "inactive"}`}>
                    <h3>{service.service_name}</h3>
                    <div className="service-item__category">Category: {service.category_name}</div>
                    <div className="service-item__status">Status: {service.is_active ? "Active" : "Inactive"}</div>
                    {role === 'receptionist' && (
                        <button onClick={() => changeStatus(service.service_id, service.is_active)}
                        >
                            Make {`${!service.is_active ? "active" : "inactive"}`}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServiceList;