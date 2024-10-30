const OfficeComponent = ( { office } ) => {
    return (
        <div key={office._id} className="office-component">
            <h3>{office.City}, {office.Street} {office.StreetNumber}</h3>
            <p>{office.Region}, {office.Country}</p>
            <p>Office Number: {office.OfficeNumber}</p>
            <p>Phone: {office.PhoneNumber}</p>
        </div>
    );
};

export default OfficeComponent;