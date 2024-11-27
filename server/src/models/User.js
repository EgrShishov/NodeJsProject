const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getUserById = async (id) => {
    console.log('get user by od', id);
    const results= await sequelize.query(`
        SELECT * FROM users WHERE user_id=?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
}

exports.updateUser = async (id, data) => {
    const results = await sequelize.query(`
        UPDATE users 
        SET email=?, user_name=?, photo_url=? WHERE user_id=?`,
        {
            replacements: [data.email, data.name, data.urlPhoto, id],
            type: QueryTypes.UPDATE
        });

    return results[0];
};

exports.getUserByEmail = async (email) => {
    const results = await sequelize.query(`
        SELECT * 
        FROM users WHERE email=?`,
        {
            replacements: [email],
            type: QueryTypes.SELECT
        });
    return results[0];
};

exports.setRefreshToken = async (id, token) => {
    const results = await sequelize.query(`
        UPDATE users 
        SET refresh_token=? WHERE user_id=?`,
        {
            replacements: [token, id],
            type: QueryTypes.UPDATE
        });

    return results[0];
};

exports.deleteAccount = async (id) => {
    const results = await sequelize.query(`
        DELETE FROM users 
        WHERE id=?`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results[0];
};

exports.getUserByToken = async (token) => {
    const results= await sequelize.query(`
        DELETE FROM users 
        WHERE refresh_token=?`,
        {
            replacements: [token],
            type: QueryTypes.SELECT
        });

    return results[0];
};

exports.getUserByGoogleId = async (id) => {
    const results= await sequelize.query(`
        SELECT * 
        FROM users WHERE google_id=?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });
    return results[0];
};

exports.comparePassword = async (id, password) => {
    const results= await sequelize.query(`
        SELECT * FROM compare_passwords(?, ?) `,
        {
            replacements: [id, password],
            type: QueryTypes.SELECT
        });
    return results[0];
};