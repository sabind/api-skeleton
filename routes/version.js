'use strict';

const Boom = require('@hapi/boom')
const Cors = require('../utils/cors')

const versionRedirect = {
    name: 'version-redirect-route',
    version: '1.0.0',
    register: async function (server, options) {

        server.route({
            method: '*',
            path: '/{any*}',
            handler: function (request, h) {
                if (!/^\/v(\d+)\//.test(request.path)) {
                    return h.redirect(`/v1${request.path}`);
                } else {
                    return Boom.notFound(`${request.method} - ${request.path} not found!`, new Error('method + path does not exist.'))
                }
            },
            options: {
                cors: Cors
            }
        });
    }
};

module.exports = versionRedirect;
