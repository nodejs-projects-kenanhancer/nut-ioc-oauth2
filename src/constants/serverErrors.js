module.exports.ServiceName = "";
module.exports.Service = () => ({
    INVALID_REQUEST: {
        error: 'server_error',
        error_description: 'Server Error!',
        status: 500,
    },
    TEMPORARILY_UNAVAILABLE: {
        error: 'temporarily_unavailable',
        error_description: 'The server is undergoing maintenance!',
        status: 503,
    },
});
