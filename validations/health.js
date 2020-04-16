'use strict';

const Joi = require('@hapi/joi');

const get = Joi.object().keys({
    status: Joi.string().valid('ok').description('The current status of the API.')
}).options({stripUnknown: true});

module.exports = {
    get
};
