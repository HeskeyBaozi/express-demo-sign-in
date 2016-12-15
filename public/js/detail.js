'use strict';

$(() => {
    $('#submit-logout').click(e => {
        e.preventDefault();
        window.fetch('/logout',
            {
                credentials: 'include',
                method: 'POST'
            }
        ).then(res => res.json())
            .then(rest => {
                if (rest.success) {
                    window.location.assign('/');
                } else {
                    showStyle(false, $(`#${rest.message.where}`), rest.message.cause);
                }
            });
    });
});