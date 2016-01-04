var loopback = require('loopback');

module.exports = function (Address) {
  Address.getApp(function (err, app) {
    var app_self = app;
    //获取行政区
    Address.getRoad = function (province, city, region, cb) {
      //TODO: cloud logic
      cb(null, [{id: 1, name: '新嘉'}, {id: 2, name: '解放'}]);
    };

    Address.remoteMethod(
      'getRoad',
      {
        description: ['获取街道信息.返回结果-id:街道编号, name:街道名'],
        accepts: [
          {arg: 'province', type: 'number', required: true, http: { source: 'query' }, description: '省份'},
          {arg: 'city', type: 'number', required: true, http: { source: 'query' }, description: '城市'},
          {arg: 'region', type: 'number', required: true, http: { source: 'query' }, description: '行政区'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-road', verb: 'get'}
      }
    );

    //获取用户地址
    Address.getUserAddress = function (pageId, pageSize, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {
        count: 100, data: [
          {id: 1, default: true, province: 1, city: 1, region: 1, road: 1, detail: 'XX小区门口'},
          {id: 2, default: true, province: 1, city: 1, region: 1, road: 1, detail: 'XX商店'}
        ], msg: ''
      });
    };

    Address.remoteMethod(
      'getUserAddress',
      {
        description: [
          '获取用户地址信息(access token).返回结果-count:地址总数, data:该次查询的地址数组[{',
          'id:地址编号, default:是否默认, province:省份编号, city:城市编号, region:行政区编号, road:街道编号, detail:详细地址}]'
        ],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, http: { source: 'query' }, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: { source: 'query' }, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-user-address', verb: 'get'}
      }
    );

    //新增用户地址
    Address.addUserAddress = function (data, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {status: 0, id: 1, msg: '成功'});
    };

    Address.remoteMethod(
      'addUserAddress',
      {
        description: ['新增用户地址信息(access token).返回结果-status:操作结果 0 成功 -1 失败, id:新增的地址编号, msg:附带信息'],
        accepts: [
          {arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '地址信息(JSON string) {"province":"number", "city":"number", ',
              '"region":"number", "road":"number", "detail":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-user-address', verb: 'post'}
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
        description: ['编辑用户地址信息(access token).返回结果-status:操作结果 0 成功 -1 失败, id:编辑的地址编号, msg:附带信息'],
        accepts: [
          {arg: 'data', type: 'object', required: true, http: {source: 'body'},
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
        description: ['删除用户地址信息(access token).返回结果-status:操作结果 0 成功 -1 失败, id:删除的地址编号, msg:附带信息'],
        accepts: [
          {arg: 'id', type: 'number', required: true, http: { source: 'path' }, description: '地址编号'}
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
        description: ['设置用户默认地址(access token).返回结果-status:操作结果 0 成功 -1 失败, id:默认的地址编号, msg:附带信息'],
        accepts: [
          {arg: 'data', type: 'object', required: true, http: {source: 'body'},
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
