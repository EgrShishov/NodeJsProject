const { DataTypes, QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.getAllResults = async () => {
    try {
        const [results, metadata] = await sequelize.query(`
        SELECT
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            p.middle_name AS patient_middle_name,
            doc.first_name AS doctor_first_name,
            doc.last_name AS doctor_last_name,
            doc.middle_name AS doctor_middle_name,
            r.complaints AS complaints,
            r.conclusion AS conclusion,
            r.recommendations AS recommendations,
            d.file_path AS document_path
        FROM Results AS r
            JOIN Documents AS d ON (r.document_id=d.document_id)
            JOIN Appointments AS a ON (r.appointment_id=a.appointment_id)
            JOIN Patients AS p ON (r.patient_id=a.patient_id)
            JOIN Doctors AS doc ON (doc.doctor_id=a.doctor_id)
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
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            p.middle_name AS patient_middle_name,
            doc.first_name AS doctor_first_name,
            doc.last_name AS doctor_last_name,
            doc.middle_name AS doctor_middle_name,
            r.complaints AS complaints,
            r.conclusion AS conclusion,
            r.recommendations AS recommendations,
            d.file_path AS document_path
        FROM Results AS r
            JOIN Documents AS d ON (r.document_id=d.document_id)
            JOIN Appointments AS a ON (r.appointment_id=a.appointment_id)
            JOIN Patients AS p ON (r.patient_id=a.patient_id)
            JOIN Doctors AS doc ON (doc.doctor_id=a.doctor_id)
        `, {
            type: QueryTypes.SELECT
        });

        return results;
    } catch (error) {
        throw new Error(`Ошибка в получении всех результатов: ${error}`);
    }
};

exports.createResult = async (data) => {
    try {
        const [results, metadata] = await sequelize.query(`
        CALL create_medical_result(:p_id, :d_id, :a_id, :d_type, :d_path, :complaints, :recommendations, :conclusion)`, {
            replacements: {
                p_id: data.patient_id,
                d_id: data.doctor_id,
                a_id: data.appointment_id,
                d_type: data.document_type,
                d_path: data.document_path,
                complaints,
                recommendations,
                conclusion
            },
            type: QueryTypes.INSERT
        });

        return results;
    } catch (error) {
        throw new Error(`Ошибка в получении всех результатов: ${error}`);
    }
};

exports.getResultsByPatient = async (patientId) => {
    try {
        const [results, metadata] = await sequelize.query(`
        SELECT
            p.first_name AS patient_first_name,
            p.last_name AS patient_last_name,
            p.middle_name AS patient_middle_name,
            doc.first_name AS doctor_first_name,
            doc.last_name AS doctor_last_name,
            doc.middle_name AS doctor_middle_name,
            r.complaints AS complaints,
            r.conclusion AS conclusion,
            r.recommendations AS recommendations,
            d.file_path AS document_path
        FROM Results AS r
            JOIN Documents AS d ON (r.document_id=d.document_id)
            JOIN Appointments AS a ON (r.appointment_id=a.appointment_id)
            JOIN Patients AS p ON (r.patient_id=a.patient_id)
            JOIN Doctors AS doc ON (doc.doctor_id=a.doctor_id)
        WHERE r.patient_id = ?
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
        const [result, metadata] = await sequelize.query(`
        UPDATE Results
        SET complaints = ?, recommendations = ?, conclusion = ?
        WHERE result_id = ?;`,
            {
                replacements: [data.complaints, data.recommendations, data.conclusion, id],
                type: QueryTypes.UPDATE
            });
        return result;
    } catch (error) {
        throw new Error(`Ошибка в удалении результата: ${error}`);
    }
};

exports.deleteResult = async (id) => {
    try {
        const [result, metadata] = await sequelize.query(`
        DELETE FROM Results
        WHERE results_id = ?`,
            {
                replacements: [id],
                type: QueryTypes.DELETE
            });
        return result;
    } catch (error) {
        throw new Error(`Ошибка в удалении результата: ${error}`);
    }
};
