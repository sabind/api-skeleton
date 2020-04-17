'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');

const {init} = require('../../server');
const {Users} = require('../../clients/nedb-client')

const {expect} = Code;
const {beforeEach, afterEach, describe, it} = exports.lab = Lab.script();

describe('Test Users', () => {
    let server;

    beforeEach(async () => {
        await Users.remove({}, {multi: true});
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 201 on POST /v1/users', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/v1/users',
            payload: {username: 'testuser', password: 'password'}
        });
        expect(res.statusCode).to.equal(201);
    });

    it('responds with 201 on POST /users', async () => {
        const res = await server.inject({
            method: 'post',
            url: '/v1/users',
            payload: {username: 'testuser', password: 'password'}
        });
        expect(res.statusCode).to.equal(201);
    });
});
