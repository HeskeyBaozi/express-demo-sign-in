'use strict';

const debug = require('debug')('app:db');
const Mongoose = require('mongoose');

Mongoose.Promise = global.Promise;

function getDataBase() {
    return new Promise((resolve, reject) => {
        const db = Mongoose.createConnection('mongodb://localhost/SignIn');
        db.on('error', error => {
            debug('opening db with error', error);
            reject(error);
        });

        db.once('open', () => {
            debug('opening db successfully :)');
            resolve(db);
        });
    });
}

module.exports = getDataBase;
