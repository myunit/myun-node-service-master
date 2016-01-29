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
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = ShoppingIFS;
