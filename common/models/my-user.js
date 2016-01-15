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
      customerIFS.register(data, function (err, res) {
        cb(null, {status: 0, msg: '成功'});
      })

    };

    MYUser.remoteMethod(
      'register',
      {
        description: ['注册一个新用户.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户注册信息(JSON string) {"Name":"string", "LoginPassword":"string", "CellPhoneNo":"string",' +
              '"Gender(Optional)":"string(All, Male, Famale)", "BirthDay(Optional)":"string", ' +
              '"CustomerFrom(Optional)":"string", "CustomerLevel(Optional)":int, "CustomerSource(Optional)":int' +
              '"HeadPicture(Optional)":"string", "StoreName(Optional)":"string", "WangwangNo(Optional)":"string", ' +
              '"invitationCode(Optional)":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/register', verb: 'post'}
      }
    );

    //获取验证码
    MYUser.getVerifyCode = function (phone, cb) {
      //TODO: cloud logic
      cb(null, {status: 0, verifyCode: '123'});
    };

    MYUser.remoteMethod(
      'getVerifyCode',
      {
        description: ['获取验证码.返回结果-status:操作结果 0 成功 -1 失败, verifyCode:验证码'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, http: {source: 'query'}, description: '手机号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-verify-code', verb: 'get'}
      }
    );

    //登录
    MYUser.login = function (credentials, loginCb) {
      var user = credentials.user,
        password = credentials.password,
        myToken = app_self.models.MYToken;

      //TODO: cloud logic
      async.waterfall(
        [
          function (cb) {
            myToken.destroyAll({userId: user}, function (err) {
              cb(err);
            });
          },
          function (cb) {
            myToken.create({userId: user}, function (err, token) {
              cb(err, token);
            });
          }
        ],
        function (err, token) {
          if (err) {
            loginCb(null, {status: -1, token: '', msg: '登录失败'});
          } else {
            loginCb(null, {status: 0, token: token.id, msg: '登录成功'});
          }
        }
      );
    };

    MYUser.remoteMethod(
      'login',
      {
        description: ['用户登录.返回结果-status:操作结果 0 成功 -1 失败, token:用户token, msg:附带信息'],
        accepts: [
          {
            arg: 'credentials', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户登录信息(JSON string) {"realm(optional)":"string", "user":"string", "password":"string"}'
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
      var oldPassword = data.oldPassword,
        newPassword = data.newPassword;
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {status: 0, msg: '密码修改成功'});
    };

    MYUser.remoteMethod(
      'modifyPassword',
      {
        description: ['修改密码(access token).返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '密码信息(JSON string) {"oldPassword":"string", "newPassword":"string"}'
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
