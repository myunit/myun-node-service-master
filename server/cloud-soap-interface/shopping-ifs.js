/**
 * @author qianqing
 * @create by 16-1-29
 * @description
 */
var util = require('util');
var ShoppingObj = require('./Object/ShoppingObj');

var ShoppingIFS = function (app) {
  this.DS = app.datasources.ShoppingSoap;
  Object.call(this);
};
util.inherits(ShoppingIFS, Object);

ShoppingIFS.prototype.addToCart = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = ShoppingObj.addToCartXML(obj);
  Shopping.CartForAddForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.CartForAddForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常1'});
    }
  });
};

ShoppingIFS.prototype.submitOrder = function (obj, cartIds, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = ShoppingObj.submitOrderXML(obj, cartIds);
  Shopping.SubmitCouponOrderByCartItemSysNo(xml, function (err, response) {
    console.log(response);
    try {
      callback(err, JSON.parse(response.SubmitCouponOrderByCartItemSysNoResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常2'});
    }
  });
};

ShoppingIFS.prototype.checkOrderForPay = function (obj, callback) {
  var Shopping = this.DS.models.Shopping;
  var xml = ShoppingObj.checkOrderForPayXML(obj);
  Shopping.PayForOrder(xml, function (err, response) {
    console.log(response);
    try {
      callback(err, JSON.parse(response.PayForOrderResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常2'});
    }
  });
};

exports = module.exports = ShoppingIFS;
