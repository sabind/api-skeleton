const Datastore = require('nedb');

function failFast(error) {
    if (error) {
        console.error('FATAL Datastore Error: ', error);
        process.exit(2);
    } else {
        console.log(`${this.operation} Collection: ${this.collection}`);

        if (this.collection === 'users') {
            Users.ensureIndex({ fieldName: 'username', unique: true }, (err) => {
                if (err) {
                    console.error('FATAL Database Error: ', error)
                }
                console.log(`Indexed Collection: ${this.collection}`);
            });
        }
    }

}

const Users = new Datastore({filename: './data/users.json', autoload: true, onload: failFast.bind({collection: 'users', operation: 'Loaded'})});

module.exports = {
    Users
};