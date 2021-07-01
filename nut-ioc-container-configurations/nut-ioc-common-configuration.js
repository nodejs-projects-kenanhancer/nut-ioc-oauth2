module.exports.use = ({ nutIocContainer }) => {
    nutIocContainer.useDependency({
        ServiceName: "appEnv",
        Namespace: undefined,
        Service: {
            ...process.env,
            REQUEST_HANDLER_TIMEOUT: parseInt(process.env.REQUEST_HANDLER_TIMEOUT || '60000') * 1000
        }
    });
}