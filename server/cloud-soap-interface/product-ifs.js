/**
 * @author qianqing
 * @create by 16-1-26
 * @description
 */
var util = require('util');
var ProductObj = require('./Object/ProductObj');

var ProductIFS = function (app) {
  this.DS = app.datasources.ProductSoap;
  Object.call(this);
};
util.inherits(ProductIFS, Object);

ProductIFS.prototype.getAllProduct = function (obj, callback) {
  var Product = this.DS.models.Product;
  var xml = ProductObj.getAllProductXML(obj);
  Product.GetAllGetProductForApp(xml, function (err, response) {
    try {
      callback(err, JSON.parse(response.GetAllGetProductForAppResult));
    } catch (e) {
      callback(err, {IsSuccess: false, ErrorDescription:'服务异常'});
    }
  });
};

exports = module.exports = ProductIFS;
