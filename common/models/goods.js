var loopback = require('loopback');
var ProductIFS = require('../../server/cloud-soap-interface/product-ifs');

module.exports = function (Goods) {
  Goods.getApp(function (err, app) {
    if (err) {
      throw err;
    }
    var productIFS = new ProductIFS(app);

    //获取商品列表
    Goods.getAllProduct = function (userId, status, pcdCode, pageId, pageSize, name, cb) {
      var product = {};
      product.CustomerNo = userId;
      product.GroupStatus = status;
      product.PCDCode = pcdCode;
      product.Page = pageId;
      product.PageSize = pageSize;
      product.ProductName = name;

      productIFS.getAllProduct(product, function (err, res) {
        if (err) {
          console.log('getAllProduct err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, count: res.Counts, data: res.Datas, msg: ''});
        }
      });
    };

    Goods.remoteMethod(
      'getAllProduct',
      {
        description: [
          '获取商品列表(根据条件查询商品).返回结果-status:操作结果 0 失败 1 成功, data:商品列表信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', default: 0, http: {source: 'query'}, description: '商品所有者编号'},
          {arg: 'status', type: 'number', default: 2, http: {source: 'query'}, description: '商品状态'},
          {arg: 'pcdCode', type: 'string', default: '', http: {source: 'query'}, description: '商品所在地pcd'},
          {arg: 'pageId', type: 'number', default: 0, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', default: 10, http: {source: 'query'}, description: '每页记录数'},
          {arg: 'name', type: 'string', default: '', http: {source: 'query'}, description: '商品名'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-all-product', verb: 'get'}
      }
    );

    //获取商品详情
    Goods.getProductDetail = function (productNo, cb) {
        productIFS.getProductDetail(productNo, function (err, res) {
        if (err) {
          console.log('getProductDetail err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Datas, msg: ''});
        }
      });
    };

    Goods.remoteMethod(
      'getProductDetail',
      {
        description: [
          '获取商品详情.返回结果-status:操作结果 0 失败 1 成功, data:商品信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'productNo', type: 'number', require: true, http: {source: 'query'}, description: '商品编号'}
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-product-detail', verb: 'get'}
      }
    );

    //获取商品分类
    Goods.getProductCategory = function (cb) {
      productIFS.getProductCategory(function (err, res) {
        if (err) {
          console.log('getProductCategory err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, data: res.Datas, msg: ''});
        }
      });
    };

    Goods.remoteMethod(
      'getProductCategory',
      {
        description: [
          '获取商品详情.返回结果-status:操作结果 0 失败 1 成功, data:商品信息, msg:附带信息'
        ],
        accepts: [],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/get-product-category', verb: 'get'}
      }
    );

    //删除商品图片
    Goods.deleteProductImg = function (data, cb) {
      var imgObj = {};
      imgObj.Body = data.imgNo;
      imgObj.UserId = data.userId;
      imgObj.UserName = data.userName;

      productIFS.deleteProductImage(imgObj, function (err, res) {
        if (err) {
          console.log('deleteProductImage err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '删除成功'});
        }
      });
    };

    Goods.remoteMethod(
      'deleteProductImg',
      {
        description: [
          '删除商品图片.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '删除商品图片信息(JSON string) {"imgNo":int array, "userId":int, "userName":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/del-product-img', verb: 'delete'}
      }
    );

    //设置商品下架
    Goods.setProductOffShelves = function (data, cb) {
      var product = {};
      product.Body = data.productId;
      product.UserId = data.userId;
      product.UserName = data.userName;

      productIFS.setProductOffShelves(product, function (err, res) {
        if (err) {
          console.log('setProductOffShelves err: ' + err);
          cb(null, {status:0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status:0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '下架成功'});
        }
      });
    };

    Goods.remoteMethod(
      'setProductOffShelves',
      {
        description: [
          '设置商品下架.返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '设置商品下架信息(JSON string) {"productId":int, "userId":int, "userName":"string"}'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-product-off-shelves', verb: 'post'}
      }
    );

  });
};
