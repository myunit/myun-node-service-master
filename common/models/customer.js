var loopback = require('loopback');
var async = require('async');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function (Customer) {
  Customer.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);
    //注册用户
    Customer.register = function (data, cb) {
      if (!data.phone || !data.password) {
        cb(null, {status:0, msg: '手机号和密码不能为空'});
        return;
      }

      customerIFS.register(data, function (err, res) {
        if (err) {
          console.log('register err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Customer, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'register',
      {
        description: ['注册一个新用户.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户注册信息(JSON string) {"phone":"string", "password":"string", "code":"string",' +
              '"from":"3:android"}, phone:手机号, password:密码, code:验证码, from:来源(字符串 3:android 或者 4:ios)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/register', verb: 'post'}
      }
    );

    //判断手机号是否已经注册
    Customer.isRegister = function (phone, cb) {
      if (!phone) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.isRegister(phone, function (err, res) {
        if (err) {
          console.log('isRegister err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        cb(null, {status: 1, data: res.IsSuccess, msg: res.ErrorDescription});

      });
    };

    Customer.remoteMethod(
      'isRegister',
      {
        description: ['判断手机号是否已经注册.返回结果-status:操作结果 0 成功 -1 失败, data:手机号是否被注册(true已被,false未被注册),msg:附带信息'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, http: {source: 'query'}, description: '手机号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/is-register', verb: 'get'}
      }
    );

    //获取验证码
    Customer.getCaptcha = function (phone, interval, cb) {
      if (!phone) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      customerIFS.getCaptcha(phone, interval, function (err, res) {
        if (err) {
          console.log('getCaptcha err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: '发送失败'});
        } else {
          cb(null, {status: 1, msg: '发送成功'});
        }
      });
    };

    Customer.remoteMethod(
      'getCaptcha',
      {
        description: ['获取验证码.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, http: {source: 'query'}, description: '手机号'},
          {arg: 'interval', type: 'number', default:900, http: {source: 'query'}, description: '验证码有效期(秒)'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-captcha', verb: 'get'}
      }
    );

    //获取验证码(微信手机号绑定)
    Customer.getCaptchaForBind = function (phone, interval, bindCb) {
      if (!phone) {
        cb(null, {status: 0, msg: '参数错误'});
        return;
      }

      async.waterfall(
        [
          function (cb) {
            //判断手机号是否已经注册
            customerIFS.isRegister(phone, function (err, res) {
              if (err) {
                console.log('isRegister err: ' + err);
                cb({status: 0, msg: '操作异常'});
                return;
              }

              if (res.IsSuccess) {
                cb({status:0, msg: '该手机号已被注册'});
              } else {
                cb(null);
              }
            });
          },
          function (cb) {
            customerIFS.getCaptcha(phone, interval, function (err, res) {
              if (err) {
                console.log('getCaptcha err: ' + err);
                cb({status: 0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb({status: 0, msg: '发送失败'});
              } else {
                cb(null, {status: 1, msg: '发送成功'});
              }
            });
          }
        ],
        function (err, msg) {
          if (err) {
            bindCb(null, err);
          } else {
            bindCb(null, msg);
          }
        }
      );
    };

    Customer.remoteMethod(
      'getCaptchaForBind',
      {
        description: ['获取验证码(微信手机号绑定).返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, http: {source: 'query'}, description: '手机号'},
          {arg: 'interval', type: 'number', default:900, http: {source: 'query'}, description: '验证码有效期(秒)'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-captcha-for-bind', verb: 'get'}
      }
    );

    //绑定微信号和手机号(自动注册)
    /*Customer.bindWeiXinAndPhoneWithReg = function (data, bindCb) {
      if (!data.phone || !data.password || !data.openId || !data.code || !data.from) {
        bindCb(null, {status:0, msg: '参数错误'});
        return;
      }

      async.waterfall(
        [
          function (cb) {
            customerIFS.register(data, function (err, res) {
              if (err) {
                console.log('register err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb({status:0, msg: res.ErrorDescription});
              } else {
                cb(null, res.Customer);
              }
            });
          },
          function (customer, cb) {
            customerIFS.bindWeiXinAndPhone(data.openId, data.phone, function (err, res) {
              if (err) {
                console.log('bindWeiXinAndPhone err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb({status:0, msg: res.ErrorDescription});
              } else {
                cb(null, {status: 1, data: customer, msg: ''});
              }
            });
          }
        ],
        function (err, msg) {
          if (err) {
            bindCb(null, err);
          } else {
            bindCb(null, msg);
          }
        }
      );
    };

    Customer.remoteMethod(
      'bindWeiXinAndPhoneWithReg',
      {
        description: ['绑定微信号和手机号(自动注册).返回结果-status:操作结果 0 失败 -1 成功, token:用户token, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户绑定信息(JSON string) {"phone":"string", "openId":"string","password":"string", "code":"string",' +
              '"from":"3:android"}, phone:手机号, openId微信id,password:密码, code:验证码, from:来源(字符串 3:android 或者 4:ios)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/bind-weixin-phone-register', verb: 'post'}
      }
    );*/

    //绑定微信号和手机号(不带注册功能)
    Customer.bindWeiXinAndPhone = function (data, cb) {
      if (!data.phone || !data.openId) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.bindWeiXinAndPhone(data, function (err, res) {
        if (err) {
          console.log('bindWeiXinAndPhone err: ' + err);
          cb({status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb({status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'bindWeiXinAndPhone',
      {
        description: ['绑定微信号和手机号(不带注册功能).返回结果-status:操作结果 0 失败 -1 成功, token:用户token, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户绑定信息(JSON string) {"phone":"string", "openId":"string","code":"string"},',
              'phone:手机号, openId微信id, code验证码'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/bind-weixin-phone', verb: 'post'}
      }
    );

    //登录
    Customer.login = function (data, loginCb) {
      var user = data.phone,
        myToken = app_self.models.MYToken;

      if (!data.phone || !data.password) {
        loginCb(null, {status:0, msg: '手机号和密码不能为空'});
        return;
      }

      //TODO: cloud logic
      async.waterfall(
        [
          function (cb) {
            myToken.destroyAll({userId: user}, function (err) {
              if (err) {
                cb({status:0, msg: '操作异常'});
              } else {
                cb(null);
              }
            });
          },
          function (cb) {
            customerIFS.login(data, function (err, res) {
              if (err) {
                console.log('login err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb({status:0, msg: res.ErrorDescription});
              } else {
                cb(null, {status: 1, data: res.Customer, msg: ''});
              }
            });
          },
          function (msg, cb) {
            myToken.create({userId: user}, function (err, token) {
              if (err) {
                cb({status:0, msg: '操作异常'});
              } else {
                msg.token = token;
                cb(null, msg);
              }
            });
          }
        ],
        function (err, msg) {
          if (err) {
            loginCb(null, err);
          } else {
            loginCb(null, msg);
          }
        }
      );
    };

    Customer.remoteMethod(
      'login',
      {
        description: ['用户登录.返回结果-status:操作结果 0 失败 -1 成功, token:用户token, msg:附带信息'],
        accepts: [
          {
            arg: 'credentials', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户登录信息(JSON string) {"phone":"string", "password":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/login', verb: 'post'}
      }
    );

    //退出登录
    Customer.logout = function (cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext(),
        token = ctx.get('accessToken'),
        myToken = app_self.models.MYToken;

      var logOutToken = new myToken({id: token.id});
      logOutToken.destroy(function (err) {
        if (err) {
          cb(null, {status: -1, msg: '退出异常'});
        } else {
          cb(null, {status: 0, msg: '退出成功'});
        }
      });

    };

    Customer.remoteMethod(
      'logout',
      {
        description: ['用户退出登录(access token).返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/logout', verb: 'post'}
      }
    );

    //忘记密码
    Customer.forgetPassword = function (data, cb) {
      if (!data.phone || !data.newPassword || !data.code) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.forgetPW(data, function (err, res) {
        if (err) {
          console.log('forgetPW err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorInfo});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'forgetPassword',
      {
        description: ['忘记密码.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '密码信息(JSON string) {"phone":"string", "newPassword":"string", "code":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/forget-password', verb: 'post'}
      }
    );

    //修改密码
    Customer.modifyPassword = function (data, cb) {
      if (!data.userId || !data.newPassword) {
        cb(null, {status:0, msg: '新密码不能为空'});
        return;
      }

      customerIFS.modifyPW(data, function (err, res) {
        if (err) {
          console.log('modifyPW err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'modifyPassword',
      {
        description: ['修改密码(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '密码信息(JSON string) {"userId":int, "newPassword":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-password', verb: 'post'}
      }
    );

    //微信账号登录
    Customer.loginByWeiXin = function (data, loginCb) {
      var openId = data.openId,
        myToken = app_self.models.MYToken;

      if (!data.openId) {
        loginCb(null, {status:0, msg: '参数错误'});
        return;
      }

      async.waterfall(
        [
          function (cb) {
            myToken.destroyAll({userId: openId}, function (err) {
              if (err) {
                cb({status:0, msg: '操作异常'});
              } else {
                cb(null);
              }
            });
          },
          function (cb) {
            customerIFS.loginByWeiXin(openId, function (err, res) {
              if (err) {
                console.log('login by weixin err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb({status:0, msg: res.ErrorDescription});
              } else {
                cb(null, {status: 1, data: res.Customer, msg: ''});
              }

            });
          },
          function (msg, cb) {
            myToken.create({userId: openId}, function (err, token) {
              if (err) {
                cb({status:0, msg: '操作异常'});
              } else {
                msg.token = token;
                cb(null, msg);
              }
            });
          }
        ],
        function (err, msg) {
          if (err) {
            loginCb(null, err);
          } else {
            loginCb(null, msg);
          }
        }
      );
    };

    Customer.remoteMethod(
      'loginByWeiXin',
      {
        description: ['用微信账号登录.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息, data:用户相关信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '密码信息(JSON string) {"realm(optional)":"string", "openId":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/login-by-weixin', verb: 'post'}
      }
    );

    //微信注册用户
    Customer.registerByWeiXin = function (data, cb) {
      if (!data.phone || !data.openId || !data.name || !data.picture) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.registerByWeiXin(data, function (err, res) {
        if (err) {
          console.log('register err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Customer, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'registerByWeiXin',
      {
        description: ['通过微信注册一个新用户.返回结果-status:操作结果 0 失败 1 成功, data:用户信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户注册信息(JSON string) {"phone":"string", "openId":"string", "name":"string",' +
              '"picture":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/register-by-weixin', verb: 'post'}
      }
    );
  });
};
