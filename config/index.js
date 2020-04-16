const Convict = require('convict');

// Define a schema
const Config = Convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    ip: {
        doc: 'The IP address to bind.',
        format: 'ipaddress',
        default: '127.0.0.1',
        env: 'IP_ADDRESS'
    },
    domain: {
        doc: 'The domain hosting the app',
        format: '*',
        default: 'localhost',
        env: 'DOMAIN'
    },
    port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'PORT',
        arg: 'port'
    },
    forceHttps: {
        doc: 'Is HTTPS required?',
        format: Boolean,
        default: true,
        env: 'FORCE_HTTPS'
    },
    newestVersion: {
        doc: 'Newest API Version',
        format: '*',
        default: 'v1',
        env: 'NEWEST_VERSION'
    }
});

// Load environment dependent configuration
const env = Config.get('env');
Config.loadFile(`${__dirname}/${env}.json`);

// Perform validation
Config.validate({allowed: 'strict'});

module.exports = Config;
