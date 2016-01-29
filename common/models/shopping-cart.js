var loopback = require('loopback');
var ShoppingIFS = require('../../server/cloud-soap-interface/shopping-ifs');

module.exports = function (ShoppingCart) {
  ShoppingCart.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var shoppingIFS = new ShoppingIFS(app);

    //添加购物车商品
    ShoppingCart.addToCart = function (data, cb) {
      shoppingIFS.addToCart(data, function (err, res) {
        if (err) {
          console.log('addToCart err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, cartId: res.FirtCartId, msg: ''});
        }
      });
    };

    ShoppingCart.remoteMethod(
      'addToCart',
      {
        description: [
          '添加购物车商品(access token).返回结果-status:操作结果 0 失败 1 成功, cartId:购物车编号, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '商品信息(JSON string) {"userId":int, "product":[{"pItemId":int, "pId":int, "qty":int}]}',
              'pId:商品编号, pItemId:商品sku编号,qty数量'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-to-cart', verb: 'post'}
      }
    );

  });
};
