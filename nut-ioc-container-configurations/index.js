const nutIocContainerConfigurations = require('nut-ioc/common/require-folder-files')({ folderPath: __dirname });

module.exports.getNutIocContainer = ({ name = 'nut-ioc-configuration' }) => nutIocContainerConfigurations[name];