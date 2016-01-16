var loopback = require('loopback');
var async = require('async');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function (MYUser) {
  MYUser.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);
    //注册用户
    MYUser.register = function (data, cb) {
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

    MYUser.remoteMethod(
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
    MYUser.getCaptcha = function (phone, cb) {
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

    MYUser.remoteMethod(
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
    MYUser.login = function (data, loginCb) {
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

    MYUser.remoteMethod(
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
    MYUser.logout = function (cb) {
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

    MYUser.remoteMethod(
      'logout',
      {
        description: ['用户退出登录(access token).返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/logout', verb: 'post'}
      }
    );

    //修改密码
    MYUser.modifyPassword = function (data, cb) {
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

    MYUser.remoteMethod(
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

    //忘记密码
    MYUser.forgetPassword = function (data, cb) {
      var user = data.user,
        verifyCode = data.verifyCode,
        newPassword = data.newPassword;
      //TODO: cloud logic
      cb(null, {status: 0, msg: '密码重设成功'});
    };

    MYUser.remoteMethod(
      'forgetPassword',
      {
        description: ['忘记密码.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '密码信息(JSON string) {"realm(optional)":"string", "user":"string", "verifyCode":"string", "newPassword":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/forget-password', verb: 'post'}
      }
    );

    //获取首页
    MYUser.getHome = function (homeCb) {
      //TODO: cloud logic
      var goods = app_self.models.Goods;
      var home = {};
      async.waterfall(
        [
          function (cb) {
            goods.getPromo(function (err , promo) {
              home['promo'] = promo['promo'];
              cb(err, home);
            });
          },
          function (home, cb) {
            goods.getNewPromo(function (err , newPromo) {
              home['newPromo'] = newPromo['newPromo'];
              cb(err, home);
            });
          },
          function (home, cb) {
            goods.getSalePromo(function (err , salePromo) {
              home['salePromo'] = salePromo['salePromo'];
              cb(err, home);
            });
          }
        ],
        function (err, home) {
          if (err) {
            homeCb(null, home);
          } else {
            homeCb(null, home);
          }
        }
      );
    };

    MYUser.remoteMethod(
      'getHome',
      {
        description: ['获取首页.返回结果-promo:主宣传片, newPromo:新品宣传片, salePromo:特卖/活动宣传片'],
        accepts: [],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-home', verb: 'get'}
      }
    );
  });
};
