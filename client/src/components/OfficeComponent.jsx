const OfficeComponent = ( { office } ) => {
    return (
        <div key={office._id} className="office-component">
            <h3>{office.City}, {office.Street} {office.StreetNumber}</h3>
            <p>{office.Region}, {office.Country}</p>
            <p>Номер оффиса: {office.OfficeNumber}</p>
            <p>Телефон: {office.PhoneNumber}</p>
        </div>
    );
};

export default OfficeComponent;