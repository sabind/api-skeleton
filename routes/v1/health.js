'use strict';

const Joi = require('@hapi/joi');
const Cors = require('../../utils/cors');

const HealthValidations = require('../../validations/health');

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
                    status: {
                        200: HealthValidations.get
                    }
                },
                cors: Cors
            }
        });
    }
};

module.exports = healthRoute;
