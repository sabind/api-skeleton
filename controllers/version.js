'use strict';

const Boom = require('@hapi/boom');
const Config = require('../config');

const newestVersion = Config.get('newestVersion');

function VersionController() {
}

VersionController.prototype.redirect = async function (request, h) {
    if (!/^\/v(\d+)\//.test(request.path)) {
        return h.redirect(`/${newestVersion}${request.path}`); // request.path includes leading slash
    } else {
        return Boom.notFound(`${request.method} - ${request.path} not found!`, new Error('method + path does not exist.'));
    }
};

module.exports = VersionController;
