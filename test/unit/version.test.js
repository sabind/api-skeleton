'use strict';

const Code = require('@hapi/code');
const Lab = require('@hapi/lab');
const {init} = require('../../server');

const {expect} = Code;
const {before, after, describe, it} = exports.lab = Lab.script();

describe('Test Version Redirect', () => {
    let server;

    before(async () => {
        server = await init();
    });

    after(async () => {
        await server.stop();
    });

    it('responds with 302 (to /v1) on /', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        expect(res.headers['location']).to.equal('/v1/')
        expect(res.statusCode).to.equal(302);
    });

    it('responds with 200 on /v1/__health', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/v1/__health'
        });
        expect(res.statusCode).to.equal(200);
    });

    it('responds with 404 on /v1/garbage', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/v1/garbage'
        });
        expect(res.statusCode).to.equal(404);
    });
});
