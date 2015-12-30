module.exports = function(MYUser) {
  //注册用户
  MYUser.register = function(phone, password, verifyCode, cb) {
    //TODO: cloud logic
    cb(null, {phone: phone, password: password, verifyCode:verifyCode});
  };

  MYUser.remoteMethod(
    'register',
    {
      description: ['register a new user.'],
      accepts: [
        {arg: 'phone', type: 'string', required: true},
        {arg: 'password', type: 'string', required: true},
        {arg: 'verifyCode', type: 'string', required: true}
      ],
      returns: {arg: 'registerInfo', type: 'string'},
      http: {path:'/register', verb: 'post'}
    }
  );

  //获取验证码
  MYUser.getVerifyCode = function(phone, cb) {
    //TODO: cloud logic
    cb(null, {phone: phone, verifyCode:'123'});
  };

  MYUser.remoteMethod(
    'getVerifyCode',
    {
      description: ['get verify code.'],
      accepts: [
        {arg: 'phone', type: 'string', required: true}
      ],
      returns: {arg: 'verifyCode', type: 'string'},
      http: {path:'/get-verify-code', verb: 'post'}
    }
  );

  //登录
  MYUser.login = function(phone, password, cb) {
    //TODO: cloud logic
    MYUser.getApp(function (err , app) {
      var AccessToken = app.models.AccessToken;
      AccessToken.create({userId:'123'}, function (err, token) {
        cb(null, {phone: phone, token: token.id, ttl: token.ttl, created:token.created, userId:token.userId});
      });
    });
  };

  MYUser.remoteMethod(
    'login',
    {
      description: ['user login.'],
      accepts: [
        {arg: 'phone', type: 'string', required: true},
        {arg: 'password', type: 'string', required: true}
      ],
      returns: {arg: 'userInfo', type: 'string'},
      http: {path:'/login', verb: 'post'}
    }
  );

  //修改密码
  MYUser.modifyPassword = function(phone, newPassword, oldPassword, cb) {
    //TODO: cloud logic
    MYUser.getApp(function (err , app) {
      cb(null, {msg: 'ok'});
    });
  };

  MYUser.remoteMethod(
    'modifyPassword',
    {
      description: ['user modify password.'],
      accepts: [
        {arg: 'phone', type: 'string', required: true},
        {arg: 'newPassword', type: 'string', required: true},
        {arg: 'oldPassword', type: 'string', required: true}
      ],
      returns: {arg: 'status', type: 'string'},
      http: {path:'/modify-password', verb: 'post'}
    }
  );


};
