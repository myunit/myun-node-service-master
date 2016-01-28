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

OrderIFS.prototype.getOrderList = function (userId, page, pageSize, ownerId, orderType, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getOrderListXML(userId, page, pageSize, ownerId, orderType);
  Order.GetAllOrderForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllOrderForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getPackageOrderList = function (userId, page, pageSize, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getPackageOrderListXML(userId, page, pageSize);
  Order.GetAllProductPackageForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllProductPackageForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

OrderIFS.prototype.getPackageByOrderId = function (orderId, callback) {
  var Order = this.DS.models.Order;
  var xml = OrderObj.getPackageByOrderIdXML(orderId);
  Order.GetProductPackageBySysNo(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetProductPackageBySysNoResult));
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

exports = module.exports = OrderIFS;
