'use strict';

const debug = require('debug')('app:service');
const getStorage = require('./storage.js');
const Interface = require('./interface.js');

class ErrorCode {
    constructor(success, body) {
        this.success = success;
        this.body = body || '';
    }
}

class Service {
    /**
     * @param storage {Storage}
     */
    constructor(storage) {
        this.storage = storage;
    }

    async login(userObject) {
        debug(`login for ${userObject['username']}`);
        let userInDB = null;
        userInDB = await this.storage.findUserByName(userObject.username);
        if (userInDB === null) {
            return new ErrorCode(false, {
                where: 'username'
            });
        }

        debug('user in db is', userInDB);
        if (userInDB.password === userObject.password) {
            debug('correct password: ', userObject.password);
            return new ErrorCode(true, userInDB);
        } else {
            debug('incorrect password ', userObject.password);
            return new ErrorCode(false, {
                where: 'password'
            });
        }
    }

    /**
     * register
     * @param registerInfo {RegisterInterface}
     */
    async register(registerInfo) {
        if (!await this.storage.getDuplicateItem(registerInfo)) {
            debug('there is no duplicate, continue...');
            return new ErrorCode(true, await this.storage.createNewUser(registerInfo));
        }
        return new ErrorCode(false, 'There are some duplicates');
    }

    /**
     * get user information
     * @param username {String}
     * @return {*}
     */
    async getUserInfo(username) {
        const result = await this.storage.findUserByName(username);
        return result ? new ErrorCode(true, result) : new ErrorCode(false, `Cannot find the user ${username}`);
    }

    async checkRegisterInfo(type, value) {
        const foundUser = await this.storage.isExists(type, value);
        return new ErrorCode(!foundUser);
    }

    getRegisterInfo(plainObject) {
        return new Interface.RegisterInterface(plainObject);
    }

    getDetailInfo(mongooseResult) {
        return new Interface.DetailInterface(mongooseResult);
    }
}

async function getService() {
    const storage = await getStorage();
    return new Service(storage);
}


module.exports = getService;