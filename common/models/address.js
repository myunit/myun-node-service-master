var loopback = require('loopback');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function (Address) {
  Address.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var customerIFS = new CustomerIFS(app);

    //保存用户家乡和现居住地
    Address.setCurrentAddress = function (data, cb) {
      if (!data.userId || !data.homeTown || !data.domicile) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.setCurrentAddress(data, function (err, res) {
        if (err) {
          console.log('setCurrentAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '保存成功'});
        }
      });
    };

    Address.remoteMethod(
      'setCurrentAddress',
      {
        description: ['保存用户家乡和现居住地(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"userId":int, "homeTown":"string", "domicile":"string"',
              '"openId(optional)":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-current-address', verb: 'post'}
      }
    );
  });
};
