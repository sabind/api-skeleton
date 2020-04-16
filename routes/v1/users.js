'use strict';

const Boom = require('@hapi/boom');
const Joi = require('@hapi/joi');
const Bcrypt = require('bcrypt');

const Users = require('../../clients/nedb-client').Users;
const Cors = require('../../utils/cors');

const UserValidation = require('../../validations/user');
const UsersController = require('../../controllers/v1/users');

const route = {
    name: 'users-route',
    version: '1.0.0',
    register: function (server) {
        const controller = new UsersController();
        server.bind(controller);

        server.route({
            method: 'GET',
            path: '/v1/users',
            handler: controller.list,
            options: {
                description: 'List all users',
                notes: 'Requires authentication',
                tags: ['api', 'users'],
                auth: 'simple',
                response: {
                    status: {
                        200: Joi.array().items(
                            UserValidation.get.label('User')
                        ).label('Users')
                    }
                },
                cors: Cors
            }
        });


        server.route({
            method: 'POST',
            path: '/v1/users',
            handler: controller.register,
            options: {
                description: 'Register as a new user',
                notes: 'Username must be globally unique',
                tags: ['api', 'users'],
                auth: false,
                validate: {
                    payload: UserValidation.post.label('New User')
                },
                response: {
                    status: {
                        201: UserValidation.get.label('User')
                    }
                },
                cors: Cors
            }
        });
    }
};

module.exports = route;
