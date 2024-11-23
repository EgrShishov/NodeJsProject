const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getUserById = async (id) => {
    const [results, metadata] = await sequelize.query(`
        SELECT * 
        FROM users WHERE id=?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });
    return results;
}

exports.getUserByEmail = async (email) => {
    const [results, metadata] = await sequelize.query(`
        SELECT * 
        FROM users WHERE email=?`,
        {
            replacements: [email],
            type: QueryTypes.SELECT
        });
    return results;
};

exports.setRefreshToken = async (id, token) => {
    const [results, metadata] = await sequelize.query(`
        UPDATE users 
        SET refresh_token = ? WHERE id=?`,
        {
            replacements: [token, id],
            type: QueryTypes.UPDATE
        });

    return results;
};

exports.deleteAccount = async (id) => {
    const [results, metadata] = await sequelize.query(`
        DELETE FROM users 
        WHERE id=?`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results;
}

exports.getUserByToken = async (token) => {
    const [results, metadata] = await sequelize.query(`
        DELETE FROM users 
        WHERE refresh_token=?`,
        {
            replacements: [token],
            type: QueryTypes.SELECT
        });

    return results;
}