'use strict';

const debug = require('debug')('app:interface');

class RegisterInterface {
    constructor(plainObject) {
        this.username = plainObject.username;
        this['student-number'] = plainObject['student-number'];
        this.password = plainObject.password;
        this.email = plainObject.email;
        this.phone = plainObject.phone;
    }
}

module.exports.RegisterInterface = RegisterInterface;