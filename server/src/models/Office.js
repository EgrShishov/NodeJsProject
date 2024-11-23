const {sequelize} = require('../db/connection');
const {QueryType} = require('sequelize');

exports.getAllOffices = async () => {
    try {
        const query = 'SELECT * FROM Offices';
        const [results, metadata] = await sequelize.query(query, {
            type: sequelize.QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error(`Error retrieving offices: ${error.message}`);
    }
};

exports.getOfficeById = async (id) => {
    try {
        const query = 'SELECT * FROM Offices WHERE office_id = :office_id';
        const [results, metadata] = await sequelize.query(query, {
            replacements: { office_id: id },
            type: sequelize.QueryTypes.SELECT
        });

        return results[0];
    } catch (error) {
        throw new Error(`Error retrieving office: ${error.message}`);
    }
};

exports.createOffice = async (data) => {
    try {
        const query = `
        INSERT INTO Offices (country, region, city, street, street_number, office_number, phone_number)
        VALUES (:country, :region, :city, :street, :street_number, :office_number, :phone_number)
        RETURNING *;
    `;
        const [results, metadata] = await sequelize.query(query, {
            replacements: {
                country: data.country,
                city: data.city,
                street: data.street,
                street_number: data.street_number
                office_number: data.office_number,
                phone_number: data.phone_number,
            },
            type: sequelize.QueryTypes.INSERT
        });

        return results[0];
    } catch (error) {
        throw new Error(`Error creating office: ${error.message}`);
    }
}

