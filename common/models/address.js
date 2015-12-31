module.exports = function(Address) {
  Address.getApp(function (err, app) {
    var app_self = app;
    //获取行政区
    Address.getRoad = function (province, city, region, cb) {
      //TODO: cloud logic
      cb(null, [{id:1, name:'新嘉'}, {id:2, name:'解放'}]);
    };

    Address.remoteMethod(
      'getRoad',
      {
        description: ['获取街道信息'],
        accepts: [
          {arg: 'province', type: 'number', required: true, description: '省份'},
          {arg: 'city', type: 'number', required: true, description: '城市'},
          {arg: 'region', type: 'number', required: true, description: '行政区'}
        ],
        returns: {arg: 'roadInfo', type: 'string'},
        http: {path: '/get-road', verb: 'get'}
      }
    );

    //获取用户地址
    Address.getUserAddress = function (pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {count:100, data:[
        {id:1, default:true, province:1, city:1, region:1, road:1, addDetail:'XX小区门口'},
        {id:2, default:true, province:1, city:1, region:1, road:1, addDetail:'XX商店'}
      ], msg:''});
    };

    Address.remoteMethod(
      'getUserAddress',
      {
        description: ['获取用户地址信息(access token),返回结果-count:该用户总的地址数量, data:该次查询的地址数组'],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, description: '每页记录数'}
        ],
        returns: {arg: 'addressInfo', type: 'string'},
        http: {path: '/get-user-address', verb: 'get'}
      }
    );



  });
};
