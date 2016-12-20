'use strict';

const express = require('express');
const router = express.Router();
const getService = require('../service');
const debug = require('debug')('app:router');

class Restful {
    constructor(success, message) {
        this.success = success;
        this.message = message || '';
    }
}

async function getRouter() {
    /**
     * @type Service
     */
    const service = await getService();

    router.get('*', (request, response, next) => {
        debug('debug*', request.method, request.url, request.sessionID);
        if (request.session.username) {
            if (request.params[0] === '/detail') {
                next();
            } else
                response.redirect(302, `/detail?username=${request.session.username}`);
        } else if (request.params[0] === '/login' || request.params[0] === '/regist' || request.params[0] === '/check') {
            next();
        } else {
            response.redirect(302, '/login');
        }
    });

    /* GET home page. */
    router.route('/login')
        .get((request, response, next) => {
            response.render('login');
        })
        .post((request, response, next) => {
            debug('debug', request.method, request.url, request.sessionID);
            service.login(request.body)
                .then(errorCode => {
                    if (errorCode.success) {
                        debug('login success for ', errorCode.body.username);
                        request.session.username = errorCode.body.username;
                        response.send(new Restful(true, request.session.username));
                    } else {
                        debug('login fail for ', errorCode.body);
                        errorCode.body.cause = '错误的用户名或者密码';
                        response.send(new Restful(false, errorCode.body));
                    }
                });
        });

    router.route('/regist')
        .get((request, response, next) => {
            response.render('register');
        })
        .post((request, response, next) => {
            let plainObject = request.body;
            if (plainObject.password === plainObject['verify-password']) {
                delete plainObject['verify-password'];
            }

            debug(plainObject);
            service
                .register(service.getRegisterInfo(plainObject))
                .then(errorCode => {
                    if (errorCode.success) {
                        request.session.username = errorCode.body.username;
                        response.send(new Restful(true, request.session.username));
                    } else {
                        response.send(new Restful(false, errorCode.body));
                    }
                });
        });

    router.get('/check', (request, response, next) => {
        service
            .checkRegisterInfo(request.query.type, request.query.value)
            .then(errorCode => {
                if (errorCode.success) {
                    response.send(new Restful(true));
                } else {
                    response.send(new Restful(false, '此用户信息重复'));
                }
            });
    });


    router.get('/detail', (request, response, next) => {
        service
            .getUserInfo(request.session.username)
            .then(errorCode => {
                if (errorCode.success) {
                    response.render('detail', {userInfo: service.getDetailInfo(errorCode.body)});
                } else {
                    response.render('detail', {userInfo: {'对不起': '找不到 ' + request.session.username}});
                }
            });
    });

    router.post('/logout', (request, response, next) => {
        debug('ready to logout for', request.session.username);
        delete request.session.username;
        response.send(new Restful(true));
    });

    return router;
}

module.exports = getRouter;
