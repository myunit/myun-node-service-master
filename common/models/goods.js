var loopback = require('loopback');

module.exports = function(Goods) {
  Goods.getApp(function (err, app) {
    var app_self = app;
    //获取用户收藏商品列表
    Goods.getUserCollection = function (pageId, pageSize, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');

      cb(null, {count: 1 , data: [{id:0, goodsId:111, goodsName:'方便面', goodsPrice:'15元', url:'https://docs.strongloop.com/'}]});
    };

    Goods.remoteMethod(
      'getUserCollection',
      {
        description: [
          '获取用户收藏列表(access token).返回结果-count:该用户收藏总数, data:该次查询的收藏品数组[{',
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

      cb(null, {count: 1 , data: [{id:0, goodsId:111, goodsName:'方便面', goodsPrice:'15元', url:'https://docs.strongloop.com/'}]});
    };

    Goods.remoteMethod(
      'setUserCollection',
      {
        description: [
          '用户收藏或取消收藏商品(access token).返回结果-status:操作结果 0 成功 -1 失败, id:收藏编号(只在收藏操作时存在), msg:附带信息'
        ],
        accepts: [
          {arg: 'data', type: 'object', required: true, http: {source: 'body'},
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

  });
};
