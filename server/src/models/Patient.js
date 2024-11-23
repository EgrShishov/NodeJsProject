const { QueryTypes } = require('sequelize');
const {sequelize} = require('../db/connection');

exports.createPatient = async (data) => {
    const [results, metadata] = await sequelize.query(
        'CALL create_patient_account(:email, :password, :firstName, :lastName, :middleName, :phoneNumber, :dob)',
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

exports.getAllPatients = async () => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        p.first_name,
        p.last_name,
        p.middle_name,
        p.date_of_birth
        u.photo_url,
        u.email
    FROM Patients as p
    JOIN Users as u ON u.id = p.user_id;`,
        {
            type: QueryTypes.SELECT
        });

    return results;
};

exports.getPatientById = async (id) => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        p.first_name,
        p.last_name,
        p.middle_name,
        p.date_of_birth
        u.photo_url,
        u.email
    FROM Patients as p
    JOIN Users as u ON u.id = p.user_id
    WHERE p.patient_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
};

exports.editPatient = async (id, data) => {
    const [results, metadata] = await sequelize.query(`
        UPDATE Patients
        SET first_name = ?, last_name = ?, middle_name = ?, date_of_birth = ?
        WHERE patient_id = ?;`,
        {
            replacements: [data.first_name, data.last_name, data.middle_name, data.date_of_birth, id],
            type: QueryTypes.UPDATE
        });

    return results;
};

exports.deletePatient = async (id) => {
    const [results, metadata] = await sequelize.query(`
        CALL delete_patient_account(?);`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results;
};