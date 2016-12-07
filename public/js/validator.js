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