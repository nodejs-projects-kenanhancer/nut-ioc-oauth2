module.exports.Service = ({
    constants: { errorCodes: { INVALID_REQUEST } },
    errors: { ClientError },
    repositories: { clientRepo, authorizeRepo }
}) => ({
    async authorize({ client_id, response_type, redirect_uri, scope }) {

        const client = client_id && await clientRepo.findOne(client_id);
        if (!client || response_type !== 'code' || client.redirect_uri !== redirect_uri) {
            throw new ClientError(INVALID_REQUEST);
        }



        const { code } = await authorizeRepo.create({
            customer_id: client.customer_id,
            client_id,
        });

        return code;
    }
});