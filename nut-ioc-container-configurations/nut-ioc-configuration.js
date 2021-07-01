const nutIoc = require('nut-ioc');
const nutIocExpress = require('nut-ioc-express');
const nutIocCommonConfiguration = require('./nut-ioc-common-configuration');

module.exports.build = ({ nutIocConfigurationProvider }) => {
    const nutIocContainer = nutIoc();

    nutIocCommonConfiguration.use({ nutIocContainer });
    
    nutIocContainer.usePlugin(nutIocExpress);

    const ignoredInterceptors = ["utility", "validators", "models", "datasources", "clientErrors", "serverErrors", "interceptors"];

    nutIocContainer.use({
        dependencyPath: './src',
        ignoredDependencies: ['*.DS_Store'],
        interceptor: ({ serviceName, namespace, interceptors: { timingInterceptor, errorInterceptor, appLoggerInterceptor, authTokenInterceptor, accessTokenInterceptor, serviceContextInterceptor } }) => {

            if (namespace === 'controllers') {
                return [
                    serviceContextInterceptor,
                    errorInterceptor,
                    appLoggerInterceptor,
                    timingInterceptor,
                    authTokenInterceptor,
                    accessTokenInterceptor
                ];
            }
            
            if (ignoredInterceptors.some(item => serviceName === item || namespace === item)) {
                return [];
            }

            return [errorInterceptor, appLoggerInterceptor, timingInterceptor];

        }
    });

    nutIocConfigurationProvider && nutIocConfigurationProvider({ nutIocContainer });

    return nutIocContainer.build();
};
