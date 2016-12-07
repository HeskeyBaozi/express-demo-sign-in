'use strict';

$(() => {

    $('#submit-register').click(e => {
        e.preventDefault();
        window.fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: $('#register-form').serialize()
        }).then(res => res.text()).then(data => {
            console.log(data);
        });
    });
});