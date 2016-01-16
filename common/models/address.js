var loopback = require('loopback');
var CustomerIFS = require('../../server/cloud-soap-interface/customer-ifs');

module.exports = function (Address) {
  Address.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var app_self = app;
    var customerIFS = new CustomerIFS(app);

    //获取行政区
    Address.getRoad = function (province, city, region, cb) {
      //TODO: cloud logic
      cb(null, [{id: 1, name: '新嘉'}, {id: 2, name: '解放'}]);
    };

    Address.remoteMethod(
      'getRoad',
      {
        description: ['获取街道信息.返回结果-id:街道id, name:街道名'],
        accepts: [
          {arg: 'province', type: 'number', required: true, http: {source: 'query'}, description: '省份'},
          {arg: 'city', type: 'number', required: true, http: {source: 'query'}, description: '城市'},
          {arg: 'region', type: 'number', required: true, http: {source: 'query'}, description: '行政区'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-road', verb: 'get'}
      }
    );

    //获取用户收货地址
    Address.getReceiveAddresses = function (customerNo, cb) {
      if (!customerNo) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.getReceiveAddresses(customerNo, function (err, res) {
        if (err) {
          console.log('getReceiveAddresses err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.GetAllReceiveAddressesResult.HasError === 'true') {
          cb(null, {status: 0, msg: '获取地址失败'});
        } else {

          var addresses = res.GetAllReceiveAddressesResult.Body.CustomerReceiveAddress;
          var addressList = [];
          var address = {};
          for (var i = 0; i < addresses.length; i++) {

            address.SysNo = addresses[i].SysNo;
            address.Address = addresses[i].Address;
            address.IsDefault = addresses[i].IsDefault === 'true'? true:false;
            address.PCD = addresses[i].PCDCode.split('-');
            address.PCDDes = addresses[i].PCDDescription.split('-');
            address.ReceiverCellPhone = addresses[i].ReceiverCellPhone;
            address.ReceiverName = addresses[i].ReceiverName;
            addressList.push(address);
            address = {};

          }
          cb(null, {status: 1, data: addressList, msg: ''});
          addressList = null;
          address = null;
        }
      });
    };

    Address.remoteMethod(
      'getReceiveAddresses',
      {
        description: [
          '获取用户收货地址信息(access token).返回结果 status 0 失败 1 成功,data该次查询的地址数组, msg:附带信息'
        ],
        accepts: [
          {arg: 'customerNo', type: 'number', required: true, http: {source: 'query'}, description: '用户no'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-receive-address', verb: 'get'}
      }
    );

    //获取用户默认收货地址
    Address.getDefaultReceiveAddress = function (customerNo, cb) {
      if (!customerNo) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.getDefaultReceiveAddress(customerNo, function (err, res) {
        if (err) {
          console.log('getDefaultReceiveAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.GetDefaultReceiveAddressesResult.HasError === 'true') {
          cb(null, {status: 0, msg: '获取地址失败'});
        } else {

          var body = res.GetDefaultReceiveAddressesResult.Body;
          var address = {};
          address.SysNo = body.SysNo;
          address.Address = body.Address;
          address.IsDefault = body.IsDefault === 'true'? true:false;
          address.PCD = body.PCDCode.split('-');
          address.PCDDes = body.PCDDescription.split('-');
          address.ReceiverCellPhone = body.ReceiverCellPhone;
          address.ReceiverName = body.ReceiverName;
          cb(null, {status: 1, data: address, msg: ''});
          address = null;
        }
      });
    };

    Address.remoteMethod(
      'getDefaultReceiveAddress',
      {
        description: [
          '获取用户收货地址信息(access token).返回结果 status 0 失败 1 成功,data该次查询的地址数据, msg:附带信息'
        ],
        accepts: [
          {arg: 'customerNo', type: 'number', required: true, http: {source: 'query'}, description: '用户no'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-default-receive-address', verb: 'get'}
      }
    );

    //新增用户收货地址
    Address.addReceiveAddress = function (data, cb) {
      if (!data.customerNo || !data.address) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.addReceiveAddress(data, function (err, res) {
        if (err) {
          console.log('addReceiveAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.AddNewReceiveAddressResult.HasError === 'true') {
          cb(null, {status: 0, msg: '新增地址失败'});
        } else {

          var body = res.AddNewReceiveAddressResult.Body;
          var address = {};
          address.SysNo = body.SysNo;
          address.Address = body.Address;
          address.IsDefault = body.IsDefault === 'true'? true:false;
          address.PCD = body.PCDCode.split('-');;
          address.PCDDes = body.PCDDescription.split('-');;
          address.ReceiverCellPhone = body.ReceiverCellPhone;
          address.ReceiverName = body.ReceiverName;
          cb(null, {status: 1, data: address, msg: ''});
          address = null;
        }
      });
    };

    Address.remoteMethod(
      'addReceiveAddress',
      {
        description: ['新增用户地址信息(access token).返回结果-status:操作结果 0 失败 1 成功, data:新增的地址信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"customerNo":"number", "address":"string", ',
              '"provinceId":"number", "provinceStr":"string", "cityId":"number", ' +
              '"cityStr":"string", "regionId":"number", "regionStr":"string", ' +
              '"phone":"string", "name":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-receive-address', verb: 'post'}
      }
    );

    //编辑用户地址
    Address.modifyReceiveAddress = function (data, cb) {
      if (!data.customerNo || !data.sysNo) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.modifyReceiveAddress(data, function (err, res) {
        if (err) {
          console.log('modifyReceiveAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.ModifyReceiveAddressResult.HasError === 'true') {
          cb(null, {status: 0, msg: '编辑失败'});
        } else {

          var body = res.ModifyReceiveAddressResult.Body;
          var address = {};
          address.SysNo = body.SysNo;
          address.Address = body.Address;
          address.IsDefault = body.IsDefault === 'true'? true:false;
          address.PCD = body.PCDCode.split('-');;
          address.PCDDes = body.PCDDescription.split('-');;
          address.ReceiverCellPhone = body.ReceiverCellPhone;
          address.ReceiverName = body.ReceiverName;
          cb(null, {status: 1, data: address, msg: ''});
          address = null;
        }
      });
    };

    Address.remoteMethod(
      'modifyReceiveAddress',
      {
        description: ['编辑用户地址信息(access token).返回结果-status:操作结果 0 失败 1 成功, data:编辑的地址信息, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"customerNo":"number", "address":"string", "sysNo":"number"',
              '"provinceId":"number", "provinceStr":"string", "cityId":"number", ' +
              '"cityStr":"string", "regionId":"number", "regionStr":"string", ' +
              '"phone":"string", "name":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-receive-address', verb: 'post'}
      }
    );

    //删除用户收货地址
    Address.removeReceiveAddress = function (sysNo, cb) {
      if (!sysNo) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.removeReceiveAddress(sysNo, function (err, res) {
        if (err) {
          console.log('removeReceiveAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.RemoveReceiveAddressResult.HasError === 'true') {
          cb(null, {status: 0, msg: '删除失败'});
        } else {
          cb(null, {status: 1, msg: '删除成功'});
        }
      });
    };

    Address.remoteMethod(
      'removeReceiveAddress',
      {
        description: ['删除用户收货信息(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'],
        accepts: [
          {arg: 'sysNo', type: 'number', required: true, http: {source: 'path'}, description: '地址id'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/remove-receive-address/:sysNo', verb: 'delete'}
      }
    );

    //设置默认地址
    Address.setDefaultReceiveAddress = function (data, cb) {
      if (!data.sysNo) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.setDefaultReceiveAddress(data, function (err, res) {
        if (err) {
          console.log('setDefaultReceiveAddress err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (res.SetDefaultReceiveAddressesResult.HasError === 'true') {
          cb(null, {status: 0, msg: '设置失败'});
        } else {
          cb(null, {status: 1, msg: '设置成功'});
        }
      });
    };

    Address.remoteMethod(
      'setDefaultReceiveAddress',
      {
        description: ['设置用户默认地址(access token).返回结果-status:操作结果 0 失败 1 成功, id:默认的地址id, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"sysNo":"number"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-default-receive-address', verb: 'post'}
      }
    );
  });
};
