module.exports = function (MYUser) {
  MYUser.getApp(function (err, app) {
    var app_self = app;
    var myToken = app_self.models.MYToken;
    //注册用户
    MYUser.register = function (phone, password, verifyCode, address, cb) {
      //TODO: cloud logic-add user && save address(default)
      cb(null, {status: 0, msg: '成功'});
    };

    MYUser.remoteMethod(
      'register',
      {
        description: ['注册一个新用户.'],
        accepts: [
          {arg: 'password', type: 'string', required: true, description: '密码'},
          {arg: 'verifyCode', type: 'string', required: true, description: '验证码'},
          {
            arg: 'address', type: 'string', required: true,
            description: ['地址(JSON string): {"receiver":"string", "phone":"string",',
              '"province":number, "city":number, "region":number, "road":number, "addDetail":"string"}'
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
        description: ['获取验证码'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, description: '手机号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-verify-code', verb: 'post'}
      }
    );

    //登录
    MYUser.login = function (phone, password, cb) {
      //TODO: cloud logic
      var myToken = app_self.models.MYToken;
      myToken.create({userId: phone}, function (err, token) {
        cb(null, {status: 0, token: token.id, msg: '登录成功'});
      });
    };

    MYUser.remoteMethod(
      'login',
      {
        description: ['用户登录'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, description: '手机号'},
          {arg: 'password', type: 'string', required: true, description: '密码'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/login', verb: 'post'}
      }
    );

    //退出登录
    MYUser.logout = function (cb) {
      //TODO: cloud logic
      cb(null, {status: 0, msg: '退出成功'});
    };

    MYUser.beforeRemote('logout', function (context, unused, next) {
      var req = context.req;
      var myToken = app_self.models.MYToken;
      var logOutToken = new myToken({id: req.accessToken.id});
      logOutToken.destroy(function (err) {
        if (err) {
          next(err);
        } else {
          next();
        }
      });
    });

    MYUser.remoteMethod(
      'logout',
      {
        description: ['用户退出登录(access token)'],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/logout', verb: 'post'}
      }
    );

    //修改密码
    MYUser.modifyPassword = function (phone, newPassword, oldPassword, cb) {
      //TODO: cloud logic
      cb(null, {status: 0, msg: '密码修改成功'});
    };

    MYUser.remoteMethod(
      'modifyPassword',
      {
        description: ['修改密码(access token)'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, description: '手机号'},
          {arg: 'newPassword', type: 'string', required: true, description: '新密码'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-password', verb: 'post'}
      }
    );

    //忘记密码
    MYUser.forgetPassword = function (phone, verifyCode, newPassword, oldPassword, cb) {
      //TODO: cloud logic
      cb(null, {status: 0, msg: '密码重设成功'});
    };

    MYUser.remoteMethod(
      'forgetPassword',
      {
        description: ['忘记密码'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, description: '手机号'},
          {arg: 'verifyCode', type: 'string', required: true, description: '验证码'},
          {arg: 'newPassword', type: 'string', required: true, description: '新密码'},
          {arg: 'oldPassword', type: 'string', required: true, description: '旧密码'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/forget-password', verb: 'post'}
      }
    );
  });
};
