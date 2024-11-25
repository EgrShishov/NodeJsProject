const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getAllDoctors = async () => {
    const results = await sequelize.query(`
    SELECT
        doctors.doctor_id,
        doctors.first_name,
        doctors.last_name,
        doctors.middle_name,
        doctors.career_start_year,
        doctors.date_of_birth,
        s.specialization_name,
        u.photo_url,
        u.email
    FROM Doctors as doctors
        JOIN Users as u ON u.user_id = doctors.user_id
        JOIN Specializations as s ON doctors.specialization_id = s.specialization_id;
    `,
        {
            type: QueryTypes.SELECT
        });

    return results;
}

exports.getDoctorById = async (doctorId) => {
    const results  = await sequelize.query(`
    SELECT
        doctors.doctor_id,
        doctors.first_name,
        doctors.last_name,
        doctors.middle_name,
        doctors.career_start_year,
        doctors.date_of_birth,
        s.specialization_name,
        u.photo_url,
        u.email
    FROM Doctors as doctors
        JOIN Users as u ON u.user_id = doctors.user_id
        JOIN Specializations as s ON doctors.specialization_id = s.specialization_id
    WHERE doctors.doctor_id = ?;`,
        {
            replacements: [doctorId],
            type: QueryTypes.SELECT
        });

    return results[0];
};

exports.getDoctorByUserId = async (id) => {
    const results  = await sequelize.query(`
    SELECT
        doctors.doctor_id as user_id,
        doctors.first_name,
        doctors.last_name,
        doctors.middle_name,
        doctors.career_start_year,
        doctors.date_of_birth,
        s.specialization_name,
        u.photo_url,
        u.email
    FROM Doctors as doctors
        JOIN Users as u ON u.user_id = doctors.user_id
        JOIN Specializations as s ON doctors.specialization_id = s.specialization_id
    WHERE doctors.user_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
}

exports.getDoctorsBySpecialization = async (spec) => {
    const results  = await sequelize.query(`
        SELECT
            doctors.doctor_id,
            doctors.first_name,
            doctors.last_name,
            doctors.middle_name,
            doctors.career_start_year,
            doctors.date_of_birth,
            s.specialization_name,
            u.email,
            u.photo_url
        FROM Doctors as doctors
            JOIN Specializations as s ON doctors.specialization_id = s.specialization_id
            JOIN Users u ON u.user_id = doctors.user_id
        WHERE s.specialization_name = ?;`,
        {
            replacements: [spec],
            type: QueryTypes.SELECT
        }
    );

    return results[0];
}

exports.deleteDoctor = async (doctorId) => {
    try {
        const result = await sequelize.query(`
        CALL delete_doctors_account(:id);`,
            {
                replacements: {
                    id: doctorId,
                },
                type: QueryTypes.DELETE
            });
        return result[0];
    } catch (error){
        throw new Error(`Ошибка в удалении аккаунта доктора: ${error}`);
    }
};

exports.createDoctor = async (data) => {
    try {
        const query = `
        CALL create_doctors_account(
            :email,
            :password,
            :first_name,
            :last_name,
            :middle_name,
            :phone_number,
            :date_of_birth,
            :spec_id,
            :career_start_year,
            NULL,
            NULL
        );
    `;

        const replacements = {
            email: data.email,
            password: data.password,
            first_name: data.first_name,
            last_name: data.last_name,
            middle_name: data.middle_name,
            phone_number: data.phone_number,
            date_of_birth: data.date_of_birth,
            spec_id: data.specialization_id,
            career_start_year: data.career_start_year,
        };

        const result = await sequelize.query(query, {
            replacements
        });

        console.log(result);
        return result[0];
    } catch (error) {
        throw new Error (`Ошибка в создании доктора на уровне sql: ${error}`);
    }
};

exports.editDoctor = async (id, data) => {
    const results= await sequelize.query(`
        UPDATE Doctors
        SET first_name = ?, last_name = ?, middle_name = ?, specialization_id = ?,
            career_start_year = ?, date_of_birth = ?
        WHERE doctor_id = ?;`,
        {
            replacements: [data.first_name, data.last_name, data.middle_name, data.specialization_id, data.career_start_year, data.date_of_birth, id],
            type: QueryTypes.UPDATE
        });

    return results[0];
};

exports.getDoctorsPatients = async (doctorId) => {
    const results = await sequelize.query(`
        SELECT * FROM get_doctors_patients(:id);`,
        {
            replacements: {id: doctorId},
            type: QueryTypes.SELECT
        });

    return results;
};