`use strict`;

const {init, start} = require('./server');

// noinspection JSIgnoredPromiseFromCall
init()
    .then(() => {
        return start();
    });
