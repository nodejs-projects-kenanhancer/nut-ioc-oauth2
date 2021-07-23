module.exports.Service = ({
    appEnv: { AUTHORIZE_TTL = 600 },
    persisterPipelines: { authorize },
    utility: { dateHelpers: { serverDate, addSeconds }, uuidGenerator: { authorizeCode } } }) => ({

        async findById(code) {
            const data = code && await authorize.findById(code);
            return data && data.toJSON();
        },
        async findOne(where) { return await authorize.findOne({ where: { ...where, deleted: false } }) },
        async findAll(where) { return await authorize.findAll({ where: { ...where, deleted: false } }) },
        async search(options) { return await authorize.search(options); },
        async create(data) {
            if (!data) return;

            const currentDate = serverDate();
            const currentTime = currentDate.getTime();

            data.code = authorizeCode();
            data.iat = currentTime;
            data.exp = addSeconds(currentTime, AUTHORIZE_TTL);

            data.created_at = serverDate();
            return await authorize.create(data);
        },
        async update(data) {
            if (!data?.code) return;

            data.updated_at = serverDate();
            return await authorize.update(data);
        },
        async erase(code) {
            if (!code) return;

            let data = await this.findById(code);
            if (!data) return;

            data.deleted = true;
            await authorize.erase(data);
        }
    })