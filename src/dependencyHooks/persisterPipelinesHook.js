const { buildPipeline } = require("nut-pipe");

module.exports = {
    IsHook: true,
    ServiceName: "",
    Namespace: undefined,
    Service: async ({ persisters, dependencyContainer, configs: { persisterPipelinesConfig: config } }) => {
        try {
            //building pipelines as a service for each repo's method
            const { repositories, methods } = config;
            if (!repositories || repositories.length === 0) throw Error('repositories not defined!');
            if (!methods || methods.length === 0) throw Error('methods not defined!');

            for (const repository of repositories) {

                let repoPipeline = {};

                for (const methodConfig of methods) {
                    let { method, persisters: methodPersisters, exceptions } = methodConfig;

                    if (Array.isArray(exceptions) && exceptions.length > 0) {
                        let repoException = exceptions.find(exception => exception.repository === repository);
                        if (repoException)
                            methodPersisters = repoException.persisters;
                    }

                    const pipeline = methodPersisters.reduce((accumulator, item, ndx) => {

                        const { next_rule, feedbackmethod, persister, pass_value_next_asparameter } = item;
                        accumulator.push(async (...args) => {

                            let value = await persisters[persister][repository][feedbackmethod || method](...args);

                            const next = args.pop();
                            if (next && typeof next === 'function' && (!next_rule || (next_rule === "ifnull" && !value) || (next_rule === "hasvalue" && value))) {
                                value = pass_value_next_asparameter ? await next(value) : await next(...args);
                            } else if (next && typeof next !== 'function' && ndx > 0) {
                                value = next;
                            }
                            return value;
                        });

                        return accumulator;
                    }, []);

                    repoPipeline[method] = buildPipeline(pipeline);
                }

                await dependencyContainer.useDependency(
                    {
                        Namespace: 'persisterPipelines',
                        ServiceName: repository,
                        Service: () => (repoPipeline)
                    });
            }
        }
        catch (error) {
            throw Error("persisterPipelineConfig is not valid!", error);
        }
    }
}