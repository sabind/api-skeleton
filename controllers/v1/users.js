'use strict';

const Boom = require('@hapi/boom');
const Bcrypt = require('bcrypt');

const Config = require('../../config');
const Users = require('../../clients/nedb-client').Users;
const SALT_ROUNDS = 10;

function UsersController() {
}

UsersController.prototype.list = async function () {
    return await new Promise((resolve, reject) => {
        Users.find({}, {_id: 1, username: 1}, (err, results) => {
            if (err) {
                return reject(Boom.badImplementation('DB error occurred. ', err));
            }

            return resolve(results);
        });
    });
};

UsersController.prototype.register = async function (request, h) {
    const user = request.payload;
    user.password = await Bcrypt.hash(user.password, SALT_ROUNDS);
    const newUser = await new Promise((resolve, reject) => {
        Users.insert(user, (err, result) => {
            if (err) {
                if (err.errorType === 'uniqueViolated') {
                    return reject(Boom.conflict('Username already exists.', err));
                }
                return reject(Boom.badImplementation('DB error occurred. ', err));
            }

            delete result.password;
            return resolve(result);
        });
    });
    return h.response(newUser).code(201);
};

module.exports = UsersController;
