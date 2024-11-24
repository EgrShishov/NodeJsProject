const {QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.getAllServiceCategories = async () => {
    const [results, metadata] = await sequelize.query(`
        SELECT * FROM service_category;`,
        {
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getServiceCategoryById = async (id) => {
    const [results, metadata] = await sequelize.query(`
        SELECT * FROM service_category WHERE service_category_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
};

exports.createServiceCategory = async (data) => {
    const [results, metadata] = await sequelize.query(`
        INSERT INTO service_category (category_name) VALUES(?) RETURNING service_category_id;`,
        {
            replacements: [data.category_name],
            type: QueryTypes.INSERT
        });

    return results;
};

exports.editServiceCategory = async (id, data) => {
    const [results, metadata] = await sequelize.query(`
        UPDATE service_category 
        SET category_name = ? 
        WHERE service_category_id = ?;`,
        {
            replacements: [data.category_name, id],
            type: QueryTypes.UPDATE
        });

    return results;
};

exports.deleteServiceCategory = async (id) => {
    const [results, metadata] = await sequelize.query(`
        DELETE FROM service_category 
        WHERE service_category_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results;
};