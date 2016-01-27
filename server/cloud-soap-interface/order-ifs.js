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

exports = module.exports = OrderIFS;
