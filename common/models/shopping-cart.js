var loopback = require('loopback');
var async = require('async');
var ShoppingIFS = require('../../server/cloud-soap-interface/shopping-ifs');
var OrderIFS = require('../../server/cloud-soap-interface/order-ifs');
var utils = require('../../server/util/utils');

module.exports = function (ShoppingCart) {
  ShoppingCart.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var shoppingIFS = new ShoppingIFS(app);
    var orderIFS = new OrderIFS(app);

    //提交订单
    ShoppingCart.submitOrder = function (data, submitCB) {
      if (!data.product || data.product.length === 0) {
        submitCB(null, {status:0, msg: '您还未选购商品'});
        return;
      }

      async.waterfall(
        [
          function (cb) {
            shoppingIFS.addToCart(data, function (err, res) {
              if (err) {
                console.log('addToCart err: ' + err);
                cb({status: 0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb({status: 0, msg: res.ErrorDescription});
              } else {
                cb(null, res.CartIds);
              }
            });
          },
          function (cartIds, cb) {
            shoppingIFS.submitOrder(data, cartIds, function (err, res) {
              if (err) {
                console.log('submitOrder err: ' + err);
                cb(null, {status: 0, msg: '操作异常'});
                return;
              }

              if (!res.IsSuccess) {
                cb(null, {status: 0, msg: res.ErrorDescription});
              } else {
                cb(null, res);
              }
            });
          },
          function (order, cb) {
            if (data.type === 3) {
              var package = {};
              package.userId = data.userId;
              package.sharePrice = order.TotalAmount;
              package.quantity = order.TotalQty;
              package.orderId = order.OrderId;
              package.payAmount = order.TotalAmount;
              package.skuId = data.product[0].pItemId;
              package.buyLimit = 1;
              package.retentionQuantity = 1;
              var end = new Date();
              package.shareEndDate = utils.formatByT(new Date(end.valueOf() + 1*24*60*60*1000));
              package.deliverDate = utils.formatByT(new Date(end.valueOf() + 7*24*60*60*1000));
              package.packagePrice = order.TotalAmount/ order.TotalQty;
              orderIFS.createPackage(package, function (err, res) {
                if (err) {
                  console.log('createPackage err: ' + err);
                  cb(null, {status: 0, msg: '操作异常'});
                  return;
                }

                if (!res.IsSuccess) {
                  cb(null, {status: 0, msg: res.ErrorDescription});
                } else {
                  cb(null, {status: 1, order: order, package:{packageId:res.SysNo}, msg: ''});
                }
              });
            } else {
              cb(null, {status: 1, order: order, msg: ''});
            }
          }
        ],
        function (err, msg) {
          if (err) {
            submitCB(null, err);
          } else {
            submitCB(null, msg);
          }
        }
      );
    };

    ShoppingCart.remoteMethod(
      'submitOrder',
      {
        description: [
          '提交订单(access token).返回结果-status:操作结果 0 失败 1 成功, cartId:购物车编号, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '提交订单(JSON string) {"userId":int, "receiverId":int, "logistics":"string", "message":"string", "type":int',
              '"payMent":int, "from":int, "product":[{"pItemId":int, "pId":int, "qty":int}]}',
              'userId:用户编号, receiverId:收货地址编号, logistics:物流(快递 or 自提), message:留言, type:订单类型(0-普通订单,3-包团订单), ',
              'payMent:支付方式(13-微信支付), from:订单来源(3-android 4-ios), pId:商品编号, pItemId:商品sku编号,qty数量'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/submit-order', verb: 'post'}
      }
    );

    //支付前检查订单
    ShoppingCart.checkOrderForPay = function (data, cb) {
      shoppingIFS.checkOrderForPay(data, function (err, res) {
        if (err) {
          console.log('checkOrderForPay err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, order: res, msg: ''});
        }
      });
    };

    ShoppingCart.remoteMethod(
      'checkOrderForPay',
      {
        description: [
          '支付前检查订单(access token).返回结果-status:操作结果 0 失败 1 成功, order:订单信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '订单信息(JSON string) {"userId":int, "orderId":int}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/check-order-forPay', verb: 'post'}
      }
    );

    //创建支付记录
    ShoppingCart.createPayRecord = function (data, cb) {
      shoppingIFS.createPayRecord(data, function (err, res) {
        if (err) {
          console.log('createPayRecord err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: ''});
        }
      });
    };

    ShoppingCart.remoteMethod(
      'createPayRecord',
      {
        description: [
          '创建支付记录(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '支付信息(JSON string) {"userId":int, "name":"string", "orderId":int, "totalFree":float, "tradeNO":"string"}',
              'name:购买者昵称'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/create-pay-record', verb: 'post'}
      }
    );

  });
};
