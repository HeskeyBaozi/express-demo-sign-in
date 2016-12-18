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
                    window.location.assign('/login?fro m=logout');
                } else {
                    showStyle(false, $(`#${rest.message.where}`), rest.message.cause);
                }
            });
    });

    if (location.search !== `?username=${$('#detail-username').text()}`) {
        MessageFailure('只能够访问自己的数据');
    }
});