const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getRoleByName = async (name) => {
    const [results, metadata] = await sequelize.query(`
        SELECT * 
        FROM role WHERE role_name=?`,
        {
            replacements: [name],
            type: QueryTypes.SELECT
        });
    return results;
}

exports.getRoleById = async (id) => {
    const [results, metadata] = await sequelize.query(`
        SELECT * 
        FROM role WHERE id=?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });
    return results;
}