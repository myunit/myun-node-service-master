/**
 * @author qianqing
 * @create by 16-1-27
 * @description
 */
var xml = require('xml');

exports.getOrderDetailXML = function (obj) {
  var xmlObj = [{
    OrderForDetail: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        uId: obj.userId
      },
      {
        orderId: obj.orderId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getOrderListXML = function (userId, page, pageSize, ownerId, orderType) {
  var obj = {};
  obj.Page = page;
  obj.PageSize = pageSize;
  obj.UID = userId;
  obj.ProductOwnerCustomerNo = ownerId;
  obj.OrderType = orderType;

  var xmlObj = [{
    GetAllOrderForApp: [
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

exports.getPackageOrderListXML = function (userId, page, pageSize) {
  var obj = {};
  obj.Page = page;
  obj.PageSize = pageSize;
  obj.UID = userId;

  var xmlObj = [{
    GetAllProductPackageForApp: [
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

exports.getPackageByOrderIdXML = function (orderId) {
  var xmlObj = [{
    GetProductPackageBySysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageId: orderId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getOrderByPackageItemIdXML = function (orderId) {
  var xmlObj = [{
    GetOrderByProductPackageItemSysNo: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageItemId: orderId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.createPackageOrderXML = function (obj) {
  var package = {};
  package.SharePrice = obj.sharePrice;
  package.PackageQuantity = obj.quantity;
  package.CustomerSysNo = obj.userId;
  package.PackageOrderSysNo = obj.orderId;
  package.PackagePayAmount = obj.payAmount;
  package.PerCustomerBuyLimit = obj.buyLimit;
  package.RetentionQuantity = obj.retentionQuantity;
  package.ShareEndDate = obj.shareEndDate;
  package.SkuSysNo = obj.skuId;
  package.EstimateDeliveryDate = obj.deliverDate;
  package.PackagePrice = obj.packagePrice;
  var xmlObj = [{
    CreateProductPackageForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(package)
      }
    ]
  }];

  return xml(xmlObj, true);
};
