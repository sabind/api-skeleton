'use strict';

const Package = require('./package.json');
const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));
const Bcrypt = require('bcrypt');
const Config = require('./config');

const Database = require('./clients/nedb-client');
const Users = Database.Users;

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

exports.init = async () => {


    server.validator(Joi);

    if (Config.get('forceHttps')) {
        await server.register({plugin: require('hapi-require-https')});
    }

    if (Config.get('env') !== 'test') {
        await server.register([
            // Register the logger first
            {
                plugin: require('@hapi/good'),
                options: {
                    ops: {
                        interval: 1000
                    },
                    reporters: {
                        myConsoleReporter: [
                            {
                                module: '@hapi/good-squeeze',
                                name: 'Squeeze',
                                args: [{log: '*', response: '*', ops: '*'}]
                            },
                            {
                                module: '@hapi/good-console'
                            },
                            'stdout'
                        ]
                    }
                }
            },
            require('@hapi/inert'),
            require('@hapi/vision'),
            {
                plugin: require('hapi-swagger'),
                options: {
                    info: {
                        title: 'API Documentation',
                        version: Package.version,
                        description: 'API skeleton sample with basic auth and registration'
                    }
                }
            }
        ]);
    }

    const validate = async (request, username, password) => {
        const user = await new Promise((resolve, reject) => {
            Users.findOne({username}, {}, (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            });
        });
        const isValid = await Bcrypt.compare(password, user.password);
        const credentials = {_id: user._id, username: user.username};

        return {isValid, credentials};
    };
    await server.register(require('@hapi/basic'));
    server.auth.strategy('simple', 'basic', {validate: validate});

    await server.register([
        {plugin: require('./routes/version')},
        {plugin: require('./routes/v1/health')},
        {plugin: require('./routes/v1/users')}
    ]);

    await server.initialize();
    return server;
};

exports.start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});
