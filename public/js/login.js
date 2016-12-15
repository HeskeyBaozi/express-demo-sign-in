'use strict';

$(() => {
    /**
     * validate the form of login...
     */
    $('.form-item input').on('input', _.debounce(e => {
        validateOne($(e.target));
    }, 500));

    $('#submit-login').click(e => {
        e.preventDefault();
        window.fetch('/login',
            {
                credentials: 'include',
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                body: $('#login-form').serialize()
            }
        ).then(res => res.json())
            .then(rest => {
                if (rest.success) {
                    window.location.assign('/detail');
                } else {
                    showStyle(false, $(`#${rest.message.where}`), rest.message.cause);
                }
            });
    });
});