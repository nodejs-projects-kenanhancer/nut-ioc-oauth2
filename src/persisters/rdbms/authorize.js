module.exports.Service = ({ models: { rdbms: { Authorize } }, query: { rdbmsQuery } }) => ({
    async findById(code) {
        const data = await Authorize.findOne({ where: { code, deleted: false } });
        return data && data.toJSON();
    },
    async findOne(where) { return await this.findOne({ where: { ...where, deleted: false } }) },
    async findAll(where) { return await this.findAll({ where: { ...where, deleted: false } }) },
    async search(options) { return await rdbmsQuery.execute({ table: Authorize.tableName, options }); },
    async create(data) {
        const ret = await Authorize.create(data);
        return ret && ret.toJSON();
    },
    async update(data) { await Authorize.update(data, { where: { code: data.code } }); },
    async erase(data) { await Authorize.update(data, { where: { code: data.code } }); }
})