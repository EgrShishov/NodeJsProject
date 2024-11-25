const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.prescribeMedication = async (data) => {
    const results = await sequelize.query(
        'CALL prescribe_medication(:patientId, :doctorId, :medication, :dosage, :duration, :date);',
        {
            replacements: {
                patientId: data.PatientId,
                doctorId: data.DoctorId,
                medication: data.Medication,
                dosage: data.Dosage,
                duration: data.Duration,
                date: data.PrescriptionDate
            },
            type: QueryTypes.RAW
        }
    );
    return results;
};

exports.getAllPrescriptions = async () => {
    const results = await sequelize.query(`
        SELECT
            p.prescription_id,
            p.prescription_date,
            p.medication,
            p.dosage,
            p.duration,
            CONCAT(pt.last_name, ' ', pt.first_name, ' ', pt.middle_name) AS patients_name,
            CONCAT(d.last_name, ' ', d.first_name, ' ', d.middle_name) AS doctors_name
        FROM Prescriptions p
            JOIN Doctors d ON d.doctor_id = p.doctor_id
            JOIN Patients pt ON p.patient_id = pt.patient_id
        ORDER BY p.prescription_date DESC;`,
        {
            type: QueryTypes.SELECT
        }
    );
    return results;
};

exports.getPrescriptionById = async (id) => {
    const results = await sequelize.query(`
        SELECT
            p.prescription_id,
            p.prescription_date,
            p.medication,
            p.dosage,
            p.duration,
            CONCAT(pt.last_name, ' ', pt.first_name, ' ', pt.middle_name) AS patients_name,
            CONCAT(d.last_name, ' ', d.first_name, ' ', d.middle_name) AS doctors_name
        FROM Prescriptions p
            JOIN Doctors d ON d.doctor_id = p.doctor_id
            JOIN Patients pt ON p.patient_id = pt.patient_id
        WHERE p.prescription_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        }
    );
    return results;
};

exports.editPrescription = async (id, data) => {

};

exports.deletePrescription = async (id, data) => {
    const results = await sequelize.query(`
        DELETE FROM prescriptions
        WHERE p.prescription_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        }
    );
    return results[0];
};

exports.getPrescriptionsByPatient = async (patientId) => {
    const results = await sequelize.query(`
        SELECT
            p.prescription_id,
            p.prescription_date,
            p.medication,
            p.dosage,
            p.duration,
            CONCAT(pt.last_name, ' ', pt.first_name, ' ', pt.middle_name) AS patients_name,
            CONCAT(d.last_name, ' ', d.first_name, ' ', d.middle_name) AS doctors_name
        FROM Prescriptions AS p
            JOIN Patients AS pt ON (p.patient_id=pt.patient_id)
            JOIN Doctors AS d ON (p.doctor_id=d.doctor_id)
        WHERE p.patient_id = ?;`,
        {
            replacements: [patientId],
            type: QueryTypes.SELECT
        }
    );
    return results;
};