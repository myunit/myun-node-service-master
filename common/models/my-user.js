var loopback = require('loopback');
var async = require('async');

module.exports = function (MYUser) {
  //注册用户
  MYUser.register = function (data, cb) {
    var user = data.user,
      password = data.password,
      verifyCode = data.verifyCode,
      address = data.address;
    //TODO: cloud logic-add user && save address(default)
    cb(null, {status: 0, msg: '成功'});
  };

  MYUser.remoteMethod(
    'register',
    {
      description: ['注册一个新用户.返回结果-status:操作结果 0 成功 -1 失败, msg:附带信息'],
      accepts: [
        {
          arg: 'data', type: 'object', required: true, http: {source: 'body'},
          description: [
            '用户注册信息(JSON string) {"realm(optional)":"string", "user":"string", "password":"string","verifyCode":"string",',
            '"address(optional)":{"receiver":"string","phone":"string","province":number,"city":number,',
            '"region":number,"road":number,"addDetail":"string"}}'
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
    var myToken = MYUser.app.models.MYToken;
    var user = credentials.user,
      password = credentials.password;
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
    var ctx = loopback.getCurrentContext();
    var myToken = MYUser.app.models.MYToken;
    var token = ctx.get('accessToken');
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
};
