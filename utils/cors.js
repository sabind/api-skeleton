const Config = require('../config')

const env = Config.get('env');

const origins = [];
if (env === 'development' || env === 'test') {
    origins.push('http://localhost:3000')
} else {
    origins.push(`*.${Config.get('domain')}`)
}

module.exports = {
    origin: origins,
    additionalHeaders: [],
    additionalExposedHeaders: [],
    credentials: true
}
