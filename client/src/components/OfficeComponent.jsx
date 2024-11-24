const OfficeComponent = ( { office } ) => {
    return (
        <div key={office.office_id} className="office-component">
            <h3>{office.city}, {office.street} {office.street_number}</h3>
            <p>{office.region}, {office.country}</p>
            <p>Номер оффиса: {office.office_number}</p>
            <p>Телефон: {office.phone_number}</p>
        </div>
    );
};

export default OfficeComponent;