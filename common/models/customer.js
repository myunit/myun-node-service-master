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

        if (res.RegisterResult.HasError === 'true') {
          cb(null, {status:0, msg: res.RegisterResult.Faults.MessageFault.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '注册成功'});
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
              '用户注册信息(JSON string) {"phone":"string", "password":"string", "name(Optional)":"string",' +
              '"gender(Optional)":"string(All, Male, Famale)", "birthday(Optional)":"string", ' +
              '"from(Optional)":"string", "level(Optional)":int, "source(Optional)":int' +
              '"picture(Optional)":"string", "storeName(Optional)":"string", "WangWang(Optional)":"string", ' +
              '"invitationCode(Optional)":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/register', verb: 'post'}
      }
    );

    //获取验证码
    Customer.getCaptcha = function (phone, cb) {
      if (!phone) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.getCaptcha(phone, function (err, res) {
        if (err) {
          console.log('getCaptcha err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.GetCaptchaResult.HasError === 'true') {
          cb(null, {status: 0, msg: '发送失败'});
        } else {
          cb(null, {status: 1, msg: '发送成功'});
        }
      });
    };

    Customer.remoteMethod(
      'getCaptcha',
      {
        description: ['获取验证码.返回结果-status:操作结果 0 成功 -1 失败, verifyCode:验证码'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, http: {source: 'query'}, description: '手机号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-captcha', verb: 'get'}
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

              if (!res.LoginResult.Body) {
                cb({status:0, msg: '手机号或密码错误'});
              } else {
                cb(null, {status: 1, customerNo: parseInt(res.LoginResult.Body.CustomerNo), msg: '登录成功'});
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

    //修改密码
    Customer.modifyPassword = function (data, cb) {
      if (!data.customerNo || !data.newPassword) {
        cb(null, {status:0, msg: '新密码不能为空'});
        return;
      }

      customerIFS.modifyPW(data, function (err, res) {
        if (err) {
          console.log('modifyPW err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (res.ModifyPasswordResult.HasError === 'true') {
          cb(null, {status:0, msg: '密码设置失败'});
        } else {
          cb(null, {status: 1, msg: '密码设置成功'});
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
              '密码信息(JSON string) {"customerNo":int, "newPassword":"string"}'
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
        loginCb(null, {status:0, msg: '微信号不能为空'});
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
                console.log('login err: ' + err);
                cb({status:0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb(null, {status:0, msg: res.ErrorDescription});
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
      if (!data.phone || !data.openId) {
        cb(null, {status:0, msg: '手机号和微信号不能为空'});
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

    //新增用户审核认证
    Customer.AddIdentityAudit = function (data, cb) {
      if (!data.userNo || !data.phone) {
        cb(null, {status:0, msg: '手机号和用户不能为空'});
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
          cb(null, {status: 1, auditNo: res.SysNo, msg: ''});
        }
      });
    };

    Customer.remoteMethod(
      'AddIdentityAudit',
      {
        description: ['新增用户审核认证.返回结果-status:操作结果 0 失败 1 成功, data:用户信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户认证信息(JSON string) {"userNo":"string", "realName":"string", "name":"string",' +
              '"cardId":"string", "captcha":"string", "identityImgs":array, "phone":"string"} ' + '' +
              'identityImgs:["ImgKey":int, "ImgType":int, "ImgValue":"string"]'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-identity-audit', verb: 'post'}
      }
    );

  });
};
