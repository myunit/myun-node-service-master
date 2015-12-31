module.exports = function(Address) {
  Address.getApp(function (err, app) {
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

  });
};
