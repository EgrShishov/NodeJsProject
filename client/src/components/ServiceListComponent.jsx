const ServiceList = ({ services, changeStatus, role }) => {
    return (
        <div className="service-list">
            {services.map(service => (
                <div key={service._id} className={`service-item ${service.IsActive ? "active" : "inactive"}`}>
                    <h3>{service.ServiceName}</h3>
                    <div className="service-item__category">Category: {service.CategoryName}</div>
                    <div className="service-item__status">Status: {service.IsActive ? "Active" : "Inactive"}</div>
                    {role && role === 'receptionist' && (
                        <button onClick={() => changeStatus(service._id, service.IsActive)}
                        >
                            Make {`${!service.IsActive ? "active" : "inactive"}`}
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ServiceList;