const { QueryTypes} = require('sequelize');
const {sequelize} = require('../db/connection');

exports.getAllSpecializations = async () => {
  const results = await sequelize.query(`
    SELECT * FROM specializations;
  `, {
      type: QueryTypes.SELECT
  });

  return results;
};


exports.getSpecializationById = async (id) => {
    const results = await sequelize.query(`
        SELECT * FROM specializations WHERE specialization_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.SELECT
        });

    return results;
};

exports.createSpecialization = async (data) => {
    const results = await sequelize.query(`
        INSERT INTO specializations (specialization_name) VALUES(?) RETURNING specialization_id;`,
        {
            replacements: [data.specialization_name],
            type: QueryTypes.INSERT
        });

    return results;
};

exports.editSpecialization = async (id, data) => {
    const results = await sequelize.query(`
        UPDATE specializations 
        SET specialization_name = ? 
        WHERE specialization_id = ?;`,
        {
            replacements: [data.specialization_name, id],
            type: QueryTypes.UPDATE
        });

    return results;
};

exports.deleteSpecialization = async (id) => {
    const results = await sequelize.query(`
        DELETE FROM specializations 
        WHERE specialization_id = ?;`,
        {
            replacements: [id],
            type: QueryTypes.DELETE
        });

    return results;
};