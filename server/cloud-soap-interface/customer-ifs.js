/**
 * @author qianqing
 * @create by 16-1-15
 * @description 针对云端的customer对象的访问接口，支持soap协议
 */
var util = require('util');
var async = require('async');
var CustomerObj = require('./Object/CustomerObj');
var fs = require('fs');

var CustomerIFS = function (app) {
  this.DS = app.datasources.CustomerSoap;
  Object.call(this);
};
util.inherits(CustomerIFS, Object);

CustomerIFS.prototype.register = function (regObj, callback) {
  var Customer = this.DS.models.Customer;
  var regXml = CustomerObj.createRegisterXML(regObj);
  Customer.Register(regXml, function (err, response) {
    console.log('err: '+ JSON.stringify(err));
    console.log('response: '+ JSON.stringify(response));
  });
};


exports = module.exports = CustomerIFS;
