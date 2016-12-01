'use strict';

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const result = MongoClient.connect('mongodb://localhost:27017/my-sign-in')
    .then(db => {
        const that = result;
        console.log(db);
    });