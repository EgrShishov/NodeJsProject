const {sequelize} = require('../db/connection');
const {QueryTypes} = require("sequelize");

exports.getAllProcedures = async () => {
    const results = await sequelize.query(`
        SELECT
            mp.procedure_id,
            mp.procedure_name,
            mp.procedure_cost,
            mp.description,
            s.service_name,
            s.service_id
        FROM MedicalProcedures mp
        JOIN Services s ON mp.service_id = s.service_id;`,
        {
            type: QueryTypes.SELECT
        });

    console.log(results);
    return results;
};

exports.getProcedureById = async (id) => {
    const results= await sequelize.query(`
        SELECT
            mp.procedure_name,
            mp.procedure_cost,
            mp.description,
            s.service_name,
            s.service_id
        FROM MedicalProcedures mp 
            JOIN Services s ON mp.service_id = s.service_id
        WHERE mp.procedure_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results[0];
}

exports.getPatientsProcedures = async (patientId) => {
    try {
        const results= await sequelize.query(`
        SELECT * get_patient_procedures(:id) AS result;`,
            {
                replacements: {
                    id: patientId
                },
                type: QueryTypes.SELECT
            });

        return results;
    } catch (error) {
        throw new Error(`Error getting patient's procedures: ${error.message}`);
    }
};

exports.createProcedure = async (data) => {
    try {
        const result= await sequelize.query(`
            CALL create_procedure(:);`, {
            replacements: {

            },
            type: QueryTypes.INSERT
        });

        return result[0];
    } catch (error) {
        throw new Error(`Error in creating procedure: ${error.message}`);
    }
};

exports.editProcedure = async (id, data) => {
    try {
        const result= await sequelize.query(`
           CALL update_medical_procedure(:id, :cost, :name, :desc, :service_id);`,
            {
                replacements: {
                    id: id,
                    cost: data.procedure_cost,
                    name: data.procedure_name,
                    desc: data.description,
                    service_id: data.service_id,
                },
                type: QueryTypes.RAW
            }
        );
        return result[0];
    } catch (error) {
        throw new Error(`Error in updating procedure: ${error.message}`);
    }
};

exports.deleteProcedure = async (id) => {
    try {
        const result = await sequelize.query(`
            DELETE FROM MedicalProcedures
            WHERE procedure_id = ?;`,
            {
                replacements: [id],
                type: QueryTypes.UPDATE
            }
        );

        return result[0];
    } catch (error){
        throw new Error(`Error in deleting procedure: ${error.message}`);
    }
};