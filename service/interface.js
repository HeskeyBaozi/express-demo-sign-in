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

class DetailInterface {
    constructor(mongooseResult) {
        this['用户名'] = mongooseResult.username;
        this['学号'] = mongooseResult['student-number'];
        this['邮箱'] = mongooseResult.email;
        this['电话'] = mongooseResult.phone;
    }
}

module.exports.RegisterInterface = RegisterInterface;
module.exports.DetailInterface = DetailInterface;