const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getAllDoctors = async () => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        doctors.first_name,
        doctors.last_name,
        doctors.middle_name,
        doctors.career_start_year,
        s.specialization_name,
        u.photo_url,
        u.email
    FROM Doctors as doctors
    JOIN Specializations as s ON doctors.specialization_id = s.specialization_id;`,
        {
            type: QueryTypes.SELECT
        });

    return results;
}

exports.getDoctorById = async (doctorId) => {
    const [results, metadata] = await sequelize.query(`
    SELECT
        doctors.first_name,
        doctors.last_name,
        doctors.middle_name,
        doctors.career_start_year,
        s.specialization_name,
        u.photo_url,
        u.email
    FROM Doctors as doctors
    JOIN Specializations as s ON doctors.specialization_id = s.specialization_id
    WHERE doctors.doctor_id = ?;`,
        {
            replacements: [doctorId],
            type: QueryTypes.SELECT
        });

    return results;
}

exports.getDoctorsBySpecialization = async (spec) => {
    const [results, metadata] = await sequelize.query(`
        SELECT
            doctors.first_name,
            doctors.last_name,
            doctors.middle_name,
            doctors.career_start_year,
            s.specialization_name
        FROM Doctors as doctors
        JOIN Specializations as s ON doctors.specialization_id = s.specialization_id
        WHERE s.specialization_name = ?;`,
        {
            replacements: [spec],
            type: QueryTypes.SELECT
        }
    );

    return results;
}

exports.deleteDoctor = async (doctorId) => {
//returning doctor instance
};

exports.createDoctor = async (data) => {
    const [results, metadata] = await sequelize.query(
        'CALL create_doctors_account(:email, :password, :firstName, :lastName, :middleName, :phoneNumber, :dob, :specialization, :careerStartYear)',
        {
            replacements: {
                email: data.email,
                password: data.password,
                firstName: data.first_name,
                lastName: data.last_name,
                middleName: data.middle_name,
                phoneNumber: data.phone_number,
                dob: data.date_of_birth,
                specialization: data.specialization_id,
                careerStartYear: data.career_start_year
            },
            type: QueryTypes.RAW
        }
    );
    return results;
};

exports.editDoctor = async (id, data) => {
    const [results, metadata] = await sequelize.query(`
        UPDATE Doctors
        SET first_name = ?, last_name = ?, middle_name = ?, specialization_id = ?,
            career_start_year = ?, date_of_birth = ?
        WHERE doctor_id = ?;`,
        {
            replacements: [data.first_name, data.last_name, data.middle_name, data.specialization_id, data.career_start_year, data.date_of_birth, id],
            type: QueryTypes.UPDATE
        });

    return results;
};

exports.getDoctorsPatients = async (doctorId) => {
    const [results, metadata] = await sequelize.query(`
        CALL delete_doctors_account(?);`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results;
};