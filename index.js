require('dotenv').config();

const { getNutIocContainer } = require('./nut-ioc-container-configurations');

const nutIocContainer = getNutIocContainer({ name: process.env.NUT_IOC_CONTAINER_NAME });

const mainAsync = async () => {

    try {
        const { expressServer } = await nutIocContainer.build({});
        await expressServer.start({});
    } catch (err) {
        console.log(err);
    }

}

mainAsync();
