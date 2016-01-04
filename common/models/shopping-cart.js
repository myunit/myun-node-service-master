var loopback = require('loopback');
var async = require('async');

module.exports = function (ShoppingCart) {
  ShoppingCart.getApp(function (err, app) {
    var app_self = app;
    //获取用户购物车信息
    ShoppingCart.getUserShoppingCart = function (pageId, pageSize, cb) {
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      //TODO: cloud logic
      cb(null, {
        count: 2,
        data: [
          {
            id: 0,
            goodsId: 111,
            goodsName: '方便面',
            goodsUnit: [{id: 1, price: '5元', meas: '包', num: 5}, {id: 2, price: '50元', meas: '箱', num: 1}],
            url: 'https://docs.strongloop.com/'
          },
          {
            id: 1,
            goodsId: 112,
            goodsName: '拉面',
            goodsUnit: [{id: 1, price: '15元', meas: '包', num: 15}, {id: 2, price: '80元', meas: '箱', num: 2}],
            url: 'https://docs.strongloop.com/'
          }
        ]
      });
    };

    ShoppingCart.remoteMethod(
      'getUserShoppingCart',
      {
        description: [
          '获取用户收藏列表(access token).返回结果-count:购物车内商品总数, data:该次查询的商品数组[{',
          'id:购物车内商品编号, goodsId:商品编号, goodsName:商品名, url:商品图片url, ',
          'goodsUnit:商品单位(数组[id:1, price:5, meas: \'包\', num:5])}]'
        ],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-user-shopping-cart', verb: 'get'}
      }
    );
  });
};
