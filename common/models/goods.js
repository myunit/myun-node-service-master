var loopback = require('loopback');

module.exports = function (Goods) {
  Goods.getApp(function (err, app) {
    var app_self = app;
    //获取用户收藏商品列表
    Goods.getCollection = function (userId, pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {
        count: 1,
        data: [{id: 0, goodsId: 111, goodsName: '方便面', goodsPrice: '15元', url: 'https://docs.strongloop.com/'}]
      });
    };

    Goods.getUserCollection = function (pageId, pageSize, cb) {
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      Goods.getCollection(token.userId, pageId, pageSize, cb);
    };

    Goods.remoteMethod(
      'getUserCollection',
      {
        description: [
          '获取用户收藏列表(access token).返回结果-count:收藏品总数, data:该次查询的收藏品数组[{',
          'id:收藏编号, goodsId:商品编号, goodsName:商品名, goodsPrice:商品价格, url:商品图片url}]'
        ],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-user-collection', verb: 'get'}
      }
    );

    //用户收藏/取消收藏商品
    Goods.setUserCollection = function (data, cb) {
      //TODO: cloud logic
      var id = data.id;
      var goods = data.goodsId;
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');

      cb(null, {
        count: 1,
        data: [{id: 0, goodsId: 111, goodsName: '方便面', goodsPrice: '15元', url: 'https://docs.strongloop.com/'}]
      });
    };

    Goods.remoteMethod(
      'setUserCollection',
      {
        description: [
          '用户收藏或取消收藏商品(access token).返回结果-status:操作结果 0 成功 -1 失败, id:收藏编号(只在收藏操作时存在), msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '收藏对象信息(JSON string, id收藏编号-存在该字段时,认为是取消收藏操作, 否则认为是收藏操作)',
              ' {"id(optional)":"number", "goodsId":"number"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-user-collection', verb: 'post'}
      }
    );

    //获取新商品列表
    Goods.getNewGoods = function (pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {count: 1, data: [{id: 0, name: '方便面', price: '15元', url: 'https://docs.strongloop.com/'}]});
    };

    Goods.remoteMethod(
      'getNewGoods',
      {
        description: [
          '获取新列表.返回结果-count:商品总数, data:该次查询的新商品数组[{',
          'id:商品编号, name:商品名, price:商品价格, url:商品图片url}]'
        ],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-new-goods', verb: 'get'}
      }
    );

    //获取特卖/活动商品列表
    Goods.getSaleGoods = function (saleId, pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {count: 1, data: [{id: 0, name: '方便面', price: '15元', url: 'https://docs.strongloop.com/'}]});
    };

    Goods.remoteMethod(
      'getSaleGoods',
      {
        description: [
          '获取特卖/活动列表.返回结果-count:商品总数, data:该次查询的新商品数组[{',
          'id:商品编号, name:商品名, price:商品价格, url:商品图片url}]'
        ],
        accepts: [
          {arg: 'saleId', type: 'number', required: true, description: '特卖/活动编号'},
          {arg: 'pageId', type: 'number', required: true, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-sale-goods', verb: 'get'}
      }
    );

    //获取商品详情
    Goods.getGoodsDetail = function (goodsId, cb) {
      //TODO: cloud logic
      cb(null, {
        id: 0,
        name: '方便面',
        unitPrice: [{price: '5元', meas: '包'}, {price: '50元', meas: '箱'}],
        thumbnail: [],
        detail: '',
        img: []
      });
    };

    Goods.remoteMethod(
      'getGoodsDetail',
      {
        description: [
          '获取商品详细信息.返回结果-id:商品编号, name:商品名称, ',
          'unitPrice:单价[{price:价格, meas:单位}], thumbnail:缩略图[\'url\',\'url\',\'url\'], ',
          'detail:商品详情, img:商品图片[\'url\',\'url\',\'url\']}'
        ],
        accepts: [
          {arg: 'id', type: 'number', required: true, description: '商品编号'},
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-goods-detail', verb: 'get'}
      }
    );
  });
};
