const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getRoleByName = async (name) => {
    const results = await sequelize.query(`
        SELECT * 
        FROM roles WHERE role_name=?`,
        {
            replacements: [name],
            type: QueryTypes.SELECT
        });
    return results[0];
}

exports.getRoleById = async (id) => {
    const results= await sequelize.query(`
        SELECT * 
        FROM roles WHERE role_id=?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });
    return results[0];
}