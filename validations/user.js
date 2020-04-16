'use strict';

const Joi = require('@hapi/joi');

const get = Joi.object().keys({
    _id: Joi.string().required().description('Unique id of the user.'),
    username: Joi.string().min(3).max(128).required().description('The username associated with this user.')
}).options({stripUnknown: true});

const post = Joi.object().keys({
    username: Joi.string().min(3).max(128).required().description('The username associated with this user.'),
    password: Joi.string().min(6).max(128).required().description('A password used to authenticate as this user')
}).options({stripUnknown: true});

const put = Joi.object().keys({
    _id: Joi.string().required(),
    username: Joi.string().min(3).max(128).required().description('The username associated with this record.'),
    password: Joi.string().min(6).max(128).description('A password used to authenticate as this user')
}).options({stripUnknown: true});

module.exports = {
    get,
    post,
    put
};
