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
      //TODO: cloud logic
      if (!customerNo) {
        cb(null, {status: 0, msg: '操作异常'});
        return;
      }

      customerIFS.getReceiveAddresses(customerNo, function (err, res) {
        if (err) {
          console.log('getReceiveAddresses err: ' + err);
          cb({status: 0, msg: '操作异常'});
          return;
        }

        if (res.GetAllReceiveAddressesResult.HasError === 'true') {
          cb({status: 0, msg: '获取地址失败'});
        } else {

          var addresses = res.GetAllReceiveAddressesResult.Body.CustomerReceiveAddress;
          var addressList = [];
          var address = {};
          for (var i = 0; i < addresses.length; i++) {

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
          '获取用户收货地址信息(access token).返回结果,data该次查询的地址数组, msg:附带信息'
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
          cb({status: 0, msg: '操作异常'});
          return;
        }

        if (res.GetDefaultReceiveAddressesResult.HasError === 'true') {
          cb({status: 0, msg: '获取地址失败'});
        } else {

          var body = res.GetDefaultReceiveAddressesResult.Body;
          var address = {};
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
          '获取用户收货地址信息(access token).返回结果,data该次查询的地址数据, msg:附带信息'
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
          cb({status: 0, msg: '操作异常'});
          return;
        }

        if (res.AddNewReceiveAddressResult.HasError === 'true') {
          cb({status: 0, msg: '新增地址失败'});
        } else {

          var body = res.AddNewReceiveAddressResult.Body;
          var address = {};
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
        description: ['新增用户地址信息(access token).返回结果-status:操作结果 0 成功 -1 失败, id:新增的地址id, msg:附带信息'],
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
    Address.modifyUserAddress = function (data, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {status: 0, id: 1, msg: '成功'});
    };

    Address.remoteMethod(
      'modifyUserAddress',
      {
        description: ['编辑用户地址信息(access token).返回结果-status:操作结果 0 成功 -1 失败, id:编辑的地址id, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"id":"number", "province":"number", "city":"number", ',
              '"region":"number", "road":"number", "detail":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-user-address', verb: 'post'}
      }
    );

    //删除用户地址
    Address.delUserAddress = function (id, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {status: 0, id: 1, msg: '成功'});
    };

    Address.remoteMethod(
      'delUserAddress',
      {
        description: ['删除用户地址信息(access token).返回结果-status:操作结果 0 成功 -1 失败, id:删除的地址id, msg:附带信息'],
        accepts: [
          {arg: 'id', type: 'number', required: true, http: {source: 'path'}, description: '地址id'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/del-user-address/:id', verb: 'delete'}
      }
    );

    //设置默认地址
    Address.setDefaultAddress = function (data, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {status: 0, id: 1, msg: '成功'});
    };

    Address.remoteMethod(
      'setDefaultAddress',
      {
        description: ['设置用户默认地址(access token).返回结果-status:操作结果 0 成功 -1 失败, id:默认的地址id, msg:附带信息'],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"id":"number"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-default-address', verb: 'post'}
      }
    );
  });
};
