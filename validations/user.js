'use strict';

const Joi = require('@hapi/joi');

const get = Joi.object().keys({
    _id: Joi.string().required(),
    username: Joi.string().min(3).max(128).required(),
}).options({stripUnknown: true});

const post = Joi.object().keys({
    username: Joi.string().min(3).max(128).required(),
    password: Joi.string().min(6).max(128).required()
}).options({stripUnknown: true});

const put = Joi.object().keys({
    _id: Joi.string().required(),
    username: Joi.string().min(3).max(128).required(),
    password: Joi.string().min(6).max(128)
}).options({stripUnknown: true});

module.exports = {
    get,
    post,
    put
};
