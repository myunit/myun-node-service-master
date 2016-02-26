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

exports.getOrderListXML = function (userId, page, pageSize, ownerId, orderType, payStatus, deliveryStatus) {
  var obj = {};
  obj.Page = page;
  obj.PageSize = pageSize;
  obj.UID = userId;
  obj.ProductOwnerCustomerNo = ownerId;
  obj.OrderType = orderType;
  obj.PayStatus = payStatus;
  obj.DeliveryStatus = deliveryStatus;

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

exports.getPackageOrderDetailXML = function (orderId) {
  var obj = {};
  obj.Page = 0;
  obj.PageSize = 1;
  obj.OrderId = orderId;

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

exports.getPackageByOrderIdXML = function (userId, orderId) {
  var xmlObj = [{
    GetProductPackageBySysNoWithUid: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        packageId: orderId
      },
      {
        uId: userId
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

exports.setMoneyPromotionXML = function (obj) {
  var promotion = {};
  promotion.UserId = obj.userId;
  promotion.UserName = obj.userName;
  promotion.Body = {};
  promotion.Body.OrderId = obj.orderId;
  promotion.Body.PromotionCode = 'xhq';
  promotion.Body.PromotionDescription = obj.des;
  promotion.Body.PromotionAmount = obj.money;
  promotion.Body.PromotionType = 0;
  var xmlObj = [{
    SetShippingPromotionForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(promotion)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.setOrderTrackDeliveryXML = function (obj) {
  var track = {};
  track.UserId = obj.userId;
  track.UserName = obj.userName;
  track.Body = {};
  track.Body.OrderId = obj.orderId;
  track.Body.RealTrackingCode = obj.trackCode;
  track.Body.RealTrackingNo = obj.trackNo;
  track.Body.ShippingMethod = obj.method;
  var xmlObj = [{
    SetOrderTrackingDeliveryVoucherForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(track)
      }
    ]
  }];

  return xml(xmlObj, true);
};

exports.getDelayOrderReceiveXML = function (obj) {
  var data = {};
  data.Body = obj.orderId;
  data.PageIndex = 0;
  data.PageSize = 0;
  data.UserId = obj.userId;
  data.UserName = obj.userName;

  var xmlObj = [{
    DelayOrderReceiveForApp: [
      {
        _attr: {
          xmlns: 'http://tempuri.org/'
        }
      },
      {
        queryString: JSON.stringify(data)
      }
    ]
  }];

  return xml(xmlObj, true);
};
