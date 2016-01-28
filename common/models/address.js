var loopback = require('loopback');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');
var ReceiverIFS = require('../../server/cloud-soap-interface/receiver-ifs');

module.exports = function (Address) {
  Address.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var customerIFS = new CustomerIFS(app);
    var receiverIFS = new ReceiverIFS(app);

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

    //获取用户收货地址
    Address.getReceiverAddress = function (userId, cb) {
      receiverIFS.getReceiverAddress(userId, function (err, res) {
        if (err) {
          console.log('getReceiverAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Datas, msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'getReceiverAddress',
      {
        description: [
          '获取用户收货地址.返回结果-status:操作结果 0 失败 1 成功, data:地址信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-receiver-address', verb: 'get'}
      }
    );

    //删除用户收货地址
    Address.delReceiverAddress = function (userId, addressId, cb) {
      receiverIFS.delReceiverAddress(userId, addressId, function (err, res) {
        if (err) {
          console.log('delReceiverAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'delReceiverAddress',
      {
        description: [
          '删除用户收货地址.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'addressId', type: 'number', required: true, http: {source: 'query'}, description: '地址编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/del-receiver-address', verb: 'delete'}
      }
    );

    //设置默认用户收货地址
    Address.setDefaultReceiverAddress = function (userId, addressId, cb) {
      receiverIFS.setDefaultReceiverAddress(userId, addressId, function (err, res) {
        if (err) {
          console.log('setDefaultReceiverAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    Address.remoteMethod(
      'setDefaultReceiverAddress',
      {
        description: [
          '设置默认用户收货地址.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'addressId', type: 'number', required: true, http: {source: 'query'}, description: '地址编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-default-receiver-address', verb: 'put'}
      }
    );

  });
};
