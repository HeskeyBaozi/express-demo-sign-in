'use strict';

$(() => {
    $('.form-item input').on('input', _.debounce(e => {
        const $ctx = $(e.target);
        validate($ctx[0].id, $ctx.val())
            .then(() => {
                $ctx.parent().removeClass('form-item-incorrect').addClass('form-item-correct')
                    .children('.error-message').text('');
            })
            .catch(errorMessage => {
                $ctx.parent().removeClass('form-item-correct').addClass('form-item-incorrect')
                    .children('.error-message').text(errorMessage);
            });
    }, 500));

    $('#submit-login').click(e => {
        e.preventDefault();
        console.log($('#login-form').serializeArray());
    });
});