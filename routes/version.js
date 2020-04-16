'use strict';

const Boom = require('@hapi/boom')

const Config = require('../config')
const Cors = require('../utils/cors')


const VersionController = require('../controllers/version');

const versionRedirect = {
    name: 'version-redirect-route',
    version: '1.0.0',
    register: async function (server, options) {
        const controller = new VersionController();
        server.bind(controller);

        server.route({
            method: '*',
            path: '/{any*}',
            handler: controller.redirect,
            options: {
                description: "Redirects or 404s",
                notes: 'Redirects the request to the newest available version of the endpoint as well as serving the 404 page as a fallback',
                // tags: ['api'], not intended to be part of swagger - mainly because the plugin that generates this fails to handle this route definition.
                cors: Cors
            }
        });
    }
};

module.exports = versionRedirect;
