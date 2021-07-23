module.exports.Service = ({ models: { rdbms: { Client } }, query: { rdbmsQuery } }) => ({
    async findById(client_id) {
        const data = client_id && await Client.findOne({ where: { client_id, deleted: false } });
        return data && data.toJSON();
    },
    async findOne(where) { return await this.findOne({ where: { ...where, deleted: false } }) },
    async findAll(where) { return await this.findAll({ where: { ...where, deleted: false } }) },
    async search(options) { return await rdbmsQuery.execute({ table: Client.tableName, options }); },
    async create(data) {
        let ret = data?.client_id && await Client.create(data);
        return ret && ret.toJSON();
    },
    async update(data) { data?.client_id && await Client.update(data, { where: { client_id: data.client_id } }); },
    async erase(data) { data?.client_id && await Client.update(data, { where: { client_id: data.client_id } }); }
})