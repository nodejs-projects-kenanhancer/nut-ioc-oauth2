module.exports.Service = ({
    services: { oauthBs }
}) => ({
    async health() {
        return 'ok';
    },
    async authorize({client_id, response_type, redirect_uri}) {
        return await oauthBs.authorize({ client_id, response_type, redirect_uri });
    }
});