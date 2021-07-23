module.exports.Service = ({
    persisterPipelines: { client },
    context: { appContext },
    utility: { serverDate, uuidGenerator: { clientID, clientSecret } }
}) => ({
    async search(options) { return await client.search(options); },
    async findById(id) { return id && await client.findById(id); },
    async findOne(client_id) { return client_id && await client.findOne(client_id); },
    async create(data) {
        if (!data) return;
        
        data.client_id = clientID();
        data.client_secret = clientSecret();

        data.created_at = serverDate();
        data.created_by = appContext.user_id;
        return await client.create(data);
    },
    async update(data) {
        if (!data || !data.id) return;

        data.updated_at = serverDate();
        data.updated_by = appContext.user_id;
        return await client.update(data);
    },
    async erase(id) {
        if (!id) return;
        let data = await this.findById(id);
        if (!data) return;

        data.deleted = true;
        await client.erase(data);
    }
})