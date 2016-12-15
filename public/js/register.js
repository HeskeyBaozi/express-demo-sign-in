'use strict';

$(() => {
    $('.form-item input').on('input', _.debounce(e => {
        validateOne($(e.target), true);
    }, 500));

    $('#submit-register').click(e => {
        e.preventDefault();
        const $form = $('#register-form');
        const formObject = {};

        $form.serializeArray()
            .filter(object => {
                return object['name'] !== 'verify-password';
            })
            .forEach(object => {
                Object.assign(formObject, {
                    [object.name]: object.value
                });
            });

        if (checkAllPassValidation($form)) {
            window.fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                body: $.param(formObject)
            }).then(res => res.text()).then(data => {
                console.log(data);
            });
        } else {
            validateAll($form, true);
        }
    });

    $('#submit-reset').click(e => {
        e.preventDefault();
        $('#register-form')
            .children('.form-item').removeClass('form-item-correct form-item-incorrect')
            .children('.error-message').text('')
            .parent()
            .children('input').val('');
    });
});