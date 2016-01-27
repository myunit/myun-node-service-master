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


