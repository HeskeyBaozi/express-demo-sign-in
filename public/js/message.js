'use strict';

const $msg = $('.message-cover');
$msg.hide();

function MessageSuccess(content, duration) {
    $msg.removeClass('message-no').addClass('message-yes').text(content).fadeIn('fast', () => {
        setTimeout(() => {
            $msg.fadeOut();
        }, duration || 2000);
    });
}

function MessageFailure(content, duration) {
    $msg.removeClass('message-yes').addClass('message-no').text(content).fadeIn('fast', () => {
        setTimeout(() => {
            $msg.fadeOut();
        }, duration || 2000);
    })
}