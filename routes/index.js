'use strict';

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (request, response, next) => {
    response.redirect(302, '/login');
});

router.get('/login', (request, response, next) => {
    response.render('login');
});

router.post('/login', (request, response, next) => {

});

router.get('/register', (request, response, next) => {
    response.render('register');
});

router.post('/register', (request, response, next) => {

});

router.get('/detail/:username', (request, response, next) => {
    response.render('detail');
});

module.exports = router;
