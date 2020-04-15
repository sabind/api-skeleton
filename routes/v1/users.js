'use strict';

const Boom = require('@hapi/boom')
const Users = require('../../clients/nedb-client').Users
const Cors = require('../../utils/cors')


const route = {
    name: 'users-route',
    version: '1.0.0',
    register: function (server) {
        server.route({
            method: 'GET',
            path: '/v1/users',
            handler: function () {
                return new Promise((resolve, reject) => {
                    Users.find({}, {_id: 1, username: 1}, (err, results) => {
                        if (err) {
                            return reject(Boom.badImplementation('DB error occurred. ', err))
                        }

                        return resolve(results);
                    });
                })
            },
            options: {
                auth: 'simple',
                cors: Cors
            },
        });


        server.route({
            method: 'POST',
            path: '/v1/users',
            handler: async function (request, h) {
                const newUser = await new Promise((resolve, reject) => {
                    const user = request.payload
                    Users.insert(user, (err, result) => {
                        if (err) {
                            if (err.errorType === 'uniqueViolated') {
                                return reject(Boom.conflict('Username already exists.', err))
                            }
                            return reject(Boom.badImplementation('DB error occurred. ', err))
                        }

                        delete result.password;
                        return resolve(result);
                    });
                });


                return h.response(newUser).code(201)
            },
            options: {
                auth: false,
                cors: Cors
            },
        });
    }
};

module.exports = route;
