class Model {
    constructor(table) {
        this.table = table;
    }

    async findAll(){
        const result = await pool.query(`ELECT * FROM ${this.table}`);
        return result.rows;
    }

    async findById(id) {
        const result = await pool.query(`SELECT * FROM ${this.table} WHERE id=$1`, [id]);
        return result.rows[0];
    }

    async create(fields, values) {
        const query = `
            INSERT INTO ${this.table} (${fields.join(',')})
            VALUE(${values.map((_, i) => `$${i+1}`).join(',')})
            RETURNING *
        `;
        const result = await pool.query(query, values);
        return result.rows[0];
    }

    async delete(id){
        const result = await pool.query(`DELETE FROM ${this.table} WHERE id=$1 RETURNING *`, [id]);
        return result.rows[0];
    }

    async update(id, fields, values) {
        const setClause = fields.map((field, i) => `${field} = $${i+1}`).join(',');
        const query = `
            UPDATE ${this.table}
            SET ${setClause}
            WHERE id = $${fields.length + 1}
            RETURNING *
        `;
        const result = await pool.query(query, [...values, id]);
        return result[0].rows;
    }
}

model.exports = Model;