'use strict';

const validator = {
    'username': [
        {
            test: /.+/,
            message: '不能为空'
        },
        {
            test: /^[a-z]+/i,
            message: '必须以英文字母开头'
        },
        {
            test: /^\w*$/,
            message: '必须英文字母、数字或下划线'
        },
        {
            test: /^\w{6,18}$/,
            message: '必须6~18位'
        }
    ],
    'student-number': [
        {
            test: /.+/,
            message: '不能为空'
        },
        {
            test: /^\d*$/,
            message: '必须全是数字'
        },
        {
            test: /^[1-9]/,
            message: '不能以0开头'
        },
        {
            test: /^\d{8}$/,
            message: '必须刚好8位数字'
        }
    ],
    'email': [
        {
            test: /.+/,
            message: '不能为空'
        },
        {
            test: /^[a-zA-Z0-9]/,
            message: '必须字母数字开头'
        },
        {
            test: /^(\w|\.|-)*@(\w|\.|-)*$/i,
            message: '@没有或过多'
        },
        {
            test: /\.[a-zA-Z]{2,4}$/,
            message: '后缀不合理'
        },

        {
            test: /^[\w\-]+@(([\w\-])+\.)+[a-zA-Z]{2,4}$/,
            message: '不符合正常邮箱格式'
        }
    ],
    'phone': [
        {
            test: /.+/,
            message: '不能为空'
        },
        {
            test: /^\d*$/,
            message: '必须全是数字'
        },
        {
            test: /^[1-9]/,
            message: '不能以0开头'
        },
        {
            test: /^\d{11}$/,
            message: '必须刚好11位数字'
        }
    ],
    'password': [
        {
            test: /.+/,
            message: '不能为空'
        },
        {
            test: /^.{6,12}$/,
            message: '必须6~12位'
        }
    ],
    'verify-password': [
        {
            test: /.+/,
            message: '不能为空'
        },
        {
            test: {
                test(repeatedValue) {
                    return repeatedValue === $('#password').val();
                }
            },
            message: '两次密码输入不一致'
        }
    ]
};

function validate(type, text) {
    return new Promise((resolve, reject) => {
        const result = validator[type].find(testCase => {
            return !testCase.test.test(text);
        });

        if (result) {
            reject(result.message);
        } else {
            resolve();
        }
    });
}

function validateServer($ctx) {
    return new Promise((resolve, reject) => {
        if ($ctx.parent().hasClass('form-item-correct')) {
            const type = $ctx[0].name;
            if (type !== 'verify-password' && type !== 'password') {
                $.get('/check', {
                    type: $ctx[0].name,
                    value: $ctx.val()
                }, data => {
                    if (data.success) {
                        resolve(data);
                    } else {
                        $ctx.parent()
                            .removeClass('form-item-correct')
                            .addClass('form-item-incorrect')
                            .children('.error-message').text(data.message);
                        reject(data);
                    }
                });
            } else {
                resolve({success: true, message: '密码和验证密码不需要服务器验证'});
            }
        } else {
            resolve({success: true, message: '格式本身已经错误, 不需要验证'});
        }
    });
}

function validateOne($ctx, needServer) {
    return validate($ctx[0].name, $ctx.val())
        .then(() => {
            showStyle(true, $ctx);
            return {success: true};
        })
        .catch(errorMessage => {
            showStyle(false, $ctx, errorMessage);
            return {success: false, message: errorMessage};
        })
        .then(validateResult => needServer ? validateServer($ctx) : validateResult);
}

function showStyle(correct, $ctx, errorMessage) {
    if (correct) {
        $ctx.parent().removeClass('form-item-incorrect').addClass('form-item-correct')
            .children('.error-message').text('');
    } else {
        $ctx.parent().removeClass('form-item-correct').addClass('form-item-incorrect')
            .children('.error-message').text(errorMessage);
    }
}

function validateAll($form, needServer) {
    $form.find('input').each((index, element) => {
        validateOne($(element), needServer);
    });
}

function checkAllPassValidation($form) {
    const $elementArray = Array.from($form.find('input')).map(element => $(element));
    return $elementArray.every($element => {
        return $element.parent('.form-item').hasClass('form-item-correct');
    });
}