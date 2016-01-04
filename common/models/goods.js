var loopback = require('loopback');
var async = require('async');

module.exports = function (Goods) {
  Goods.getApp(function (err, app) {
    var app_self = app;
    //获取用户收藏商品列表
    Goods.getUserCollection = function (pageId, pageSize, queryCart, collCb) {
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      //TODO: cloud logic
      async.waterfall(
        [
          function (cb) {
            cb(null, {
              count: 1,
              data: [{
                id: 0,
                goodsId: 111,
                goodsName: '方便面',
                styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
                url: 'https://docs.strongloop.com/'
              }]
            });
          },
          function (goodsObj, cb) {
            //TODO get number of shopping cart
            goodsObj['numInCart'] = 10;
            cb(null, goodsObj);
          }
        ],
        function (err, goodsObj) {
          if (err) {
            collCb(err);
          } else {
            collCb(null, goodsObj);
          }
        }
      );
    };

    Goods.remoteMethod(
      'getUserCollection',
      {
        description: [
          '获取用户收藏列表(access token).返回结果-numInCart:购物车商品数量, count:收藏品总数, data:该次查询的收藏品数组[{',
          'id:收藏id, goodsId:商品id, goodsName:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}],',
          ' url:商品图片url}]'
        ],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'},
          {
            arg: 'queryCart',
            type: 'boolean',
            required: false,
            http: {source: 'query'},
            default: true,
            description: '是否查询购物车'
          }
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
          '用户收藏或取消收藏商品(access token).返回结果-status:操作结果 0 成功 -1 失败, ',
          'id:收藏id(只在收藏操作时存在), msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '收藏对象信息(JSON string, id收藏id-存在该字段时,认为是取消收藏操作, 否则认为是收藏操作)',
              ' {"id(optional)":"number", "goodsId":"number"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-user-collection', verb: 'post'}
      }
    );

    //获取新商品列表
    Goods.getNewGoods = function (pageId, pageSize, queryCart, goodsCb) {
      //TODO: cloud logic
      async.waterfall(
        [
          function (cb) {
            cb(null, {
              count: 1,
              data: [{
                id: 0,
                name: '方便面',
                styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
                url: 'https://docs.strongloop.com/'
              }]
            });
          },
          function (goodsObj, cb) {
            //TODO get number of shopping cart
            goodsObj['numInCart'] = 10;
            cb(null, goodsObj);
          }
        ],
        function (err, goodsObj) {
          if (err) {
            goodsCb(err);
          } else {
            goodsCb(null, goodsObj);
          }
        }
      );
    };

    Goods.remoteMethod(
      'getNewGoods',
      {
        description: [
          '获取新列表.返回结果-numInCart:购物车商品数量, count:商品总数, data:该次查询的新商品数组[{',
          'id:商品id, name:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], url:商品图片url}]'
        ],
        accepts: [
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'},
          {
            arg: 'queryCart',
            type: 'boolean',
            required: false,
            http: {source: 'query'},
            default: true,
            description: '是否查询购物车'
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-new-goods', verb: 'get'}
      }
    );

    //获取特卖/活动商品列表
    Goods.getSaleGoods = function (saleId, pageId, pageSize, queryCart, goodsCb) {
      //TODO: cloud logic
      async.waterfall(
        [
          function (cb) {
            cb(null, {
              saleId: 0,
              count: 1,
              data: [{
                id: 0,
                name: '方便面',
                styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
                url: 'https://docs.strongloop.com/'
              }]
            });
          },
          function (goodsObj, cb) {
            //TODO get number of shopping cart
            goodsObj['numInCart'] = 10;
            cb(null, goodsObj);
          }
        ],
        function (err, goodsObj) {
          if (err) {
            goodsCb(err);
          } else {
            goodsCb(null, goodsObj);
          }
        }
      );
    };

    Goods.remoteMethod(
      'getSaleGoods',
      {
        description: [
          '获取特卖/活动列表.返回结果-numInCart:购物车商品数量, saleId:特卖/活动id, count:商品总数, data:该次查询的新商品数组[{',
          'id:商品id, name:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], url:商品图片url}]'
        ],
        accepts: [
          {arg: 'saleId', type: 'number', required: true, http: {source: 'path'}, description: '特卖/活动id'},
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'},
          {
            arg: 'queryCart',
            type: 'boolean',
            required: false,
            http: {source: 'query'},
            default: true,
            description: '是否查询购物车'
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-sale-goods/:saleId', verb: 'get'}
      }
    );

    //获取商品详情
    Goods.getGoodsDetail = function (goodsId, cb) {
      //TODO: cloud logic
      cb(null, {
        id: 0,
        name: '方便面',
        styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
        thumbnail: [],
        detail: '',
        img: []
      });
    };

    Goods.remoteMethod(
      'getGoodsDetail',
      {
        description: [
          '获取商品详细信息.返回结果-id:商品id, name:商品名称, ',
          'styles:商品款式[{id: 款式id, price:价格, meas:单位}], thumbnail:缩略图[\'url\',\'url\',\'url\'], ',
          'detail:商品详情, img:商品图片[\'url\',\'url\',\'url\']}'
        ],
        accepts: [
          {arg: 'id', type: 'number', required: true, http: {source: 'path'}, description: '商品id'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-goods-detail/:id', verb: 'get'}
      }
    );

    //商品搜索
    Goods.searchGoods = function (keys, pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {
        count: 1,
        data: [{
          id: 0,
          name: '方便面',
          styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
          thumbnail: [],
          detail: '',
          img: []
        }]
      });
    };

    Goods.remoteMethod(
      'searchGoods',
      {
        description: [
          '商品搜索.返回结果-count:商品总数, data:该次搜索的商品数组[{',
          'id:商品id, name:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], url:商品图片url}]'
        ],
        accepts: [
          {arg: 'keys', type: 'string', required: true, http: {source: 'query'}, description: '搜索关键字数组'},
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/search-goods', verb: 'get'}
      }
    );

    //新商品搜索
    Goods.searchNewGoods = function (keys, pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {
        count: 1,
        data: [{
          id: 0,
          name: '方便面',
          styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
          thumbnail: [],
          detail: '',
          img: []
        }]
      })
    };

    Goods.remoteMethod(
      'searchNewGoods',
      {
        description: [
          '新商品搜索.返回结果-count:商品总数, data:该次搜索的商品数组[{',
          'id:商品id, name:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], url:商品图片url}]'
        ],
        accepts: [
          {arg: 'keys', type: 'string', required: true, http: {source: 'query'}, description: '搜索关键字数组'},
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/search-new-goods', verb: 'get'}
      }
    );

    //特卖/活动商品搜索
    Goods.searchSaleGoods = function (keys, pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {
        saleId: 0,
        count: 1,
        data: [{
          id: 0,
          name: '方便面',
          styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
          thumbnail: [],
          detail: '',
          img: []
        }]
      })
    };

    Goods.remoteMethod(
      'searchSaleGoods',
      {
        description: [
          '特卖活动商品搜索.返回结果-saleId:特卖/活动id, count:商品总数, data:该次搜索的商品数组[{',
          'id:商品id, name:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], url:商品图片url}]'
        ],
        accepts: [
          {arg: 'saleId', type: 'number', required: true, http: {source: 'path'}, description: '特卖/活动id'},
          {arg: 'keys', type: 'string', required: true, http: {source: 'query'}, description: '搜索关键字数组'},
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/search-sale-goods', verb: 'get'}
      }
    );

    //已收藏商品搜索
    Goods.searchCollectionGoods = function (keys, pageId, pageSize, cb) {
      //TODO: cloud logic
      var ctx = loopback.getCurrentContext();
      var token = ctx.get('accessToken');
      cb(null, {
        saleId: 0,
        count: 1,
        data: [{
          id: 0,
          name: '方便面',
          styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
          thumbnail: [],
          detail: '',
          img: []
        }]
      })
    };

    Goods.remoteMethod(
      'searchSaleGoods',
      {
        description: [
          '已收藏商品搜索.返回结果-count:商品总数, data:该次搜索的商品数组[{',
          'id:商品id, name:商品名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], url:商品图片url}]'
        ],
        accepts: [
          {arg: 'keys', type: 'string', required: true, http: {source: 'query'}, description: '搜索关键字数组'},
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/search-collection-goods', verb: 'get'}
      }
    );

    //获取商品分类
    Goods.getGoodsCategory = function (parentId, pageId, pageSize, cb) {
      //TODO: cloud logic
      cb(null, {
        count: 1,
        data: [{
          id: 0,
          name: '化妆品',
          img: ''
        }]
      });
    };

    Goods.remoteMethod(
      'getGoodsCategory',
      {
        description: [
          '获取商品分类.返回结果-count:类别总数, data:该次查询的分类数组[{',
          'id:分类id, name:分类名, img:分类图片url}]'
        ],
        accepts: [
          {
            arg: 'parentId', type: 'any', required: false, http: {source: 'path'}, default: undefined,
            description: '父类id,顶级类别无该字段'
          },
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-goods-category/:parentId', verb: 'get'}
      }
    );

    //根据分类获取商品
    Goods.getGoodsByCategory = function (categoryId, pageId, pageSize, queryCart, goodsCb) {
      //TODO: cloud logic
      async.waterfall(
        [
          function (cb) {
            cb(null, {
              count: 1,
              data: [{
                id: 0,
                name: '方便面',
                styles: [{id: 1, price: '5元', meas: '包'}, {id: 2, price: '50元', meas: '箱'}],
                url: 'https://docs.strongloop.com/'
              }]
            });
          },
          function (goodsObj, cb) {
            //TODO get number of shopping cart
            goodsObj['numInCart'] = 10;
            cb(null, goodsObj);
          }
        ],
        function (err, goodsObj) {
          if (err) {
            goodsCb(err);
          } else {
            goodsCb(null, goodsObj);
          }
        }
      );
    };

    Goods.remoteMethod(
      'getGoodsByCategory',
      {
        description: [
          '商品分类.返回结果-numInCart:购物车商品数量, count:类别总数, data:该次查询的分类数组[{',
          'id:分类id, name:分类名, styles:商品款式[{id: 款式id, price:价格, meas:单位}], img:分类图片url}]'
        ],
        accepts: [
          {arg: 'categoryId', type: 'number', required: true, http: {source: 'path'}, description: '商品分类id'},
          {arg: 'pageId', type: 'number', required: true, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'},
          {
            arg: 'queryCart',
            type: 'boolean',
            required: false,
            http: {source: 'query'},
            default: true,
            description: '是否查询购物车'
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-goods-by-category/:categoryId', verb: 'get'}
      }
    );
  });
};
