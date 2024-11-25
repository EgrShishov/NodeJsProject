const { DataTypes, QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.createReceptionist = async (data) => {
    try {
        const query = `
        CALL create_receptionists_account(
            :email,
            :password,
            :first_name,
            :last_name,
            :middle_name,
            :phone_number,
            :date_of_birth,
            NULL,
            NULL);
        `;

        const replacements = {
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            phone_number: data.phone_number,
            date_of_birth: data.date_of_birth
        };

        console.log(replacements);

        const result = await sequelize.query(query, {
            replacements
        });

        return result[0];
    } catch (error) {
        throw new Error (`Ошибка в создании регистратора: ${error}`);
    }
};

exports.getAllReceptionists = async () => {
    const results= await sequelize.query(`
    SELECT
        r.receptionist_id,
        r.first_name,
        r.last_name,
        r.middle_name,
        r.date_of_birth,
        u.photo_url,
        u.email
    FROM Receptionists as r
    JOIN Users as u ON r.user_id = u.user_id;`,
        {
            type: QueryTypes.SELECT
        });

    console.log('receptionists', results);
    return results;
};

exports.getReceptionistById = async (id) => {
    const results = await sequelize.query(`
    SELECT
        r.first_name,
        r.last_name,
        r.middle_name,
        r.date_of_birth,
        u.photo_url,
        u.email
    FROM Receptionists as r
    JOIN Users as u ON r.user_id = u.user_id
    WHERE r.receptionist_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
};

exports.getReceptionistByUserId = async (id) => {
    const results = await sequelize.query(`
    SELECT
        r.receptionist_id as user_id,
        r.first_name,
        r.last_name,
        r.middle_name,
        r.date_of_birth,
        u.photo_url,
        u.email
    FROM Receptionists as r
    JOIN Users as u ON r.user_id = u.user_id
    WHERE r.user_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
}

exports.editReceptionist = async (id, data) => {
    const results = await sequelize.query(`
        UPDATE Receptionists
        SET first_name = ?, last_name = ?, middle_name = ?, date_of_birth = ?
        WHERE receptionist_id = ?;`,
        {
            replacements: [data.first_name, data.last_name, data.middle_name, data.date_of_birth, id],
            type: QueryTypes.UPDATE
        });

    return results;
};

exports.deleteReceptionist = async (id) => {
    const results = await sequelize.query(`
    CALL delete_receptionists_account(?);`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results;
};