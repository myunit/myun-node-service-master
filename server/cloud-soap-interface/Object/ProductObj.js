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


