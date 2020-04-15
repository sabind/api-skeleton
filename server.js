'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));
const Bcrypt = require('bcrypt');

const Database = require('./clients/nedb-client');

const Users = Database.Users;

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

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.validator(Joi);

    await server.register(require('@hapi/basic'));
    server.auth.strategy('simple', 'basic', {validate: validate});

    await server.register([
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
        {plugin: require('./routes/version')},
        {plugin: require('./routes/v1/health')},
        {plugin: require('./routes/v1/users')}
    ]);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.error(err);
    process.exit(1);
});

// noinspection JSIgnoredPromiseFromCall
init();
