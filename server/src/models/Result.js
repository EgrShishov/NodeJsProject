const { DataTypes, QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.getAllResults = async () => {
    try {
        const results = await sequelize.query(`
        SELECT
            CONCAT(p.last_name, ' ', p.first_name, ' ', p.middle_name) AS patients_name,
            CONCAT(doc.last_name, ' ', doc.first_name, ' ', doc.middle_name) AS doctors_name,
            r.complaints,
            r.conclusion,
            r.recommendations
        FROM Results AS r
             JOIN Appointments AS a ON (r.appointment_id=a.appointment_id)
             JOIN Patients AS p ON (a.patient_id=p.patient_id)
             JOIN Doctors AS doc ON (doc.doctor_id=a.doctor_id);
        `, {
            type: QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error(`Ошибка в получении всех результатов: ${error}`);
    }
};

exports.getResultById = async (id) => {
    try {
        const [results, metadata] = await sequelize.query(`
        SELECT
            CONCAT(p.last_name, ' ', p.first_name, ' ', p.middle_name) AS patients_name,
            CONCAT(doc.last_name, ' ', doc.first_name, ' ', doc.middle_name) AS doctors_name,
            r.complaints,
            r.conclusion,
            r.recommendations
        FROM Results AS r
             JOIN Appointments AS a ON (r.appointment_id=a.appointment_id)
             JOIN Patients AS p ON (a.patient_id=p.patient_id)
             JOIN Doctors AS doc ON (doc.doctor_id=a.doctor_id)
        WHERE r.result_id = ?;
        `, {
            replacements: [id],
            type: QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error(`Ошибка в получении всех результатов: ${error}`);
    }
};

exports.createResult = async (data) => {
    try {
        const results = await sequelize.query(`
        CALL create_medical_result(:p_id, :d_id, :a_id, :d_type, :d_path, :complaints, :recommendations, :conclusion);`, {
            replacements: {
                p_id: data.patient_id,
                d_id: data.doctor_id,
                a_id: data.appointment_id,
                d_type: data.document_type,
                d_path: data.document_path,
                complaints: data.complaints,
                recommendations: data.recommendations,
                conclusion: data.conclusion
            },
            type: QueryTypes.RAW
        });

        return results[0];
    } catch (error) {
        throw new Error(`Ошибка в получении всех результатов: ${error}`);
    }
};

exports.getResultsByPatient = async (patientId) => {
    try {
        const results = await sequelize.query(`
         SELECT
            CONCAT(p.last_name, ' ', p.first_name, ' ', p.middle_name) AS patients_name,
            CONCAT(doc.last_name, ' ', doc.first_name, ' ', doc.middle_name) AS doctors_name,
            r.complaints,
            r.conclusion,
            r.recommendations,
            r.document_id
        FROM Results AS r
             JOIN Appointments AS a ON (r.appointment_id=a.appointment_id)
             JOIN Patients AS p ON (a.patient_id=p.patient_id)
             JOIN Doctors AS doc ON (doc.doctor_id=a.doctor_id)
        WHERE r.patient_id = ?;
        `, {
            replacements: [patientId],
            type: QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error(`Ошибка в получении всех результатов: ${error}`);
    }
};

exports.editResult = async (id, data) => {
    try {
        const result= await sequelize.query(`
        UPDATE Results
        SET complaints = ?, recommendations = ?, conclusion = ?
        WHERE result_id = ?;`,
            {
                replacements: [data.complaints, data.recommendations, data.conclusion, id],
                type: QueryTypes.UPDATE
            });
        return result[0];
    } catch (error) {
        throw new Error(`Ошибка в удалении результата: ${error}`);
    }
};

exports.deleteResult = async (id) => {
    try {
        const result = await sequelize.query(`
        DELETE FROM Results
        WHERE results_id = ?`,
            {
                replacements: [id],
                type: QueryTypes.DELETE
            });
        return result[0];
    } catch (error) {
        throw new Error(`Ошибка в удалении результата: ${error}`);
    }
};
