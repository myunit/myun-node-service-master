var loopback = require('loopback');
var async = require('async');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function(IdentityAudit) {
  IdentityAudit.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);

    //新增用户审核认证
    IdentityAudit.AddIdentityAudit = function (data, cb) {
      if (!data.userNo || !data.realName || !data.name || !data.cardId || data.identityImgs.length === 0 || !data.phone) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.AddIdentityAudit(data, function (err, res) {
        if (err) {
          console.log('register err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '认证资料已提交,请等待审核！'});
        }
      });
    };

    IdentityAudit.remoteMethod(
      'AddIdentityAudit',
      {
        description: ['新增用户审核认证.返回结果-status:操作结果 0 失败 1 成功, data:用户信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户认证信息(JSON string) {"userNo":int, "realName":"string", "name":"string",' +
              '"cardId":"string", "captcha":"string", "identityImgs":[{"ImgKey":int, "ImgType":int, "ImgValue":"string"}],' +
              ' "phone":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-identity-audit', verb: 'post'}
      }
    );

    //修改用户审核认证
    IdentityAudit.ModifyIdentityAudit = function (data, cb) {
      if (!data.userNo || !data.realName || !data.name || !data.cardId || data.identityImgs.length === 0 || !data.phone
        || !data.auditNo) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.ModifyIdentityAudit(data, function (err, res) {
        if (err) {
          console.log('register err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '认证资料已提交,请等待审核！'});
        }
      });
    };

    IdentityAudit.remoteMethod(
      'ModifyIdentityAudit',
      {
        description: ['新增用户审核认证.返回结果-status:操作结果 0 失败 1 成功, data:用户信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户认证信息(JSON string) {"userNo":int, "realName":"string", "name":"string",' +
              '"cardId":"string", "captcha":"string", "identityImgs":[{"ImgKey":int, "ImgType":int, "ImgValue":"string"}],' +
              ' "phone":"string","auditNo":int} '
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-identity-audit', verb: 'post'}
      }
    );

  });
};
