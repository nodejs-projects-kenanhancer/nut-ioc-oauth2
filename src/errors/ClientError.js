module.exports.Service = ({ BaseError }) =>
    function ({ code, message, status }) {
        Object.assign(this, new BaseError({ code, message, status }));
        this.name = code;
    }
