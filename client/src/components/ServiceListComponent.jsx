const ServiceList = ({ services }) => {
    return (
        <div className="service-list">
            {services.map(service => (
                <div key={service._id} className="service-item">
                    <h3>{service.ServiceName}</h3>
                    <p>Category: {service.CategoryName}</p>
                    <p>Status: {service.IsActive ? "Active" : "Inactive"}</p>
                </div>
            ))}
        </div>
    );
};

export default ServiceList;