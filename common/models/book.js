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
          cb(null, {status: 1, data: res, msg: ''});
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
          console.log('getOrderList err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, data: res.Datas, msg: ''});
        }
      });
    };

    Book.remoteMethod(
      'getOrderList',
      {
        description: [
          '查询订单(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
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

    //查询包团订单
    Book.getPackageOrderList = function (userId, page, pageSize, cb) {
      orderIFS.getPackageOrderList(userId, page, pageSize, function (err, res) {
        if (err) {
          console.log('getPackageOrderList err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, data: res.Datas, msg: ''});
        }
      });
    };

    Book.remoteMethod(
      'getPackageOrderList',
      {
        description: [
          '查询包团订单(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', required: true, http: {source: 'query'}, description: '用户编号'},
          {arg: 'page', type: 'number', required: true, http: {source: 'query'}, description: '页码'},
          {arg: 'pageSize', type: 'number', required: true, http: {source: 'query'}, description: '每页记录数'}

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-package-order-list', verb: 'get'}
      }
    );

    //根据包团订单id获取包团
    Book.getPackageByOrderId = function (orderId, cb) {
      orderIFS.getPackageByOrderId(orderId, function (err, res) {
        if (err) {
          console.log('getPackageByOrderId err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          if (res.Counts > 0) {
            cb(null, {status: 1, data: res.Data, msg: ''});
          } else {
            cb(null, {status: 1, data: {}, msg: ''});
          }
        }
      });
    };

    Book.remoteMethod(
      'getPackageByOrderId',
      {
        description: [
          '根据包团订单id获取包团(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'orderId', type: 'number', required: true, http: {source: 'query'}, description: '包团订单编号'}

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-package-by-orderId', verb: 'get'}
      }
    );

    //根据包团子订单id获取订单
    Book.getOrderByPackageItemId = function (orderId, cb) {
      orderIFS.getOrderByPackageItemId(orderId, function (err, res) {
        if (err) {
          console.log('getOrderByPackageItemId err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res, msg: ''});
        }
      });
    };

    Book.remoteMethod(
      'getOrderByPackageItemId',
      {
        description: [
          '根据包团订单id获取包团(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'orderId', type: 'number', required: true, http: {source: 'query'}, description: '包团子订单编号'}

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-order-by-packageItemId', verb: 'get'}
      }
    );

    //创建包团
    Book.createPackage = function (data, cb) {
      orderIFS.createPackage(data, function (err, res) {
        if (err) {
          console.log('createPackage err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res, msg: ''});
        }
      });
    };

    Book.remoteMethod(
      'createPackage',
      {
        description: [
          '创建包团(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
            '创建包团订单(JSON string) {"userId":int, "sharePrice":float, "quantity":int, "orderId":int, ',
            '"payAmount":float, "skuId":int, "buyLimit":int, "retentionQuantity":int, "shareEndDate":"string", ',
            '"deliverDate":"string", "packagePrice":float}',
            'userId用户编号, sharePrice分享价格, quantity包团数量, orderId包团订单编号, payAmount支付金额, skuId Sku编号, ',
            'buyLimit购买限制数量, retentionQuantity自留数量, shareEndDate分享结束时间, deliverDate估计交货时间, packagePrice包团价格'
            ]
          }

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/create-package', verb: 'post'}
      }
    );

    //取消包团
    Book.cancelPackage = function (data, cb) {
      orderIFS.cancelPackage(data, function (err, res) {
        if (err) {
          console.log('cancelPackage err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '取消成功'});
        }
      });
    };

    Book.remoteMethod(
      'cancelPackage',
      {
        description: [
          '取消包团(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '取消包团(JSON string) {"packageId":int}',
              'packageId 包团编号'
            ]
          }

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/cancel-package', verb: 'delete'}
      }
    );

    //取消包团
    Book.cancelPackage = function (data, cb) {
      orderIFS.cancelPackage(data, function (err, res) {
        if (err) {
          console.log('cancelPackage err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '取消成功'});
        }
      });
    };

    Book.remoteMethod(
      'cancelPackage',
      {
        description: [
          '取消包团-用户为付款(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '取消包团(JSON string) {"packageId":int}',
              'packageId 包团编号'
            ]
          }

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/cancel-package', verb: 'delete'}
      }
    );

    //结束包团
    Book.finishPackage = function (data, cb) {
      orderIFS.finishPackage(data, function (err, res) {
        if (err) {
          console.log('finishPackage err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '取消成功'});
        }
      });
    };

    Book.remoteMethod(
      'finishPackage',
      {
        description: [
          '结束包团-分享中(access token).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '结束包团(JSON string) {"packageId":int}',
              'packageId 包团编号'
            ]
          }

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/finish-package', verb: 'delete'}
      }
    );

    //修改包团
    Book.modifyPackage = function (data, cb) {
      orderIFS.modifyPackage(data, function (err, res) {
        if (err) {
          console.log('modifyPackage err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res, msg: ''});
        }
      });
    };

    Book.remoteMethod(
      'modifyPackage',
      {
        description: [
          '修改包团(access token).返回结果-status:操作结果 0 失败 1 成功, data:订单信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '创建包团订单(JSON string) {"packageId":int, "sharePrice":float, "quantity":int, ',
              '"payAmount":float, "buyLimit":int, "retentionQuantity":int, "shareEndDate":"string", ',
              '"deliverDate":"string", "packagePrice":float}',
              'packageId包团编号, sharePrice分享价格, quantity包团数量, payAmount支付金额, buyLimit购买限制数量, ',
              'retentionQuantity自留数量, shareEndDate分享结束时间, deliverDate估计交货时间, packagePrice包团价格'
            ]
          }

        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-package', verb: 'post'}
      }
    );
  });
};
