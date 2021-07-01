module.exports.use = ({ nutIocContainer }) => {
    nutIocContainer.useDependency({
        ServiceName: "appEnv",
        Namespace: undefined,
        Service: {
            ...process.env
        }
    });
}