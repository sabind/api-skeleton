'use strict';

const Joi = require('@hapi/joi');

const get = Joi.object().keys({
    status: Joi.string().valid('ok')
}).options({stripUnknown: true});

module.exports = {
    get
};
