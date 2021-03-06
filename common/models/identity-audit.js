var loopback = require('loopback');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function(IdentityAudit) {
  IdentityAudit.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var customerIFS = new CustomerIFS(app);

    //新增用户审核认证
    IdentityAudit.AddIdentityAudit = function (data, cb) {
      if (!data.userId || !data.realName || !data.cardId || data.identityImgs.length === 0 || !data.phone) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.AddIdentityAudit(data, function (err, res) {
        if (err) {
          console.log('AddIdentityAudit err: ' + err);
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
        description: ['新增用户审核认证(access token).返回结果-status:操作结果 0 失败 1 成功, data:用户信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户认证信息(JSON string) {"userId":int, "realName":"string", "name":"string", "cardId":"string", ',
              '"captcha":"string", "identityImgs":[{"ImgType":int, "ImgValue":"string"}], "phone":"string"}',
              'ImgKey:等同于userId, ImgType: 101-正面 102-反面 103-手持面, ImgValue:图片地址'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-identity-audit', verb: 'post'}
      }
    );

    //修改用户审核认证
    IdentityAudit.ModifyIdentityAudit = function (data, cb) {
      if (!data.userId || !data.realName || !data.name || !data.cardId || data.identityImgs.length === 0 || !data.phone
        || !data.auditNo) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.ModifyIdentityAudit(data, function (err, res) {
        if (err) {
          console.log('ModifyIdentityAudit err: ' + err);
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
        description: ['编辑用户审核认证(access token).返回结果-status:操作结果 0 失败 1 成功, data:用户信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '用户认证信息(JSON string) {"userId":int, "realName":"string", "name":"string",' +
              '"cardId":"string", "captcha":"string", "identityImgs":[{"SysNo":int, "ImgType":int, "ImgValue":"string"}],' +
              ' "phone":"string","auditNo":int} '
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-identity-audit', verb: 'post'}
      }
    );

    //获取用户认证信息
    IdentityAudit.GetIdentityAudit = function (userId, cb) {
      if (!userId) {
        cb(null, {status:0, msg: '参数错误'});
        return;
      }

      customerIFS.getIdentityAudit(userId, function (err, res) {
        if (err) {
          console.log('GetIdentityAudit err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data:res.Data, msg: ''});
        }
      });
    };

    IdentityAudit.remoteMethod(
      'GetIdentityAudit',
      {
        description: ['获取用户认证信息(access token).返回结果-status:操作结果 0 失败 1 成功, data:用户认证信息, msg:附带信息'],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户标识符'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-identity-audit', verb: 'get'}
      }
    );
  });
};
