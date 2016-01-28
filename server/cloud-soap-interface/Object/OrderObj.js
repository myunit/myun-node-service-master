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

exports.createPackageXML = function (obj) {
  var packageObj = {};
  packageObj.SharePrice = obj.sharePrice;
  packageObj.PackageQuantity = obj.quantity;
  packageObj.CustomerSysNo = obj.userId;
  packageObj.PackageOrderSysNo = obj.orderId;
  packageObj.PackagePayAmount = obj.payAmount;
  packageObj.PerCustomerBuyLimit = obj.buyLimit;
  packageObj.RetentionQuantity = obj.retentionQuantity;
  packageObj.ShareEndDate = obj.shareEndDate;
  packageObj.SkuSysNo = obj.skuId;
  packageObj.EstimateDeliveryDate = obj.deliverDate;
  packageObj.PackagePrice = obj.packagePrice;
  var xmlObj = [{
    CreateProductPackageForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(packageObj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.cancelPackageXML = function (obj) {
  var xmlObj = [{
    CancelProductPackage: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageId: obj.packageId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.finishPackageXML = function (obj) {
  var xmlObj = [{
    FinishProductPackage: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageId: obj.packageId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.modifyPackageXML = function (obj) {
  var packageObj = {};
  packageObj.SharePrice = obj.sharePrice;
  packageObj.PackageQuantity = obj.quantity;
  packageObj.SysNo = obj.packageId;
  packageObj.PackagePayAmount = obj.payAmount;
  packageObj.PerCustomerBuyLimit = obj.buyLimit;
  packageObj.RetentionQuantity = obj.retentionQuantity;
  packageObj.ShareEndDate = obj.shareEndDate;
  packageObj.EstimateDeliveryDate = obj.deliverDate;
  packageObj.PackagePrice = obj.packagePrice;
  var xmlObj = [{
    ModifyProductPackageForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(packageObj)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.pickUpPackageProductXML = function (obj) {
  var pickUp = {};
  pickUp.CustomerSysNo = obj.userId;
  pickUp.OrderSysNo = obj.orderId;
  pickUp.ProductPackageSysNo = obj.packageId;
  pickUp.ReceiveID = obj.receiveId;
  pickUp.Quantity = obj.quantity;
  var xmlObj = [{
    PickUpProductForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(pickUp)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.auditOrderXML = function (obj) {
  var xmlObj = [{
    AuditOrder: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        orderId: obj.orderId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.cancelOrderXML = function (obj) {
  var xmlObj = [{
    CancelOrder: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        orderId: obj.orderId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.wantAllPackageProductXML = function (obj) {
  var xmlObj = [{
    WantAllProductPackage: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageId: obj.packageId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.cancelPickUpForUnPayXML = function (obj) {
  var xmlObj = [{
    CancelPickUpFor15MinituesUnPay: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageId: obj.packageId
      },
      {
        packageItemId: obj.packageItemId
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getAllTrackCompanyXML = function () {
  var xmlObj = [{
    GetAllTrackingCompanyList: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.modifyOrderAddressXML = function (obj) {
  var order = {};
  order.UserId = obj.userId;
  order.UserName = obj.userName;
  order.Body = {};
  order.Body.OrderId = obj.orderId;
  order.Body.PCDCode = obj.pcdCode;
  order.Body.PCDDescription = obj.pcdDes;
  order.Body.ReceiverName = obj.name;
  order.Body.ReceiverPhone = obj.phone;
  order.Body.ShippingAddress = obj.address;
  var xmlObj = [{
    ModifyOrderDetailForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(order)
      }
    ]
  }];

  return xml(xmlObj, true);
};
