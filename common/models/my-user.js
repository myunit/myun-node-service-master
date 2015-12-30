module.exports = function(MYUser) {
  MYUser.register = function(phone, password, verifyCode, cb) {
    //TODO: cloud logic
    cb(null, {phone: phone, password: password, verifyCode:verifyCode});
  };

  MYUser.getVerifyCode = function(phone, cb) {
    //TODO: cloud logic
    cb(null, {phone: phone, verifyCode:'123'});
  };

  MYUser.login = function(phone, password, cb) {
    //TODO: cloud logic
    MYUser.getApp(function (err , app) {
      var AccessToken = app.models.AccessToken;
      AccessToken.createAccessTokenId(function (err, token) {
        cb(null, {phone: phone, token:token});
      });
    });
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
};
