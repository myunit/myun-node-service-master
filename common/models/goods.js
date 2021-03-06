var loopback = require('loopback');
var ProductIFS = require('../../server/cloud-soap-interface/product-ifs');

module.exports = function (Goods) {
  Goods.getApp(function (err, app) {
    if (err) {
      throw err;
    }

    var productIFS = new ProductIFS(app);

    //获取商品列表
    Goods.getAllProduct = function (userId, audit, status, place, pcdCode, pageId, pageSize, name, isNeedCategory, categoryId, friendIds, exceptPlace, exceptPcdCode, cb) {
      var product = {};
      product.CustomerNo = userId;
      product.AuditStatus = audit;
      product.GroupStatus = status;
      product.OriginPlace = place;
      product.PCDCode = pcdCode;
      product.Page = pageId;
      product.PageSize = pageSize;
      product.ProductName = name;
      product.IsNeedCateforys = isNeedCategory;
      product.CategorySysNo = categoryId;
      if (friendIds) {
        product.UserIDs = friendIds.split(',');
      }
      product.ExceptOriginPlace = exceptPlace;
      product.ExceptOriginPCDCode = exceptPcdCode;

      if (product.PCDCode || product.OriginPlace || product.ExceptOriginPlace || product.ExceptOriginPCDCode) {
        productIFS.getAllProductLight(product, function (err, res) {
          if (err) {
            console.log('getAllProductLight err: ' + err);
            cb(null, {status: 0, msg: '操作异常'});
            return;
          }

          if (!res.IsSuccess) {
            cb(null, {status: 0, msg: res.ErrorDescription});
          } else {
            cb(null, {status: 1, count: res.Counts, data: res.Datas, category:res.CategoryDatas, isAllProduct:res.IsAllProduct, msg: ''});
          }
        });
      } else {
        productIFS.getAllProduct(product, function (err, res) {
          if (err) {
            console.log('getAllProduct err: ' + err);
            cb(null, {status: 0, msg: '操作异常'});
            return;
          }

          if (!res.IsSuccess) {
            cb(null, {status: 0, msg: res.ErrorDescription});
          } else {
            cb(null, {status: 1, count: res.Counts, data: res.Datas, category:res.CategoryDatas ,msg: ''});
          }
        });
      }
    };

    Goods.remoteMethod(
      'getAllProduct',
      {
        description: [
          '获取商品列表(根据条件查询商品).返回结果-status:操作结果 0 失败 1 成功, data:商品列表信息, msg:附带信息'
        ],
        accepts: [
          {arg: 'userId', type: 'number', default: 0, http: {source: 'query'}, description: '商品所有者编号'},
          {arg: 'audit', type: 'number', default: -1, http: {source: 'query'}, description: '商品审核状态(-1 全部 0 待审核 1 已审核 2 审核未通过)'},
          {arg: 'status', type: 'number', default: -1, http: {source: 'query'}, description: '商品状态(-1 全部 2 上架)'},
          {arg: 'place', type: 'string', default: '', http: {source: 'query'}, description: '当前用户所在地'},
          {arg: 'pcdCode', type: 'string', default: '', http: {source: 'query'}, description: '当前用户所在地pcd'},
          {arg: 'pageId', type: 'number', default: 0, http: {source: 'query'}, description: '第几页'},
          {arg: 'pageSize', type: 'number', default: 10, http: {source: 'query'}, description: '每页记录数'},
          {arg: 'name', type: 'string', default: '', http: {source: 'query'}, description: '商品名'},
          {arg: 'isNeedCategory', type: 'boolean', default: false, http: {source: 'query'}, description: '是否需要分类列表'},
          {arg: 'categoryId', type: 'number', default: 0, http: {source: 'query'}, description: '分类id'},
          {arg: 'friendIds', type: 'string', default: '', http: {source: 'query'}, description: '好友user id 字符串,格式1,2,3...'},
          {arg: 'exceptPlace', type: 'string', default: '', http: {source: 'query'}, description: '过滤家乡 浙江-嘉兴, 和exceptPcdCode二选一'},
          {arg: 'exceptPcdCode', type: 'string', default: '', http: {source: 'query'}, description: '过滤家乡6-14, 和exceptPlace二选一'}
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
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
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
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
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
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
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
        http: {path: '/del-product-img', verb: 'post'}
      }
    );

    //设置商品状态(上架 下架 停售)
    Goods.setProductStatus = function (data, cb) {
      var product = {};
      product.Body = data.productId;
      product.UserId = data.userId;
      product.UserName = data.userName;

      var fn = function (err, res) {
        if (err) {
          console.log('setProductStatus err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, msg: '操作成功'});
        }
      };

      if (data.status === 1) {
        productIFS.setProductOnSale(product, fn);
      } else if (data.status === 2) {
        productIFS.setProductOffShelves(product, fn);
      } else if (data.status === 3) {
        productIFS.setProductStopSale(product, fn);
      } else {
        cb(null, {status: 0, msg: '无效操作'});
      }
    };

    Goods.remoteMethod(
      'setProductStatus',
      {
        description: [
          '设置商品状态(上架 下架 停售).返回结果-status:操作结果 0 失败 1 成功, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '设置商品状态信息(JSON string) {"productId":int, "userId":int, "userName":"string", "status":int} ',
              'status:商品状态 1-上架 2-下架 3-停售'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/set-product-status', verb: 'post'}
      }
    );

    //新增商品
    Goods.AddProduct = function (data, cb) {
      productIFS.addProduct(data, function (err, res) {
        if (err) {
          console.log('AddProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, productId: res.SysNo, msg: '操作成功'});
        }
      });
    };

    Goods.remoteMethod(
      'AddProduct',
      {
        description: [
          '新增商品.返回结果-status:操作结果 0 失败 1 成功, productId:商品编号, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '新增商品信息(JSON string) {"userId":int, "userName":"string", "productName":"string", ',
              '"originPCD":"string", "originPlace":"string", "memo":"string", "categoryName":"string", "categoryId":int, ',
              '"groupCount":int, "singlePrice":float, "groupPrice":float, "stock":int, ',
              '"productImgs":[{"SysNo":0, "ImgValue":"string"}]}',
              'userId用户编号, userName用户昵称, productName商品名, originPCD产地pcd码, originPlace产地名, ',
              'memo产品简介, categoryName分类名, categoryId分类编号, groupCount包团数量, singlePrice单价, groupPrice包团价,',
              'stock库存(正数入库, 负数出库), productImgs产品图片数组(SysNo置0, ImgValue图片url)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/add-product', verb: 'post'}
      }
    );

    //编辑商品
    Goods.ModifyProduct = function (data, cb) {
      productIFS.modifyProduct(data, function (err, res) {
        if (err) {
          console.log('AddProduct err: ' + err);
          cb(null, {status: 0, msg: '操作异常'});
          return;
        }

        if (!res.IsSuccess) {
          cb(null, {status: 0, msg: res.ErrorDescription});
        } else {
          cb(null, {status: 1, productId: res.SysNo, msg: '操作成功'});
        }
      });
    };

    Goods.remoteMethod(
      'ModifyProduct',
      {
        description: [
          '编辑商品.返回结果-status:操作结果 0 失败 1 成功, data:商品信息, msg:附带信息'
        ],
        accepts: [
          {
            arg: 'data', type: 'object', required: true, http: {source: 'body'},
            description: [
              '编辑商品信息(JSON string) {"userId":int, "userName":"string", "productId":int, "productName":"string", ',
              '"styleCode":"string", "skuId":int, "barCode":"string", "skuData":[{"RuleSysNo":int, "IsInStock":boolean}...], ',
              '"originPCD":"string", "originPlace":"string", "memo":"string", "categoryName":"string", "categoryId":int, ',
              '"groupCount":int, "singlePrice":float, "groupPrice":float, "stock":int, ',
              '"productImgs":[{"SysNo":0, "ImgValue":"string"}],"audit":int}',
              'userId用户编号, userName用户昵称, productId商品编号, productName商品名, styleCode款号, originPCD产地pcd码, ',
              'originPlace产地名, memo产品简介, categoryName分类名, categoryId分类编号, groupCount包团数量, singlePrice单价, ',
              'groupPrice包团价, stock库存(正数入库, 负数出库), productImgs产品图片数组(SysNo图片编号(新增图片时不需要该字段), ImgValue图片url)',
              'styleCode对应getProductDetail应答中的ProductGroupCode',
              'skuId对应getProductDetail应答中的SkuSysno,',
              'barCode对应getProductDetail应答中的BarCode,',
              'skuData对应getProductDetail应答中的ProductSkuSupplyPriceData',
              'audit:商品审核状态(2:审核未通过,修改审核为通过的商品时使用)'
            ]
          }
        ],
        returns: {arg: 'repData', type: 'string'},
        http: {path: '/modify-product', verb: 'post'}
      }
    );

  });
};
