var loopback = require('loopback');
var async = require('async');

module.exports = function (ShoppingCart) {
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
          goodsStyles: [{id: 1, price: '5元', meas: '包', num: 5}, {id: 2, price: '50元', meas: '箱', num: 1}],
          url: 'https://docs.strongloop.com/'
        },
        {
          id: 1,
          goodsId: 112,
          goodsName: '拉面',
          goodsStyles: [{id: 1, price: '15元', meas: '包', num: 15}, {id: 2, price: '80元', meas: '箱', num: 2}],
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
        'id:购物车内物品id, goodsId:商品id, goodsName:商品名, url:商品图片url, ',
        'goodsStyles:商品款式([{id:1, price:5, meas: \'包\', num:5}])}]'
      ],
      accepts: [
        {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
        {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
      ],
      returns: {arg: 'repData', type: 'string'},
      http: {path: '/get-user-cart', verb: 'get'}
    }
  );

  //删除购物车商品
  ShoppingCart.delGoodsInCart = function (id, styleId, num, cb) {
    var ctx = loopback.getCurrentContext();
    var token = ctx.get('accessToken');
    //TODO: cloud logic
    cb(null, {
      id: 0,
      stylesId: 1,
      num: 5
    });
  };

  ShoppingCart.remoteMethod(
    'delGoodsInCart',
    {
      description: [
        '删除购物车商品(access token).返回结果-id:商品id, stylesId(optional):款式id, num(optional):剩余数量'
      ],
      accepts: [
        {arg: 'id', type: 'number', required: true, http: {source: 'path'}, description: '商品id'},
        {
          arg: 'styleId', type: 'number', required: true, default: undefined, http: {source: 'query'},
          description: '款式id,无该字段时,删除该商品下所有款式'
        },
        {
          arg: 'num', type: 'number', required: false, default: undefined, http: {source: 'query'},
          description: '删除数量,无该字段,则删除该款式下所有商品, 默认删除一个'
        }
      ],
      returns: {arg: 'repData', type: 'string'},
      http: {path: '/del-goods-in-cart/:id', verb: 'delete'}
    }
  );

  //添加购物车商品
  ShoppingCart.addGoodsInCart = function (data, cb) {
    var ctx = loopback.getCurrentContext();
    var token = ctx.get('accessToken');
    //TODO: cloud logic
    cb(null, {id: 112, styles: [{id: 1, num: 5}, {id: 2, num: 10}]});
  };

  ShoppingCart.remoteMethod(
    'addGoodsInCart',
    {
      description: [
        '添加购物车商品(access token).返回结果-id:商品id, styles:商品款式'
      ],
      accepts: [
        {
          arg: 'data', type: 'object', required: true, http: {source: 'body'},
          description: [
            '商品信息(JSON string) {"id":商品id, "styles":[{"id": 款式id, "num":数量},',
            '{"id": 款式id, "num": 数量}]}'
          ]
        }
      ],
      returns: {arg: 'repData', type: 'string'},
      http: {path: '/add-goods-in-cart', verb: 'post'}
    }
  );
};
