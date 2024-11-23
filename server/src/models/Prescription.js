const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.prescribeMedication = async (data) => {
    const [results, metadata] = await sequelize.query(
        'CALL prescribe_medication(:patientId, :doctorId, :medication, :dosage, :duration)',
        {
            replacements: {
                patientId: data.patient_id,
                doctorId: data.doctor_id,
                medication: data.medication,
                dosage: data.dosage,
                duration: data.duration
            },
            type: QueryTypes.RAW
        }
    );
    return results;
};
