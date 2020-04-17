const Datastore = require('nedb');
const Config = require('../config');

const pathPrefix = Config.get('database.nedb.path');
const env = Config.get('env');

function failFast(error) {
    if (error) {
        console.error('FATAL Datastore Error: ', error);
        process.exit(2);
    } else {
        console.log(`${this.operation} Collection: ${this.collection}`);

        if (this.collection === 'users') {
            Users.ensureIndex({fieldName: 'username', unique: true}, (err) => {
                if (err) {
                    console.error('FATAL Database Error: ', error);
                }
                console.log(`Indexed Collection: ${this.collection}`);
            });
        }
    }
}

const Users = new Datastore({
    filename: `${pathPrefix}/${env === 'test' ? 'test-' : ''}users.db`,
    autoload: true,
    onload: failFast.bind({collection: 'users', operation: 'Loaded'})
});

module.exports = {
    Users
};
