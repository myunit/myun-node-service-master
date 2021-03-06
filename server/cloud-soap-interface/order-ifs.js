/**
 * @author qianqing
 * @create by 16-1-27
 * @description
 */
var util = require('util');
var OrderObj = require('./Object/OrderObj');

var OrderIFS = function (app) {
  this.DS = app.datasources.OrderSoap;
  Object.call(this);
};
util.inherits(OrderIFS, Object);

OrderIFS.prototype.getOrderDetail = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getOrderDetailXML(obj);
  Order.OrderForDetail(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.OrderForDetailResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getOrderList = function (userId, page, pageSize, ownerId, orderType, payStatus, deliveryStatus, isClearGroupStatus, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getOrderListXML(userId, page, pageSize, ownerId, orderType, payStatus, deliveryStatus, isClearGroupStatus);
  Order.GetAllOrderForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllOrderForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getPackageOrderList = function (userId, page, pageSize, orderId, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getPackageOrderListXML(userId, page, pageSize, orderId);
  Order.GetAllProductPackageForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllProductPackageForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getPackageOrderDetail = function (orderId, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getPackageOrderDetailXML(orderId);
  Order.GetAllProductPackageForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllProductPackageForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getPackageByOrderId = function (userId, orderId, type, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getPackageByOrderIdXML(userId, orderId, type);
  Order.GetProductPackageBySysNoWithUid(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetProductPackageBySysNoWithUidResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getOrderByPackageItemId = function (orderId, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getOrderByPackageItemIdXML(orderId);
  Order.GetOrderByProductPackageItemSysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetOrderByProductPackageItemSysNoResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.createPackage = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.createPackageXML(obj);
  Order.CreateProductPackageForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CreateProductPackageForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.cancelPackage = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.cancelPackageXML(obj);
  Order.CancelProductPackage(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CancelProductPackageResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.finishPackage = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.finishPackageXML(obj);
  Order.FinishProductPackage(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.FinishProductPackageResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.modifyPackage = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.modifyPackageXML(obj);
  Order.ModifyProductPackageForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ModifyProductPackageForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.pickUpPackageProduct = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.pickUpPackageProductXML(obj);
  Order.PickUpProductForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.PickUpProductForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.auditOrder = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.auditOrderXML(obj);
  Order.AuditOrder(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AuditOrderResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.cancelOrder = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.cancelOrderXML(obj);
  Order.CancelOrder(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CancelOrderResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.wantAllPackageProduct = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.wantAllPackageProductXML(obj);
  Order.WantAllProductPackage(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.WantAllProductPackageResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.cancelPickUpForUnPay = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.cancelPickUpForUnPayXML(obj);
  Order.CancelPickUpFor15MinituesUnPay(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CancelPickUpFor15MinituesUnPayResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getAllTrackCompany = function (callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getAllTrackCompanyXML();
  Order.GetAllTrackingCompanyList(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllTrackingCompanyListResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.modifyOrderAddress = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.modifyOrderAddressXML(obj);
  Order.ModifyOrderDetailForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.ModifyOrderDetailForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.setMoneyPromotion = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.setMoneyPromotionXML(obj);
  Order.SetShippingPromotionForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SetShippingPromotionForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.setOrderTrackDelivery = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.setOrderTrackDeliveryXML(obj);
  Order.SetOrderTrackingDeliveryVoucherForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.SetOrderTrackingDeliveryVoucherForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.delayOrderReceive = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getDelayOrderReceiveXML(obj);
  Order.DelayOrderReceiveForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.DelayOrderReceiveForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.finishOrderDelivery = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.finishOrderDeliveryXML(obj);
  Order.FinishOrderDeliveryVoucher(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.FinishOrderDeliveryVoucherResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getGroupOn = function (obj, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getGroupOnXML(obj);
  Order.AddGrouponItemForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.AddGrouponItemForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = OrderIFS;
