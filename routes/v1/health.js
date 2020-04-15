'use strict';

const Joi = require('@hapi/joi');
const Cors = require('../../utils/cors');

const healthRoute = {
    name: 'health-route',
    version: '1.0.0',
    register: async function (server) {
        server.route({
            method: 'GET',
            path: '/v1/__health',
            handler: function () {
                return {status: 'ok'};
            },
            options: {
                auth: false,
                response: {
                    failAction: 'log',
                    status: {
                        200: {
                            status: Joi.string().valid('no')
                        }
                    }
                },
                cors: Cors
            }
        });
    }
};

module.exports = healthRoute;
