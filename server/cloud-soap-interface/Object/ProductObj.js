/**
 * @author qianqing
 * @create by 16-1-26
 * @description
 */
var xml = require('xml');

exports.getAllProductXML = function (obj) {
  var xmlObj = [{
    GetAllGetProductForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getProductDetailXML = function (productNo) {
  var xmlObj = [{
    GetProductDetailBySysno: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        sysno: productNo
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getProductCategoryXML = function () {
  var xmlObj = [{
    GetCategoryTableSimple: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.deleteProductImageXML = function (obj) {
  var xmlObj = [{
    DeleteProductImgForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setProductOffShelvesXML = function (obj) {
  var xmlObj = [{
    SetProductOffShelvesForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setProductOnSaleXML = function (obj) {
  var xmlObj = [{
    SetProductOnSaleForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setProductStopSaleXML = function (obj) {
  var xmlObj = [{
    SetProductStopSaleForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(obj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.addProductXML = function (obj) {
  var product = {};
  product.CategoryName = obj.categoryName;
  product.CategorySysno = obj.categoryId;
  product.CustomerNo = obj.userId;
  product.NickName = obj.userName;
  product.GroupPrice = obj.groupPrice;
  product.GroupReqCounts = obj.groupCount;
  product.Memo = obj.memo;
  product.OriginPCDCode = obj.originPCD;
  product.OriginPlace = obj.originPlace;
  product.ProductGroupCode = obj.styleCode;
  product.ProductName = obj.productName;
  product.SignlePrice = obj.singlePrice;
  product.Stock = obj.stock;
  product.ProductImgs = obj.productImgs;
  console.log('obj: ' + JSON.stringify(product));
  var xmlObj = [{
    SetProductForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(product)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.modifyProductXML = function (obj) {
  var product = {};
  product.CategoryName = obj.categoryName;
  product.CategorySysno = obj.categoryId;
  product.CustomerNo = obj.userId;
  product.NickName = obj.userName;
  product.GroupPrice = obj.groupPrice;
  product.GroupReqCounts = obj.groupCount;
  product.Memo = obj.memo;
  product.OriginPCDCode = obj.originPCD;
  product.OriginPlace = obj.originPlace;
  product.ProductGroupCode = obj.styleCode;
  product.ProductName = obj.productName;
  product.SignlePrice = obj.singlePrice;
  product.Stock = obj.stock;
  product.ProductImgs = obj.productImgs;
  product.ProductSysno = obj.productId;
  product.SkuSysno = obj.skuId;
  product.BarCode = obj.barCode;
  product.ProductSkuSupplyPriceData = obj.skuData;

  console.log('obj: ' + JSON.stringify(product));
  var xmlObj = [{
    SetProductForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(product)
      }
    ]
  }];

  return xml(xmlObj, true);
};


