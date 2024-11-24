const {QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.getAllServices = async () => {
    const results= await sequelize.query(`
        SELECT
            s.service_id,
            s.service_name,
            sc.category_name,
            s.is_active
        FROM Services AS s
            JOIN ServiceCategory AS sc ON (sc.service_category_id=s.service_category_id);`,
        {
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getServiceById = async (id) => {
    const results= await sequelize.query(`
        SELECT
            s.service_name,
            s.is_active
            sc.category_name
        FROM Services AS s
            JOIN ServiceCategory AS sc ON (sc.service_category_id=s.service_category_id);
        WHERE s.service_id = ?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
};

exports.createService = async (data) => {
    const results= await sequelize.query(`
        INSERT INTO services (service_name, service_category_id, is_active) VALUES (?, ?, ?) RETURNING service_id;`,
        {
            replacements: [data.service_name, data.service_category_id, data.is_active],
            type: QueryTypes.INSERT
        });

    return results[0];
};

exports.editService = async (id, data) => {
    const results= await sequelize.query(`
        UPDATE Services 
        SET is_active = ? , service_name = ?
        WHERE service_category_id = ?;`,
        {
            replacements: [data.is_active, data.service_category_id, data.service_name, id],
            type: QueryTypes.UPDATE
        });

    return results[0];
};

exports.editServiceStatus = async (id, status) => {
    const results= await sequelize.query(`
        UPDATE Services 
        SET is_active = ? WHERE service_id = ?;`,
        {
            replacements: [status, id],
            type: QueryTypes.UPDATE
        });

    return results[0];
};

exports.deleteService = async (id) => {
    const results = await sequelize.query(`
        DELETE FROM Services 
        WHERE service_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results[0];
};