'use strict';

const express = require('express');
const router = express.Router();
const getService = require('../service');
const debug = require('debug')('app:router');

async function getRouter() {
    /**
     * @type Service
     */
    const service = await getService();

    /* GET home page. */
    router.get('/', (request, response, next) => {
        response.redirect(302, '/login');
    });

    router.route('/login')
        .get((request, response, next) => {
            response.render('login');
        })
        .post((request, response, next) => {
            console.log(request.body);
            response.send(request.body);
        });


    router.route('/register')
        .get((request, response, next) => {
            response.render('register');
        })
        .post((request, response, next) => {
            let plainObject = request.body;
            if (plainObject.password === plainObject['verify-password']) {
                delete plainObject['verify-password'];
            }

            debug(plainObject);
            service.register(service.getRegisterInfo(plainObject))
                .then(result => {
                    response.send(result);
                });
        });

    router.get('/detail/:username', (request, response, next) => {
        response.render('detail');
    });

    return router;
}

module.exports = getRouter;
