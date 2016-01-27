var loopback = require('loopback');
var OrderIFS = require('../../server/cloud-soap-interface/order-ifs');

module.exports = function (Book) {
  Book.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var orderIFS = new OrderIFS(app);

    //获取订单详情
    Book.getOrderDetail = function (userId, orderId, cb) {
      var order = {};
      order.userId = userId;
      order.orderId = orderId;
      orderIFS.getOrderDetail(order, function (err, res) {
        if (err) {
          console.log('getOrderDetail err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res, msg: '操作成功'});
        }
      });
    };

    Book.remoteMethod(
      'getOrderDetail',
      {
        description: [
          '获取订单详情(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'orderId', type: 'number', required: true, http: {source: 'query'}, description: '订单编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-order-detail', verb: 'get'}
      }
    );

    //查询订单
    Book.getOrderList = function (userId, page, pageSize, ownerId, orderType, cb) {
      orderIFS.getOrderList(userId, page, pageSize, ownerId, orderType, function (err, res) {
        if (err) {
          console.log('getOrderDetail err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res, msg: '操作成功'});
        }
      });
    };

    Book.remoteMethod(
      'getOrderList',
      {
        description: [
          '获取订单详情(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'page', type: 'number', required: true, http: {source: 'query'}, description: '页码'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'},
          {arg: 'ownerId', type: 'number', default: 0, http: {source: 'query'}, description: '商品所有者编号'},
          {arg: 'orderType', type: 'number', default: 0, http: {source: 'query'}, description: '订单类型(-1 全部,0 普通,3 包团)'}

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-order-list', verb: 'get'}
      }
    );

  });
};
