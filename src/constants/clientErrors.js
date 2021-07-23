module.exports.ServiceName = "";
module.exports.Service = () => ({
    INVALID_REQUEST: {
        error: 'invalid_request',
        error_description: 'Invalid Request!',
        status: 400,
    },
    UNAUTHORIZED_CLIENT: {
        error: 'unauthorized_client',
        error_description: 'Unauthorized client!',
        status: 400,
    },
    INVALID_SCOPE: {
        error: 'invalid_scope',
        error_description: 'The requested scope is invalid or unknown!',
        status: 400,
    },
    ACCESS_DENIED: {
        error: 'access_denied',
        error_description: 'The user or authorization server denied the request!',
        status: 400,
    }
});
