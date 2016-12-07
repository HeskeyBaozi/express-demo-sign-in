'use strict';

const debug = require('debug')('app:service');
const getStorage = require('./storage.js');
const Interface = require('./interface.js');

class Service {
    /**
     * @param storage {Storage}
     */
    constructor(storage) {
        this.storage = storage;
    }

    async login(userObject) {
        debug(`login for ${userObject['username']}`);
        const userInDB = await this.storage.findUserByName(userObject.username);

        console.log(userInDB);
    }

    /**
     * register
     * @param registerInfo {RegisterInterface}
     */
    async register(registerInfo) {
        if (await this.storage.checkNoDuplicate(registerInfo)) {
            debug('there is no duplicate, continue...');
            return await this.storage.createNewUser(registerInfo);
        }
    }

    getRegisterInfo(plainObject) {
        return new Interface.RegisterInterface(plainObject);
    }
}

async function getService() {
    const storage = await getStorage();
    return new Service(storage);
}


module.exports = getService;