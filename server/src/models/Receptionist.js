const { DataTypes, QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.createReceptionist = async (data) => {
    const [results, metadata] = await sequelize.query(
        'CALL create_receptionists_account(:email, :password, :firstName, :lastName, :middleName, :phoneNumber, :dob)',
        {
            replacements: {
                email: data.email,
                password: data.password,
                firstName: data.first_name,
                lastName: data.last_name,
                middleName: data.middle_name,
                phoneNumber: data.phone_number,
                dob: data.date_of_birth
            },
            type: QueryTypes.RAW
        }
    );
    return results;
};

exports.getAllReceptionists = async () => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        r.first_name,
        r.last_name,
        r.middle_name,
        u.photo_url,
        u.email
    FROM Receptionists as r
    JOIN Users as u ON r.user_id = u.user_id;`,
        {
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getReceptionistById = async (id) => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        r.first_name,
        r.last_name,
        r.middle_name,
        u.photo_url,
        u.email
    FROM Receptionists as r
    JOIN Users as u ON r.user_id = u.user_id;
    WHERE r.receptionist_id = ?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getReceptionistByUserId = async (id) => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        r.first_name,
        r.last_name,
        r.middle_name,
        u.photo_url,
        u.email
    FROM Receptionists as r
    JOIN Users as u ON r.user_id = u.user_id;
    WHERE r.user_id = ?`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
}

exports.editReceptionist = async (id, data) => {
    const [results, metadata] = await sequelize.query(`
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
    const [results, metadata] = await sequelize.query(`
    CALL delete_receptionists_account(?);`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
};