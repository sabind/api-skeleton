'use strict';

const Joi = require('@hapi/joi');
const Cors = require('../../utils/cors');

const HealthValidations = require('../../validations/health');
const HealthController = require('../../controllers/v1/health');

const healthRoute = {
    name: 'health-route',
    version: '1.0.0',
    register: async function (server) {
        const controller = new HealthController();
        server.bind(controller);

        server.route({
            method: 'GET',
            path: '/v1/__health',
            handler: controller.health,
            options: {
                description: 'Retrieve the health of the server',
                notes: 'The payload of the heath check is static as there are no dependencies',
                tags: ['api', 'health'],
                auth: false,
                response: {
                    status: {
                        200: HealthValidations.get.label('Health').description('an object describing the health of the API.')
                    }
                },
                cors: Cors
            }
        });
    }
};

module.exports = healthRoute;
