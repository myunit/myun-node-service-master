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

CustomerIFS.prototype.register = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.registerXML(obj);
  Customer.Register(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.login = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.loginXML(obj);
  Customer.Login(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.modifyPW = function (obj, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.modifyPWXML(obj);
  Customer.ModifyPassword(xml, function (err, response) {
    callback(err, response);
  });
};

CustomerIFS.prototype.getReceiveAddresses = function (customerNo, callback) {
  var Customer = this.DS.models.Customer;
  var xml = CustomerObj.getAllReceiveAddressesXML(customerNo);
  Customer.GetAllReceiveAddresses(xml, function (err, response) {
    callback(err, response);
  });
};


exports = module.exports = CustomerIFS;
