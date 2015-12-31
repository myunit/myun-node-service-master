module.exports = function (MYUser) {
  MYUser.getApp(function (err, app) {
    var app_self = app;
    //注册用户
    MYUser.register = function (phone, password, verifyCode, address, cb) {
      //TODO: cloud logic
      cb(null, {status: 0, msg: "成功"});
    };

    MYUser.remoteMethod(
      'register',
      {
        description: ['注册一个新用户.'],
        accepts: [
          {arg: 'password', type: 'string', required: true, description: '密码'},
          {arg: 'verifyCode', type: 'string', required: true, description: '验证码'},
          {arg: 'address', type: 'string', required: true,
            description: ['地址(JSON string): {"receiver":"string", "phone":"string",',
              '"province":number, "city":number, "region":number, "road":number, "addDetail":"string"}'
            ]
          }
        ],
        returns: {arg: 'registerInfo', type: 'Object'},
        http: {path: '/register', verb: 'post'}
      }
    );

    //获取验证码
    MYUser.getVerifyCode = function (phone, cb) {
      //TODO: cloud logic
      cb(null, {phone: phone, verifyCode: '123'});
    };

    MYUser.remoteMethod(
      'getVerifyCode',
      {
        description: ['获取验证码'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, description: '手机号'}
        ],
        returns: {arg: 'verifyCode', type: 'string'},
        http: {path: '/get-verify-code', verb: 'post'}
      }
    );

    //登录
    MYUser.login = function (phone, password, cb) {
      //TODO: cloud logic
      var AccessToken = app_self.models.MYToken;
      AccessToken.create({userId: phone}, function (err, token) {
        cb(null, {phone: phone, token: token.id, ttl: token.ttl, created: token.created, userId: token.userId});
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
        returns: {arg: 'userInfo', type: 'string'},
        http: {path: '/login', verb: 'post'}
      }
    );

    //修改密码
    MYUser.modifyPassword = function (phone, newPassword, oldPassword, cb) {
      //TODO: cloud logic
      cb(null, {msg: 'ok'});
    };

    MYUser.remoteMethod(
      'modifyPassword',
      {
        description: ['修改密码'],
        accepts: [
          {arg: 'phone', type: 'string', required: true, description: '手机号'},
          {arg: 'newPassword', type: 'string', required: true, description: '新密码'},
          {arg: 'oldPassword', type: 'string', required: true, description: '旧密码'}
        ],
        returns: {arg: 'status', type: 'string'},
        http: {path: '/modify-password', verb: 'post'}
      }
    );
  });
};
