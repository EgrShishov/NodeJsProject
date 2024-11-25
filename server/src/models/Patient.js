const { QueryTypes } = require('sequelize');
const {sequelize} = require('../db/connection');

exports.createPatient = async (data) => {
    const results = await sequelize.query(
        `SELECT * FROM create_patient_account(:email, :password, :first_name, :last_name, :middle_name, :phone_number, :date_of_birth)`,
        {
            replacements: {
                email: data.email,
                password: data.password,
                first_name: data.first_name,
                last_name: data.last_name,
                middle_name: data.middle_name,
                phone_number: data.phone_number,
                date_of_birth: data.date_of_birth,
            },
            type : QueryTypes.SELECT
        }
    );
    return results[0];
};

exports.getAllPatients = async () => {
    const results  = await sequelize.query(`
    SELECT
        p.patient_id,
        p.first_name,
        p.last_name,
        p.middle_name,
        p.date_of_birth,
        u.photo_url,
        u.email
    FROM Patients as p
    JOIN Users as u ON u.user_id = p.user_id;`,
        {
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getPatientById = async (id) => {
    const results = await sequelize.query(`
    SELECT
        p.patient_id,
        p.first_name,
        p.last_name,
        p.middle_name,
        p.date_of_birth,
        u.photo_url,
        u.email
    FROM Patients as p
    JOIN Users as u ON u.user_id = p.user_id
    WHERE p.patient_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
};

exports.getPatientByUserId = async (id) => {
    const results = await sequelize.query(`
    SELECT
        p.patient_id as user_id,
        p.first_name,
        p.last_name,
        p.middle_name,
        p.date_of_birth,
        u.photo_url,
        u.email
    FROM Patients as p
    JOIN Users as u ON u.user_id = p.user_id
    WHERE p.user_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
};

exports.editPatient = async (id, data) => {
    const results = await sequelize.query(`
        UPDATE Patients
        SET first_name = ?, last_name = ?, middle_name = ?, date_of_birth = ?
        WHERE patient_id = ?;`,
        {
            replacements: [data.first_name, data.last_name, data.middle_name, data.date_of_birth, id],
            type: QueryTypes.UPDATE
        });

    return results[0];
};

exports.deletePatient = async (id) => {
    const results = await sequelize.query(`
        CALL delete_patient_account(?);`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results[0];
};