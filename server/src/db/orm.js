const Migrator = require('./migrator');

class ORM {
    constructor(connection) {
        this.connection = connection;
        this.models = {};
        this.migrator = new Migrator(this);
    }

    define(name, attributes) {
        this.models[name] = {
            name: name,
            attributes: attributes
        };
    }

    async migrate() {
        try {
            for (const modelName in this.models) {
                const model = this.models[modelName];
                this.migrator.create(model);
            }
        } catch (error) {
            console.error(`Ошибка создания таблицы "${model.name}":`, error);
        }
    }

    async select(model, options = {}) {
        const attributes = options.attributes ? options.attributes.join(', ') : '*';
        const where = options.where ? `WHERE ${options.where}` : '';
        const query = `SELECT ${attributes.join(', ')} FROM ${model.name} ${where}`;
        const result = await this.connection.query(query);
        return result.rows;
    }

    async insert(model, data) {
        const placeholders = data.map((_, index) => `$${index + 1}`).join(',');
        const attributes = Object.keys(data);
        const values = attributes.map(attribute => `'${data[attribute]}'`);
        const query = `INSERT INTO ${model.name} (${attributes.join(', ')}) VALUES (${placeholders})`;
        await this.connection.query(query, data);
    }

    async update(model, data, options = {}) {
        const attributes = Object.keys(data);
        const values = attributes.map(attribute => `${attribute} = '${data[attribute]}'`);
        const where = options.where ? `WHERE ${options.where}` : '';
        const query = `UPDATE ${model.name} SET ${values.join(', ')} ${where}`;
        await this.connection.query(query);
    }

    async delete(model, options = {}) {
        const where = options.where ? `WHERE ${options.where}` : '';
        const query = `DELETE FROM ${model.name} ${where}`;
        await this.connection.query(query);
    }

    async executeFunction(functionName, options = []){
        const placeholders = options.map((_, index) => `$${index + 1}`).join(',')
        const query = `SELECT ${functionName}(${placeholders}) AS RESULT`;
        const result = await this.connection.query(query, options);
        return result.rows[0]?.result;
    }

    async callProcedure(procedureName, options = []) {
        const placeholders = options.map((_, index) => `$${index + 1}`).join(',');
        const query = `CALL ${procedureName}(${placeholders})`; //avoid sql-injections
        await this.connection.query(query, options);
    }

    async selectFromView(viewName, options = {}) {
        const attributes = options.attributes ? options.attributes.join(', ') : '*';
        const where = options.where? `WHERE ${options.where}` : '';
        const query = `SELECT ${attributes} FROM ${viewName} ${where}`;
        const result = await this.connection.query(query);
        return result.rows;
    }

    async runQuery(query, params = []) {
        const result = await this.connection.query(query, params);
        return result.rows;
    }
}

module.exports = ORM;