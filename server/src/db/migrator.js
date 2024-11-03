module.exports = class Migrator {
    constructor(orm) {
        this.orm = orm;
    }

    async create(model) {
        const attributes = Object.keys(model.attributes).map(attribute => `${attribute} ${model.attributes[attribute]}`);
        const query = `CREATE TABLE IF NOT EXISTS ${model.name} (${attributes.join(', ')})`;
        await this.orm.connection.query(query);
    }

    async drop(model) {
        const query = `DROP TABLE ${model.name}`;
        await this.orm.connection.query(query);
    }

    async update(model) {
        //TODO
    }

    async addColumn(model, attribute, type) {
        const query = `ALTER TABLE ${model.name} ADD ${attribute} ${type}`;
        await this.orm.connection.query(query);
    }

    async removeColumn(model, attribute) {
        const query = `ALTER TABLE ${model.name} DROP COLUMN ${attribute}`;
        await this.orm.connection.query(query);
    }

    async addConstraint(model, attrubute, constraint){
        const query = `ALTER TABLE ${model} ALTER COLUMN ${attribute} ADD CONSTRAINT ${constraint}}`;
        await this.orm.connection.query(query);
    }

    async removeConstraint(model, attribute, constraint) {
        const query = `ALTER TABLE ${model} ALTER COLUMN ${attribute} DROP CONSTRAINT ${constraint}`;
        await this.orm.connection.query(query);
    }
}