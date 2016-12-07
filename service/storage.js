'use strict';

const getDatabase = require('./db');
const Mongoose = require('mongoose');
const debug = require('debug')('app:storage');

class Storage {
    constructor(db, UserModel) {
        this.db = db;
        this.UserModel = UserModel;
    }

    async findUserByName(username) {
        return await this.UserModel.findOne({username});
    }

    /**
     * check if there are duplicates...
     * @param registerInfo {RegisterInterface}
     */
    async checkNoDuplicate(registerInfo) {

        debug('begin to find it');
        const foundUser = await this.UserModel.findOne({
            $or: [
                {username: registerInfo.username},
                {['student-number']: registerInfo['student-number']},
                {email: registerInfo.email},
                {phone: registerInfo.phone}
            ]
        });

        debug('the foundUser is ', foundUser);
        return !foundUser;
    }

    /**
     * create new user in the database...
     * @param registerInfo {RegisterInterface}
     */
    async createNewUser(registerInfo) {
        const entity = new this.UserModel(registerInfo);
        await entity.save();
    }
}


async function getStorage() {
    const db = await getDatabase();
    const userSchema = new Mongoose.Schema({
        username: String,
        'student-number': String,
        password: String,
        email: String,
        phone: String
    });

    const User = db.model('User', userSchema, 'Users');
    return new Storage(db, User);
}

module.exports = getStorage;